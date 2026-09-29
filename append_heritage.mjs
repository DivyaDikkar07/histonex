import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'src', 'locales');

const ajantaEn = {
  name: "Ajanta Caves",
  location: "Chhatrapati Sambhajinagar, Maharashtra",
  description: "A series of 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE."
};

const ajantaHi = {
  name: "अजंता गुफाएँ",
  location: "छत्रपति संभाजीनगर, महाराष्ट्र",
  description: "दूसरी शताब्दी ईसा पूर्व से लगभग 480 ईस्वी तक के 30 रॉक-कट बौद्ध गुफा स्मारकों की एक श्रृंखला।"
};

const ajantaMr = {
  name: "अजिंठा लेणी",
  location: "छत्रपती संभाजीनगर, महाराष्ट्र",
  description: "इ.स.पू. २ रे शतक ते इ.स. ४८० च्या दरम्यान कोरलेली ३० रॉक-कट बौद्ध लेणींची मालिका."
};

['en', 'hi', 'mr'].forEach((lang, idx) => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.heritage) data.heritage = {};
  
  if (lang === 'en') data.heritage['ajanta-caves'] = ajantaEn;
  if (lang === 'hi') data.heritage['ajanta-caves'] = ajantaHi;
  if (lang === 'mr') data.heritage['ajanta-caves'] = ajantaMr;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log("Heritage locales appended.");
