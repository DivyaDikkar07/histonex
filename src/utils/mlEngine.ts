import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { demoHeritageSites } from '../data/heritage';

class MLEngine {
  private classifier: knnClassifier.KNNClassifier | null = null;
  private mobilenetModel: mobilenet.MobileNet | null = null;
  private isReady = false;

  async initialize() {
    if (this.isReady) return;

    try {
      console.log('Loading TFJS and models...');
      await tf.ready();
      
      this.classifier = knnClassifier.create();
      this.mobilenetModel = await mobilenet.load({ version: 2, alpha: 1.0 });

      // Train with reference images
      console.log('Training KNN classifier with heritage site reference images...');
      
      for (const site of demoHeritageSites) {
        if (site.referenceImages && site.referenceImages.length > 0) {
          for (const imageSrc of site.referenceImages) {
            await this.addExampleFromUrl(imageSrc, site.id);
          }
        } else {
          // Fallback to gallery or main image if referenceImages is missing
          if (site.gallery && site.gallery.length > 0) {
            await this.addExampleFromUrl(site.gallery[0], site.id);
          } else if (site.image) {
            await this.addExampleFromUrl(site.image, site.id);
          }
        }
      }

      console.log('Training KNN classifier with background negative images...');
      const invalidImageUrls = [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Hand_open.jpg/320px-Hand_open.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Keyboard_and_mouse.JPG/320px-Keyboard_and_mouse.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Golden_Retriever_puppy_standing.jpg/320px-Golden_Retriever_puppy_standing.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/320px-ReceiptSwiss.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/320px-Cat03.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/American_Eskimo_Dog.jpg/320px-American_Eskimo_Dog.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/A_person_sitting_on_a_chair.jpg/320px-A_person_sitting_on_a_chair.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Laptop_with_blank_screen.png/320px-Laptop_with_blank_screen.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Official_portrait_of_Barack_Obama.jpg/320px-Official_portrait_of_Barack_Obama.jpg'
      ];

      for (const url of invalidImageUrls) {
        await this.addExampleFromUrl(url, 'invalid');
      }

      this.isReady = true;
      console.log('AI Engine ready.');
    } catch (error) {
      console.error('Failed to initialize AI engine:', error);
    }
  }

  private async addExampleFromUrl(url: string, classId: string) {
    if (!this.classifier || !this.mobilenetModel) return;

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const tfImg = tf.browser.fromPixels(img);
      const features = this.mobilenetModel.infer(tfImg, true);
      this.classifier.addExample(features, classId);
      tfImg.dispose();
    } catch (err) {
      console.warn(`Failed to add training example from ${url}`, err);
    }
  }

  async analyzeImage(imageElement: HTMLImageElement | HTMLVideoElement): Promise<{ id: string; confidence: number } | null> {
    if (!this.isReady || !this.classifier || !this.mobilenetModel) {
      await this.initialize();
    }
    
    if (!this.classifier || !this.mobilenetModel) return null;

    try {
      const tfImg = tf.browser.fromPixels(imageElement);
      const features = this.mobilenetModel.infer(tfImg, true);
      
      // Get the top k matches
      const result = await this.classifier.predictClass(features, 3);
      tfImg.dispose();

      // Return the best match if confidence > 0.65
      // Wait, KNN confidence might not be continuous probabilities, it returns a discrete set based on k.
      // E.g. if k=3 and 2 nearest neighbors are 'hampi', confidence is 0.66.
      // So let's check confidences map.
      let bestMatch = result.label;
      let maxConfidence = result.confidences[result.label] || 0;

      // If best match is our background class, treat as unknown/invalid
      if (bestMatch === 'invalid') {
        return null;
      }

      // In small datasets, KNN confidence might just be 1.0 or 0.0.
      return {
        id: bestMatch,
        confidence: maxConfidence
      };

    } catch (error) {
      console.error('Error analyzing image:', error);
      return null;
    }
  }
}

export const mlEngine = new MLEngine();
