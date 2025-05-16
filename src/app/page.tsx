
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Users, Clock, ChevronLeft, ChevronRight, Bell, Heart, Truck, Star, Tag, Check, Gift, Percent, ShieldCheck, Package, Globe, Building, Store, Target, Handshake, MessageCircle, Quote, HelpCircle, UserCheck, ShoppingBag, Folder, PanelLeft, X, LogIn, UserPlus, Phone, LifeBuoy, Newspaper, ArrowLeft, Rocket, CreditCard, TrendingUp, CheckCircle, Link as LinkIcon, Users2, User } from 'lucide-react'; // Added User icon
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CountdownTimer from '@/components/countdown-timer';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  groupPurchases,
  categories,
  stores as allStores, // Renamed to avoid conflict with component
  heroSlides,
  testimonials,
  sellerTestimonials,
  buyerFaqs,
  sellerFaqs,
  formatNumber,
  isEndingSoon,
  getCategoryNameBySlug
} from '@/lib/data'; // Import from centralized data file
export { groupPurchases, stores as storesData } from '@/lib/data'; // Re-export if needed by other pages like product detail

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const { toast } = useToast();
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));


  const handleJoinClick = (title: string) => {
    console.log(`User wants to join the group buy for: ${title}`);
    toast({
      title: "عضویت موفق!",
      description: `شما با موفقیت به گروه خرید ${title} پیوستید.`,
      variant: "default",
    });
  };

   const handleReferralClick = () => {
      toast({
        title: "لینک دعوت شما کپی شد!",
        description: "لینک را برای دوستانتان ارسال کنید و اعتبار هدیه بگیرید.",
        variant: "default",
      });
      // In a real app, generate and copy the referral link
      // navigator.clipboard.writeText('your-referral-link.com/ref=123');
    };


  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!heroApi) return;
    setCurrentHeroSlide(heroApi.selectedScrollSnap());
    heroApi.on("select", () => setCurrentHeroSlide(heroApi.selectedScrollSnap()));
    heroApi.on("reInit", () => setCurrentHeroSlide(heroApi.selectedScrollSnap()));
  }, [heroApi]);


  const filteredItems = activeCategory === 'همه'
    ? groupPurchases
    : groupPurchases.filter(item => item.category === categories.find(cat => cat.name === activeCategory)?.slug);

  const priceComparisonData = {
      productName: 'گوشی هوشمند مدل X',
      prices: [
        { label: 'خرید تنها', price: 25000000, members: 1 },
        { label: 'با گروه ۴ نفره', price: 22000000, members: 4 },
        { label: 'با گروه ۱۰ نفره', price: 19000000, members: 10 },
      ],
    };

  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-background min-h-screen text-foreground">
      <Header />

      {/* Hero Slider */}
      <section className="relative w-full mb-12">
        <Carousel
          setApi={setHeroApi}
          plugins={[autoplayPlugin.current]}
          opts={{ loop: true, direction: 'rtl' }}
          className="w-full"
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
        >
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative w-full h-[300px] md:h-[400px]">
                  <Image
                    src={slide.image as string}
                    alt={slide.alt}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                    data-ai-hint={slide.aiHint}
                    priority={slide.id === 1}
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-gradient-to-t from-black/60 to-transparent p-8">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fade-in">{slide.title}</h1>
                    <p className="text-lg md:text-xl mb-6 md:mb-8 drop-shadow-md animate-fade-in animation-delay-200">{slide.description}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      {slide.ctas ? (
                        slide.ctas.map((cta, index) => (
                          <Link href={cta.link} key={index} legacyBehavior>
                            <Button as="a" size="lg" variant={cta.variant} className="transition-transform hover:scale-105 duration-300 shadow-md animate-fade-in animation-delay-400 w-full sm:w-auto">
                              {cta.icon && <cta.icon className="ml-2 rtl:mr-2 h-5 w-5" />}
                              {cta.text}
                            </Button>
                          </Link>
                        ))
                      ) : slide.link ? (
                        <Link href={slide.link} legacyBehavior>
                          <Button as="a" size="lg" variant="default" className="transition-transform hover:scale-105 duration-300 shadow-md animate-fade-in animation-delay-400">
                            مشاهده بیشتر
                          </Button>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background text-foreground border-none rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background text-foreground border-none rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30" />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2 rtl:space-x-reverse">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => heroApi?.scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentHeroSlide ? "w-4 bg-primary" : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`برو به اسلاید ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </section>
      
      {/* Category Circles Section */}
      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-8">
        <div className="flex justify-center space-x-4 rtl:space-x-reverse overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary -mx-4 px-4">
          {categories.map(category => (
            <Link href={`/category/${category.slug}`} key={category.id} className="flex flex-col items-center space-y-2 group flex-shrink-0 w-24">
              <div className="w-20 h-20 rounded-full border-2 border-primary/50 group-hover:border-primary transition-all duration-300 p-1 shadow-sm group-hover:shadow-md">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  width={72} 
                  height={72} 
                  className="rounded-full object-cover w-full h-full"
                  data-ai-hint={category.aiHint}
                />
              </div>
              <span className="text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors duration-300">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>


       {/* خریدهای گروهی فعال */}
        <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">خریدهای گروهی فعال</h2>
          </div>

          <div className="flex space-x-4 rtl:space-x-reverse mb-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary -mx-4 px-4">
            <Button
              variant={activeCategory === 'همه' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('همه')}
              className="whitespace-nowrap transition-transform hover:scale-105 duration-300 shadow-sm flex-shrink-0"
            >
              همه
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.name ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.name)}
                className="whitespace-nowrap transition-transform hover:scale-105 duration-300 shadow-sm flex-shrink-0"
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.slice(0, 6).map(item => (
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className="bg-card rounded-lg shadow-md overflow-hidden border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col">
                   <CardHeader className="p-0 relative aspect-[4/3]">
                    <Image src={item.image as string} width={300} height={225} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    <Badge variant="destructive" className="absolute top-3 right-3">
                      {item.discount}٪ تخفیف
                    </Badge>
                     <Badge variant="outline" className="absolute top-3 left-3 bg-background/80">
                      {getCategoryNameBySlug(item.category)}
                    </Badge>
                    {item.isIranian && (
                       <Badge variant="secondary" className="absolute top-11 right-3 flex items-center bg-background/80">
                        <Image src="https://placehold.co/20x20.png" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                        تولید ایران
                      </Badge>
                    )}
                    {item.isFeatured && (
                      <Badge variant="accent" className="absolute bottom-3 right-3 flex items-center shadow-md">
                        <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                        پیشنهاد ویژه
                      </Badge>
                    )}
                   </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-card-foreground mb-2 text-base h-14 overflow-hidden flex-grow">{item.title}</h3>
                    <div className="flex justify-between items-baseline mb-3">
                      <div className="text-muted-foreground line-through text-sm">{formatNumber(item.originalPrice)} <span className="text-xs">تومان</span></div>
                      <div className="text-primary font-bold text-xl">{formatNumber(item.groupPrice)} <span className="text-xs">تومان</span></div>
                    </div>
                     {item.isPackage && item.packageContents && (
                      <div className="my-3 border-t border-border pt-3">
                        <p className="text-xs font-semibold mb-1 text-muted-foreground">محتویات بسته:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5 pr-4">
                          {item.packageContents.map((content, index) => (
                            <li key={index}>
                              {content.name} ({content.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 space-y-2 flex-grow">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-1 rtl:mr-1" />
                          <span>{item.members} / {item.requiredMembers} نفر</span>
                        </div>
                         {item.endDate && isEndingSoon(item.endDate) ? (
                            <CountdownTimer endDate={item.endDate} />
                        ) : item.endDate ? (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 ml-1 rtl:mr-1" />
                               <span>{`بیش از ${Math.ceil((item.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} روز`}</span>
                            </div>
                        ) : null}
                      </div>

                      <Progress value={item.requiredMembers > 0 ? (item.members / item.requiredMembers) * 100 : 0} className="h-2" />
                    </div>
                   </CardContent>
                   <CardFooter className="p-4 pt-0 mt-auto">
                        <Button onClick={(e) => { e.preventDefault(); handleJoinClick(item.title); }} variant="default" className="w-full flex items-center justify-center transition-transform hover:scale-105 duration-300">
                          <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2" />
                          پیوستن به گروه
                        </Button>
                   </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/deals">
              <Button variant="outline" size="lg" className="transition-transform hover:scale-105 duration-300">
                مشاهده همه خریدهای گروهی
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Price Comparison Section */}
      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">تفاوت قیمت رو احساس کن!</h2>
        <p className="text-xl text-center text-muted-foreground mb-10">
          هرچی بیشتر، ارزون‌تر! خرید گروهی به صرفه‌تره.
        </p>
        <Card className="bg-card shadow-xl border border-border">
          <CardHeader className="pb-4 pt-6">
            <CardTitle className="text-2xl text-center text-primary">{priceComparisonData.productName}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {priceComparisonData.prices.map((tier, index) => (
                <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${index === priceComparisonData.prices.length - 1 ? 'bg-primary/10 border-primary shadow-lg transform scale-105' : 'bg-secondary/30 border-border'}`}>
                  <div className="flex items-center justify-center mb-4">
                    {tier.members === 1 ? <User className="w-10 h-10 text-primary" /> : <Users className="w-10 h-10 text-primary" />}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">{tier.label}</h4>
                  <p className="text-3xl font-bold text-primary mb-2">
                    {formatNumber(tier.price)} <span className="text-base font-normal">تومان</span>
                  </p>
                  {index > 0 && tier.price < priceComparisonData.prices[0].price && (
                    <Badge variant="destructive" className="text-sm">
                      {Math.round(((priceComparisonData.prices[0].price - tier.price) / priceComparisonData.prices[0].price) * 100)}٪ ارزان‌تر!
                    </Badge>
                  )}
                   {index === 0 && (
                     <p className="text-sm text-muted-foreground h-6">قیمت استاندارد</p> // Placeholder for alignment
                   )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-6">
            <p className="text-center text-lg font-semibold text-accent w-full">
              ✨ با خرید گروهی، هوشمندانه پس‌انداز کنید! ✨
            </p>
          </CardFooter>
        </Card>
      </section>

      {/* Seller CTA Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-blue-800/90 dark:from-primary/70 dark:to-blue-900/70 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
              <Image
                  src="https://placehold.co/1600x600.png"
                  alt="فروشنده خوشحال"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="happy online seller business owner"
                  className="scale-110 blur-sm"
              />
          </div>
          <div className="container mx-auto px-4 lg:px-8 xl:px-16 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
                          ایجاد فروشگاه گروهی تو، تنها در ۳ دقیقه! 🚀
                      </h2>
                      <p className="text-lg mb-8 text-blue-100 dark:text-blue-200 leading-relaxed drop-shadow-md">
                          محصولات خود را به هزاران خریدار معرفی کنید و فروش خود را چند برابر کنید.
                      </p>
                      <div className="space-y-4 mb-10">
                          <div className="flex items-center gap-3 text-base">
                              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                              <span>بدون هزینه راه‌اندازی اولیه</span>
                          </div>
                          <div className="flex items-center gap-3 text-base">
                              <CreditCard className="w-6 h-6 text-green-400 flex-shrink-0" />
                              <span>اتصال سریع و آسان به درگاه پرداخت امن</span>
                          </div>
                           <div className="flex items-center gap-3 text-base">
                              <TrendingUp className="w-6 h-6 text-green-400 flex-shrink-0" />
                              <span>دسترسی به جامعه بزرگ خریداران</span>
                          </div>
                          <div className="flex items-center gap-3 text-base">
                              <Rocket className="w-6 h-6 text-green-400 flex-shrink-0" />
                              <span>رشد سریع کسب و کار شما</span>
                          </div>
                      </div>
                      <Button
                          size="lg"
                          variant="accent"
                          className="px-8 py-3 text-lg font-semibold transition-transform hover:scale-105 duration-300 shadow-lg"
                      >
                         <Rocket className="w-5 h-5 ml-2 rtl:mr-2"/>
                          شروع ثبت‌نام فروشنده
                      </Button>
                  </div>
                  <div className="hidden md:flex justify-center items-center">
                    <div className="bg-white/10 p-8 rounded-full backdrop-blur-md shadow-2xl">
                         <Store className="w-32 h-32 text-white opacity-80" />
                    </div>
                  </div>
              </div>
          </div>
      </section>

     {/* Referral Banner */}
      <section className="bg-accent py-12">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-background rounded-xl shadow-lg p-8 md:p-10 border border-border">
            <div className="flex items-center gap-6 text-center md:text-right">
               <div className="hidden md:block bg-accent/20 p-4 rounded-full">
                  <Users2 className="w-12 h-12 text-accent" />
               </div>
               <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground mb-2">دوستانت را دعوت کن، هدیه بگیر! 🎁</h2>
                  <p className="text-muted-foreground text-lg">
                      با ارسال لینک اختصاصی به دوستانت، تا <span className="font-bold">۲۰٪ اعتبار هدیه</span> برای خریدهای بعدی خود و دوستانت دریافت کنید.
                  </p>
               </div>
            </div>
            <Button
              size="lg"
              variant="default"
              className="px-8 py-3 text-lg font-semibold transition-transform hover:scale-105 duration-300 shadow-md mt-6 md:mt-0 w-full md:w-auto"
              onClick={handleReferralClick}
            >
              <LinkIcon className="w-5 h-5 ml-2 rtl:mr-2" />
              دریافت لینک دعوت
            </Button>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">نحوه عملکرد خرید گروهی</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-inner">
                <Search className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">۱. کالا را پیدا کنید</h3>
            <p className="text-muted-foreground text-sm">کالای مورد نظر خود را از بین خریدهای گروهی فعال پیدا کنید یا درخواست جدید ثبت کنید.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
             <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-inner">
                <Users className="h-10 w-10 text-primary" />
             </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">۲. به گروه بپیوندید</h3>
            <p className="text-muted-foreground text-sm">به گروه خرید کالا بپیوندید و دوستان خود را برای رسیدن به حد نصاب دعوت کنید.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
             <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-inner">
                 <Target className="h-10 w-10 text-primary" />
             </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">۳. خرید نهایی و تحویل</h3>
            <p className="text-muted-foreground text-sm">پس از رسیدن به حد نصاب، خرید نهایی شده و کالا با تخفیف ویژه برای شما ارسال می‌شود.</p>
          </div>
        </div>
      </section>

     {/* درخواست‌های خرید گروهی */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-secondary-foreground mb-4 sm:mb-0">درخواست‌های خرید گروهی</h2>
            <Button variant="default" className="transition-transform hover:scale-105 duration-300 shadow-md">
                ایجاد درخواست جدید
             </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groupPurchases.slice(4, 7).map(item => (
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className="bg-card rounded-lg shadow-md overflow-hidden border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col">
                  <CardHeader className="p-0 relative aspect-[4/3]">
                     <Image src={item.image as string} width={300} height={225} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    <Badge variant="destructive" className="absolute top-3 right-3">
                      {item.discount}٪ تخفیف
                    </Badge>
                     <Badge variant="outline" className="absolute top-3 left-3 bg-background/80">
                      {getCategoryNameBySlug(item.category)}
                    </Badge>
                    {item.isIranian && (
                      <Badge variant="secondary" className="absolute top-11 right-3 flex items-center bg-background/80">
                        <Image src="https://placehold.co/20x20.png" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                        تولید ایران
                      </Badge>
                    )}
                    {item.isFeatured && (
                      <Badge variant="accent" className="absolute bottom-3 right-3 flex items-center shadow-md">
                        <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                        پیشنهاد ویژه
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-card-foreground mb-2 text-base h-14 overflow-hidden flex-grow">{item.title}</h3>
                    <div className="flex justify-between items-baseline mb-3">
                      <div className="text-muted-foreground line-through text-sm">{formatNumber(item.originalPrice)} <span className="text-xs">تومان</span></div>
                      <div className="text-primary font-bold text-xl">{formatNumber(item.groupPrice)} <span className="text-xs">تومان</span></div>
                    </div>
                    {item.isPackage && item.packageContents && (
                      <div className="my-3 border-t border-border pt-3">
                        <p className="text-xs font-semibold mb-1 text-muted-foreground">محتویات بسته:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5 pr-4">
                          {item.packageContents.map((content, index) => (
                            <li key={index}>
                              {content.name} ({content.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 space-y-2 flex-grow">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-1 rtl:mr-1" />
                          <span>{item.members} / {item.requiredMembers} نفر</span>
                        </div>
                        {item.endDate && isEndingSoon(item.endDate) ? (
                            <CountdownTimer endDate={item.endDate} />
                        ) : item.endDate ? (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 ml-1 rtl:mr-1" />
                              <span>{`بیش از ${Math.ceil((item.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} روز`}</span>
                            </div>
                        ) : null}
                      </div>

                      <Progress value={(item.members / item.requiredMembers) * 100} className="h-2" />
                    </div>
                   </CardContent>
                   <CardFooter className="p-4 pt-0 mt-auto">
                        <Button onClick={(e) => { e.preventDefault(); handleJoinClick(item.title); }} variant="default" className="w-full flex items-center justify-center transition-transform hover:scale-105 duration-300">
                          <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2" />
                          پیوستن به گروه
                        </Button>
                   </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link href="/requests">
              <Button variant="outline" size="lg" className="transition-transform hover:scale-105 duration-300">
                مشاهده همه درخواست‌ها
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* نمایش فروشگاه‌ها و محصولاتشان */}
       <section className="bg-background py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">ویترین فروشگاه‌ها</h2>
          <div className="space-y-16">
            {allStores.map((store) => (
              <Card key={store.id} className="bg-card border border-border shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-secondary/50 border-b border-border">
                  <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
                    <AvatarImage src={store.logo} alt={`لوگوی ${store.name}`} data-ai-hint={store.aiHint} />
                    <AvatarFallback className="text-2xl">{store.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-right flex-grow">
                    <CardTitle className="text-2xl font-bold text-card-foreground mb-1">{store.name}</CardTitle>
                    {store.offersInstallments && (
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">
                        فروش اقساطی
                      </Badge>
                    )}
                  </div>
                  <Link href={`/store/${store.id}`}>
                    <Button variant="outline" size="lg" className="transition-transform hover:scale-105 duration-300 mt-4 sm:mt-0 shadow-sm">
                      مشاهده فروشگاه
                      <Store className="mr-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-6 text-muted-foreground">محصولات منتخب برای خرید گروهی:</h4>
                  <Carousel
                    opts={{
                      align: "start",
                      direction: "rtl",
                      loop: store.products.length > 3, // Adjusted to check actual product count for loop
                    }}
                    className="w-full relative"
                  >
                    <CarouselContent className="-ml-4 rtl:-mr-4">
                      {store.products.map((product) => (
                        <CarouselItem key={product.id} className="basis-full md:basis-1/3 pl-4 rtl:pr-4 mb-1">
                          <Link href={`/product/${product.id}`} className="block h-full">
                            <Card className="overflow-hidden h-full flex flex-col border group transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer bg-background/50">
                              <CardHeader className="p-0 relative aspect-[4/3]">
                                <Image src={product.image as string} width={300} height={225} alt={product.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={product.aiHint}/>
                                <Badge variant="destructive" className="absolute top-2 right-2">
                                  {product.discount}٪ تخفیف
                                </Badge>
                                {product.isFeatured && (
                                  <Badge variant="accent" className="absolute bottom-2 right-2 flex items-center shadow-md text-xs px-1.5 py-0.5">
                                    <Star className="w-2.5 h-2.5 ml-1 rtl:mr-1 fill-current" />
                                    ویژه
                                  </Badge>
                                )}
                              </CardHeader>
                              <CardContent className="p-3 flex-grow flex flex-col">
                                <h5 className="font-semibold text-sm mb-1 h-10 overflow-hidden flex-grow text-card-foreground">{product.title}</h5>
                                <div className="flex justify-between items-baseline text-xs mb-2 mt-1">
                                  <span className="text-muted-foreground line-through">{formatNumber(product.originalPrice)}</span>
                                  <span className="text-primary font-bold">{formatNumber(product.groupPrice)} <span className="text-xs">تومان</span></span>
                                </div>
                                <Progress value={product.requiredMembers > 0 ? (product.members / product.requiredMembers) * 100 : 0} className="h-1.5 mt-auto" />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                   <span>{product.members}/{product.requiredMembers} نفر</span>
                                     {product.endDate && isEndingSoon(product.endDate) ? (
                                        <CountdownTimer endDate={product.endDate} size="xs" />
                                    ) : product.endDate ? (
                                         <span className="flex items-center gap-1"> <Clock className="w-3 h-3" /> {`بیش از ${Math.ceil((product.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} ر`}</span>
                                    ) : null}
                                </div>
                              </CardContent>
                              <CardFooter className="p-3 pt-0">
                                <Button onClick={(e) => { e.preventDefault(); handleJoinClick(product.title); }} size="sm" variant="default" className="w-full text-xs transition-transform hover:scale-105 duration-300">پیوستن</Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute right-[-12px] rtl:left-[-12px] rtl:right-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed h-9 w-9 shadow-md"/>
                    <CarouselNext className="absolute left-[-12px] rtl:right-[-12px] rtl:left-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed h-9 w-9 shadow-md"/>
                  </Carousel>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     {/* Benefits Section */}
      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-16 bg-secondary rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-secondary-foreground">چرا خرید گروهی؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Percent, title: "تخفیف‌های ویژه", description: "با افزایش تعداد خریداران، تخفیف‌های بیشتری دریافت کنید.", colorClass: "text-accent" },
            { icon: ShieldCheck, title: "تضمین اصالت", description: "تمامی کالاها دارای تضمین اصالت و کیفیت هستند.", colorClass: "text-green-500" },
            { icon: Package, title: "تنوع بی‌نظیر", description: "از کالاهای دیجیتال تا مواد غذایی، هر آنچه نیاز دارید را پیدا کنید.", colorClass: "text-primary" },
            { icon: Handshake, title: "خرید مستقیم", description: "ارتباط مستقیم با فروشندگان عمده و تولیدکنندگان.", colorClass: "text-purple-500" }
          ].map((benefit, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-lg text-center border border-border hover:border-primary transition-all duration-300 transform hover:-translate-y-1.5 group">
               <div className={`relative w-20 h-20 bg-gradient-to-br from-background to-secondary dark:from-card dark:to-secondary/70 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 shadow-md`}>
                 <div className={`absolute inset-0 ${benefit.colorClass.replace('text-', 'bg-')}/20 rounded-full animate-ping group-hover:animate-none opacity-50`}></div>
                 <benefit.icon className={`h-10 w-10 ${benefit.colorClass} relative z-10`} />
               </div>
               <h3 className="font-bold text-xl mb-3 text-card-foreground">{benefit.title}</h3>
               <p className="text-muted-foreground text-sm">{benefit.description}</p>
             </div>
          ))}
        </div>
      </section>

       {/* بخش رضایت مشتریان و فروشندگان */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">صدای مشتریان و فروشندگان ما</h2>
          <Tabs defaultValue="customers" className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary rounded-lg p-1 shadow-sm max-w-md mx-auto">
              <TabsTrigger value="customers" className="text-base data-[state=active]:shadow-md flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                خریداران
              </TabsTrigger>
              <TabsTrigger value="sellers" className="text-base data-[state=active]:shadow-md flex items-center gap-2">
                <Store className="w-4 h-4" />
                فروشندگان
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customers">
              <Carousel
                opts={{ align: "start", direction: "rtl", loop: testimonials.length > 3 }}
                className="w-full"
                plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
              >
                <CarouselContent className="-ml-4 rtl:-mr-4">
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4 rtl:pr-4 mb-4">
                      <Card className="h-full bg-card border border-border shadow-lg rounded-xl overflow-hidden flex flex-col">
                        <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
                          <Avatar className="w-20 h-20 mb-4 border-4 border-secondary shadow-lg">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                            <AvatarFallback className="text-2xl">{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h4 className="font-semibold text-lg mb-1 text-card-foreground">{testimonial.name}</h4>
                          <div className="text-xs text-muted-foreground mb-3">
                            خرید گروهی: <span className="font-medium text-primary">{testimonial.groupBuyTitle}</span> با <span className="font-medium text-destructive">{testimonial.discountAchieved}%</span> تخفیف
                          </div>
                          <div className="flex items-center justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-4 h-4",
                                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
                                )}
                              />
                            ))}
                          </div>
                          <Quote className="w-8 h-8 text-muted-foreground/30 mb-2 rotate-180" />
                          <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{testimonial.comment}</p>
                          <Quote className="w-8 h-8 text-muted-foreground/30 mt-2" />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground border border-border rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30 hidden lg:flex" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground border border-border rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30 hidden lg:flex" />
              </Carousel>
            </TabsContent>

             <TabsContent value="sellers">
              <Carousel
                opts={{ align: "start", direction: "rtl", loop: sellerTestimonials.length > 3 }}
                className="w-full"
                plugins={[Autoplay({ delay: 5500, stopOnInteraction: true })]}
              >
                <CarouselContent className="-ml-4 rtl:-mr-4">
                  {sellerTestimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4 rtl:pr-4 mb-4">
                      <Card className="h-full bg-card border border-border shadow-lg rounded-xl overflow-hidden flex flex-col">
                        <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
                          <Avatar className="w-20 h-20 mb-4 border-4 border-secondary shadow-lg">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                            <AvatarFallback className="text-xl">{testimonial.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <h4 className="font-semibold text-lg mb-1 text-card-foreground">{testimonial.name}</h4>
                          <div className="text-xs text-muted-foreground mb-3">
                             {testimonial.productsSold && `بیش از ${formatNumber(testimonial.productsSold)} محصول فروخته شده`}
                          </div>
                          <div className="flex items-center justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-4 h-4",
                                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
                                )}
                              />
                            ))}
                          </div>
                          <Quote className="w-8 h-8 text-muted-foreground/30 mb-2 rotate-180" />
                          <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{testimonial.comment}</p>
                           <Quote className="w-8 h-8 text-muted-foreground/30 mt-2" />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                 <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground border border-border rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30 hidden lg:flex" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground border border-border rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30 hidden lg:flex" />
              </Carousel>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* بخش سوالات پرتکرار (FAQ) */}
      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">سوالات پرتکرار</h2>
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="buyer" className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 mb-10 bg-secondary rounded-xl p-1.5 shadow-inner">
              <TabsTrigger value="buyer" className="text-base data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-lg py-2.5 flex items-center justify-center gap-2 transition-all duration-300">
                <ShoppingBag className="w-5 h-5" />
                سوالات خریداران
              </TabsTrigger>
              <TabsTrigger value="seller" className="text-base data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-lg py-2.5 flex items-center justify-center gap-2 transition-all duration-300">
                <UserCheck className="w-5 h-5" />
                سوالات فروشندگان
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buyer" className="space-y-4">
              <Accordion type="single" collapsible className="w-full bg-card rounded-xl border border-border shadow-lg overflow-hidden">
                {buyerFaqs.map((faq, index) => (
                  <AccordionItem value={`buyer-item-${index}`} key={`buyer-${index}`} className={cn("border-b last:border-b-0 border-border/70", index === 0 && "border-t-0")}>
                    <AccordionTrigger className="text-right text-base font-medium hover:no-underline px-6 py-4 data-[state=open]:bg-primary/5 group">
                      <div className="flex items-center gap-3 w-full">
                        <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-12"/>
                        <span className="text-foreground flex-grow text-right">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed px-6 pb-5 pt-0">
                       <div className="pl-8 rtl:pr-8 border-r-2 border-primary/30 mr-2.5 rtl:ml-2.5 rtl:mr-0 rtl:border-l-2 rtl:border-r-0">
                         {faq.answer}
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="seller" className="space-y-4">
              <Accordion type="single" collapsible className="w-full bg-card rounded-xl border border-border shadow-lg overflow-hidden">
                {sellerFaqs.map((faq, index) => (
                  <AccordionItem value={`seller-item-${index}`} key={`seller-${index}`} className={cn("border-b last:border-b-0 border-border/70", index === 0 && "border-t-0")}>
                    <AccordionTrigger className="text-right text-base font-medium hover:no-underline px-6 py-4 data-[state=open]:bg-primary/5 group">
                      <div className="flex items-center gap-3 w-full">
                          <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-12"/>
                         <span className="text-foreground flex-grow text-right">{faq.question}</span>
                      </div>
                      </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed px-6 pb-5 pt-0">
                       <div className="pl-8 rtl:pr-8 border-r-2 border-primary/30 mr-2.5 rtl:ml-2.5 rtl:mr-0 rtl:border-l-2 rtl:border-r-0">
                         {faq.answer}
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}

