import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'src', 'locales');
if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

// Base English structure
const en = {
  nav: {
    home: "Home",
    explore: "Explore",
    map: "Map",
    histolence: "HistoLence",
    photoChallenge: "Photo Challenge",
    community: "Community",
    login: "Login / Register",
    profile: "Profile / Admin"
  },
  common: {
    loading: "Loading...",
    error: "An error occurred",
    save: "Save",
    cancel: "Cancel",
    unknownHeritage: "Unknown / Not one of the 6 heritage places",
    unknownHeritageDesc: "Our AI model is currently trained exclusively on Ajanta Caves, Ellora Caves, Raigad Fort, Shaniwar Wada, Hampi, and Konark Sun Temple. Please try another photo.",
    scanAnother: "Scan Another Image",
    openCamera: "Open Camera",
    uploadImage: "Upload Heritage Image",
    warmingUp: "Warming up AI Model...",
    confidence: "AI Confidence",
    viewHeritage: "View Heritage Details",
    pastVsPresent: "Past vs Present",
    past: "Past",
    present: "Present",
    explore3d: "Explore 3D",
    thenVsNow: "Then vs Now",
    viewOnMap: "View on Map",
    timeTravelTimeline: "Time Travel Timeline",
    histoScanResult: "HistoScan Result",
    year: "Year"
  },
  chatbot: {
    title: "Heritage Guide",
    subtitle: "Ask history. Hear its story.",
    askPrompt: "Ask history a question...",
    suggest1: "When were the Ajanta Caves created?",
    suggest2: "Why is this place important?",
    suggest3: "Tell me a story in my language.",
    greeting: "Namaste! I am your Heritage Guide. I can answer your questions about the heritage sites using our verified knowledge base. What would you like to know?",
    learning: "I'm still learning about that, but according to records, these heritage sites are known for their stunning history and architecture.",
    verified: "Verified heritage record",
    unverified: "Requires verification"
  }
};

const hi = {
  nav: {
    home: "होम",
    explore: "खोजें",
    map: "नक्शा",
    histolence: "हिस्टोलेंस",
    photoChallenge: "फोटो चुनौती",
    community: "समुदाय",
    login: "लॉगिन / रजिस्टर",
    profile: "प्रोफाइल / एडमिन"
  },
  common: {
    loading: "लोड हो रहा है...",
    error: "एक त्रुटि हुई",
    save: "सहेजें",
    cancel: "रद्द करें",
    unknownHeritage: "अज्ञात / 6 विरासत स्थानों में से एक नहीं",
    unknownHeritageDesc: "हमारा AI मॉडल वर्तमान में विशेष रूप से अजंता गुफाओं, एलोरा गुफाओं, रायगढ़ किला, शनिवार वाडा, हम्पी और कोणार्क सूर्य मंदिर पर प्रशिक्षित है। कृपया एक और फोटो आज़माएं।",
    scanAnother: "एक और छवि स्कैन करें",
    openCamera: "कैमरा खोलें",
    uploadImage: "विरासत छवि अपलोड करें",
    warmingUp: "AI मॉडल तैयार हो रहा है...",
    confidence: "विश्वास स्तर",
    viewHeritage: "विरासत विवरण देखें",
    pastVsPresent: "अतीत बनाम वर्तमान",
    past: "अतीत",
    present: "वर्तमान",
    explore3d: "3D एक्सप्लोर करें",
    thenVsNow: "तब और अब",
    viewOnMap: "नक्शे पर देखें",
    timeTravelTimeline: "समय यात्रा टाइमलाइन",
    histoScanResult: "हिस्टोस्कैन परिणाम",
    year: "वर्ष"
  },
  chatbot: {
    title: "विरासत गाइड",
    subtitle: "इतिहास से पूछें। इसकी कहानी सुनें।",
    askPrompt: "इतिहास से एक प्रश्न पूछें...",
    suggest1: "अजंता की गुफाओं का निर्माण कब हुआ था?",
    suggest2: "यह स्थान महत्वपूर्ण क्यों है?",
    suggest3: "मुझे मेरी भाषा में एक कहानी सुनाओ।",
    greeting: "नमस्ते! मैं आपका विरासत गाइड हूँ। मैं सत्यापित ज्ञानकोष का उपयोग करके विरासत स्थलों के बारे में आपके सवालों के जवाब दे सकता हूँ। आप क्या जानना चाहेंगे?",
    learning: "मैं अभी भी इसके बारे में सीख रहा हूँ, लेकिन रिकॉर्ड के अनुसार, ये विरासत स्थल अपने शानदार इतिहास और वास्तुकला के लिए जाने जाते हैं।",
    verified: "सत्यापित विरासत रिकॉर्ड",
    unverified: "सत्यापन आवश्यक है"
  }
};

