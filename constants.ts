import { AudienceProfile, ServiceData } from './types';

export const AUDIENCE_PROFILES: AudienceProfile[] = [
  {
    title: "PERFORMANCE",
    subtitle: "У ВАС НЕТ ВИДЕО В РЕКЛАМЕ",
    // New Structure
    performanceMetric: {
      value: "↑15% KPI",
      label: "WUNDER DIGITAL BENCHMARK",
      description: "Если добавляем видео в кампании, в среднем получаем на 15% больше целевых действий за тот же бюджет"
    },
    performanceCases: [
      {
        value: "↓29% CPA",
        label: "Smartly Study",
        sourceUrl: "https://www.smartly.io/resources/faces-catalog-product-video-ads-on-meta-reveal-29-cpa-decrease"
      },
      {
        value: "↑12% Conv.",
        label: "Google Data",
        sourceUrl: "https://blog.google/products/ads-commerce/gemini-models-are-coming-to-performance-max/"
      },
      {
        value: "↑18% Orders",
        label: "Topkee Study",
        sourceUrl: "https://www.topkee.com.sg/dynamic/facebook-video-ads"
      },
      {
        value: "↑17% CR",
        label: "MGT Design",
        sourceUrl: "https://www.mgtdesign.co.uk/news/why-social-video-is-outperforming-static-ads-in-2025/"
      }
    ]
  },
  {
    title: "BRANDING",
    subtitle: "ВИДЕО У ВАС - ДОРОГО И ДОЛГО",
    introText: "Для рекламодателей с длительным, сложным и дорогим видеопродакшеном, который становится барьером для динамичного роста бренда",
    subCards: [
      {
        title: "Персонализация креатива",
        icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", // Person
        metrics: [
          { 
            value: "300% CTR", 
            sourceText: "IdeaClean - Case study",
            sourceUrl: "https://ideaclan.com/case-study-how-we-boosted-ctr-by-300-with-creative-testing/"
          }, 
          { 
            value: "200% KPI",
            sourceText: "How to Beat Ad Fatigue",
            sourceUrl: "https://www.singlegrain.com/digital-marketing-strategy/how-to-beat-ad-fatigue-with-creative-strategy/"
          }
        ],
        text: "Если крутите не один креатив на всех, а каждому сегменту аудитории показываете подходящее именно ему сообщение"
      },
      {
        title: "Обновление креатива",
        icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", // Refresh / Cycle
        metrics: [
          { 
            value: "x2",
            sourceText: "How to Beat Ad Fatigue",
            sourceUrl: "https://www.singlegrain.com/digital-marketing-strategy/how-to-beat-ad-fatigue-with-creative-strategy/"
          }
        ],
        text: "Снижается внимание к рекламе после 4-го показа креатива"
      }
    ]
  }
];

