
'use client'; // Add use client if any client-side specific code is used, or if components importing this are client components

import type { StaticImageData } from 'next/image';

// Helper function to create future dates for consistent testing
export const getFutureDate = (days: number, hours: number = 0, minutes: number = 0): Date => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};

// Define hero slides data
export const heroSlides = [
    { id: 1, image: 'https://placehold.co/1200x400.png', alt: 'اسلاید اول', title: 'با هم بخرید و تخفیف بگیرید!', description: 'هرچه تعداد بیشتر، قیمت کمتر!', link: '#', aiHint: 'group shopping people illustration' },
    { id: 2, image: 'https://placehold.co/1200x400.png', alt: 'اسلاید دوم', title: 'جشنواره کالاهای ایرانی', description: 'تخفیف‌های ویژه برای حمایت از تولید ملی', link: '#', aiHint: 'iranian products promotion sale' },
    { id: 3, image: 'https://placehold.co/1200x400.png', alt: 'اسلاید سوم', title: 'لوازم دیجیتال با بهترین قیمت', description: 'جدیدترین گوشی‌ها و لپ‌تاپ‌ها با خرید گروهی', link: '#', aiHint: 'digital gadgets sale offer' },
];

// تعریف داده‌های نمونه برای خریدهای گروهی
export interface ProductVariationOption {
  type: string;
  options: string[];
}
export interface RecentMember {
  name: string;
  avatar: string;
}
export interface PackageContent {
    name: string;
    quantity: string;
}
export interface GroupPurchaseItem {
  id: number;
  title: string;
  image: string | StaticImageData; // Allow StaticImageData for local images
  originalPrice: number;
  groupPrice: number;
  discount: number;
  members: number;
  requiredMembers: number;
  endDate: Date;
  category: string; // Keep as slug
  isFeatured?: boolean;
  isIranian?: boolean;
  aiHint?: string;
  variations?: ProductVariationOption[];
  recentMembers?: RecentMember[];
  isPackage?: boolean;
  packageContents?: PackageContent[];
  location?: string; // New field for location
}

