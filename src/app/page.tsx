'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Users, Clock, ChevronLeft, ChevronRight, Bell, Heart, Truck, Star, Tag, Check, Gift, Percent, ShieldCheck, Package, Globe } from 'lucide-react'; // Import necessary icons
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import Link from 'next/link';

// تعریف داده‌های نمونه برای خریدهای گروهی
const groupPurchases = [
  {
    id: 1,
    title: 'گوشی سامسونگ Galaxy S24',
    image: '/images/samsung-s24.jpg',
    originalPrice: 45000000,
    groupPrice: 39500000,
    discount: 12,
    members: 18,
    requiredMembers: 25,
    remainingTime: '۲ روز',
    category: 'digital', // Use slug
    isFeatured: true,
    aiHint: 'smartphone samsung galaxy',
  },
  {
    id: 2,
    title: 'روغن آفتابگردان لادن ۱ لیتری (بسته ۳ عددی)',
    image: '/images/olive-oil.jpg',
    originalPrice: 580000,
    groupPrice: 435000,
    discount: 25,
    members: 42,
    requiredMembers: 50,
    remainingTime: '۱۲ ساعت',
    category: 'food', // Use slug
    isIranian: true,
    aiHint: 'olive oil bottle',
  },
  {
    id: 3,
    title: 'ماشین لباسشویی اسنوا ۸ کیلویی',
    image: '/images/washing-machine.jpg',
    originalPrice: 28500000,
    groupPrice: 24225000,
    discount: 15,
    members: 8,
    requiredMembers: 15,
    remainingTime: '۳ روز',
    category: 'home-appliances', // Use slug
    isIranian: true,
    aiHint: 'washing machine',
  },
  {
    id: 4,
    title: 'بسته گوشت گوسفندی تازه ۲ کیلویی',
    image: '/images/meat-package.jpg',
    originalPrice: 1200000,
    groupPrice: 984000,
    discount: 18,
    members: 34,
    requiredMembers: 40,
    remainingTime: '۱ روز',
    category: 'food', // Use slug
    aiHint: 'meat package',
  },
    {
    id: 9, // Add a new item for the requests section example
    title: 'گوشی شیائومی Poco X6 Pro',
    image: '/images/xiaomi-poco.jpg', // Use a placeholder or actual image
    originalPrice: 15500000,
    groupPrice: 13800000,
    discount: 11,
    members: 7,
    requiredMembers: 20,
    remainingTime: '۵ روز',
    category: 'digital',
    aiHint: 'smartphone xiaomi poco',
  },
  {
    id: 5,
    title: 'زعفران درجه یک قائنات ۵ مثقالی',
    image: '/images/saffron.jpg',
    originalPrice: 1850000,
    groupPrice: 1480000,
    discount: 20,
    members: 28,
    requiredMembers: 35,
    remainingTime: '۴ روز',
    category: 'food', // Use slug
    isIranian: true,
    isFeatured: true,
    aiHint: 'saffron spice',
  },
  {
    id: 6,
    title: 'تلویزیون ال‌جی ۵۵ اینچ ۴K',
    image: '/images/smart-tv.jpg',
    originalPrice: 38500000,
    groupPrice: 32725000,
    discount: 15,
    members: 12,
    requiredMembers: 20,
    remainingTime: '۲ روز',
    category: 'digital', // Use slug
    aiHint: 'smart tv lg',
  },
  {
    id: 7,
    title: 'فرش دستباف کاشان ۹ متری',
    image: '/images/carpet.jpg',
    originalPrice: 18500000,
    groupPrice: 14800000,
    discount: 20,
    members: 5,
    requiredMembers: 10,
    remainingTime: '۵ روز',
    category: 'home-decor', // Use slug
    isIranian: true,
    isFeatured: true,
    aiHint: 'persian carpet',
  },
  {
    id: 8,
    title: 'گز اصفهان درجه یک (جعبه ۱ کیلویی)',
    image: '/images/gaz.jpg',
    originalPrice: 950000,
    groupPrice: 760000,
    discount: 20,
    members: 45,
    requiredMembers: 50,
    remainingTime: '۱ روز',
    category: 'food', // Use slug
    isIranian: true,
    aiHint: 'gaz candy',
  }
];

