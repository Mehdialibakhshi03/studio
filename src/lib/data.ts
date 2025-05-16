
'use client'; // Add use client if any client-side specific code is used, or if components importing this are client components

import type { StaticImageData } from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { Building, Newspaper, Percent, Phone, ListChecks, PlusCircle, Flame, HelpCircle, Store as StoreIcon, ShoppingBag, Home, Shirt, Utensils, Laptop, Users, Search, Target, Eye, CreditCard, TrendingUp, Rocket, Link as LinkIcon, Users2, CheckCircle, ShoppingBasket } from 'lucide-react'; // Added for header links

// Helper function to create future dates for consistent testing
export const getFutureDate = (days: number, hours: number = 0, minutes: number = 0): Date => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};

interface CtaButton {
  text: string;
  link: string;
  variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive' | 'accent';
  icon?: LucideIcon; // Optional icon from lucide-react
}

// Define hero slides data
export interface HeroSlide {
  id: number;
  image: string | StaticImageData;
  alt: string;
  title: string;
  description: string;
  link?: string; // For slides with a single, generic CTA
  ctas?: CtaButton[]; // For slides with specific multiple CTAs
  aiHint?: string;
}

export const heroSlides: HeroSlide[] = [
    {
      id: 1,
      image: 'https://placehold.co/1200x500.png',
      alt: 'خرید گروهی هوشمندانه',
      title: 'قیمت‌ها بالا می‌رن، ما با هم پایین میاریم‌شون.',
      description: 'بیا گروهی بخریم',
      aiHint: 'community shopping saving money',
      ctas: [
        { text: 'اولین خرید گروهی من', link: '/deals', variant: 'default', icon: ShoppingCart },
        { text: 'ساخت گروه', link: '/create-request', variant: 'outline', icon: PlusCircle }
      ]
    },
    {
      id: 2,
      image: 'https://placehold.co/1200x500.png',
      alt: 'جشنواره کالاهای ایرانی',
      title: 'حمایت از کالای با کیفیت ایرانی',
      description: 'تخفیف‌های ویژه برای حمایت از تولید ملی و محصولات داخلی.',
      link: '/category/iranian-products', // Example link
      aiHint: 'iranian products promotion sale'
    },
    {
      id: 3,
      image: 'https://placehold.co/1200x500.png',
      alt: 'لوازم دیجیتال با بهترین قیمت',
      title: 'تکنولوژی برای همه، با قیمت کمتر',
      description: 'جدیدترین گوشی‌ها، لپ‌تاپ‌ها و گجت‌ها را گروهی بخرید و در هزینه صرفه‌جویی کنید.',
      link: '/category/digital', // Example link
      aiHint: 'digital gadgets sale offer'
    },
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
    title: 'گوشی سامسونگ Galaxy S24 Ultra 5G ظرفیت 256GB رم 12GB',
    image: 'https://placehold.co/400x300.png',
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
    title: 'روغن آفتابگردان خالص لادن طلایی ۱ لیتری (بسته ۳ عددی)',
    image: 'https://placehold.co/400x300.png',
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
    title: 'ماشین لباسشویی اتوماتیک اسنوا ۸ کیلویی مدل SWM-84S60',
    image: 'https://placehold.co/400x300.png',
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
    title: 'بسته گوشت گوسفندی تازه ممتاز ۲ کیلویی (ران و سردست)',
    image: 'https://placehold.co/400x300.png',
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
    title: 'گوشی شیائومی Poco X6 Pro 5G ظرفیت 512GB رم 12GB',
    image: 'https://placehold.co/400x300.png',
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
    title: 'زعفران سرگل درجه یک قائنات ۵ مثقالی در بسته بندی خاتم',
    image: 'https://placehold.co/400x300.png',
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
    title: 'تلویزیون هوشمند ال‌جی ۵۵ اینچ ۴K UHD مدل 55UQ80006LD',
    image: 'https://placehold.co/400x300.png',
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
    title: 'فرش دستباف ابریشم طرح ماهی کاشان ۹ متری رنگ کرم',
    image: 'https://placehold.co/400x300.png',
    originalPrice: 185000000, // Price corrected
    groupPrice: 148000000, // Price corrected
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
    title: 'گز پسته ای کرمانی اصفهان درجه یک (جعبه ۱ کیلویی)',
    image: 'https://placehold.co/400x300.png',
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

// تعریف دسته‌بندی‌های محصولات برای نمایش در هدر و صفحه دسته‌بندی‌ها
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

// داده‌های جدید برای مگا منوی "خرید گروهی"
export interface MegaMenuCategory {
  title: string;
  href: string;
  description: string;
  icon?: React.ElementType; // LucideIcon
}

export const groupShoppingCategories: MegaMenuCategory[] = [
  { title: 'موبایل و تبلت', href: '/category/digital', description: 'گوشی‌های هوشمند، تبلت و گجت‌های پوشیدنی', icon: Laptop },
  { title: 'کامپیوتر و لوازم جانبی', href: '/category/digital', description: 'لپ‌تاپ، کامپیوتر، قطعات و تجهیزات شبکه', icon: Laptop },
  { title: 'صوتی و تصویری', href: '/category/digital', description: 'تلویزیون، سیستم صوتی، سینمای خانگی و دوربین', icon: Laptop },
  { title: 'پوشاک زنانه و مردانه', href: '/category/fashion', description: 'جدیدترین مدل‌های لباس، کیف، کفش و اکسسوری', icon: Shirt },
  { title: 'خوراکی و آشامیدنی', href: '/category/food', description: 'مواد غذایی تازه، خشکبار، کنسرو و نوشیدنی‌ها', icon: Utensils },
  { title: 'لوازم خانه و آشپزخانه', href: '/category/home-appliances', description: 'لوازم برقی، ظروف، دکوراسیون و ابزار آشپزخانه', icon: Home },
  { title: 'زیبایی و سلامت', href: '/category/beauty-health', description: 'لوازم آرایشی، بهداشتی و محصولات سلامت محور', icon: ShoppingBag },
  { title: 'ورزش و سفر', href: '/category/other', description: 'تجهیزات ورزشی، کمپینگ و لوازم سفر', icon: Percent },
  { title: 'ابزارآلات و تجهیزات', href: '/category/tools', description: 'ابزار برقی، دستی و تجهیزات صنعتی و ساختمانی', icon: HelpCircle }, // Using HelpCircle as a placeholder for tools
  { title: 'دکوراسیون منزل', href: '/category/home-decor', description: 'مبلمان، روشنایی، فرش و لوازم تزئینی خانه', icon: Home },
  { title: 'کتاب، لوازم التحریر و هنر', href: '/category/other', description: 'کتاب‌های چاپی، نوشت‌افزار و لوازم هنری', icon: Newspaper },
  { title: 'همه دسته‌بندی‌ها', href: '/categories', description: 'مشاهده تمامی دسته‌بندی‌های محصولات گروهی', icon: ListChecks },
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
  productsSold?: number; // Optional for cases where this data might not be available or relevant
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
  { question: "خرید گروهی چیست و چگونه کار می‌کند؟", answer: "خرید گروهی روشی است که در آن تعدادی از افراد با هم یک محصول را خریداری می‌کنند تا بتوانند از تخفیف خرید عمده بهره‌مند شوند. شما به یک گروه خرید می‌پیوندید و پس از رسیدن تعداد اعضا به حد نصاب تعیین شده توسط فروشنده، خرید با قیمت کمتر برای همه اعضای گروه نهایی می‌شود." },
  { question: "چگونه می‌توانم در یک خرید گروهی شرکت کنم؟", answer: "ابتدا محصول مورد نظر خود را در لیست خریدهای گروهی فعال پیدا کنید. سپس با کلیک بر روی دکمه 'پیوستن به گروه' و طی کردن مراحل (که ممکن است شامل پیش‌پرداخت یا رزرو باشد)، به گروه ملحق می‌شوید. دوستان خود را نیز می‌توانید برای تسریع در تکمیل گروه دعوت کنید." },
  { question: "اگر گروه خرید به حد نصاب نرسد چه اتفاقی می‌افتد؟", answer: "اگر تا پایان مهلت تعیین شده، تعداد اعضای گروه به حد نصاب نرسد، معمولاً خرید گروهی لغو می‌شود. در این صورت، اگر پیش‌پرداختی انجام داده باشید، مبلغ به حساب شما بازگردانده می‌شود. در برخی موارد، ممکن است فروشنده پیشنهاد تمدید زمان یا خرید با تعداد کمتر و تخفیف متفاوت را ارائه دهد." },
  { question: "آیا می‌توانم پس از پیوستن به گروه، از خرید انصراف دهم؟", answer: "شرایط انصراف از خرید گروهی به قوانین هر گروه و پلتفرم بستگی دارد. معمولاً تا قبل از تکمیل ظرفیت و نهایی شدن خرید، امکان لغو عضویت با شرایط خاصی وجود دارد. پس از نهایی شدن خرید، انصراف معمولاً امکان‌پذیر نیست مگر تحت شرایط خاص بازگشت کالا." },
  { question: "کالاها چگونه و چه زمانی ارسال می‌شوند؟", answer: "پس از تکمیل ظرفیت گروه و نهایی شدن خرید، فروشنده کالاها را برای اعضای گروه ارسال می‌کند. زمان و نحوه ارسال (پیک، پست و...) معمولاً در صفحه جزئیات خرید گروهی یا توسط فروشنده اطلاع‌رسانی می‌شود." },
  { question: "آیا کیفیت کالاهای خرید گروهی با خرید تکی متفاوت است؟", answer: "خیر، کالاهای عرضه شده در خرید گروهی همان کالاهای اصلی با همان کیفیت هستند. هدف از خرید گروهی، کاهش قیمت از طریق خرید عمده است و نه کاهش کیفیت." },
];

export const sellerFaqs: FaqItem[] = [
  { question: "چگونه می‌توانم محصولاتم را برای خرید گروهی در پلتفرم شما عرضه کنم؟", answer: "ابتدا باید به عنوان فروشنده در پلتفرم ما ثبت‌نام کرده و اطلاعات فروشگاه خود را تکمیل کنید. سپس می‌توانید محصولات خود را با تعیین قیمت اصلی، قیمت گروهی، حداقل تعداد فروش برای فعال شدن تخفیف گروهی و مهلت زمانی برای تکمیل گروه، تعریف و برای فروش عرضه کنید." },
  { question: "کارمزد پلتفرم برای فروشندگان چقدر است؟", answer: "کارمزد پلتفرم معمولاً درصدی از قیمت فروش گروهی محصول است. این درصد ممکن است بر اساس نوع کالا و توافقات اولیه متفاوت باشد. برای اطلاع دقیق از میزان کارمزد، لطفاً به بخش قراردادها و تعرفه‌های فروشندگان در پنل کاربری خود مراجعه کنید یا با تیم پشتیبانی ما تماس بگیرید." },
  { question: "تسویه حساب با فروشندگان چه زمانی و چگونه انجام می‌شود؟", answer: "پس از آنکه یک گروه خرید با موفقیت به حد نصاب رسید و خرید توسط اعضا نهایی شد (معمولاً پس از پرداخت وجه توسط خریداران)، مبلغ فروش پس از کسر کارمزد پلتفرم، طبق دوره زمانی مشخص شده در قرارداد (مثلاً هفتگی یا ماهانه) به حساب بانکی معرفی شده توسط شما واریز خواهد شد." },
  { question: "چه نوع محصولاتی برای فروش گروهی مناسب هستند؟", answer: "تقریباً هر نوع محصولی که قابلیت فروش عمده و ارائه تخفیف برای خرید تعدادی را داشته باشد، می‌تواند برای فروش گروهی مناسب باشد. محصولات پرطرفدار، کالاهای مصرفی، محصولات فصلی و کالاهایی که با افزایش تعداد خرید، هزینه تمام شده آنها برای شما کاهش می‌یابد، گزینه‌های خوبی هستند." },
  { question: "چگونه می‌توانم فروش گروهی محصولاتم را تبلیغ کنم؟", answer: "پلتفرم ما ابزارهایی برای نمایش محصولات شما به کاربران فراهم می‌کند. علاوه بر این، شما نیز می‌توانید از طریق شبکه‌های اجتماعی خود، وب‌سایت، یا سایر کانال‌های بازاریابی، لینک خرید گروهی محصولاتتان را به اشتراک بگذارید و مشتریان را به پیوستن به گروه تشویق کنید. ارائه توضیحات کامل و تصاویر باکیفیت از محصول نیز در جذب مشتری بسیار موثر است." },
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


// Data for "Followed Product Requests" section
export interface FollowedProductRequest {
  id: string;
  productName: string;
  followerCount: number;
  productImage: string;
  aiHint?: string;
  categorySlug: string;
}

export const followedProductRequests: FollowedProductRequest[] = [
  { 
    id: 'ps5-request', 
    productName: 'کنسول بازی PlayStation 5 Slim Digital Edition', 
    followerCount: 123, 
    productImage: 'https://placehold.co/400x300.png', 
    aiHint: 'gaming console playstation', 
    categorySlug: 'digital' 
  },
  { 
    id: 'airfryer-request', 
    productName: 'سرخ کن بدون روغن فیلیپس مدل HD9252 Airfryer Essential', 
    followerCount: 87, 
    productImage: 'https://placehold.co/400x300.png', 
    aiHint: 'air fryer kitchen appliance', 
    categorySlug: 'home-appliances' 
  },
  { 
    id: 'robot-vacuum-request', 
    productName: 'جارو رباتیک هوشمند شیائومی مدل Robot Vacuum S10 Plus', 
    followerCount: 65, 
    productImage: 'https://placehold.co/400x300.png', 
    aiHint: 'robot vacuum cleaner', 
    categorySlug: 'home-appliances' 
  },
];