export const groupPurchases: GroupPurchaseItem[] = [
  {
    id: 1,
    title: 'گوشی سامسونگ Galaxy S24',
    image: 'https://placehold.co/300x200.png',
    originalPrice: 45000000,
    groupPrice: 39500000,
    discount: 12,
    members: 18,
    requiredMembers: 25,
    endDate: getFutureDate(2, 6),
    category: 'digital',
    isFeatured: true,
    aiHint: 'smartphone samsung galaxy',
    location: 'تهران، منطقه ۱',
    variations: [
        { type: 'رنگ', options: ['مشکی', 'نقره‌ای', 'بنفش', 'کرم'] },
        { type: 'حافظه', options: ['256GB', '512GB'] },
    ],
    recentMembers: [
      { name: 'AR', avatar: 'https://placehold.co/40x40.png' },
      { name: 'ZM', avatar: 'https://placehold.co/40x40.png' },
      { name: 'HN', avatar: 'https://placehold.co/40x40.png' },
      { name: 'FK', avatar: 'https://placehold.co/40x40.png' },
      { name: 'MJ', avatar: 'https://placehold.co/40x40.png' },
    ],
  },
  {
    id: 2,
    title: 'روغن آفتابگردان لادن ۱ لیتری (بسته ۳ عددی)',
    image: 'https://placehold.co/300x200.png',
    originalPrice: 580000,
    groupPrice: 435000,
    discount: 25,
    members: 42,
    requiredMembers: 50,
    endDate: getFutureDate(0, 12, 30),
    category: 'food',
    isIranian: true,
    aiHint: 'sunflower oil bottle',
    location: 'شیراز، مرکز شهر',
    isPackage: true,
    packageContents: [
      { name: 'روغن آفتابگردان لادن', quantity: '۱ لیتر' },
      { name: 'روغن آفتابگردان لادن', quantity: '۱ لیتر' },
      { name: 'روغن آفتابگردان لادن', quantity: '۱ لیتر' },
    ],
    recentMembers: [
      { name: 'SA', avatar: 'https://placehold.co/40x40.png' },
      { name: 'BN', avatar: 'https://placehold.co/40x40.png' },
    ],
  },
  {
    id: 3,
    title: 'ماشین لباسشویی اسنوا ۸ کیلویی',
    image: 'https://placehold.co/300x200.png',
    originalPrice: 28500000,
    groupPrice: 24225000,
    discount: 15,
    members: 8,
    requiredMembers: 15,
    endDate: getFutureDate(3),
    category: 'home-appliances',
    isIranian: true,
    aiHint: 'washing machine snowa',
    location: 'اصفهان، شاهین شهر',
    variations: [
        { type: 'رنگ', options: ['سفید', 'نقره‌ای'] },
    ],
    recentMembers: [
      { name: 'GH', avatar: 'https://placehold.co/40x40.png' },
      { name: 'KP', avatar: 'https://placehold.co/40x40.png' },
      { name: 'LM', avatar: 'https://placehold.co/40x40.png' },
    ],
  },
  {
    id: 4,
    title: 'بسته گوشت گوسفندی تازه ۲ کیلویی',
    image: 'https://placehold.co/300x200.png',
    originalPrice: 1200000,
    groupPrice: 984000,
    discount: 18,
    members: 34,
    requiredMembers: 40,
    endDate: getFutureDate(1),
    category: 'food',
    aiHint: 'lamb meat package',
    location: 'تهران، منطقه ۵',
    isPackage: true,
    packageContents: [
      { name: 'گوشت ران گوسفندی', quantity: '۱ کیلوگرم' },
      { name: 'گوشت سردست گوسفندی', quantity: '۱ کیلوگرم' },
    ],
     recentMembers: [
      { name: 'ER', avatar: 'https://placehold.co/40x40.png' },
      { name: 'TY', avatar: 'https://placehold.co/40x40.png' },
      { name: 'UI', avatar: 'https://placehold.co/40x40.png' },
      { name: 'OP', avatar: 'https://placehold.co/40x40.png' },
    ],
  },
    {
    id: 9,
    title: 'گوشی شیائومی Poco X6 Pro',
    image: 'https://placehold.co/300x200.png',
    originalPrice: 15500000,
    groupPrice: 13800000,
    discount: 11,
    members: 7,
    requiredMembers: 20,
    endDate: getFutureDate(5),
    category: 'digital',
    aiHint: 'smartphone xiaomi poco',
    location: 'کرج، گوهردشت',
     recentMembers: [
      { name: 'CV', avatar: 'https://placehold.co/40x40.png' },
      { name: 'BN', avatar: 'https://placehold.co/40x40.png' },
    ],
  },
  {
    id: 5,
    title: 'زعفران درجه یک قائنات ۵ مثقالی',
    image: 'https://placehold.co/300x200.png',
    originalPrice: 1850000,
    groupPrice: 1480000,
    discount: 20,
    members: 28,
    requiredMembers: 35,
    endDate: getFutureDate(4),
    category: 'food',
    isIranian: true,
    isFeatured: true,
    aiHint: 'saffron spice box',
    location: 'مشهد، طرقبه',
    recentMembers: [
        { name: 'AS', avatar: 'https://placehold.co/40x40.png' },
        { name: 'DF', avatar: 'https://placehold.co/40x40.png' },
        { name: 'GH', avatar: 'https://placehold.co/40x40.png' },
    ],
  },
  {
    id: 6,
    title: 'تلویزیون ال‌جی ۵۵ اینچ ۴K',
    image: 'https://placehold.co/300x200.png',
    originalPrice: 38500000,
    groupPrice: 32725000,
    discount: 15,
    members: 12,
    requiredMembers: 20,
    endDate: getFutureDate(2),
    category: 'digital',
    aiHint: 'smart tv lg living room',
    location: 'تهران، منطقه ۲',
    recentMembers: [
        { name: 'ZX', avatar: 'https://placehold.co/40x40.png' },
        { name: 'CV', avatar: 'https://placehold.co/40x40.png' },
    ],
  },
  {
    id: 7,
    title: 'فرش دستباف کاشان ۹ متری',
    image: 'https://placehold.co/300x200.png',
    originalPrice: 18500000,
    groupPrice: 14800000,
    discount: 20,
    members: 5,
    requiredMembers: 10,
    endDate: getFutureDate(5),
    category: 'home-decor',
    isIranian: true,
    isFeatured: true,
    aiHint: 'persian carpet detail',
    location: 'کاشان',
    recentMembers: [
        { name: 'QW', avatar: 'https://placehold.co/40x40.png' },
    ],
  },
  {
    id: 8,
    title: 'گز اصفهان درجه یک (جعبه ۱ کیلویی)',
    image: 'https://placehold.co/300x200.png',
    originalPrice: 950000,
    groupPrice: 760000,
    discount: 20,
    members: 45,
    requiredMembers: 50,
    endDate: getFutureDate(0, 23, 59),
    category: 'food',
    isIranian: true,
    aiHint: 'gaz candy box',
    location: 'اصفهان، مرکز شهر',
     recentMembers: [
      { name: 'PL', avatar: 'https://placehold.co/40x40.png' },
      { name: 'OK', avatar: 'https://placehold.co/40x40.png' },
      { name: 'IJ', avatar: 'https://placehold.co/40x40.png' },
      { name: 'UH', avatar: 'https://placehold.co/40x40.png' },
    ],
  }
];