// تعریف دسته‌بندی‌های محصولات
const categories = [
  { id: 1, name: 'دیجیتال', icon: '📱', slug: 'digital' },
  { id: 2, name: 'مواد غذایی', icon: '🍎', slug: 'food' },
  { id: 3, name: 'لوازم خانگی', icon: '🏠', slug: 'home-appliances' },
  { id: 4, name: 'پوشاک', icon: '👕', slug: 'fashion' },
  { id: 5, name: 'زیبایی و سلامت', icon: '💄', slug: 'beauty-health' },
  { id: 6, name: 'خانه و دکوراسیون', icon: '🛋️', slug: 'home-decor' },
  { id: 7, name: 'ابزار و تجهیزات', icon: '🛠️', slug: 'tools' },
  { id: 8, name: 'سایر', icon: '📦', slug: 'other' }
];

// تخفیف‌های شگفت‌انگیز
const specialOffers = [
  {
    id: 1,
    title: 'جشنواره نوروزی - تخفیف تا ۴۰٪',
    description: 'خرید گروهی محصولات نوروزی با تخفیف فوق‌العاده، فقط تا پایان اسفند',
    image: '/images/norooz-offer.jpg',
    bgColor: 'bg-green-600'
  },
  {
    id: 2,
    title: 'محصولات ایرانی - حمایت از تولید ملی',
    description: 'خرید گروهی کالاهای ایرانی با کیفیت و قیمت مناسب',
    image: '/images/iranian-products.jpg',
    bgColor: 'bg-blue-600'
  },
  {
    id: 3,
    title: 'صنایع دستی اصیل ایرانی',
    description: 'مجموعه‌ای از بهترین صنایع دستی استان‌های مختلف ایران',
    image: '/images/handicrafts.jpg',
    bgColor: 'bg-purple-600'
  }
];