export const SERVICES: ServiceData[] = [
  {
    id: "quick-ai-motion",
    title: "QUICK   AI   MOTION",
    subtitle: "АНИМАЦИЯ СТАТИЧНЫХ ИЗОБРАЖЕНИЙ",
    colorTheme: "amber",
    descriptionPoints: [
      "Оживляем персонажей на баннере",
      "Создаем музыкальную и голосовую дорожки",
      "Получаем полноценное видео с одной сценой до 10 секунд"
    ],
    pricingType: "qam-matrix",
    subPackages: [
      {
        name: "QAM Ready",
        subtitle: "Берем статику →\nделаем видео",
        description: "",
        iconPath: "M13 10V3L4 14h7v7l9-11h-7z", // Lightning
        accentColor: "amber",
        features: [], // Not used in new UI
        included: [
          "Разработка анимации в рамках 1 сцены",
          "Создание аудио: музыка и голос",
          "Разработка 3 ресайзов (1:1, 16:9, 9:16)"
        ],
        notIncluded: [
           "Анимация с 2+ сценами",
           "Разработка/внесение правок в статику",
           "Адаптация ролика под доп. вводные"
        ],
        pricing: {
          "1": { unitPrice: 150, packagePrice: 150, customerBenefit: 0 },
          "5": { unitPrice: 135, packagePrice: 674, customerBenefit: 76 },
          "10": { unitPrice: 121, packagePrice: 1209, customerBenefit: 291 },
          "20": { unitPrice: 109, packagePrice: 2171, customerBenefit: 829 }
        }
      },
      {
        name: "QAM Dual", // Was Global
        subtitle: "Когда нужна локализация рекламного креатива",
        description: "",
        iconPath: "M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802", // Language/Translate icon
        accentColor: "sky",
        features: [],
        included: [
            "Разработка анимации в рамках 1 сцены",
            "Создание аудио: музыка и голос на 2 языках",
            "Разработка 3 ресайзов (1:1, 16:9, 9:16)",
            "Адаптация статики и ролика для 2 языков"
        ],
        notIncluded: [],
        pricing: {
          "1": { unitPrice: 209, packagePrice: 209, customerBenefit: 0 },
          "5": { unitPrice: 181, packagePrice: 907, customerBenefit: 138 },
          "10": { unitPrice: 159, packagePrice: 1589, customerBenefit: 501 },
          "20": { unitPrice: 143, packagePrice: 2863, customerBenefit: 1317 }
        }
      },
      {
        name: "QAM Remix",
        subtitle: "Когда перед анимацией нужно поправить исходник",
        description: "",
        iconPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", // Edit
        accentColor: "fuchsia",
        features: [],
        included: [
            "Внесение правок в статику (коррекция, без переработки)",
            "Разработка анимации в рамках 1 сцены",
            "Создание аудио: музыка и голос",
            "Разработка 3 ресайзов (1:1, 16:9, 9:16)"
        ],
        notIncluded: [],
        pricing: {
          "1": { unitPrice: 237, packagePrice: 237, customerBenefit: 0 },
          "5": { unitPrice: 214, packagePrice: 1070, customerBenefit: 115 },
          "10": { unitPrice: 193, packagePrice: 1931, customerBenefit: 439 },
          "20": { unitPrice: 174, packagePrice: 3489, customerBenefit: 1251 }
        }
      },
      {
        name: "QAM Build",
        subtitle: "Когда нужна разработка визуала с нуля",
        description: "",
        iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", // Briefcase/Build
        accentColor: "rose",
        features: [],
        included: [
            "SECTION:Статика",
            "Разработка до 3-х визуальных концепций",
            "Отрисовка мастер-баннера по 1 выбранной концепции",
            "Создание пакета ресайзов под используемые площадки, до 10шт.",
            "Копирайт - до 5 вариантов с разным текстом",
            "SECTION:Ролик",
            "Разработка анимации в рамках 1 сцены",
            "Создание аудио: музыка и голос",
            "Разработка 3 ресайзов (1:1, 16:9, 9:16)"
        ],
        notIncluded: [],
        pricing: {
          "1": { unitPrice: 485, packagePrice: 485, customerBenefit: 0 },
          "5": { unitPrice: 454, packagePrice: 2272, customerBenefit: 153 },
          "10": { unitPrice: 434, packagePrice: 4337, customerBenefit: 513 },
          "20": { unitPrice: 415, packagePrice: 8300, customerBenefit: 1400 }
        }
      }
    ],
    portfolio: [
        {
            title: "Case 01",
            description: "Анимация баннера",
            beforeImage: "/quick_ai_motion/case_01_before_horizontal.png",
            afterImage: "/quick_ai_motion/case_01_after_horizontal.mp4",
            isVideo: true
        },
        {
            title: "Case 02",
            description: "Анимация баннера",
            beforeImage: "/quick_ai_motion/case_02_before_vertical.jpg",
            afterImage: "/quick_ai_motion/case_02_after_vertical.mp4",
            isVideo: true,
            isVertical: true
        },
        {
            title: "Case 03",
            description: "Анимация баннера",
            beforeImage: "/quick_ai_motion/case_03_before_vertical.png",
            afterImage: "/quick_ai_motion/case_03_after_vertical.mp4",
            isVideo: true,
            isVertical: true,
            aspectRatio: 1080 / 1350
        },
        {
            title: "Case 05",
            description: "Анимация баннера",
            beforeImage: "/quick_ai_motion/case_05_before_horizontal.jpg",
            afterImage: "/quick_ai_motion/case_05_after_horizontal.mp4",
            isVideo: true
        },
        {
            title: "Case 06",
            description: "Анимация баннера",
            beforeImage: "/quick_ai_motion/case_06_before_horizontal.png",
            afterImage: "/quick_ai_motion/case_06_after_horizontal.mp4",
            isVideo: true
        },
        {
            title: "Case 07",
            description: "Анимация баннера",
            beforeImage: "/quick_ai_motion/case_07_before_vertical.jpg",
            afterImage: "/quick_ai_motion/case_07_after_vertical.mp4",
            isVideo: true,
            isVertical: true
        }
    ]
  },
  {
    id: "script-to-screen",
    title: "SCRIPT   TO   SCREEN",
    subtitle: "РАЗРАБОТКА РОЛИКОВ ПО СЦЕНАРИЮ",
    colorTheme: "amber",
    descriptionPoints: [
      "Разработка рекламных роликов по сценарию",
      "Полный набор работ, чтобы выполнить коммуникационную задачу"
    ],
    pricingType: "sts-matrix",
    stsPackages: [
      {
        name: "Пакет S",
        description: "Когда есть сценарий и кадры для анимации",
        accentColor: "amber",
        iconPath: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Play circle
        included: [
          "Разработка анимации",
          "Создание аудио: музыка и голос",
          "Разработка 3 ресайзов (1:1, 16:9, 9:16)"
        ],
        notIncluded: [
            "Разработка раскадровки",
            "Разработка сценария"
        ],
        prices: {
          "10s": 219,
          "15s": 308,
          "20s": 422,
          "30s": 627
        }
      },
      {
        name: "Пакет M",
        description: "Когда есть сценарий, но нет кадров для анимации",
        accentColor: "sky",
        iconPath: "M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 0 0 0-1.41z", // Brush icon
        included: [
          "Разработка раскадровки (статика для анимации)",
          "Разработка анимации",
          "Создание аудио: музыка и голос",
          "Разработка 3 ресайзов (1:1, 16:9, 9:16)"
        ],
        notIncluded: [
             "Разработка сценария"
        ],
        prices: {
          "10s": 267,
          "15s": 399,
          "20s": 597,
          "30s": 798
        }
      },
      {
        name: "Пакет L",
        description: "Когда есть только коммуникационная задача/идея",
        accentColor: "rose",
        iconPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", // Edit/Write
        included: [
          "Сценарий: сбор материала, разработка до 3 концепций, разработка ТЗ на 1 выбранную концепцию",
          "Разработка раскадровки (статика/кадры)",
          "Разработка анимации",
          "Создание аудио: музыка и голос",
          "Разработка 3 ресайзов (1:1, 16:9, 9:16)"
        ],
        notIncluded: [],
        prices: {
          "10s": null, // Not available
          "15s": 542,
          "20s": 697,
          "30s": 974
        }
      }
    ],
    portfolio: [
        {
            title: "Case 01",
            description: "Создание видео с нуля",
            afterImage: "/script_to_screen/case_1_horizontal.mp4",
            isVideo: true
        },
        {
            title: "Case 02",
            description: "Сценарий и реализация",
            afterImage: "/script_to_screen/case_2_vertical.mp4",
            isVideo: true,
            isVertical: true
        },
        {
            title: "Case 03",
            description: "Рекламный ролик",
            afterImage: "/script_to_screen/case_3_vertical.mp4",
            isVideo: true,
            isVertical: true
        },
        {
            title: "Case 05",
            description: "Промо видео",
            afterImage: "/script_to_screen/case_5_horizontal.mp4",
            isVideo: true
        }
    ]
  },
  {
    id: "voice-boost",
    title: "VOICE   BOOST",
    subtitle: "ОЗВУЧКА ГОТОВЫХ ВИДЕО",
    colorTheme: "amber", // Changed from emerald
    descriptionPoints: [
      "Из «немых» слайд-шоу делаем вовлекающие ролики",
      "Включено:",
      "SUB:Создание аудио: музыка и голос",
      "SUB:Монтаж аудио в видео",
      "SUB:Ресайзы (1:1, 16:9, 9:16)"
    ],
    pricingType: "voice-volume",
    volumePricing: {
      "1": { quantity: "1", unitPrice: 57, packagePrice: 57, customerBenefit: 0 },
      "5": { quantity: "5", unitPrice: 54, packagePrice: 272, customerBenefit: 13 },
      "10": { quantity: "10", unitPrice: 49, packagePrice: 488, customerBenefit: 82 },
      "20": { quantity: "20", unitPrice: 39, packagePrice: 780, customerBenefit: 360 }
    },
    // No specific portfolio requested for VB in prompt, but we can reuse or leave empty
    portfolio: []
  }
];

export const CONTACT_INFO = {
  telegram: "@st_molchan",
  ctaText: "Написать нам"
};