// تعریف دسته‌بندی‌های محصولات
export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
  image: string;
  aiHint: string;
}
export const categories: Category[] = [
  { id: 1, name: 'دیجیتال', icon: '📱', slug: 'digital', image: 'https://placehold.co/80x80.png', aiHint: 'mobile phone category' },
  { id: 2, name: 'مواد غذایی', icon: '🍎', slug: 'food', image: 'https://placehold.co/80x80.png', aiHint: 'grocery food category' },
  { id: 3, name: 'لوازم خانگی', icon: '🏠', slug: 'home-appliances', image: 'https://placehold.co/80x80.png', aiHint: 'home appliance category' },
  { id: 4, name: 'پوشاک', icon: '👕', slug: 'fashion', image: 'https://placehold.co/80x80.png', aiHint: 'fashion clothing category' },
  { id: 5, name: 'زیبایی و سلامت', icon: '💄', slug: 'beauty-health', image: 'https://placehold.co/80x80.png', aiHint: 'beauty health cosmetic' },
  { id: 6, name: 'خانه و دکور', icon: '🛋️', slug: 'home-decor', image: 'https://placehold.co/80x80.png', aiHint: 'home decor furniture' },
  { id: 7, name: 'ابزار و تجهیزات', icon: '🛠️', slug: 'tools', image: 'https://placehold.co/80x80.png', aiHint: 'tools hardware category' },
  { id: 8, name: 'سایر', icon: '📦', slug: 'other', image: 'https://placehold.co/80x80.png', aiHint: 'miscellaneous package box' }
];

// داده‌های نمونه برای فروشگاه‌ها و محصولاتشان
export interface Store {
  id: number;
  name: string;
  logo: string;
  aiHint: string;
  offersInstallments: boolean;
  products: GroupPurchaseItem[];
}
export const stores: Store[] = [
  {
    id: 101,
    name: "فروشگاه بزرگ شهر",
    logo: "https://placehold.co/100x100.png",
    aiHint: "city mega store logo",
    offersInstallments: true,
    products: [
      { ...groupPurchases.find(p => p.id === 2)!, id: 201, endDate: getFutureDate(1, 12), location: 'شیراز، مرکز شهر' },
      { ...groupPurchases.find(p => p.id === 4)!, id: 202, endDate: getFutureDate(2), location: 'تهران، منطقه ۵' },
      { ...groupPurchases.find(p => p.id === 8)!, id: 203, endDate: getFutureDate(4, 5), location: 'اصفهان، مرکز شهر' },
      { ...groupPurchases.find(p => p.id === 5)!, id: 204, endDate: getFutureDate(0, 10), location: 'مشهد، طرقبه' },
    ].filter(Boolean) as GroupPurchaseItem[], // Filter out undefined if find fails
  },
  {
    id: 102,
    name: "هایپر مارکت آفتاب",
    logo: "https://placehold.co/100x100.png",
    aiHint: "sun hypermarket logo",
    offersInstallments: false,
    products: [
      { ...groupPurchases.find(p => p.id === 1)!, id: 301, endDate: getFutureDate(0, 2), location: 'تهران، منطقه ۱' },
      { ...groupPurchases.find(p => p.id === 6)!, id: 302, endDate: getFutureDate(3), location: 'تهران، منطقه ۲' },
      { ...groupPurchases.find(p => p.id === 9)!, id: 303, endDate: getFutureDate(1, 1), location: 'کرج، گوهردشت' },
    ].filter(Boolean) as GroupPurchaseItem[],
  },
  {
    id: 103,
    name: "خانه و زندگی لوکس",
    logo: "https://placehold.co/100x100.png",
    aiHint: "luxury home living logo",
    offersInstallments: true,
    products: [
      { ...groupPurchases.find(p => p.id === 3)!, id: 401, endDate: getFutureDate(2, 18), location: 'اصفهان، شاهین شهر' },
      { ...groupPurchases.find(p => p.id === 7)!, id: 402, endDate: getFutureDate(1), location: 'کاشان' },
      { ...groupPurchases.find(p => p.id === 5)!, id: 403, endDate: getFutureDate(0, 5), location: 'مشهد، طرقبه' }, // Using item 5 again, ID 403
      { ...groupPurchases.find(p => p.id === 8)!, id: 404, endDate: getFutureDate(4), location: 'اصفهان، مرکز شهر' }, // Using item 8 again, ID 404
    ].filter(Boolean) as GroupPurchaseItem[],
  },
];

