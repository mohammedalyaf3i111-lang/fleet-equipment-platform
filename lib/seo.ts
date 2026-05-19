/**
 * Central SEO utilities — JSON-LD structured data, per-page metadata, keyword maps
 * All content is Arabic-first, targeting Saudi Arabia search queries.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fleet-equipment-platform.vercel.app";

// ── Equipment slug → rich Arabic metadata ────────────────────────────────────

export const equipmentSeoMap: Record<string, {
  arabicName: string;
  title: string;
  description: string;
  keywords: string[];
}> = {
  cranes: {
    arabicName: "كرينات",
    title: "تأجير كرينات ورافعات في السعودية — فليت معدات",
    description: "استأجر كرينات ورافعات برجية وشاحنة معتمدة في الرياض وجدة والدمام. أسعار يومية وشهرية شفافة، مع مشغل معتمد وتأمين كامل. اتصل الآن.",
    keywords: ["تأجير كرينات", "تأجير رافعات", "كرين برجي", "كرين شاحنة", "رافعة شوكية", "كرينات الرياض", "كرينات جدة", "ايجار كرين", "crane rental saudi arabia", "tower crane", "mobile crane"]
  },
  excavators: {
    arabicName: "حفارات",
    title: "تأجير حفارات في السعودية — فليت معدات",
    description: "حفارات CAT وKomatsu وHyundai للإيجار في جميع مناطق المملكة. حفار مجنزر وعجل بأحجام متعددة، مع سائق أو بدون. أسعار تنافسية وعقود رقمية.",
    keywords: ["تأجير حفارات", "حفار للايجار", "ايجار حفارة", "حفار كاتربيلر", "حفار كوماتسو", "حفارات الرياض", "excavator rental", "backhoe loader", "mini excavator", "حفر أساسات"]
  },
  "wheel-loaders": {
    arabicName: "شيولات",
    title: "تأجير شيولات ولودرات في السعودية — فليت معدات",
    description: "شيولات CAT 950 و966 و980 وكوماتسو للإيجار اليومي والشهري في الرياض وجدة والمنطقة الشرقية. مع مشغل معتمد لأعمال البناء والردم والتحميل.",
    keywords: ["تأجير شيول", "شيول للايجار", "لودر للايجار", "شيول كات", "wheel loader rental", "ايجار شيول 966", "ايجار شيول 950", "شيولات الرياض", "شيول مع مشغل"]
  },
  "dump-trucks": {
    arabicName: "قلابات",
    title: "تأجير قلابات ونقل مواد في السعودية — فليت معدات",
    description: "قلابات 6 و12 و18 متر لنقل الرمال والبلاط والردميات في جميع مناطق المملكة. أسعار نقلة تنافسية، جاهزة 24 ساعة. عقود رقمية وتتبع آني.",
    keywords: ["تأجير قلابات", "قلاب للايجار", "نقل رمال", "نقل بلاط", "نقل ردميات", "dump truck rental", "قلابات الرياض", "قلاب 12 متر", "سيارة قلاب", "ايجار قلاب"]
  },
  grader: {
    arabicName: "جريدرات",
    title: "تأجير جريدرات ومعدات تسوية الأراضي — فليت معدات",
    description: "جريدرات موتور لتسوية الطرق والمواقع وأعمال الأسفلت في السعودية. مع مشغل محترف وتأمين كامل. تأجير يومي وشهري.",
    keywords: ["تأجير جريدر", "جريدر للايجار", "تسوية أراضي", "motor grader rental", "معدات طرق", "ايجار جريدر", "تسوية موقع", "أعمال طرق"]
  },
  forklifts: {
    arabicName: "رافعات شوكية",
    title: "تأجير فوركلفت ورافعات شوكية في السعودية — فليت معدات",
    description: "فوركلفتات 1.5 طن حتى 10 طن للإيجار في المستودعات والمصانع والمواقع. كهربائي وديزل. مع مشغل أو ذاتي التشغيل. خدمة صيانة فورية.",
    keywords: ["تأجير فوركلفت", "فوركلفت للايجار", "رافعة شوكية", "forklift rental", "ايجار فوركلفت", "رافعة شوكية كهربائية", "فوركلفت مستودعات", "فوركلفت 3 طن"]
  },
  "skid-steers": {
    arabicName: "بوبكات وسكد ستير",
    title: "تأجير بوبكات وسكد ستير في السعودية — فليت معدات",
    description: "بوبكات وسكد ستير للعمل في المناطق الضيقة والتشطيبات والمستودعات. خفيف وقوي، مثالي لأعمال البناء والتشطيب الداخلي.",
    keywords: ["تأجير بوبكات", "بوبكات للايجار", "skid steer rental", "ايجار بوبكات", "معدات صغيرة", "بوبكات مع مشغل", "تأجير معدات خفيفة"]
  },
  generators: {
    arabicName: "مولدات كهربائية",
    title: "تأجير مولدات كهربائية في السعودية — فليت معدات",
    description: "مولدات كهربائية من 20 KVA حتى 2000 KVA للمشاريع والمواقع والفعاليات في جميع مناطق المملكة. توصيل وتركيب وصيانة. مولدات كاتربيلر وبيركنز وكوماتسو.",
    keywords: ["تأجير مولدات", "مولد كهربائي للايجار", "ايجار مولد", "generator rental saudi", "مولد 500 كيلو", "مولد كاتربيلر", "مولدات مشاريع", "مولد طاقة", "مولد للفعاليات"]
  },
  "boom-lifts-manlifts": {
    arabicName: "بوم ليفت وسلالم جوية",
    title: "تأجير بوم ليفت وسلالم هوائية في السعودية — فليت معدات",
    description: "بوم ليفت مفصلي وتلسكوبي وسلالم جوية للوصول للمرتفعات في الصيانة والبناء والكهرباء. ارتفاع من 12 متر حتى 40 متر. مع مشغل معتمد.",
    keywords: ["تأجير بوم ليفت", "سلم هوائي للايجار", "boom lift rental", "man lift", "ايجار سلم كهربائي", "العمل في الارتفاعات", "تأجير جندولة", "مناسب للصيانة الصناعية"]
  },
  lowbeds: {
    arabicName: "لوبيدات ونقل ثقيل",
    title: "تأجير لوبيدات ونقل المعدات الثقيلة في السعودية — فليت معدات",
    description: "لوبيدات بمحاور متعددة لنقل الحفارات والكرينات والمعدات الثقيلة بين المواقع في جميع مناطق المملكة. تصاريح نقل استثنائي وتأمين شامل.",
    keywords: ["تأجير لوبيد", "نقل معدات ثقيلة", "lowbed rental", "نقل حفارات", "نقل كرينات", "ايجار لوبيد", "شاحنات نقل ثقيل", "نقل استثنائي"]
  },
  bulldozers: {
    arabicName: "بلدوزرات",
    title: "تأجير بلدوزرات في السعودية — فليت معدات",
    description: "بلدوزرات CAT وKomatsu لتسوية المواقع وأعمال الحفر والردم والطرق في المملكة العربية السعودية. مع مشغل محترف. تأجير يومي وأسبوعي وشهري.",
    keywords: ["تأجير بلدوزر", "بلدوزر للايجار", "dozer rental", "ايجار بلدوزر", "بلدوزر كاتربيلر", "تسوية مواقع", "بلدوزر مجنزر", "حفر وردم"]
  }
};

// ── Page-level SEO data ───────────────────────────────────────────────────────

export const pageSeoMap: Record<string, { title: string; description: string; keywords: string[] }> = {
  home: {
    title: "فليت معدات | منصة تأجير المعدات الثقيلة في السعودية",
    description: "فليت معدات — المنصة السعودية الرائدة لتأجير المعدات الثقيلة وإدارة الأساطيل. كرينات، حفارات، شيولات، قلابات، مولدات وأكثر من 2500 معدة معتمدة بعقود رقمية وتشغيل متكامل. الرياض، جدة، الدمام.",
    keywords: ["فليت معدات", "تأجير معدات ثقيلة", "منصة معدات سعودية", "تأجير كرينات السعودية", "ايجار حفارات", "معدات بناء للايجار", "fleet equipment", "equipment rental saudi arabia", "heavy equipment", "تأجير معدات الرياض", "تأجير معدات جدة"]
  },
  equipment: {
    title: "كتالوج المعدات الثقيلة للتأجير في السعودية — فليت معدات",
    description: "تصفح أكثر من 2500 معدة ثقيلة للتأجير في المملكة العربية السعودية. كرينات، حفارات، شيولات، قلابات، مولدات، فوركلفتات. فلاتر متقدمة وأسعار شفافة.",
    keywords: ["كتالوج معدات", "معدات ثقيلة للايجار", "تأجير معدات بناء", "heavy equipment catalog", "معدات السعودية", "ايجار معدات مقاولات", "انواع المعدات الثقيلة"]
  },
  about: {
    title: "من نحن — فليت معدات | منصة تأجير المعدات السعودية",
    description: "فليت معدات منصة سعودية رقمية تربط مُلّاك المعدات الثقيلة بالمقاولين والشركات. نوفر عقود رقمية موثقة، أسعار شفافة، ومزودين معتمدين في 50+ مدينة سعودية.",
    keywords: ["فليت معدات من نحن", "منصة تأجير معدات سعودية", "شركة معدات", "تأجير معدات موثوق"]
  },
  contact: {
    title: "تواصل معنا — فليت معدات | استفسارات تأجير المعدات",
    description: "تواصل مع فريق فليت معدات للاستفسار عن تأجير المعدات الثقيلة. خدمة عملاء 24/7 عبر واتساب، والبريد الإلكتروني، والهاتف. نخدم جميع مناطق المملكة.",
    keywords: ["تواصل فليت معدات", "خدمة عملاء معدات", "استفسار تأجير معدات", "واتساب معدات"]
  },
  "request-equipment": {
    title: "اطلب معدة — فليت معدات | تأجير معدات ثقيلة في السعودية",
    description: "أرسل طلبك الآن لتأجير أي معدة ثقيلة في السعودية. أكمل النموذج وسيتواصل معك مزودون معتمدون خلال ساعات. عقود رقمية وأسعار شفافة.",
    keywords: ["طلب تأجير معدة", "اطلب معدة", "طلب ايجار معدات", "request equipment saudi", "استئجار معدة ثقيلة"]
  },
  "become-supplier": {
    title: "سجّل كمزود معدات — فليت معدات | زِد دخلك من معداتك",
    description: "هل تملك معدات ثقيلة غير مستغلة؟ سجّل كمزود في فليت معدات وابدأ في تأجيرها بعقود رقمية وضمانات. أكثر من 500 مزود معتمد موثوق.",
    keywords: ["سجل مزود معدات", "تأجير معداتي", "ربح من المعدات", "become equipment supplier", "مزود معدات السعودية", "تسجيل مورد معدات"]
  },
  terms: {
    title: "الشروط والأحكام — فليت معدات",
    description: "الشروط والأحكام الخاصة بمنصة فليت معدات لتأجير المعدات الثقيلة في المملكة العربية السعودية.",
    keywords: ["شروط وأحكام فليت معدات", "سياسة التأجير", "اتفاقية المستخدم"]
  },
  privacy: {
    title: "سياسة الخصوصية — فليت معدات",
    description: "سياسة الخصوصية وحماية البيانات الخاصة بمنصة فليت معدات.",
    keywords: ["سياسة خصوصية فليت معدات", "حماية البيانات"]
  }
};

// ── JSON-LD generators ────────────────────────────────────────────────────────

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "فليت معدات",
    alternateName: ["Fleet Equipment", "fleet equipment platform"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 200,
      height: 200
    },
    description: "منصة سعودية رائدة لتأجير المعدات الثقيلة وإدارة الأساطيل. تربط ملاك المعدات بالمقاولين والشركات بعقود رقمية وتشغيل متكامل.",
    foundingDate: "2024",
    areaServed: [
      { "@type": "City", name: "الرياض" },
      { "@type": "City", name: "جدة" },
      { "@type": "City", name: "الدمام" },
      { "@type": "City", name: "مكة المكرمة" },
      { "@type": "City", name: "المدينة المنورة" },
      { "@type": "Country", name: "المملكة العربية السعودية", sameAs: "https://en.wikipedia.org/wiki/Saudi_Arabia" }
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressLocality: "الرياض"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
        contactOption: "TollFree"
      }
    ],
    sameAs: [
      `${SITE_URL}`
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "معدات ثقيلة للتأجير",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "تأجير كرينات" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "تأجير حفارات" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "تأجير شيولات" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "تأجير قلابات" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "تأجير مولدات كهربائية" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "تأجير فوركلفتات" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "تأجير بلدوزرات" } }
      ]
    }
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "فليت معدات",
    description: "منصة تأجير المعدات الثقيلة في السعودية",
    inLanguage: "ar-SA",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/equipment?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function buildEquipmentPageSchema(slug: string) {
  const eq = equipmentSeoMap[slug];
  if (!eq) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `تأجير ${eq.arabicName} في السعودية`,
    description: eq.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "المملكة العربية السعودية" },
    url: `${SITE_URL}/equipment/${slug}`,
    serviceType: `تأجير ${eq.arabicName}`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "SAR",
      availability: "https://schema.org/InStock"
    }
  };
}

export function buildServicePageSchema(slug: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "المملكة العربية السعودية" },
    url: `${SITE_URL}/services/${slug}`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "SAR",
      availability: "https://schema.org/InStock"
    }
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a }
    }))
  };
}
