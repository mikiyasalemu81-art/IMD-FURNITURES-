import { BusinessSettings, CategoryItem, FurnitureItem } from '@/lib/types';

/**
 * IMD FURNITURE & DESIGN — MASTER STATIC CONTENT
 * Single source of truth for the entire website.
 */

export const siteSettings: BusinessSettings = {
  brandName: 'IMD Furniture & Design',

  tagline: {
    en: 'Bespoke Architectural Furniture & Joinery',
    am: 'ጥራት ያለው የቤትና የቢሮ ዕቃዎች ማምረቻ',
    om: 'Meeqaalee Manatti Qulqullina Olaanaadhaan Hojjataman',
  },

  // 1 elegant sentence for the hero section
  heroSentence: {
    en: 'Crafting timeless, bespoke living spaces in Addis Ababa through heirloom-grade timber, refined textiles, and master carpentry.',
    am: 'በአዲስ አበባ ሴንቸሪ ሞል፤ ለየት ያሉ የቅንጦት ሶፋዎች፣ የመመገቢያ ጠረጴዛዎች፣ የአልጋ ስብስቦች እና ልዩ የትዕዛዝ ሥራዎች በእጅ ጥበብ እንሰራለን።',
    om: 'Finfinnee Siincharii Mool keessatti soofaa qaalii, minjaala nyaataa, sireewwan fi hojiiwwan addaa harka ogeeyyiitiin qopheessina.',
  },

  // 5 real hero slideshow images
  heroImages: [
    '/hero/hero-1.jpg',
    '/hero/hero-2.jpg',
    '/hero/hero-3.jpg',
    '/hero/hero-4.jpg',
    '/hero/hero-5.jpg',
  ],

  // Real IMD Century Mall showroom photo in Story section
  storyImage: '/story/story-showroom.jpg',

  // Our Story: 3-paragraph craftsmen narrative in Addis Ababa
  storyParagraphs: {
    en: [
      'Born in the heart of Addis Ababa, IMD Furniture & Design was founded on an enduring conviction: that exceptional furniture must honor both architectural rigor and raw tactile soul. Our master workshop unites multi-generational Ethiopian carpentry traditions with international precision joinery, refusing mass-produced shortcuts at every cut, joint, and stitch.',
      'From our flagship showroom at Century Mall to private residences, diplomatic residences, and luxury developments across the capital, every piece begins with hand-selected seasoned timber—from local Wanza and Tid to sustainably sourced architectural hardwoods. We meticulously sculpt every curve, mortise, and tenon to withstand generations of daily life while accumulating an irreplaceable patina.',
      'Commissioning a piece with IMD is an intimate creative dialogue. We collaborate closely with homeowners, architects, and interior designers, tailoring dimensions, wood grains, tactile leathers, and woven fabrics until each bespoke creation feels as inevitable and enduring as the space it was envisioned for.',
    ],
    am: [
      'በአዲስ አበባ እምብርት ውስጥ የተመሰረተው አይኤምዲ ፈርኒቸር እና ዲዛይን (IMD Furniture & Design)፤ እውነተኛ የቤት እቃ የስነ-ህንፃ ጥበብንና የተፈጥሮ ውበትን አንድ ላይ ማካተት አለበት በሚል ጽኑ እምነት ተነሳ። የእኛ ወርክሾፕ የኢትዮጵያን የበርካታ ትውልዶች የእንጨት ጠለቅ ያለ ጥበብን ከዘመናዊው ትክክለኛ የዕቃ አሰራር ጋር በማዋሃድ፣ በእያንዳንዱ መገጣጠሚያ እና ስፌት ላይ ጥራትን ብቻ ያስቀድማል።',
      'በሴንቸሪ ሞል ከሚገኘው ዋናው የኤግዚቢሽን ሾውሩማችን ጀምሮ በከተማዋ ውስጥ ላሉ የቅንጦት መኖሪያ ቤቶች፣ ኤምባሲዎችና ልዩ ፕሮጀክቶች የሚዘጋጁት ዕቃዎች በሙሉ የሚጀምሩት በጥንቃቄ በተመረጡ የሀገር በቀል ዋንዛ፣ ጥድ እና ጥራት ያላቸው እንጨቶች ነው። እያንዳንዱን ዝርዝር በባለሙያ እጆች በመቅረጽ ለትውልድ የሚሻገር ጥንካሬና ግርማ ሞገስ እንሰጠዋለን።',
      'ከአይኤምዲ ጋር የቤት ዕቃ ማሰራት ልዩ የጋራ የፈጠራ ጉዞ ነው። ከደንበኞቻችን፣ ከውስጥ ዲዛይነሮችና አርክቴክቶች ጋር በቅርበት በመመካከር መጠኑን፣ የእንጨቱን ውበት፣ የቆዳውንና የጨርቁን ምርጫ አስተካክለን ቤታችሁ ውስጥ ለዘመናት በኩራት የሚኖር ድንቅ ስራ እንፈጥራለን።',
    ],
    om: [
      'Giddugala Finfinneetti kan hundeeffame IMD Faarnichar & Diizaayinii (IMD Furniture & Design), meeshaan manaa qulqullina olaanaa qabu tokko bareedina uumamaa fi ogummaa diizaayinii walitti fiduu qaba amantii jedhurraa ka’e. Warshaan keenya aadaa hojii muka Itoophiyaa isa dhalootarraa dhalootatti darbe ogummaa ammayyaa wajjin walitti fiduudhaan hojiiwwan qulqullina hin sharafamne qaban uuma.',
      'Shoo-ruumii keenya Siincharii Mool keessatti argamurraa kaasee hanga manneen qaalii, embaasiiwwanii fi piroojektota gurguddoo Finfinnee keessatti argamaniif, meeshaan kamiyyuu mukeen akka Waanzaa, Xid fi mukeen jajjaboo qulqullina qaban irraa eegala. Dhalootaaf akka turutti harka ogeessaatiin boca itti godhamee qulqullinaan hojjatama.',
      'IMD wajjin meeshaa manaa qopheessuun marii ogummaa fi dandeettii addaati. Abbootii qabeenyaa, diizaayinarootaa fi arkiiteektota waliin hojjechuudhaan bal’ina, bifa mukaa, filannoo gogaa fi uffataa mijeessinee mana keessan faaya addaatiin miidhagsina.',
    ],
  },

  // Contact numbers
  phoneCall: '+251 98 479 5010',
  whatsapp: '+251 93 032 9010',
  email: 'info@imdfurniture.com',

  // Primary physical address
  address: {
    en: 'Century Mall, Gurd Shola / Megenagna Corridor, Addis Ababa, Ethiopia',
    am: 'ሴንቸሪ ሞል፣ ጉርድ ሾላ / መገናኛ መስመር፣ አዲስ አበባ፣ ኢትዮጵያ',
    om: 'Siincharii Mool, Gurd Shola / Sarara Megenagna, Finfinnee, Itoophiyaa',
  },

  // Operating hours (used for live calculation in Africa/Addis_Ababa timezone UTC+3)
  hours: {
    regularOpen: '08:30',
    regularClose: '20:00',
    sundayOpen: '10:00',
    sundayClose: '18:00',
    displayText: {
      en: 'Mon – Sat: 8:30 AM – 8:00 PM | Sun: 10:00 AM – 6:00 PM',
      am: 'ከሰኞ – ቅዳሜ፡ 8:30 ጥዋት – 8:00 ማታ | እሑድ፡ 10:00 ጥዋት – 6:00 ከሰዓት',
      om: 'Wiixata – Sanbata: 8:30 WD – 8:00 WB | Dilbata: 10:00 WD – 6:00 WB',
    },
  },

  // Verified Google review badge
  googleRating: {
    score: 5.0,
    reviewCount: 23,
  },

  // Social media profiles
  social: {
    instagram: 'https://instagram.com/imdfurnitures',
    facebook: 'https://facebook.com/imdfurnitures',
  },

  // Google Maps links for Century Mall and facilities
  locations: [
    {
      id: 'loc-1',
      name: {
        en: 'Century Mall Primary Showroom',
        am: 'ሴንቸሪ ሞል ዋና ሾውሩም',
        om: 'Siincharii Mool Shoo-ruumii Guddaa',
      },
      description: {
        en: 'Flagship luxury showroom, private consultations & finishes gallery',
        am: 'ዋናው የቅንጦት ማሳያ፣ የግል ምክክር እና የማጠናቀቂያ ናሙናዎች',
        om: 'Shoo-ruumii qaalii guddaa, marii dhuunfaa fi agarsiisa mukaa',
      },
      mapUrl: 'https://maps.app.goo.gl/Snmz6tYAYYVoJNwh6',
      isPrimary: true,
    },
    {
      id: 'loc-2',
      name: {
        en: 'Living & Dining Display Annex',
        am: 'የሳሎንና መመገቢያ ተጨማሪ ማሳያ',
        om: 'Agarsiisa Dabalataa Saaloonaa fi Nyaataa',
      },
      description: {
        en: 'Curated living ensembles, sectional lounge mockups & bespoke credenzas',
        am: 'የሳሎን ሶፋዎች እና የተመረጡ የቤት እቃዎች ናሙና',
        om: 'Soofaa fi meeshaalee saaloonaa filataman',
      },
      mapUrl: 'https://maps.app.goo.gl/uVkjB7ueeFjy7xaL6',
    },
    {
      id: 'loc-3',
      name: {
        en: 'Design Studio & Material Library',
        am: 'የዲዛይን ስቱዲዮ እና የጨርቅ ናሙና ክፍል',
        om: 'Istuudiyoo Diizaayinii & Kuusaa Meeshaalee',
      },
      description: {
        en: 'Architectural consultation, 3D proportions & imported textile archives',
        am: 'የስነ-ህንፃ ምክክር፣ የ3D ዲዛይን እና የጨርቅ ናሙናዎች',
        om: 'Marii arkiiteektii, diizaayinii 3D fi uffatawwan filataman',
      },
      mapUrl: 'https://maps.app.goo.gl/izaZBdzeY2rURHaF7',
    },
    {
      id: 'loc-4',
      name: {
        en: 'Master Joinery & Carpentry Workshop',
        am: 'ዋናው የእንጨትና አናፂነት ወርክሾፕ',
        om: 'Warshaa Guddaa Muka fi Ogeessa Harka',
      },
      description: {
        en: 'Seasoning kiln, hardwood cutting, precision mortise-and-tenon construction',
        am: 'የእንጨት ማድረቂያ፣ መገጣጠሚያና የቅርጽ ስራዎች ማዕከል',
        om: 'Muka gogsuu, ciruu fi walitti hidhuu qulqullinaa',
      },
      mapUrl: 'https://maps.app.goo.gl/zCRdoMokoVqrCKE76',
    },
    {
      id: 'loc-5',
      name: {
        en: 'Finishing & Bespoke Upholstery Atelier',
        am: 'የማጠናቀቂያ፣ ቀለምና የጨርቅ ስፌት አውደ-ጥናት',
        om: 'Iddoo Xumuraa, Cuubaa fi Hodhaa Uffataa',
      },
      description: {
        en: 'Hand-rubbed natural oil lacquers, tufting, leather stitching & inspection',
        am: 'የእንጨት ዘይት መቀቢያ፣ የቆዳ ስፌትና የጥራት ፍተሻ',
        om: 'Zayita uumamaa dibuu, gogaa hodhuu fi qorannoo qulqullinaa',
      },
      mapUrl: 'https://maps.app.goo.gl/vz4mSvq3QANNpZtK9',
    },
    {
      id: 'loc-6',
      name: {
        en: 'White-Glove Dispatch & Logistics Center',
        am: 'የማድረስና የጥራት ርክክብ ማዕከል',
        om: 'Giddugala Dhiyeessuu & Geejjibaa',
      },
      description: {
        en: 'Protected transport fleet, installation crew staging & warranty records',
        am: 'ደህንነቱ የተጠበቀ የትራንስፖርትና የርክክብ ማዕከል',
        om: 'Geejjiba eegumsa qabu fi garee manatti dhaaban',
      },
      mapUrl: 'https://share.google/xaJbEsIdKKagKzQAo',
    },
  ],

  // 4-stage craft process timeline
  craftSteps: [
    {
      step: 1,
      key: 'consult',
      title: {
        en: '1. Consult & Envision',
        am: '1. ምክክርና እቅድ',
        om: '1. Marii & Karoora',
      },
      description: {
        en: 'We assess spatial architecture, natural lighting, daily rituals, and desired timber/fabric palette.',
        am: 'የቦታዎን ስፋት፣ የብርሃን ሁኔታ፣ የእለት ተእለት አጠቃቀምዎን እና ተመራጭ የእንጨትና የጨርቅ ምርጫዎችን በጥልቀት እንገመግማለን።',
        om: 'Bal’ina iddoo, ifa uumamaa, akkaataa itti fayyadamaa fi filannoo muka/uffata keessanii xiinxalla.',
      },
      iconName: 'MessageSquare',
    },
    {
      step: 2,
      key: 'design',
      title: {
        en: '2. Architectural Proportions',
        am: '2. ልኬትና ዲዛይን',
        om: '2. Safartuu & Diizaayinii',
      },
      description: {
        en: 'Drafting millimeter-precise ergonomics, structural grain flow, and custom brass/timber hardware.',
        am: 'ትክክለኛ ልኬቶችን፣ የእንጨት ቅርጾችን እና ልዩ የነሐስ ወይም የእንጨት እጀታዎችን እናዘጋጃለን።',
        om: 'Safartuu sirrii, yaa’a muka fi qabannoo nahaasa/muka addaa qopheessina.',
      },
      iconName: 'Compass',
    },
    {
      step: 3,
      key: 'build',
      title: {
        en: '3. Master Carpentry & Joinery',
        am: '3. ግንባታና አናፂነት',
        om: '3. Ijaarsa & Ogummaa Harka',
      },
      description: {
        en: 'Hand-chiseled mortise and tenons, organic low-VOC plant-based finishes, and multi-density cushioning.',
        am: 'በእጅ የተሰሩ ጠንካራ መገጣጠሚያዎች፣ ተፈጥሯዊ ዘይቶች እና ረጅም ጊዜ የሚቆዩ ምቹ ስፖንጆች እንጠቀማለን።',
        om: 'Hidhaa muka jabaa, zayita uumamaa fi ispoonjii mijataa yeroo dheeraa turu fayyadamna.',
      },
      iconName: 'Hammer',
    },
    {
      step: 4,
      key: 'deliver',
      title: {
        en: '4. White-Glove Installation',
        am: '4. ጥንቃቄ የተሞላበት ርክክብ',
        om: '4. Dhiyeessuu & Dhaabuu',
      },
      description: {
        en: 'Personal delivery to your home in Addis Ababa, white-glove placement, and lifetime care instruction.',
        am: 'በአዲስ አበባ ውስጥ እስከ ቤትዎ ድረስ በታላቅ ጥንቃቄ እናደርሳለን፣ ቦታው ላይ አስቀምጠን እንገጣጥማለን።',
        om: 'Finfinnee keessatti hanga mana keessaniitti of eeggannoodhaan geessinee, bakka isaatti sirreessina.',
      },
      iconName: 'Truck',
    },
  ],
};

