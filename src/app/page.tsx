'use client'; // Add this directive for client-side interactions like onClick

import Header from '@/components/header';
import Footer from '@/components/footer';
import GroupBuyCard from '@/components/group-buy-card';
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Sample categories
const categories = [
  { name: 'کالای دیجیتال', slug: 'digital' },
  { name: 'مواد غذایی', slug: 'food' },
  { name: 'لوازم خانگی', slug: 'home-appliances' },
  { name: 'مد و پوشاک', slug: 'fashion' },
  { name: 'زیبایی و سلامت', slug: 'beauty-health' },
  { name: 'ابزار و تجهیزات', slug: 'tools' },
];

export default function Home() {
  const { toast } = useToast(); // Initialize useToast

  // Sample data for group buy items with categories and more realistic images
  const groupBuyItems = [
    {
      id: 1,
      imageUrl: '/images/samsung-s24.jpg', // Replace with realistic local image path
      imageAlt: 'گوشی موبایل سامسونگ گلکسی S24',
      title: 'گوشی موبایل سامسونگ گلکسی S24',
      description: 'جدیدترین پرچمدار سامسونگ با دوربین فوق‌العاده و هوش مصنوعی پیشرفته.',
      currentParticipants: 78,
      requiredParticipants: 100,
      originalPrice: 55000000,
      groupPrice: 49500000,
      category: 'digital',
      aiHint: 'smartphone samsung galaxy',
    },
    {
      id: 2,
      imageUrl: '/images/olive-oil.jpg', // Replace with realistic local image path
      imageAlt: 'روغن زیتون ارگانیک',
      title: 'روغن زیتون فرابکر ارگانیک (۵ لیتر)',
      description: 'روغن زیتون با کیفیت بالا، محصول باغات شمال کشور، مناسب برای پخت و پز و سالاد.',
      currentParticipants: 45,
      requiredParticipants: 50,
      originalPrice: 1200000,
      groupPrice: 950000,
      category: 'food',
      aiHint: 'olive oil bottle',
    },
    {
      id: 3,
      imageUrl: '/images/ps5.jpg', // Replace with realistic local image path
      imageAlt: 'پلی استیشن ۵',
      title: 'کنسول بازی سونی پلی استیشن ۵',
      description: 'تجربه بازی نسل نهم با گرافیک خیره کننده و سرعت بارگذاری فوق‌العاده.',
      currentParticipants: 15,
      requiredParticipants: 20,
      originalPrice: 32000000,
      groupPrice: 29000000,
      category: 'digital',
      aiHint: 'gaming console playstation',
    },
    {
      id: 4,
      imageUrl: '/images/coffee-maker.jpg', // Replace with realistic local image path
      imageAlt: 'قهوه ساز',
      title: 'دستگاه قهوه ساز اسپرسو خانگی',
      description: 'تهیه اسپرسو، کاپوچینو و لاته با کیفیت کافه در منزل شما.',
      currentParticipants: 92,
      requiredParticipants: 150,
      originalPrice: 4500000,
      groupPrice: 3800000,
      category: 'home-appliances',
      aiHint: 'coffee maker espresso machine',
    },
    {
      id: 5,
      imageUrl: '/images/rice.jpg', // Replace with realistic local image path
      imageAlt: 'برنج ایرانی',
      title: 'برنج هاشمی درجه یک گیلان (۱۰ کیلوگرم)',
      description: 'برنج خوش عطر و طعم ایرانی، پخت عالی، محصول شالیزارهای حاصلخیز گیلان.',
      currentParticipants: 210,
      requiredParticipants: 250,
      originalPrice: 1800000,
      groupPrice: 1550000,
      category: 'food',
      aiHint: 'rice bag sack',
    },
    {
      id: 6,
      imageUrl: '/images/smart-tv.jpg', // Replace with realistic local image path
      imageAlt: 'تلویزیون هوشمند',
      title: 'تلویزیون هوشمند ۵۵ اینچ 4K',
      description: 'کیفیت تصویر بی‌نظیر با رزولوشن 4K و امکانات هوشمند متنوع.',
      currentParticipants: 8,
      requiredParticipants: 10,
      originalPrice: 25000000,
      groupPrice: 22500000,
      category: 'home-appliances',
      aiHint: 'smart tv television',
    },
    {
      id: 7,
      imageUrl: '/images/running-shoes.jpg',
      imageAlt: 'کفش ورزشی نایکی',
      title: 'کفش مخصوص دویدن نایکی مدل Pegasus 40',
      description: 'سبک، راحت و با دوام، مناسب برای تمرینات ورزشی و استفاده روزمره.',
      currentParticipants: 33,
      requiredParticipants: 50,
      originalPrice: 7500000,
      groupPrice: 6200000,
      category: 'fashion',
      aiHint: 'running shoes nike',
    },
    {
      id: 8,
      imageUrl: '/images/face-cream.jpg',
      imageAlt: 'کرم ضد آفتاب',
      title: 'کرم ضد آفتاب SPF 50 بی رنگ',
      description: 'محافظت بالا در برابر اشعه‌های مضر خورشید، مناسب انواع پوست.',
      currentParticipants: 112,
      requiredParticipants: 150,
      originalPrice: 450000,
      groupPrice: 350000,
      category: 'beauty-health',
      aiHint: 'sunscreen face cream',
    }
  ];

  const handleJoinClick = (title: string) => {
    // In a real app, this would trigger login/signup or add to user's groups
    console.log(`User wants to join the group buy for: ${title}`);
    toast({
      title: "عضویت موفق!",
      description: `شما با موفقیت به گروه خرید ${title} پیوستید.`,
      variant: "default", // Use 'default' variant which uses primary color styling
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />

      {/* Hero Section with Carousel and Search */}
      <section className="relative bg-gradient-to-b from-primary/10 to-secondary pt-16 pb-12 mb-12 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            خرید گروهی، هوشمندانه‌ترین روش خرید!
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            به جمع ما بپیوندید و کالاهای مورد نیازتان را با بهترین قیمت و به صورت گروهی تهیه کنید.
          </p>
          <div className="flex max-w-xl mx-auto mb-12">
            <Input
              type="text"
              placeholder="جستجوی محصول مورد نظر..."
              className="rounded-r-none border-l-0 focus:ring-primary focus:border-primary flex-grow"
              dir="rtl"
            />
            <Button variant="default" className="rounded-l-none px-6">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: "rtl", // Set carousel direction to RTL
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {groupBuyItems.slice(0, 5).map((item) => ( // Show first 5 items in carousel
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                      <CardHeader className="p-0 relative aspect-video">
                        <Image
                          src={item.imageUrl}
                          alt={item.imageAlt}
                          fill // Use fill for responsive images in aspect ratio
                          className="object-cover"
                          data-ai-hint={item.aiHint}
                        />
                      </CardHeader>
                      <CardContent className="p-3">
                        <CardTitle className="text-base font-semibold mb-1 truncate">{item.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold text-primary">{item.groupPrice.toLocaleString('fa-IR')} تومان</span>
                          <span className="line-through mr-2 text-xs">{item.originalPrice.toLocaleString('fa-IR')}</span>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-1rem] right-auto top-1/2 transform -translate-y-1/2 text-primary bg-background/80 hover:bg-background border-primary"/>
            <CarouselNext className="absolute right-[-1rem] left-auto top-1/2 transform -translate-y-1/2 text-primary bg-background/80 hover:bg-background border-primary"/>
          </Carousel>
        </div>
         {/* Subtle background pattern or shapes */}
         <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/3 -translate-y-1/3 opacity-50"></div>
         <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full translate-x-1/4 translate-y-1/4 opacity-50"></div>
      </section>


      {/* Categories Section */}
      <section className="container mx-auto px-4 py-8">
         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">دسته بندی محصولات</h2>
         <div className="flex flex-wrap justify-center gap-3">
           {categories.map((category) => (
             <Button key={category.slug} variant="outline" className="transition-transform transform hover:scale-105 hover:bg-accent hover:text-accent-foreground">
               {category.name}
             </Button>
           ))}
         </div>
       </section>


      {/* Group Buy Items Section */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">جدیدترین فرصت‌های خرید گروهی</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groupBuyItems.map((item) => (
            <GroupBuyCard
              key={item.id}
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
              title={item.title}
              description={item.description}
              currentParticipants={item.currentParticipants}
              requiredParticipants={item.requiredParticipants}
              originalPrice={item.originalPrice}
              groupPrice={item.groupPrice}
              onJoin={() => handleJoinClick(item.title)}
              aiHint={item.aiHint} // Pass aiHint
              category={item.category} // Pass category
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Re-import Card components used within the Carousel
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