const mr = {
  nav: {
    home: "मुखपृष्ठ",
    explore: "अन्वेषण",
    map: "नकाशा",
    histolence: "हिस्टो-लेन्स",
    photoChallenge: "फोटो आव्हान",
    community: "समुदाय",
    login: "लॉगिन / नोंदणी",
    profile: "प्रोफाइल / ॲडमिन"
  },
  common: {
    loading: "लोड होत आहे...",
    error: "एक त्रुटी आली",
    save: "जतन करा",
    cancel: "रद्द करा",
    unknownHeritage: "अज्ञात / ६ वारसा स्थळांपैकी एक नाही",
    unknownHeritageDesc: "आमचे एआय मॉडेल सध्या केवळ अजिंठा लेणी, वेरुळ लेणी, रायगड किल्ला, शनिवार वाडा, हंपी आणि कोणार्क सूर्य मंदिर यांच्यावर प्रशिक्षित आहे. कृपया दुसरा फोटो वापरून पहा.",
    scanAnother: "दुसरी प्रतिमा स्कॅन करा",
    openCamera: "कॅमेरा उघडा",
    uploadImage: "वारसा प्रतिमा अपलोड करा",
    warmingUp: "एआय मॉडेल तयार होत आहे...",
    confidence: "विश्वास पातळी",
    viewHeritage: "वारसा तपशील पहा",
    pastVsPresent: "भूतकाळ विरुद्ध वर्तमानकाळ",
    past: "भूतकाळ",
    present: "वर्तमानकाळ",
    explore3d: "३डी एक्सप्लोर करा",
    thenVsNow: "तेव्हा आणि आता",
    viewOnMap: "नकाशावर पहा",
    timeTravelTimeline: "टाइम ट्रॅव्हल टाइमलाइन",
    histoScanResult: "हिस्टोस्कॅन निकाल",
    year: "वर्ष"
  },
  chatbot: {
    title: "वारसा मार्गदर्शक",
    subtitle: "इतिहासाला विचारा. त्याची कथा ऐका.",
    askPrompt: "इतिहासाला एक प्रश्न विचारा...",
    suggest1: "अजिंठा लेणी कधी बांधली गेली?",
    suggest2: "हे ठिकाण महत्त्वाचे का आहे?",
    suggest3: "मला माझ्या भाषेत एक गोष्ट सांगा.",
    greeting: "नमस्कार! मी तुमचा वारसा मार्गदर्शक आहे. मी सत्यापित ज्ञानकोशाचा वापर करून वारसा स्थळांबद्दलच्या तुमच्या प्रश्नांची उत्तरे देऊ शकतो. तुम्हाला काय जाणून घ्यायचे आहे?",
    learning: "मी अजूनही याबद्दल शिकत आहे, पण नोंदींनुसार, ही वारसा स्थळे त्यांच्या शानदार इतिहास आणि वास्तुकलेसाठी ओळखली जातात.",
    verified: "सत्यापित वारसा नोंद",
    unverified: "सत्यापन आवश्यक आहे"
  }
};

const placeholders = ["ta", "te", "bn", "gu", "kn", "ml", "or"];
const placeholderText = {
  nav: {
    home: "Home",
    explore: "Explore",
    map: "Map",
    histolence: "HistoLence",
    photoChallenge: "Photo Challenge",
    community: "Community",
    login: "Login",
    profile: "Profile"
  },
  common: {
    loading: "Loading...",
    error: "Error",
    save: "Save",
    cancel: "Cancel",
    unknownHeritage: "Unknown Heritage Place",
    unknownHeritageDesc: "Please try another photo of the 6 main heritage sites.",
    scanAnother: "Scan Another Image",
    openCamera: "Open Camera",
    uploadImage: "Upload Heritage Image",
    warmingUp: "Warming up AI Model...",
    confidence: "Confidence",
    viewHeritage: "View Heritage",
    pastVsPresent: "Past vs Present",
    past: "Past",
    present: "Present",
    explore3d: "Explore 3D",
    thenVsNow: "Then vs Now",
    viewOnMap: "View on Map",
    timeTravelTimeline: "Time Travel Timeline",
    histoScanResult: "HistoScan Result",
    year: "Year"
  },
  chatbot: {
    title: "Heritage Guide",
    subtitle: "Ask history. Hear its story.",
    askPrompt: "Ask history a question...",
    suggest1: "When were the Ajanta Caves created?",
    suggest2: "Why is this place important?",
    suggest3: "Tell me a story in my language.",
    greeting: "Namaste! I am your Heritage Guide.",
    learning: "I am still learning about this.",
    verified: "Verified",
    unverified: "Unverified"
  }
};

fs.writeFileSync(path.join(localesDir, 'en.json'), JSON.stringify(en, null, 2));
fs.writeFileSync(path.join(localesDir, 'hi.json'), JSON.stringify(hi, null, 2));
fs.writeFileSync(path.join(localesDir, 'mr.json'), JSON.stringify(mr, null, 2));

for (const lang of placeholders) {
  fs.writeFileSync(path.join(localesDir, `${lang}.json`), JSON.stringify(placeholderText, null, 2));
}

console.log('Locales generated.');
