
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Users, Clock, ChevronLeft, ChevronRight, Bell, Heart, Truck, Star, Tag, Check, Gift, Percent, ShieldCheck, Package, Globe, Building, Store, Target, Handshake, MessageCircle, Quote, HelpCircle, UserCheck, ShoppingBag, Folder, PanelLeft, X, LogIn, UserPlus, Phone, LifeBuoy, Newspaper, ArrowLeft, Rocket, CreditCard, TrendingUp, CheckCircle, Link as LinkIcon, Users2, User, PlusCircle, Eye, PartyPopper, PiggyBank, UtensilsCrossed, Plane } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Slider } from "@/components/ui/slider";
import {
  groupPurchases,
  categories,
  stores as allStores,
  heroSlides,
  testimonials,
  sellerTestimonials,
  buyerFaqs,
  sellerFaqs,
  followedProductRequests, 
  formatNumber,
  isEndingSoon,
  getCategoryNameBySlug
} from '@/lib/data';
export { groupPurchases, stores as storesData } from '@/lib/data';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const { toast } = useToast();
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const [groupMembers, setGroupMembers] = useState<number[]>([1]);
  const [interactiveProductOriginalPrice] = useState(25000000);
  const [interactiveProductData, setInteractiveProductData] = useState({
    productName: 'گوشی هوشمند مدل ویژه X',
    image: 'https://placehold.co/300x300.png',
    aiHint: 'smartphone modern',
    currentPrice: interactiveProductOriginalPrice,
    discountPercent: 0,
  });

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

  useEffect(() => {
    const members = groupMembers[0];
    let newPrice = interactiveProductOriginalPrice;
    let discount = 0;
    const maxDiscount = 0.30; 
    const maxMembersForCurve = 50;

    if (members > 1) {
      const discountFactor = Math.min(1, (members - 1) / (maxMembersForCurve - 1));
      discount = maxDiscount * discountFactor;
      newPrice = interactiveProductOriginalPrice * (1 - discount);
    }

    setInteractiveProductData(prev => ({
      ...prev,
      currentPrice: Math.round(newPrice),
      discountPercent: Math.round(discount * 100),
    }));
  }, [groupMembers, interactiveProductOriginalPrice]);


  const filteredItems = activeCategory === 'همه'
    ? groupPurchases
    : groupPurchases.filter(item => item.category === categories.find(cat => cat.name === activeCategory)?.slug);


  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-background min-h-screen text-foreground">
      <Header />

      <section className="relative w-full mb-12 md:mb-16">
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
                <div className="relative w-full h-[380px] md:h-[480px] lg:h-[550px]">
                  <Image
                    src={slide.image as string}
                    alt={slide.alt}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-70"
                    data-ai-hint={slide.aiHint}
                    priority={slide.id === 1}
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 md:p-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 drop-shadow-xl animate-fade-in">{slide.title}</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-10 max-w-2xl drop-shadow-lg animate-fade-in animation-delay-200">{slide.description}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                      {slide.ctas ? (
                        slide.ctas.map((cta, index) => (
                          <Link href={cta.link} key={index} legacyBehavior>
                            <Button as="a" size="lg" variant={index === 0 ? 'cta' : cta.variant} className="text-base md:text-lg transition-transform hover:scale-105 duration-300 shadow-xl animate-fade-in animation-delay-400 w-full sm:w-auto px-8 py-3.5">
                              {cta.icon && <cta.icon className="ml-2 rtl:mr-2 h-5 w-5" />}
                              {cta.text}
                            </Button>
                          </Link>
                        ))
                      ) : slide.link ? (
                        <Link href={slide.link} legacyBehavior>
                          <Button as="a" size="lg" variant="cta" className="text-base md:text-lg transition-transform hover:scale-105 duration-300 shadow-xl animate-fade-in animation-delay-400 px-8 py-3.5">
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
          <CarouselPrevious className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background text-foreground border-none rounded-full w-10 h-10 md:w-12 md:h-12 shadow-md transition-opacity opacity-80 hover:opacity-100 disabled:opacity-30" />
          <CarouselNext className="absolute right-4 rtl:left-4 rtl:right-auto top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background text-foreground border-none rounded-full w-10 h-10 md:w-12 md:h-12 shadow-md transition-opacity opacity-80 hover:opacity-100 disabled:opacity-30" />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2 rtl:space-x-reverse">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => heroApi?.scrollTo(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentHeroSlide ? "w-6 bg-primary" : "bg-white/70 hover:bg-white"
                )}
                aria-label={`برو به اسلاید ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </section>
      
      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-8 md:py-12">
        <div className="flex justify-center space-x-4 rtl:space-x-reverse overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary -mx-4 px-4">
          {categories.map(category => (
            <Link href={`/category/${category.slug}`} key={category.id} className="flex flex-col items-center space-y-2.5 group flex-shrink-0 w-28 text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-primary/30 group-hover:border-primary transition-all duration-300 p-1 shadow-md group-hover:shadow-lg transform group-hover:scale-105">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  width={88} 
                  height={88} 
                  className="rounded-full object-cover w-full h-full bg-card"
                  data-ai-hint={category.aiHint}
                />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 block">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>


        <section className="bg-secondary/50 py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-0">خریدهای گروهی فعال</h2>
          </div>

          <div className="flex space-x-4 rtl:space-x-reverse mb-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary -mx-4 px-4">
            <Button
              variant={activeCategory === 'همه' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('همه')}
              className="whitespace-nowrap transition-transform hover:scale-105 duration-300 shadow-sm flex-shrink-0 px-5 py-2.5 text-sm"
            >
              همه
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.name ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.name)}
                className="whitespace-nowrap transition-transform hover:scale-105 duration-300 shadow-sm flex-shrink-0 px-5 py-2.5 text-sm"
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.slice(0, 6).map(item => (
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className="bg-card rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 group cursor-pointer h-full flex flex-col">
                   <CardHeader className="p-0 relative aspect-[16/10]">
                    <Image src={item.image as string} width={400} height={250} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    <Badge variant="destructive" className="absolute top-3 right-3 text-sm px-2.5 py-1 shadow">
                      {item.discount}٪ تخفیف
                    </Badge>
                     <Badge variant="outline" className="absolute top-3 left-3 bg-background/80 text-xs px-2 py-0.5">
                      {getCategoryNameBySlug(item.category)}
                    </Badge>
                    {item.isIranian && (
                       <Badge variant="secondary" className="absolute top-11 right-3 flex items-center bg-background/80 text-xs px-2 py-0.5">
                        <Image src="https://placehold.co/20x20.png" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                        تولید ایران
                      </Badge>
                    )}
                    {item.isFeatured && (
                      <Badge variant="accent" className="absolute bottom-3 right-3 flex items-center shadow-md text-xs px-2 py-0.5">
                        <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                        پیشنهاد ویژه
                      </Badge>
                    )}
                   </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg h-14 overflow-hidden flex-grow">{item.title}</h3>
                    <div className="flex justify-between items-baseline mb-3">
                      <div className="text-muted-foreground line-through text-sm">{formatNumber(item.originalPrice)} <span className="text-xs">تومان</span></div>
                      <div className="text-primary font-bold text-xl lg:text-2xl">{formatNumber(item.groupPrice)} <span className="text-xs">تومان</span></div>
                    </div>
                     {item.isPackage && item.packageContents && (
                      <div className="my-3 border-t border-border pt-3">
                        <p className="text-xs font-semibold mb-1 text-muted-foreground flex items-center">
                            <Package className="w-3.5 h-3.5 ml-1.5 rtl:mr-1.5"/>
                            محتویات بسته:
                        </p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5 pr-4">
                          {item.packageContents.map((content, index) => (
                            <li key={index}>
                              {content.name} ({content.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-auto space-y-2">
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

                      <Progress value={item.requiredMembers > 0 ? (item.members / item.requiredMembers) * 100 : 0} className="h-2.5 rounded-full" />
                    </div>
                   </CardContent>
                   <CardFooter className="p-4 pt-2">
                        <Button onClick={(e) => { e.preventDefault(); handleJoinClick(item.title); }} variant="cta" className="w-full text-base py-2.5 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                          <ShoppingCart className="h-5 w-5 ml-2 rtl:mr-2" />
                          پیوستن به گروه
                        </Button>
                   </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/deals">
              <Button variant="outline" size="lg" className="transition-transform hover:scale-105 duration-300 text-base px-8 py-3">
                مشاهده همه خریدهای گروهی
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">تفاوت قیمت رو احساس کن!</h2>
        <p className="text-xl text-center text-muted-foreground mb-10 md:mb-12">
          هرچی بیشتر، ارزون‌تر! خرید گروهی به صرفه‌تره.
        </p>
        <Card className="bg-card shadow-xl border border-border overflow-hidden rounded-xl">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-6 md:p-8 lg:p-10 order-2 md:order-1">
              <CardTitle className="text-2xl md:text-3xl text-primary mb-2">{interactiveProductData.productName}</CardTitle>
              <CardDescription className="text-muted-foreground mb-6 md:mb-8 text-base">
                با حرکت دادن اسلایدر، ببینید چطور با افزایش تعداد اعضای گروه، قیمت کمتر می‌شود.
              </CardDescription>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-base text-muted-foreground">قیمت اصلی (تکی):</span>
                    <span className="text-lg font-semibold text-muted-foreground line-through">{formatNumber(interactiveProductOriginalPrice)} <span className="text-xs">تومان</span></span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-base text-primary font-medium">قیمت گروهی شما:</span>
                    <span className="text-2xl md:text-3xl font-bold text-primary">{formatNumber(interactiveProductData.currentPrice)} <span className="text-sm">تومان</span></span>
                  </div>
                  {interactiveProductData.discountPercent > 0 && (
                    <div className="flex justify-between items-baseline text-green-600 dark:text-green-400">
                      <span className="text-base font-medium">میزان تخفیف:</span>
                      <span className="text-lg font-bold">{interactiveProductData.discountPercent}٪ (معادل {formatNumber(interactiveProductOriginalPrice - interactiveProductData.currentPrice)} تومان)</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <Label htmlFor="group-size-slider" className="flex items-center text-base font-medium text-foreground">
                    <Users className="w-5 h-5 mr-2 rtl:ml-2 text-primary"/>
                    تعداد اعضای گروه: <span className="font-bold text-primary mx-1.5">{groupMembers[0]}</span> نفر
                  </Label>
                  <Slider
                    id="group-size-slider"
                    min={1}
                    max={50}
                    step={1}
                    value={groupMembers}
                    onValueChange={setGroupMembers}
                    className="my-4 h-3"
                    aria-label="تعداد اعضای گروه"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>۱ نفر (خرید تکی)</span>
                    <span>۵۰ نفر (حداکثر تخفیف)</span>
                  </div>
                </div>
              </div>
               <p className="text-center text-lg font-semibold text-accent mt-8 md:mt-10">
                ✨ با خرید گروهی، هوشمندانه پس‌انداز کنید! ✨
              </p>
            </div>
            <div className="relative aspect-[4/3] md:aspect-square order-1 md:order-2 min-h-[280px] md:min-h-0">
              <Image
                src={interactiveProductData.image}
                alt={interactiveProductData.productName}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
                data-ai-hint={interactiveProductData.aiHint}
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-card md:via-transparent md:to-transparent opacity-60 md:opacity-100"></div>
            </div>
          </div>
        </Card>
      </section>

      <section className="relative bg-gradient-to-br from-primary to-blue-700 dark:from-primary/80 dark:to-blue-800/90 py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
              <Image
                  src="https://placehold.co/1600x600.png"
                  alt="فروشنده خوشحال در حال کار با لپتاپ"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="happy online seller business owner"
                  className="scale-110 blur-sm"
              />
          </div>
          <div className="container mx-auto px-4 lg:px-8 xl:px-16 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="text-white text-center md:text-right">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-lg">
                          ایجاد فروشگاه گروهی تو، تنها در ۳ دقیقه! 🚀
                      </h2>
                      <p className="text-lg md:text-xl mb-8 text-blue-100 dark:text-blue-200 leading-relaxed drop-shadow-md">
                          محصولات خود را به هزاران خریدار معرفی کنید و فروش خود را چند برابر کنید. با ما، فروش بیشتر و سریع‌تر را تجربه کنید.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-base text-left rtl:text-right">
                          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                              <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                              <span>بدون هزینه راه‌اندازی اولیه</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                              <CreditCard className="w-6 h-6 text-green-300 flex-shrink-0" />
                              <span>اتصال به درگاه پرداخت امن</span>
                          </div>
                           <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                              <TrendingUp className="w-6 h-6 text-green-300 flex-shrink-0" />
                              <span>دسترسی به جامعه بزرگ خریداران</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                              <Rocket className="w-6 h-6 text-green-300 flex-shrink-0" />
                              <span>رشد سریع کسب و کار شما</span>
                          </div>
                      </div>
                      <Button
                          size="lg"
                          variant="cta"
                          className="px-8 py-3.5 text-lg font-semibold transition-transform hover:scale-105 duration-300 shadow-xl w-full sm:w-auto"
                      >
                         <Rocket className="w-5 h-5 ml-2 rtl:mr-2"/>
                          شروع ثبت‌نام فروشنده
                      </Button>
                  </div>
                  <div className="hidden md:flex justify-center items-center">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                       <div className="relative bg-white/10 p-8 md:p-10 lg:p-12 rounded-full backdrop-blur-md shadow-2xl border-2 border-white/20">
                           <Store className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-white opacity-80 transform transition-transform duration-500 group-hover:scale-110" />
                       </div>
                    </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="bg-accent/10 dark:bg-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-card rounded-xl shadow-lg p-8 md:p-10 border border-border">
            <div className="flex items-center gap-6 text-center md:text-right">
               <div className="hidden md:block bg-accent/20 p-4 rounded-full">
                  <Users2 className="w-12 h-12 text-accent" />
               </div>
               <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground mb-2">دوستانت را دعوت کن، هدیه بگیر! 🎁</h2>
                  <p className="text-muted-foreground text-lg">
                      با ارسال لینک اختصاصی به دوستانت، تا <span className="font-bold text-primary">۲۰٪ اعتبار هدیه</span> برای خریدهای بعدی خود و دوستانت دریافت کنید.
                  </p>
               </div>
            </div>
            <Button
              size="lg"
              variant="cta"
              className="px-8 py-3.5 text-lg font-semibold transition-transform hover:scale-105 duration-300 shadow-md mt-6 md:mt-0 w-full md:w-auto"
              onClick={handleReferralClick}
            >
              <LinkIcon className="w-5 h-5 ml-2 rtl:mr-2" />
              دریافت لینک دعوت
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">نحوه عملکرد خرید گروهی</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
             { icon: Search, title: "۱. کالا را پیدا کنید", description: "کالای مورد نظر خود را از بین خریدهای گروهی فعال پیدا کنید یا درخواست جدید ثبت کنید.", delay: 0 },
             { icon: Users, title: "۲. به گروه بپیوندید", description: "به گروه خرید کالا بپیوندید و دوستان خود را برای رسیدن به حد نصاب دعوت کنید.", delay: 200 },
             { icon: Target, title: "۳. خرید نهایی و تحویل", description: "پس از رسیدن به حد نصاب، خرید نهایی شده و کالا با تخفیف ویژه برای شما ارسال می‌شود.", delay: 400 }
          ].map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 animate-fade-in-right"
              style={{animationDelay: `${step.delay}ms`}}
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 flex items-center justify-center mb-6 shadow-inner ring-4 ring-primary/5">
                  <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping opacity-50"></div>
                  <step.icon className="h-10 w-10 md:h-12 md:h-12 text-primary relative z-10" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-card-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4 sm:mb-0">درخواست‌های خرید گروهی</h2>
            <Button variant="cta" className="transition-transform hover:scale-105 duration-300 shadow-md text-base px-6 py-3">
                <PlusCircle className="w-5 h-5 ml-2 rtl:mr-2" />
                ایجاد درخواست جدید
             </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {groupPurchases.slice(4, 7).map(item => (
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className="bg-card rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 group cursor-pointer h-full flex flex-col">
                  <CardHeader className="p-0 relative aspect-[16/10]">
                     <Image src={item.image as string} width={400} height={250} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    <Badge variant="destructive" className="absolute top-3 right-3 text-sm px-2.5 py-1 shadow">
                      {item.discount}٪ تخفیف
                    </Badge>
                     <Badge variant="outline" className="absolute top-3 left-3 bg-background/80 text-xs px-2 py-0.5">
                      {getCategoryNameBySlug(item.category)}
                    </Badge>
                    {item.isIranian && (
                      <Badge variant="secondary" className="absolute top-11 right-3 flex items-center bg-background/80 text-xs px-2 py-0.5">
                        <Image src="https://placehold.co/20x20.png" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                        تولید ایران
                      </Badge>
                    )}
                    {item.isFeatured && (
                      <Badge variant="accent" className="absolute bottom-3 right-3 flex items-center shadow-md text-xs px-2 py-0.5">
                        <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                        پیشنهاد ویژه
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg h-14 overflow-hidden flex-grow">{item.title}</h3>
                    <div className="flex justify-between items-baseline mb-3">
                      <div className="text-muted-foreground line-through text-sm">{formatNumber(item.originalPrice)} <span className="text-xs">تومان</span></div>
                      <div className="text-primary font-bold text-xl lg:text-2xl">{formatNumber(item.groupPrice)} <span className="text-xs">تومان</span></div>
                    </div>
                    {item.isPackage && item.packageContents && (
                      <div className="my-3 border-t border-border pt-3">
                        <p className="text-xs font-semibold mb-1 text-muted-foreground flex items-center">
                            <Package className="w-3.5 h-3.5 ml-1.5 rtl:mr-1.5"/>
                            محتویات بسته:
                        </p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5 pr-4">
                          {item.packageContents.map((content, index) => (
                            <li key={index}>
                              {content.name} ({content.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-auto space-y-2">
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

                      <Progress value={(item.members / item.requiredMembers) * 100} className="h-2.5 rounded-full" />
                    </div>
                   </CardContent>
                   <CardFooter className="p-4 pt-2">
                        <Button onClick={(e) => { e.preventDefault(); handleJoinClick(item.title); }} variant="cta" className="w-full text-base py-2.5 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                          <ShoppingCart className="h-5 w-5 ml-2 rtl:mr-2" />
                          پیوستن به گروه
                        </Button>
                   </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link href="/requests">
              <Button variant="outline" size="lg" className="transition-transform hover:scale-105 duration-300 text-base px-8 py-3">
                مشاهده همه درخواست‌ها
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">کالاهای پرطرفدار در انتظار تشکیل گروه</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {followedProductRequests.map(request => (
            <Card key={request.id} className="bg-card rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 group h-full flex flex-col">
              <CardHeader className="p-0 relative aspect-[16/10]">
                <Image 
                  src={request.productImage} 
                  width={400} 
                  height={250} 
                  alt={request.productName} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={request.aiHint}
                />
                 <Badge variant="secondary" className="absolute top-3 left-3 bg-background/80 text-xs px-2 py-0.5">
                    {getCategoryNameBySlug(request.categorySlug)}
                 </Badge>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg h-14 overflow-hidden flex-grow">{request.productName}</h3>
                <div className="flex items-center text-muted-foreground text-sm mb-4 mt-2">
                  <Eye className="w-4 h-4 ml-1.5 rtl:mr-1.5 text-primary" />
                  <span>{formatNumber(request.followerCount)} نفر دنبال گروه برای این کالا هستند.</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="cta" className="w-full text-base py-2.5 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                  <PlusCircle className="w-5 h-5 ml-2 rtl:mr-2" />
                  ساخت گروه جدید با این کالا
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

       <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">ویترین فروشگاه‌ها</h2>
          <div className="space-y-16">
            {allStores.map((store) => (
              <Card key={store.id} className="bg-card border border-border shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-secondary/40 border-b border-border">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-background shadow-lg transition-transform duration-300 hover:scale-110">
                    <AvatarImage src={store.logo} alt={`لوگوی ${store.name}`} data-ai-hint={store.aiHint} />
                    <AvatarFallback className="text-2xl sm:text-3xl">{store.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-right flex-grow">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-card-foreground mb-1.5">{store.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">ارائه دهنده بهترین محصولات برای خرید گروهی</p>
                    {store.offersInstallments && (
                      <Badge variant="default" className="bg-[hsl(var(--progress-indicator))] hover:bg-[hsl(var(--progress-indicator))]/90 text-white text-xs px-2.5 py-1">
                        <CreditCard className="w-3.5 h-3.5 ml-1.5 rtl:mr-1.5"/>
                        فروش اقساطی
                      </Badge>
                    )}
                  </div>
                  <Link href={`/store/${store.id}`} className="mt-4 sm:mt-0">
                    <Button variant="outline" size="lg" className="transition-transform hover:scale-105 duration-300 shadow-sm text-base px-6 py-2.5">
                      مشاهده فروشگاه
                      <StoreIcon className="mr-2 rtl:ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-6 text-muted-foreground">محصولات منتخب برای خرید گروهی:</h4>
                  <Carousel
                    opts={{
                      align: "start",
                      direction: "rtl",
                      loop: store.products.length > 3, 
                    }}
                    className="w-full relative"
                  >
                    <CarouselContent className="-ml-4 rtl:-mr-4">
                      {store.products.map((product) => (
                        <CarouselItem key={product.id} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 rtl:pr-4 mb-1">
                          <Link href={`/product/${product.id}`} className="block h-full">
                            <Card className="overflow-hidden h-full flex flex-col border group transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer bg-background/50 rounded-lg">
                              <CardHeader className="p-0 relative aspect-[4/3]">
                                <Image src={product.image as string} width={300} height={225} alt={product.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={product.aiHint}/>
                                <Badge variant="destructive" className="absolute top-2 right-2 text-xs px-2 py-0.5">
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
                                <Progress value={product.requiredMembers > 0 ? (product.members / product.requiredMembers) * 100 : 0} className="h-1.5 mt-auto rounded-full" />
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
                                <Button onClick={(e) => { e.preventDefault(); handleJoinClick(product.title); }} size="sm" variant="cta" className="w-full text-xs transition-transform hover:scale-105 duration-300 py-2">پیوستن</Button>
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

      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-12 md:py-16 bg-secondary/50 rounded-xl my-12 md:my-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-secondary-foreground">چرا خرید گروهی؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Percent, title: "تخفیف‌های استثنایی", description: "با افزایش تعداد خریداران، از تخفیف‌های باورنکردنی بهره‌مند شوید.", colorClass: "text-accent", delay: 0 },
            { icon: ShieldCheck, title: "تضمین اصالت کالا", description: "تمامی کالاها با تضمین اصالت و کیفیت از فروشندگان معتبر عرضه می‌شوند.", colorClass: "text-[hsl(var(--progress-indicator))]", delay: 150 },
            { icon: Package, title: "تنوع بی‌نظیر محصولات", description: "از کالاهای دیجیتال تا مواد غذایی و پوشاک، هر آنچه نیاز دارید را پیدا کنید.", colorClass: "text-primary", delay: 300 },
            { icon: Handshake, title: "خرید مستقیم و بی‌واسطه", description: "ارتباط مستقیم با فروشندگان عمده و تولیدکنندگان برای بهترین قیمت.", colorClass: "text-purple-500", delay: 450 }
          ].map((benefit, index) => (
            <div 
                key={index} 
                className="bg-card p-6 rounded-xl shadow-lg text-center border border-border hover:border-primary transition-all duration-300 transform hover:-translate-y-1.5 group animate-fade-in-right"
                style={{animationDelay: `${benefit.delay}ms`}}
            >
               <div className={`relative w-20 h-20 bg-gradient-to-br from-background to-secondary dark:from-card dark:to-secondary/70 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 shadow-md ring-4 ring-transparent group-hover:ring-primary/20`}>
                 <div className={`absolute inset-0 ${benefit.colorClass.replace('text-', 'bg-')}/20 rounded-full animate-ping group-hover:animate-none opacity-50`}></div>
                 <benefit.icon className={`h-10 w-10 ${benefit.colorClass} relative z-10`} />
               </div>
               <h3 className="font-bold text-xl md:text-2xl mb-3 text-card-foreground">{benefit.title}</h3>
               <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{benefit.description}</p>
             </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">با خرید گروهی، هم خرید کن هم تفریح! 🥳</h2>
        <p className="text-xl text-center text-muted-foreground mb-10 md:mb-12">
          اینقدر که با خرید گروهی پولتو سیو می‌کنی، می‌تونی کلی کار دیگه هم بکنی!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card shadow-xl border border-border overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="p-0 relative aspect-[16/9]">
              <Image src="https://placehold.co/600x338.png" alt="گوشی و سفر شمال" layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint="smartphone beach travel"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 right-4 text-white p-2">
                <PartyPopper className="w-12 h-12 text-yellow-300 mb-2" />
                <CardTitle className="text-2xl md:text-3xl drop-shadow-md">گوشی پرچمدار + سفر شمال!</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-base text-muted-foreground mb-3 leading-relaxed">
                با پولی که برای خرید تکی یه گوشی پرچمدار کنار گذاشتی، می‌تونی همون گوشی رو گروهی بخری، <strong className="text-primary">۵ میلیون تومان</strong> هم برات بمونه، باهاش یه سفر توپ بری شمال و کلی هم خوش بگذرونی!
              </CardDescription>
              <div className="flex items-center justify-start gap-2 text-sm text-[hsl(var(--progress-indicator))] font-semibold">
                <PiggyBank className="w-5 h-5"/>
                <span>صرفه‌جویی تقریبی: ۵,۰۰۰,۰۰۰ تومان</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-xl border border-border overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="p-0 relative aspect-[16/9]">
              <Image src="https://placehold.co/600x338.png" alt="لوازم خانگی و شام در رستوران" layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint="home appliances fancy dinner"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 right-4 text-white p-2">
                <UtensilsCrossed className="w-12 h-12 text-rose-300 mb-2" />
                <CardTitle className="text-2xl md:text-3xl drop-shadow-md">جهیزیه کامل‌تر + شام لاکچری!</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-base text-muted-foreground mb-3 leading-relaxed">
                وقتی لوازم بزرگ آشپزخونه رو گروهی می‌خری، اینقدر تو هزینه‌هات صرفه‌جویی می‌شه که می‌تونی با خیال راحت یه سرویس قابلمه گرون‌تر برداری و آخر هفته هم کل خانواده رو یه شام <strong className="text-primary">حسابی مهمون کنی!</strong>
              </CardDescription>
              <div className="flex items-center justify-start gap-2 text-sm text-[hsl(var(--progress-indicator))] font-semibold">
                <PiggyBank className="w-5 h-5"/>
                <span>صرفه‌جویی تقریبی: ۸,۰۰۰,۰۰۰ تومان</span>
              </div>
            </CardContent>
          </Card>
        </div>
         <p className="text-center text-lg text-muted-foreground mt-10 italic">
            پولاتو خرج هیجان‌انگیزترین کارا کن، نه فقط خرید! 😉
          </p>
      </section>


      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">صدای مشتریان و فروشندگان ما</h2>
          <Tabs defaultValue="customers" className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary rounded-lg p-1 shadow-sm max-w-md mx-auto">
              <TabsTrigger value="customers" className="text-base data-[state=active]:shadow-md flex items-center gap-2 py-2.5">
                <ShoppingBag className="w-5 h-5" />
                خریداران
              </TabsTrigger>
              <TabsTrigger value="sellers" className="text-base data-[state=active]:shadow-md flex items-center gap-2 py-2.5">
                <Store className="w-5 h-5" />
                فروشندگان
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customers">
              <Carousel
                opts={{ align: "start", direction: "rtl", loop: testimonials.length > 2 }}
                className="w-full"
                plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
              >
                <CarouselContent className="-ml-4 rtl:-mr-4">
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4 rtl:pr-4 mb-4">
                      <Card className="h-full bg-card border border-border shadow-lg rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl">
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
                <CarouselPrevious className="absolute left-[-16px] rtl:right-[-16px] rtl:left-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground border border-border rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30 hidden lg:flex"/>
                <CarouselNext className="absolute right-[-16px] rtl:left-[-16px] rtl:right-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground border border-border rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30 hidden lg:flex"/>
              </Carousel>
            </TabsContent>

             <TabsContent value="sellers">
              <Carousel
                opts={{ align: "start", direction: "rtl", loop: sellerTestimonials.length > 2 }}
                className="w-full"
                plugins={[Autoplay({ delay: 5500, stopOnInteraction: true })]}
              >
                <CarouselContent className="-ml-4 rtl:-mr-4">
                  {sellerTestimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4 rtl:pr-4 mb-4">
                      <Card className="h-full bg-card border border-border shadow-lg rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl">
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
                <CarouselPrevious className="absolute left-[-16px] rtl:right-[-16px] rtl:left-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground border border-border rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30 hidden lg:flex" />
                <CarouselNext className="absolute right-[-16px] rtl:left-[-16px] rtl:right-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground border border-border rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30 hidden lg:flex" />
              </Carousel>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">سوالات پرتکرار</h2>
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="buyer" className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 mb-10 bg-secondary rounded-xl p-1.5 shadow-inner">
              <TabsTrigger value="buyer" className="text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-lg rounded-lg py-2.5 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out">
                <ShoppingBag className="w-5 h-5" />
                سوالات خریداران
              </TabsTrigger>
              <TabsTrigger value="seller" className="text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-lg rounded-lg py-2.5 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out">
                <UserCheck className="w-5 h-5" />
                سوالات فروشندگان
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buyer" className="space-y-4">
              <Accordion type="single" collapsible className="w-full bg-card rounded-xl border border-border shadow-lg overflow-hidden">
                {buyerFaqs.map((faq, index) => (
                  <AccordionItem value={`buyer-item-${index}`} key={`buyer-${index}`} className={cn("border-b last:border-b-0 border-border/70", index === 0 && "border-t-0")}>
                    <AccordionTrigger className="text-right text-base font-medium hover:no-underline px-6 py-4 data-[state=open]:bg-primary/5 group transition-colors duration-200">
                      <div className="flex items-center gap-3 w-full">
                        <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-12"/>
                        <span className="text-card-foreground flex-grow text-right">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed px-6 pb-5 pt-0">
                       <div className="pl-8 rtl:pr-8 border-r-2 border-primary/30 mr-2.5 rtl:ml-2.5 rtl:mr-0 rtl:border-l-2 rtl:border-r-0 py-2">
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
                    <AccordionTrigger className="text-right text-base font-medium hover:no-underline px-6 py-4 data-[state=open]:bg-primary/5 group transition-colors duration-200">
                      <div className="flex items-center gap-3 w-full">
                          <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-12"/>
                         <span className="text-card-foreground flex-grow text-right">{faq.question}</span>
                      </div>
                      </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed px-6 pb-5 pt-0">
                       <div className="pl-8 rtl:pr-8 border-r-2 border-primary/30 mr-2.5 rtl:ml-2.5 rtl:mr-0 rtl:border-l-2 rtl:border-r-0 py-2">
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

      <section className="container mx-auto px-4 lg:px-8 xl:px-16 py-12 md:py-16">
        <Card className="bg-gradient-to-br from-primary to-blue-700 dark:from-primary/80 dark:to-blue-900 text-primary-foreground shadow-xl border-none overflow-hidden rounded-xl">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-10 lg:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
                تو فقط ثبت‌نام کن، ما بهت یه گروه تخفیفی خاص می‌دیم! 🎁
              </h2>
              <p className="text-lg text-blue-100 dark:text-blue-200 mb-8 leading-relaxed drop-shadow-sm">
                به جامعه بزرگ خریداران گروهی بپیوندید و از تخفیف‌های باورنکردنی بهره‌مند شوید. ثبت نام سریع و آسان!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" legacyBehavior>
                  <Button
                    size="lg"
                    variant="cta"
                    className="w-full sm:w-auto text-lg py-3.5 px-8 transition-transform hover:scale-105 duration-300 shadow-md"
                  >
                    <Phone className="w-5 h-5 ml-2 rtl:mr-2" />
                    ورود یا ثبت نام با شماره
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg py-3.5 px-8 border-primary-foreground/50 text-primary-foreground hover:bg-white/10 hover:text-white transition-transform hover:scale-105 duration-300 shadow-md"
                >
                  <svg className="w-5 h-5 ml-2 rtl:mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  ورود با گوگل
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center p-8 relative h-full min-h-[300px] md:min-h-[400px]">
              <Image
                src="https://placehold.co/450x450.png"
                alt="ثبت نام سریع و آسان"
                width={400}
                height={400}
                className="rounded-full object-cover shadow-2xl transform transition-transform duration-500 hover:scale-105 border-4 border-white/20"
                data-ai-hint="signup mobile people group celebration"
              />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/30 md:bg-gradient-to-l md:from-primary/40 md:to-transparent opacity-50"></div>
            </div>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}