// تبدیل اعداد به فرمت فارسی با جداکننده هزارگان
const formatNumber = (num:number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const [featuredItems, setFeaturedItems] = useState(groupPurchases);
  const { toast } = useToast(); // Initialize useToast

  const handleJoinClick = (title: string) => {
    // In a real app, this would trigger login/signup or add to user's groups
    console.log(`User wants to join the group buy for: ${title}`);
    toast({
      title: "عضویت موفق!",
      description: `شما با موفقیت به گروه خرید ${title} پیوستید.`,
      variant: "default", // Use 'default' variant which uses primary color styling
    });
  };

  useEffect(() => {
    // شبیه‌سازی دریافت داده‌ها از سرور
    setFeaturedItems(groupPurchases);
  }, []);

  // Filter items based on active category slug
  const filteredItems = activeCategory === 'همه'
    ? featuredItems
    : featuredItems.filter(item => item.category === categories.find(cat => cat.name === activeCategory)?.slug);


  // Get category name from slug (map slug to name for display)
  const getCategoryNameBySlug = (slug: string | undefined) => {
    return categories.find(cat => cat.slug === slug)?.name || slug;
  }

  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-gray-50 min-h-screen">
      {/* هدر */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-green-600">خرید<span className="text-blue-600">گروهی</span></Link>
              <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
                <Link href="#" className="text-gray-700 hover:text-green-600 px-3">صفحه اصلی</Link>
                <Link href="#" className="text-gray-700 hover:text-green-600 px-3">دسته‌بندی‌ها</Link>
                <Link href="#" className="text-gray-700 hover:text-green-600 px-3">خریدهای فعال</Link>
                <Link href="#" className="text-gray-700 hover:text-green-600 px-3">درباره ما</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="جستجو..."
                  className="bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  ۳
                </span>
                 <span className="sr-only">Notifications</span>
              </Button>
              <Button>
                ورود / ثبت‌نام
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* بنر اصلی */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">با هم بخرید و تخفیف بگیرید!</h1>
              <p className="text-lg mb-6">با پیوستن به خریدهای گروهی، از تخفیف‌های ویژه بهره‌مند شوید. هرچه تعداد بیشتر، قیمت کمتر!</p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <Button variant="secondary"> {/* Changed variant for better contrast */}
                  شروع خرید گروهی
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600"> {/* Adjusted outline button style */}
                  راهنمای خرید
                </Button>
              </div>
              <div className="flex items-center mt-8 text-sm">
                <div className="flex items-center ml-6 rtl:mr-6">
                  <Check className="h-5 w-5 ml-1 rtl:mr-1 text-yellow-300" />
                  <span>تضمین اصالت کالا</span>
                </div>
                <div className="flex items-center ml-6 rtl:mr-6">
                  <Check className="h-5 w-5 ml-1 rtl:mr-1 text-yellow-300" />
                  <span>پرداخت امن</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 ml-1 rtl:mr-1 text-yellow-300" />
                  <span>ارسال سریع</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image src="https://picsum.photos/500/300" width={500} height={300} alt="خرید گروهی" className="rounded-lg shadow-lg" data-ai-hint="group shopping people"/>
            </div>
          </div>
        </div>
      </div>
      
      {/* نوار کمپین */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-3 md:mb-0">
              <Gift className="h-6 w-6 ml-2 rtl:mr-2" />
              <span className="text-lg font-bold">جشنواره خرید کالای ایرانی با تخفیف ویژه تا ۴۰٪</span>
            </div>
            <div className="flex items-center">
              <span className="ml-3 rtl:mr-3">فقط تا پایان هفته</span>
              <Button variant="secondary"> {/* Changed variant for better contrast */}
                مشاهده پیشنهادات
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* تخفیف‌های شگفت‌انگیز */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">تخفیف‌های شگفت‌انگیز</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {specialOffers.map(offer => (
            <div key={offer.id} className={`${offer.bgColor} rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow text-white`}>
              <div className="relative">
                <Image src={`https://picsum.photos/seed/${offer.id}/600/250`} width={600} height={250} alt={offer.title} className="w-full h-40 object-cover opacity-50" data-ai-hint="discount offer sale" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center">
                  <h3 className="font-bold text-xl mb-2">{offer.title}</h3>
                  <p className="text-sm">{offer.description}</p>
                  <Button variant="outline" className="mt-4 border-white text-white hover:bg-white hover:text-current"> {/* Adjusted outline button style */}
                    مشاهده جزئیات
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* دسته‌بندی‌ها */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">دسته‌بندی‌های محبوب</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map(category => (
            <Link href={`/category/${category.slug}`} key={category.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow aspect-square"> {/* Made aspect-square */}
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium text-gray-700 text-center">{category.name}</div> {/* Centered text */}
            </Link>
          ))}
        </div>
      </div>

      {/* محصولات ایرانی برتر */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Image src="https://picsum.photos/seed/iranflag/50/50" width={50} height={50} alt="پرچم ایران" className="w-8 h-8 rounded-full ml-2 rtl:mr-2" data-ai-hint="iran flag" />
                <h2 className="text-2xl font-bold">محصولات ایرانی برتر</h2>
              </div>
              <Link href="#" className="text-blue-600 text-sm flex items-center">
                مشاهده همه
                <ChevronLeft className="h-4 w-4 mr-1 rtl:ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {groupPurchases.filter(item => item.isIranian).slice(0, 4).map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-card">
                  <div className="relative">
                    <Image src={`https://picsum.photos/seed/${item.id+10}/300/200`} width={300} height={200} alt={item.title} className="w-full h-40 object-cover" data-ai-hint={item.aiHint}/>
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      {item.discount}٪ تخفیف
                    </Badge>
                    <Badge variant="secondary" className="absolute top-2 left-2">
                      ایران
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-card-foreground mb-2 text-sm h-12 overflow-hidden">{item.title}</h3>
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-3 w-3 ml-1 rtl:mr-1" />
                        <span className="text-xs">{item.members}/{item.requiredMembers}</span>
                      </div>
                      <div className="text-primary font-bold">{formatNumber(item.groupPrice)} تومان</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     {/* درخواست‌های خرید گروهی */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">درخواست‌های خرید گروهی</h2>
            <Button variant="outline">ایجاد درخواست جدید</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example: Filter for items perhaps marked as 'requested' or just show a few */}
            {groupPurchases.slice(4, 8).map(item => ( // Adjust slice or add a filter logic
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="relative">
                   <Image src={`https://picsum.photos/seed/${item.id + 20}/300/200`} width={300} height={200} alt={item.title} className="w-full h-48 object-cover" data-ai-hint={item.aiHint} />
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    {item.discount}٪ تخفیف
                  </Badge>
                   <Badge variant="secondary" className="absolute top-2 left-2">
                    {getCategoryNameBySlug(item.category)}
                  </Badge>
                  {item.isIranian && (
                    <Badge variant="secondary" className="absolute top-10 right-2 flex items-center">
                      <Image src="https://picsum.photos/seed/iranflag/20/20" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                      تولید ایران
                    </Badge>
                  )}
                  {item.isFeatured && (
                    <Badge variant="secondary" className="absolute bottom-2 right-2 bg-yellow-500 text-white flex items-center">
                      <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                      پیشنهاد ویژه
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h3>
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-500 line-through text-sm">{formatNumber(item.originalPrice)} تومان</div>
                    <div className="text-green-600 font-bold">{formatNumber(item.groupPrice)} تومان</div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 ml-1 rtl:mr-1" />
                        <span>{item.members} / {item.requiredMembers} نفر</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 ml-1 rtl:mr-1" />
                        <span>{item.remainingTime}</span>
                      </div>
                    </div>

                    <Progress value={(item.members / item.requiredMembers) * 100} className="h-2 mt-2" />
                  </div>

                  <Button onClick={() => handleJoinClick(item.title)} variant="default" className="mt-4 w-full flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2" />
                    پیوستن به گروه
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline">
              مشاهده همه درخواست‌ها
            </Button>
          </div>
        </div>
      </div>


      {/* خریدهای گروهی فعال */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">خریدهای گروهی فعال</h2>
            <div className="flex">
               <Button variant="ghost" size="icon" className="mr-2 rtl:ml-2">
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-4 rtl:space-x-reverse mb-8 overflow-x-auto pb-4">
            <Button
              variant={activeCategory === 'همه' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('همه')}
              className="whitespace-nowrap"
            >
              همه
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.name ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.name)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image src={`https://picsum.photos/seed/${item.id}/300/200`} width={300} height={200} alt={item.title} className="w-full h-48 object-cover" data-ai-hint={item.aiHint} />
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    {item.discount}٪ تخفیف
                  </Badge>
                   <Badge variant="secondary" className="absolute top-2 left-2">
                    {getCategoryNameBySlug(item.category)}
                  </Badge>
                  {item.isIranian && (
                     <Badge variant="secondary" className="absolute top-10 right-2 flex items-center">
                      <Image src="https://picsum.photos/seed/iranflag/20/20" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                      تولید ایران
                    </Badge>
                  )}
                  {item.isFeatured && (
                    <Badge variant="secondary" className="absolute bottom-2 right-2 bg-yellow-500 text-white flex items-center">
                      <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                      پیشنهاد ویژه
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h3>
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-500 line-through text-sm">{formatNumber(item.originalPrice)} تومان</div>
                    <div className="text-green-600 font-bold">{formatNumber(item.groupPrice)} تومان</div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 ml-1 rtl:mr-1" />
                        <span>{item.members} / {item.requiredMembers} نفر</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 ml-1 rtl:mr-1" />
                        <span>{item.remainingTime}</span>
                      </div>
                    </div>
                    
                    <Progress value={(item.members / item.requiredMembers) * 100} className="h-2 mt-2" />
                  </div>
                  
                  <Button onClick={() => handleJoinClick(item.title)} variant="default" className="mt-4 w-full flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2" />
                    پیوستن به گروه
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline">
              مشاهده همه خریدهای گروهی
            </Button>
          </div>
        </div>
      </div>

     {/* Benefits Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-12">چرا خرید گروهی؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Percent, title: "تخفیف‌های ویژه", description: "با افزایش تعداد خریداران، تخفیف‌های بیشتری دریافت کنید.", color: "blue" },
            { icon: ShieldCheck, title: "تضمین اصالت", description: "تمامی کالاها دارای تضمین اصالت و کیفیت هستند.", color: "green" },
            { icon: Package, title: "تنوع بی‌نظیر", description: "از کالاهای دیجیتال تا مواد غذایی، هر آنچه نیاز دارید را پیدا کنید.", color: "yellow" },
            { icon: Globe, title: "حمایت از تولید ملی", description: "با خرید کالاهای ایرانی، به اقتصاد کشور کمک کنید.", color: "red" }
          ].map((benefit, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-md text-center border border-border hover:border-primary transition-colors">
              <div className={`w-16 h-16 bg-${benefit.color}-100 dark:bg-${benefit.color}-900/50 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <benefit.icon className={`h-8 w-8 text-${benefit.color}-600 dark:text-${benefit.color}-400`} />
              </div>
              <h3 className="font-bold text-xl mb-2 text-card-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* بخش آمار */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">با ما همراه شوید</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">+۲۵,۰۰۰</div>
              <div>کاربر فعال</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">+۱۸۰</div>
              <div>خرید گروهی موفق</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">۲۵٪</div>
              <div>میانگین تخفیف</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">+۵۰</div>
              <div>فروشنده معتبر</div>
            </div>
          </div>
        </div>
      </div>

      {/* خبرنامه */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gray-100 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">از تخفیف‌های ویژه باخبر شوید</h3>
            <p className="text-gray-600">با عضویت در خبرنامه ما، از جدیدترین خریدهای گروهی و تخفیف‌های ویژه باخبر شوید.</p>
          </div>
          <div className="md:w-1/2 flex w-full md:w-auto"> {/* Ensure flex takes full width on mobile */}
            <Input
              type="email"
              placeholder="ایمیل خود را وارد کنید..."
              className="flex-grow px-4 py-3 rounded-r-lg rounded-l-none border-0 focus:outline-none focus:ring-2 focus:ring-blue-500" /* Adjusted rounding */
            />
            <Button className="rounded-l-lg rounded-r-none"> {/* Adjusted rounding */}
              عضویت
            </Button>
          </div>
        </div>
      </div>

      {/* فوتر */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">خرید<span className="text-blue-400">گروهی</span></h4>
              <p className="text-gray-400">اولین و بزرگترین سایت خرید گروهی ایران با تخفیف‌های ویژه برای شما</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">دسترسی سریع</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">صفحه اصلی</Link></li>
                <li><Link href="#" className="hover:text-white">خریدهای فعال</Link></li>
                <li><Link href="#" className="hover:text-white">دسته‌بندی‌ها</Link></li>
                <li><Link href="#" className="hover:text-white">درباره ما</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">خدمات مشتریان</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">سوالات متداول</Link></li>
                <li><Link href="#" className="hover:text-white">راهنمای خرید</Link></li>
                <li><Link href="#" className="hover:text-white">شرایط بازگشت</Link></li>
                <li><Link href="#" className="hover:text-white">تماس با ما</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">تماس با ما</h4>
              <div className="text-gray-400 space-y-2">
                <p>تهران، خیابان ولیعصر، مرکز خرید</p>
                <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
                <p>ایمیل: info@kharid-groupi.ir</p>
              </div>
              <div className="flex space-x-4 rtl:space-x-reverse mt-4">
                <Link href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} خرید گروهی - تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