// داده‌های نمونه برای نظرات مشتریان
export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  comment: string;
  rating: number;
  groupBuyTitle: string;
  discountAchieved: number;
  aiHint: string;
}
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "سارا رضایی",
    avatar: "https://placehold.co/80x80.png",
    comment: "قیمت‌ها واقعا عالیه! با خرید گروهی تونستم گوشی جدیدم رو خیلی ارزون‌تر بخرم. ممنونم!",
    rating: 5,
    groupBuyTitle: 'گوشی سامسونگ Galaxy S24',
    discountAchieved: 12,
    aiHint: "happy customer female",
  },
  {
    id: 2,
    name: "علی محمدی",
    avatar: "https://placehold.co/80x80.png",
    comment: "اولین بار بود از خرید گروهی استفاده می‌کردم، تجربه خوبی بود. فقط کاش تنوع کالاها بیشتر بشه.",
    rating: 4,
    groupBuyTitle: 'روغن آفتابگردان لادن',
    discountAchieved: 25,
    aiHint: "satisfied customer male",
  },
  {
    id: 3,
    name: "مریم حسینی",
    avatar: "https://placehold.co/80x80.png",
    comment: "خیلی راحت و سریع بود. پشتیبانی هم خیلی خوب راهنمایی کردن. حتما دوباره از اینجا خرید می‌کنم.",
    rating: 5,
    groupBuyTitle: 'ماشین لباسشویی اسنوا',
    discountAchieved: 15,
    aiHint: "customer service interaction",
  },
    {
    id: 4,
    name: "رضا اکبری",
    avatar: "https://placehold.co/80x80.png",
    comment: "کیفیت محصولات ایرانی که خریدم واقعا خوب بود. خوشحالم که از تولید ملی حمایت کردم.",
    rating: 4,
    groupBuyTitle: 'زعفران درجه یک قائنات',
    discountAchieved: 20,
    aiHint: "customer holding product",
  },
];

// داده‌های نمونه برای نظرات فروشندگان
export interface SellerTestimonial {
  id: number;
  name: string;
  avatar: string;
  comment: string;
  rating: number;
  productsSold: number;
  aiHint: string;
}
export const sellerTestimonials: SellerTestimonial[] = [
  {
    id: 101,
    name: "فروشگاه لوازم خانگی ممتاز",
    avatar: "https://placehold.co/80x80.png",
    comment: "پلتفرم خریدگروهی به ما کمک کرد تا به مشتریان بیشتری دسترسی پیدا کنیم و فروش عمده‌مون رو افزایش بدیم. همکاری بسیار خوبی داشتیم.",
    rating: 5,
    productsSold: 500,
    aiHint: "store owner portrait",
  },
  {
    id: 102,
    name: "تولیدی پوشاک الوند",
    avatar: "https://placehold.co/80x80.png",
    comment: "ایده خرید گروهی برای فروش محصولات فصلی ما عالی بود. تونستیم حجم زیادی از کالا رو در زمان کوتاهی بفروشیم.",
    rating: 4,
    productsSold: 1200,
    aiHint: "factory manager",
  },
  {
    id: 103,
    name: "شرکت پخش مواد غذایی سالم",
    avatar: "https://placehold.co/80x80.png",
    comment: "فرایند ثبت محصول و مدیریت خرید گروهی بسیار ساده بود. تیم پشتیبانی هم همیشه پاسخگو بودند.",
    rating: 5,
    productsSold: 800,
    aiHint: "food distribution manager",
  },
];