// 4 Active Categories: Sofas, Living Sets, Bed Sets, Dining
export const categories: CategoryItem[] = [
  {
    id: 'cat-sofas',
    slug: 'sofas',
    name: {
      en: 'Sofas',
      am: 'ሶፋዎች',
      om: 'Soofaa',
    },
    order: 1,
  },
  {
    id: 'cat-living',
    slug: 'living',
    name: {
      en: 'Living Sets',
      am: 'የሳሎን ስብስቦች',
      om: 'Sanyii Saaloonaa',
    },
    order: 2,
  },
  {
    id: 'cat-beds',
    slug: 'beds',
    name: {
      en: 'Bed Sets',
      am: 'የመኝታ አልጋዎች',
      om: 'Sanyii Siree',
    },
    order: 3,
  },
  {
    id: 'cat-dining',
    slug: 'dining',
    name: {
      en: 'Dining',
      am: 'የመመገቢያ ዕቃዎች',
      om: 'Nyaataa',
    },
    order: 4,
  },
];

// Showcase items built from real photos in /public/gallery
// Exactly 6 featured: sofa-brown-velvet, bed-black-gold, living-grey-leather, dining-white-table, sofa-gold-damask, bed-wood-carved
export const furnitureItems: FurnitureItem[] = [
  // --- SOFAS ---
  {
    id: 'sofa-cream-tufted',
    slug: 'sofa-cream-tufted',
    title: {
      en: 'Cream Tufted Three-Seater Sofa',
      am: 'ክሬም ቀለም ባለ ሦስት መቀመጫ ሶፋ',
      om: 'Soofaa Teessuma Sadii Bifa Kiriimii',
    },
    description: {
      en: 'Cream-upholstered three-seater sofa with button-tufted backrest and warm accent pillows.',
      am: 'የክሬም ጨርቅ የተሸፈነ ባለ ሦስት መቀመጫ ሶፋ ከጌጣጌጥ ትራሶች ጋር።',
      om: 'Soofaa teessuma sadii uffata kiriimiin uffifamee fi boraatii miidhaginaa qabu.',
    },
    category: 'sofas',
    featured: false,
    order: 1,
    image: '/gallery/sofas/sofa-cream-tufted.jpg',
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'sofa-brown-velvet',
    slug: 'sofa-brown-velvet',
    title: {
      en: 'Brown Textured Velvet Sofa',
      am: 'ቡናማ ቬልቬት ሶፋ',
      om: 'Soofaa Velveetii Bifa Bunaa',
    },
    description: {
      en: 'Deep brown textured velvet sofa with wide cushioned seating and tailored backrests.',
      am: 'ጥቁር ቡናማ የቬልቬት ጨርቅ የተሸፈነ ሰፊና ምቹ የሳሎን ሶፋ።',
      om: 'Soofaa velveetii qulqulluu bifa bunaa kan teessuma ballaa fi mijataa qabu.',
    },
    category: 'sofas',
    featured: true, // FEATURED 1 of 6
    order: 2,
    image: '/gallery/sofas/sofa-brown-velvet.jpg',
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'sofa-terracotta-corner',
    slug: 'sofa-terracotta-corner',
    title: {
      en: 'Terracotta Corner Sectional Sofa',
      am: 'ቴራኮታ ኮርነር ሶፋ',
      om: 'Soofaa Rogee Teraakottaa',
    },
    description: {
      en: 'Terracotta-upholstered corner sectional sofa featuring an extended chaise lounge and patterned cushions.',
      am: 'የቴራኮታ ቀለም ያለው የኮርነር ሶፋ ረጅም የእግር ማረፊያ እና የዲዛይን ትራሶች ያሉት።',
      om: 'Soofaa rogee bifa teraakottaa kan iddoo ciisichaa dheeraa fi boraatii qabu.',
    },
    category: 'sofas',
    featured: false,
    order: 3,
    image: '/gallery/sofas/sofa-terracotta-corner.jpg',
    createdAt: '2026-02-03T10:00:00Z',
  },
  {
    id: 'sofa-gold-damask',
    slug: 'sofa-gold-damask',
    title: {
      en: 'Gold Damask Rolled-Arm Sofa',
      am: 'ወርቃማ ዳማስክ ሶፋ',
      om: 'Soofaa Daamaaskii Bifa Warqee',
    },
    description: {
      en: 'Gold patterned damask sofa with elegant flared arms and matching scatter cushions.',
      am: 'ወርቃማ የዳማስክ ንድፍ ያለው ያማረ ሶፋ ከተጣጣሙ ትራሶች ጋር።',
      om: 'Soofaa diizaayinii daamaaskii bifa warqee qabu kan irree bareedaa fi boraatii wajjin.',
    },
    category: 'sofas',
    featured: true, // FEATURED 2 of 6
    order: 4,
    image: '/gallery/sofas/sofa-gold-damask.jpg',
    createdAt: '2026-02-04T10:00:00Z',
  },
  {
    id: 'sofa-yellow-pair',
    slug: 'sofa-yellow-pair',
    title: {
      en: 'Mustard Yellow Sofa & Loveseat Pair',
      am: 'ቢጫ የሶፋ እና የሎቭሲት ጥንድ',
      om: 'Soofaa fi Loovsiitii Bifa Billaachaa',
    },
    description: {
      en: 'Vibrant mustard yellow sofa and loveseat pair with metal legs and patterned accent pillows.',
      am: 'ደማቅ ቢጫ ቀለም ያላቸው ሁለት የሶፋ ስብስቦች ከብረት እግሮች እና የዲዛይን ትራሶች ጋር።',
      om: 'Soofaa fi loovsiitii bifa bilaachaa kan miila sibiilaa fi boraatii diizaayinii qabu.',
    },
    category: 'sofas',
    featured: false,
    order: 5,
    image: '/gallery/sofas/sofa-yellow-pair.jpg',
    createdAt: '2026-02-05T10:00:00Z',
  },

  // --- LIVING SETS ---
  {
    id: 'living-beige-set',
    slug: 'living-beige-set',
    title: {
      en: 'Beige Living Room Suite',
      am: 'ቤዥ የሳሎን ሶፋ ስብስብ',
      om: 'Sanyii Saaloonaa Bifa Beejii',
    },
    description: {
      en: 'Complete beige upholstered living room suite with a three-seater sofa, loveseat, and matching armchair.',
      am: 'ባለ ሦስት መቀመጫ ሶፋ፣ ሎቭሲት እና አንድ ወንበር ያካተተ ሙሉ የቤዥ ሳሎን እቃዎች ስብስብ።',
      om: 'Sanyii saaloonaa guutuu soofaa guddaa, giddu-galeessaa fi barcuma tokko kan of keessaa qabu.',
    },
    category: 'living',
    featured: false,
    order: 6,
    image: '/gallery/living/living-beige-set.jpg',
    createdAt: '2026-02-06T10:00:00Z',
  },
  {
    id: 'living-grey-leather',
    slug: 'living-grey-leather',
    title: {
      en: 'Grey Tufted Sofa with Leather Armchairs',
      am: 'ግራጫ ሶፋ ከቆዳ ወንበሮች ጋር',
      om: 'Soofaa Daalacha fi Barcuma Gogaa',
    },
    description: {
      en: 'Contemporary grey button-tufted sofa paired with two warm cognac leather armchairs.',
      am: 'ዘመናዊ ግራጫ ሶፋ ከሁለት ያማሩ ቡናማ የቆዳ ወንበሮች ጋር የተጣመረ የሳሎን ስብስብ።',
      om: 'Soofaa daalacha ammayyaa kan barcumman gogaa bifa bunaa lama wajjin qindaa’e.',
    },
    category: 'living',
    featured: true, // FEATURED 3 of 6
    order: 7,
    image: '/gallery/living/living-grey-leather.jpg',
    createdAt: '2026-02-07T10:00:00Z',
  },
  {
    id: 'living-red-armchairs',
    slug: 'living-red-armchairs',
    title: {
      en: 'Crimson Sofa with Striped Barrel Armchairs',
      am: 'ቀይ ሶፋ ከባለ መስመር ወንበሮች ጋር',
      om: 'Soofaa Diimaa fi Barcuma Sarara Qabu',
    },
    description: {
      en: 'Plush crimson sofa accompanied by two rounded barrel armchairs in striped upholstery.',
      am: 'ደማቅ ቀይ ሶፋ እና ሁለት ባለ መስመር ጨርቅ የተሸፈኑ ክብ ወንበሮች።',
      om: 'Soofaa diimaa mijataa fi barcumman geengoo uffata sararaa qaban lama.',
    },
    category: 'living',
    featured: false,
    order: 8,
    image: '/gallery/living/living-red-armchairs.jpg',
    createdAt: '2026-02-08T10:00:00Z',
  },

  // --- BED SETS ---
  {
    id: 'bed-wood-carved',
    slug: 'bed-wood-carved',
    title: {
      en: 'Carved Timber Headboard Bed Set',
      am: 'በእንጨት ቅርጽ የተሰራ የአልጋ ስብስብ',
      om: 'Siree Bocee Mukaa Qabu',
    },
    description: {
      en: 'Natural timber bed frame featuring a carved decorative headboard and matching three-drawer nightstands.',
      am: 'የተቀረጸ የእንጨት የራስጌ ሰሌዳ ያለው አልጋ እና ተዛማጅ ባለ ሦስት መሳቢያ ኮሞዲኖዎች።',
      om: 'Siree bocee muka uumamaa qabu kan konsoolii madaallii qabu wajjin qophaa’e.',
    },
    category: 'beds',
    featured: true, // FEATURED 4 of 6
    order: 9,
    image: '/gallery/beds/bed-wood-carved.jpg',
    createdAt: '2026-02-09T10:00:00Z',
  },
  {
    id: 'bed-white-leaf',
    slug: 'bed-white-leaf',
    title: {
      en: 'White Bedroom Suite with Cutout Headboard',
      am: 'ነጭ የአልጋ ስብስብ ከቅርጽ ራስጌ ጋር',
      om: 'Sanyii Siree Adii Bocee Addaa Qabu',
    },
    description: {
      en: 'Modern white bedroom suite with decorative leaf cutout headboard, matching dresser, and bedside tables.',
      am: 'ነጭ ዘመናዊ የአልጋ ስብስብ ከቅጠል ቅርጽ ራስጌ፣ ኮሞዲኖ እና መስተዋት ያለው ድሬሰር ጋር።',
      om: 'Sanyii siree adii ammayyaa kan bocee baalaa, koodii fi dreesarii qabu.',
    },
    category: 'beds',
    featured: false,
    order: 10,
    image: '/gallery/beds/bed-white-leaf.jpg',
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'bed-black-gold',
    slug: 'bed-black-gold',
    title: {
      en: 'Black & Gold Slat Headboard Bed',
      am: 'ጥቁርና ወርቃማ የአልጋ ስብስብ',
      om: 'Siree Bifa Gurraachaa fi Warqee',
    },
    description: {
      en: 'Bold black upholstered bed with gold vertical headboard panels and matching two-tone nightstands.',
      am: 'ጥቁር አልጋ ከወርቃማ የራስጌ ሰሌዳዎች እና ባለ ሁለት ቀለም ኮሞዲኖዎች ጋር።',
      om: 'Siree gurraacha kan bocee warqee sararaa fi konsoolii wajjin qindaa’e.',
    },
    category: 'beds',
    featured: true, // FEATURED 5 of 6
    order: 11,
    image: '/gallery/beds/bed-black-gold.jpg',
    createdAt: '2026-02-11T10:00:00Z',
  },

  // --- DINING ---
  {
    id: 'dining-white-table',
    slug: 'dining-white-table',
    title: {
      en: 'White Dining Table with Six Upholstered Chairs',
      am: 'ነጭ የመመገቢያ ጠረጴዛ ከስድስት ወንበሮች ጋር',
      om: 'Minjaala Nyaataa Adii Barcuma Jaha Wajjin',
    },
    description: {
      en: 'White dining table with glass-inset tabletop accompanied by six curved-back upholstered chairs.',
      am: 'የመስታወት ማስገቢያ ያለው ነጭ የመመገቢያ ጠረጴዛ ከስድስት ምቹ ወንበሮች ጋር።',
      om: 'Minjaala nyaataa adii fuula fuullee qabu barcuma jaha mijatoo wajjin.',
    },
    category: 'dining',
    featured: true, // FEATURED 6 of 6
    order: 12,
    image: '/gallery/dining/dining-white-table.jpg',
    createdAt: '2026-02-12T10:00:00Z',
  },
];