// FAQ Data
export interface FaqItem {
  question: string;
  answer: string;
}
export const buyerFaqs: FaqItem[] = [
  { question: "خرید گروهی چیست؟", answer: "خرید گروهی روشی برای خرید کالا با قیمت پایین‌تر است. با جمع شدن تعداد مشخصی خریدار، تخفیف عمده‌فروشی برای همه اعمال می‌شود." },
  { question: "چگونه می‌توانم در خرید گروهی شرکت کنم؟", answer: "کالای مورد نظر خود را پیدا کرده و دکمه 'پیوستن به گروه' را بزنید. پس از رسیدن به حد نصاب، خرید نهایی می‌شود." },
  { question: "اگر گروه به حد نصاب نرسد چه می‌شود؟", answer: "در صورت عدم تکمیل ظرفیت گروه تا زمان مشخص شده، هزینه پرداخت شده (در صورت پیش‌پرداخت) به شما بازگردانده می‌شود یا می‌توانید به گروه دیگری بپیوندید." },
  { question: "زمان تحویل کالا چقدر است؟", answer: "زمان تحویل پس از نهایی شدن خرید گروهی و پرداخت وجه، معمولا بین ۳ تا ۷ روز کاری است و به نوع کالا و آدرس شما بستگی دارد." },
];

export const sellerFaqs: FaqItem[] = [
  { question: "چگونه می‌توانم محصولاتم را برای خرید گروهی عرضه کنم؟", answer: "ابتدا باید به عنوان فروشنده در سایت ثبت نام کنید. سپس می‌توانید محصولات خود را با تعیین قیمت گروهی و حداقل تعداد مورد نیاز برای فروش، ثبت کنید." },
  { question: "تسویه حساب با فروشندگان چگونه انجام می‌شود؟", answer: "پس از تکمیل موفقیت‌آمیز خرید گروهی و تحویل کالا به خریداران، وجه مربوطه پس از کسر کارمزد پلتفرم، به حساب شما واریز خواهد شد." },
  { question: "کارمزد پلتفرم چقدر است؟", answer: "کارمزد بر اساس نوع کالا و توافق اولیه تعیین می‌شود. برای اطلاع دقیق از درصد کارمزد، لطفا به بخش قوانین و مقررات فروشندگان مراجعه کنید." },
];

// تبدیل اعداد به فرمت فارسی با جداکننده هزارگان
export const formatNumber = (num:number | undefined): string => {
  if (num === undefined || num === null) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Check if the deal ends within 24 hours
export const isEndingSoon = (endDate: Date | undefined): boolean => {
    if (!endDate) return false;
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();
    const hoursRemaining = timeDiff / (1000 * 60 * 60);
    return hoursRemaining > 0 && hoursRemaining <= 24;
};

// Helper function to get category name by slug
export const getCategoryNameBySlug = (slug: string | undefined): string => {
    if (!slug) return 'دسته‌بندی نشده';
    const category = categories.find(cat => cat.slug === slug);
    return category?.name || slug;
};

// Combine all products from groupPurchases and stores for easier filtering
export const allGroupProducts: GroupPurchaseItem[] = [
    ...groupPurchases,
    ...stores.flatMap(store => store.products)
].reduce((acc, current) => { // Deduplicate by ID, preferring the first encountered
    if (!acc.find(item => item.id === current.id)) {
        acc.push(current);
    }
    return acc;
}, [] as GroupPurchaseItem[]);
