
'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Users, Clock, ShoppingCart, ChevronLeft, ChevronRight, Share2, Info, ShieldCheck, Package, CheckCircle, AlertCircle, XCircle, Truck as ShippingIcon, RefreshCw, Users2, Eye, Store, User, UserCheck, TrendingUp, Star as StarIcon, MessageSquare } from 'lucide-react';
import { groupPurchases as mainGroupPurchases, stores, categories as allCategories, formatNumber, isEndingSoon, getCategoryNameBySlug as dataGetCategoryNameBySlug, allGroupProducts } from '@/lib/data';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CountdownTimer from '@/components/countdown-timer';
import type { GroupPurchaseItem } from '@/lib/data';

// Helper function to find product by ID from allGroupProducts
const getProductById = (id: number): GroupPurchaseItem | undefined => {
  return allGroupProducts.find(product => product.id === id);
};

// Helper function to find the store that sells a specific product ID
const getStoreByProductId = (productId: number) => {
    for (const store of stores) {
        if (store.products.some(p => p.id === productId)) {
            return store;
        }
    }
    return null;
};

// Sample related products (adjust logic if needed)
const getRelatedProducts = (currentProductId: number, categorySlug?: string) => {
  return allGroupProducts
    .filter(p => p.id !== currentProductId && (categorySlug ? p.category === categorySlug : true))
    .slice(0, 8);
};

type PageParams = { id: string };

export default function ProductDetailPage() {
  const params = useParams<PageParams>();
  const productId = parseInt(params.id, 10);
  const product = getProductById(productId);
  const store = getStoreByProductId(productId);
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVariations, setSelectedVariations] = useState<{ [key: string]: string }>({});
  const [progressValue, setProgressValue] = useState(0);
  const [groupStatus, setGroupStatus] = useState<'active' | 'filling' | 'completed' | 'failed'>('active');
  
  const [viewers, setViewers] = useState(0);
  const [showPurchasedRecently, setShowPurchasedRecently] = useState(false);
  const [purchasedCount, setPurchasedCount] = useState(0);

  useEffect(() => {
    const randomViewers = Math.floor(Math.random() * 30) + 5; 
    setViewers(randomViewers);

    const shouldShow = Math.random() > 0.6; 
    setShowPurchasedRecently(shouldShow);
    if (shouldShow) {
      setPurchasedCount(Math.floor(Math.random() * 10) + 3); 
    }

    const interval = setInterval(() => {
      setViewers(v => Math.max(3, v + Math.floor(Math.random() * 5) - 2)); 
    }, 7000); 

    return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image as string);
      if (product.variations) {
        const initialSelections: { [key: string]: string } = {};
        product.variations.forEach(variation => {
          if (variation.options.length > 0) { 
            initialSelections[variation.type] = variation.options[0];
          }
        });
        setSelectedVariations(initialSelections);
      }

      const targetProgress = product.requiredMembers > 0 ? (product.members / product.requiredMembers) * 100 : 0;
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 2;
        if (currentProgress >= targetProgress) {
          setProgressValue(targetProgress);
          clearInterval(progressInterval);
        } else {
          setProgressValue(currentProgress);
        }
      }, 30);

      const now = new Date();
      if (product.members >= product.requiredMembers) {
          setGroupStatus('completed');
      } else if (product.endDate && product.endDate < now) {
          setGroupStatus('failed');
      } else if (targetProgress > 75) {
          setGroupStatus('filling');
      } else {
          setGroupStatus('active');
      }

      return () => clearInterval(progressInterval);
    }
  }, [product]);

  if (!product) {
    notFound();
  }

  const handleVariationChange = (type: string, value: string) => {
    setSelectedVariations(prev => ({ ...prev, [type]: value }));
  };

  const handleJoinClick = () => {
    console.log(`Joining group buy for ${product.title} with variations:`, selectedVariations);
    toast({
      title: "با موفقیت اضافه شد!",
      description: `محصول ${product.title} به گروه شما اضافه شد.`,
    });
  };

   const galleryImages = [
    product.image as string,
    `https://placehold.co/500x500.png?text=${product.id + 10}`,
    `https://placehold.co/500x500.png?text=${product.id + 20}`,
    `https://placehold.co/500x500.png?text=${product.id + 30}`,
  ];

   const getStatusInfo = () => {
    switch (groupStatus) {
      case 'completed':
        return { text: "ظرفیت تکمیل شد! خرید نهایی شد.", icon: CheckCircle, color: "text-green-600 dark:text-green-400" };
      case 'failed':
        return { text: "مهلت خرید به پایان رسید و ظرفیت تکمیل نشد.", icon: XCircle, color: "text-red-600 dark:text-red-400" };
      case 'filling':
        return { text: "در حال تکمیل ظرفیت... به زودی تکمیل می‌شود!", icon: AlertCircle, color: "text-yellow-500 dark:text-yellow-400 animate-pulse" };
      case 'active':
      default:
        const remaining = product.requiredMembers - product.members;
        return { text: `${remaining > 0 ? formatNumber(remaining) + ' نفر دیگر تا تکمیل ظرفیت و تخفیف ویژه!' : 'در آستانه تکمیل ظرفیت!'}`, icon: Users2, color: "text-blue-600 dark:text-blue-400" };
    }
  };

  const statusInfo = getStatusInfo();
  const relatedProducts = getRelatedProducts(product.id, product.category);

  const originalPrice = product.originalPrice;
  const finalGroupPrice = product.groupPrice;
  const finalDiscountPercent = product.discount;
  const requiredMembers = product.requiredMembers;
  const currentMembers = product.members;

  let discountTiersDisplayData = [];

  discountTiersDisplayData.push({
    members: 1,
    label: "خرید تکی شما",
    discountPercent: 0,
    icon: User,
    price: originalPrice,
  });

  const midMembersThreshold = Math.floor(requiredMembers / 2);
  if (requiredMembers > 2 && midMembersThreshold > 1 && midMembersThreshold < requiredMembers) {
    const midDiscountPercent = Math.max(0, Math.floor(finalDiscountPercent * 0.5));
    discountTiersDisplayData.push({
      members: midMembersThreshold,
      label: `با ${formatNumber(midMembersThreshold)} نفر`,
      discountPercent: midDiscountPercent,
      icon: Users,
      price: originalPrice * (1 - midDiscountPercent / 100),
    });
  }

  discountTiersDisplayData.push({
    members: requiredMembers,
    label: `با ${formatNumber(requiredMembers)} نفر (تکمیل گروه)`,
    discountPercent: finalDiscountPercent,
    icon: UserCheck,
    price: finalGroupPrice,
  });

  discountTiersDisplayData = discountTiersDisplayData
    .reduce((acc, current) => {
      if (!acc.find(t => t.members === current.members)) {
        acc.push(current);
      } else if (current.members === requiredMembers) { 
        acc = acc.filter(t => t.members !== requiredMembers);
        acc.push(current);
      }
      return acc;
    }, [] as typeof discountTiersDisplayData)
    .sort((a, b) => a.members - b.members);

  let currentTierIndex = -1;
  for (let i = discountTiersDisplayData.length - 1; i >= 0; i--) {
    if (currentMembers >= discountTiersDisplayData[i].members) {
      currentTierIndex = i;
      break;
    }
  }
   if (currentMembers === 0 && discountTiersDisplayData.length > 0) currentTierIndex = 0;


  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-background min-h-screen text-foreground">
      <Header />

      <main className="container mx-auto px-4 lg:px-8 xl:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg border border-border">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={product.aiHint || 'product image'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  priority
                />
              )}
              <Badge variant="destructive" className="absolute top-4 left-4 rtl:right-4 rtl:left-auto text-lg px-3 py-1 shadow-md">
                {product.discount}٪ تخفیف
              </Badge>
                 {viewers > 0 && (
                    <div className="absolute bottom-4 left-4 rtl:right-4 rtl:left-auto bg-black/60 text-white px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 backdrop-blur-sm shadow">
                        <Eye className="w-3.5 h-3.5"/>
                        {formatNumber(viewers)} نفر در حال مشاهده
                    </div>
                 )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  className={cn(
                      "relative aspect-square w-full rounded-md overflow-hidden border-2 transition-all duration-200 hover:opacity-80",
                      selectedImage === img ? 'border-primary ring-2 ring-primary ring-offset-2 shadow-md' : 'border-border hover:border-primary/70'
                  )}
                  onClick={() => setSelectedImage(img)}
                  aria-label={`نمایش تصویر ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt={`تصویر ${index + 1} از ${product.title}`}
                    fill
                    className="object-cover"
                    data-ai-hint={`product gallery image ${index +1}`}
                    sizes="10vw"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.title}</h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Badge variant="outline" className="bg-secondary/70 border-border/30">{dataGetCategoryNameBySlug(product.category)}</Badge>
              {product.isIranian && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700">
                  <Image src="https://placehold.co/20x20.png" width={16} height={16} alt="پرچم ایران" className="w-4 h-4 rounded-full" data-ai-hint="iran flag" />
                  تولید ایران
                </Badge>
              )}
              {product.isFeatured && (
                <Badge variant="accent" className="shadow">
                  <StarIcon className="w-4 h-4 ml-1 rtl:mr-1 fill-current" />
                  پیشنهاد ویژه
                </Badge>
              )}
               {showPurchasedRecently && purchasedCount > 0 && (
                 <Badge variant="outline" className="text-destructive border-destructive/50 bg-destructive/10 dark:bg-destructive/20 animate-pulse">
                    🔥 {formatNumber(purchasedCount)} نفر در ساعت گذشته خریدند
                 </Badge>
               )}
            </div>

            {store && (
                 <Card className="bg-card border border-border shadow-md rounded-xl overflow-hidden my-4">
                   <CardHeader className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-card border-b border-border">
                     <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-background shadow-md transition-transform duration-300 hover:scale-110">
                       <AvatarImage src={store.logo} alt={`لوگوی ${store.name}`} data-ai-hint={store.aiHint} />
                       <AvatarFallback className="text-lg sm:text-xl font-semibold">{store.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div className="flex-grow text-center sm:text-right">
                       <p className="text-xs text-muted-foreground mb-0.5">فروشنده:</p>
                       <CardTitle className="text-lg font-semibold text-primary mb-1">{store.name}</CardTitle>
                       {store.offersInstallments && (
                           <Badge variant="outline" className="mt-1 text-xs text-green-700 dark:text-green-300 border-green-400 bg-green-100 dark:bg-green-900/40 shadow-sm">
                               امکان خرید اقساطی
                           </Badge>
                        )}
                     </div>
                     <Button variant="outline" size="sm" asChild className="mt-3 sm:mt-0 sm:self-center transition-transform hover:scale-105 duration-300 border-primary/70 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary shadow-sm">
                       <Link href={`/store/${store.id}`}>
                           <Store className="mr-2 rtl:ml-2 h-4 w-4" /> مشاهده فروشگاه
                        </Link>
                     </Button>
                   </CardHeader>
                 </Card>
             )}

             {product.isPackage && product.packageContents && (
              <Card className="bg-secondary/30 dark:bg-secondary/20 border-border shadow-sm">
                <CardHeader className="pb-2 pt-4 px-5">
                  <CardTitle className="text-base flex items-center gap-2 text-card-foreground">
                    <Package className="w-5 h-5 text-primary" />
                    محتویات بسته
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-4 px-5">
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pr-4 rtl:pl-4 rtl:pr-0">
                    {product.packageContents.map((content, index) => (
                      <li key={index}>
                        {content.name} ({content.quantity})
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {product.variations && product.variations.length > 0 && (
              <div className="space-y-5 border-t border-border pt-6">
                {product.variations.map((variation) => (
                  <div key={variation.type}>
                    <Label className="text-base font-semibold mb-3 block text-foreground">{variation.type}: <span className="text-primary font-bold">{selectedVariations[variation.type]}</span></Label>
                    <RadioGroup
                      dir="rtl"
                      value={selectedVariations[variation.type]}
                      onValueChange={(value) => handleVariationChange(variation.type, value)}
                      className="flex flex-wrap gap-3"
                    >
                      {variation.options.map((option) => (
                        <Label
                          key={option}
                          htmlFor={`${variation.type}-${option}`}
                          className={cn(
                            "cursor-pointer rounded-md border border-input px-4 py-2.5 text-sm transition-all duration-200 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:ring-offset-background has-[:checked]:ring-offset-2 has-[:checked]:shadow-md",
                            "bg-background hover:bg-accent/10 dark:hover:bg-accent/20 hover:border-primary/50"
                          )}
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${variation.type}-${option}`}
                            className="sr-only"
                          />
                          {option}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 border-t border-border pt-6">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-primary">{formatNumber(product.groupPrice)} <span className="text-base font-normal">تومان</span></span>
                <span className="text-lg text-muted-foreground line-through">{formatNumber(product.originalPrice)} <span className="text-sm">تومان</span></span>
              </div>
               {product.originalPrice && product.groupPrice && (
                <p className="text-green-600 dark:text-green-400 font-semibold text-sm">
                   شما {formatNumber(product.originalPrice - product.groupPrice)} تومان سود می‌کنید! ({formatNumber(product.discount)}٪ تخفیف گروهی)
                </p>
               )}
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground">وضعیت خرید گروهی</h3>
              <div className="flex justify-between text-sm text-muted-foreground items-center">
                 <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                           <div className="flex items-center gap-1.5 cursor-default">
                               <Users className="h-4 w-4" />
                               <span>{formatNumber(product.members)} / {formatNumber(product.requiredMembers)} نفر عضو</span>
                           </div>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{formatNumber(product.requiredMembers - product.members)} نفر تا تکمیل ظرفیت</p>
                        </TooltipContent>
                    </Tooltip>
                 </TooltipProvider>

                 {product.endDate && isEndingSoon(product.endDate) ? (
                      <CountdownTimer endDate={product.endDate} className="font-semibold text-sm" />
                  ) : product.endDate ? (
                      <div className="flex items-center gap-1">
                         <Clock className="h-4 w-4" />
                         <span>{`بیش از ${formatNumber(Math.ceil((product.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} روز مانده`}</span>
                      </div>
                  ) : (
                      <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>زمان نامشخص</span>
                      </div>
                  )}
              </div>
              <Progress value={progressValue} className="h-2.5 [&>div]:transition-all [&>div]:duration-500 [&>div]:ease-out rounded-full" />
              <div className={`flex items-center justify-center gap-1.5 text-sm font-medium mt-2 ${statusInfo.color}`}>
                 <statusInfo.icon className="h-5 w-5" />
                 <span>{statusInfo.text}</span>
              </div>

                {product.recentMembers && product.recentMembers.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-3">آخرین اعضا پیوسته به گروه:</p>
                    <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
                      {product.recentMembers.slice(0, 7).map((member, index) => (
                        <TooltipProvider key={index} delayDuration={100}>
                           <Tooltip>
                             <TooltipTrigger asChild>
                                <Avatar className="w-9 h-9 border-2 border-background transition-transform hover:scale-110 duration-200 cursor-pointer shadow-sm hover:z-10">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback>{member.name}</AvatarFallback>
                                </Avatar>
                             </TooltipTrigger>
                             <TooltipContent>
                               <p>{member.name} به گروه پیوست</p>
                             </TooltipContent>
                           </Tooltip>
                         </TooltipProvider>
                      ))}
                      {product.members > 7 && (
                         <TooltipProvider delayDuration={100}>
                            <Tooltip>
                               <TooltipTrigger asChild>
                                   <Avatar className="w-9 h-9 border-2 border-background bg-muted cursor-default shadow-sm">
                                     <AvatarFallback>+{formatNumber(product.members - 7)}</AvatarFallback>
                                   </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{formatNumber(product.members - 7)}+ عضو دیگر</p>
                                </TooltipContent>
                            </Tooltip>
                         </TooltipProvider>
                      )}
                    </div>
                  </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-border pt-6">
              <Button size="lg" onClick={handleJoinClick} className="flex-grow w-full sm:w-auto transition-transform hover:scale-[1.02] duration-300 h-12 shadow-md" disabled={groupStatus === 'completed' || groupStatus === 'failed'}>
                 <ShoppingCart className="h-5 w-5 ml-2 rtl:mr-2" />
                 {groupStatus === 'completed' || groupStatus === 'failed' ? 'گروه بسته شد' : 'پیوستن به گروه'}
               </Button>

              <div className="flex gap-2">
                  <TooltipProvider delayDuration={100}>
                      <Tooltip>
                          <TooltipTrigger asChild>
                               <Button variant="outline" size="icon" aria-label="اشتراک گذاری" className="h-12 w-12 border-border shadow-sm text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/10">
                                 <Share2 className="h-6 w-6" />
                               </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>اشتراک گذاری</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* Discount Tiers Section */}
        <div className="mt-16 md:mt-20">
          <h3 className="text-2xl font-bold mb-4 text-center text-foreground">
            تخفیف پلکانی: هرچه بیشتر، ارزان‌تر!
          </h3>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            ببینید چگونه با افزایش تعداد اعضای گروه، قیمت محصول کاهش پیدا می‌کند و شما سود بیشتری می‌کنید.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"> 
            {discountTiersDisplayData.map((tier, index) => (
              <Card
                key={index}
                className={cn(
                  "text-center p-6 rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group relative flex flex-col justify-between min-h-[280px] sm:min-h-[300px]",
                  currentTierIndex > index && product.members < product.requiredMembers && "opacity-60", 
                  currentTierIndex === index && product.members < product.requiredMembers && "!opacity-100 border-2 border-primary shadow-primary/20 scale-105 z-10", 
                  product.members >= product.requiredMembers && index === discountTiersDisplayData.length -1 && "!opacity-100 border-2 border-green-500 shadow-green-500/30 scale-105 z-10", 
                  index === discountTiersDisplayData.length - 1 && !(product.members >= product.requiredMembers) && "bg-secondary/30 dark:bg-secondary/20", 
                  index === discountTiersDisplayData.length - 1 && (product.members >= product.requiredMembers) && "bg-green-500/10 dark:bg-green-500/20" 
                )}
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-background p-1 rounded-full border border-border shadow-md z-20">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white",
                     (product.members >= product.requiredMembers && index === discountTiersDisplayData.length -1) ? "bg-green-500" : 
                     (currentTierIndex === index && product.members < product.requiredMembers ) ? "bg-primary animate-pulse" :
                     "bg-muted-foreground"
                  )}>
                    <tier.icon className="w-7 h-7" />
                  </div>
                </div>
                <CardHeader className="pt-10 pb-2">
                  <CardTitle className="text-lg font-semibold text-card-foreground">{tier.label}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center items-center">
                  <p className={cn(
                      "text-3xl font-bold my-2",
                      (currentTierIndex === index && product.members < product.requiredMembers) || (product.members >= product.requiredMembers && index === discountTiersDisplayData.length -1) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {formatNumber(Math.round(tier.price))} <span className="text-sm font-normal">تومان</span>
                  </p>
                  {tier.discountPercent > 0 && (
                    <Badge variant={ (product.members >= product.requiredMembers && index === discountTiersDisplayData.length -1) || (currentTierIndex === index && product.members < product.requiredMembers) ? "destructive" : "secondary"} className="text-base px-3 py-1">
                      {formatNumber(tier.discountPercent)}٪ تخفیف
                    </Badge>
                  )}
                  {tier.discountPercent === 0 && (
                     <Badge variant="outline" className="text-sm px-3 py-1">قیمت پایه</Badge>
                  )}
                </CardContent>
                { (currentTierIndex === index && product.members < product.requiredMembers ) && (
                   <div className="absolute bottom-2 right-2 left-2 text-center">
                      <Badge variant="default" className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 shadow">
                        گروه شما در این مرحله است!
                      </Badge>
                   </div>
                )}
                { product.members >= product.requiredMembers && index === discountTiersDisplayData.length -1 && (
                     <div className="absolute bottom-2 right-2 left-2 text-center">
                        <Badge variant="default" className="bg-green-600 text-white text-xs px-2 py-1 shadow">
                           گروه شما تکمیل شده!
                        </Badge>
                     </div>
                )}
              </Card>
            ))}
          </div>
           <p className="text-center text-muted-foreground mt-8 text-xs">
            * قیمت‌ها و درصد تخفیف‌ها برای سطوح میانی به صورت تخمینی و برای نمایش محاسبه شده‌اند. قیمت نهایی گروهی با تکمیل ظرفیت اعمال می‌شود.
          </p>
        </div>

        <div className="mt-16 md:mt-20">
           <Tabs defaultValue="description" className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 mb-8 bg-secondary/50 dark:bg-secondary/30 rounded-lg p-1 shadow-sm">
              <TabsTrigger value="description" className="text-sm sm:text-base data-[state=active]:shadow-md data-[state=active]:bg-background">توضیحات</TabsTrigger>
              <TabsTrigger value="details" className="text-sm sm:text-base data-[state=active]:shadow-md data-[state=active]:bg-background">مشخصات فنی</TabsTrigger>
              <TabsTrigger value="shipping" className="text-sm sm:text-base data-[state=active]:shadow-md data-[state=active]:bg-background">ارسال و بازگشت</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="bg-card p-6 md:p-8 rounded-lg border border-border shadow-sm text-foreground">
              <h3 className="text-xl font-semibold mb-5 text-card-foreground">معرفی محصول</h3>
              <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4">
                <p>
                  این یک محصول نمونه با کیفیت بالا است که برای خریدهای گروهی ارائه شده است. با پیوستن به گروه خرید، می‌توانید این محصول را با قیمت بسیار مناسب‌تری تهیه کنید. ما همواره در تلاشیم تا بهترین محصولات را با بهترین شرایط برای شما فراهم آوریم.
                </p>
                 <p>
                  توضیحات بیشتر در مورد ویژگی‌ها، کاربردها و مزایای این محصول در اینجا قرار می‌گیرد. هدف ما ارائه اطلاعات کامل و شفاف به شما عزیزان است تا با اطمینان کامل خرید خود را انجام دهید. مشارکت شما در گروه‌های خرید به ما کمک می‌کند تا تخفیف‌های بهتری از تامین‌کنندگان دریافت کنیم.
                </p>
               <Separator className="my-6"/>
               <h4 className="text-lg font-semibold mb-3 !text-card-foreground">ویژگی‌های کلیدی:</h4>
               <ul className="list-disc space-y-2 pr-5 rtl:pl-5 rtl:pr-0">
                    <li>پردازنده قدرتمند برای اجرای روان برنامه‌ها (در صورت مرتبط بودن)</li>
                    <li>صفحه نمایش باکیفیت با رنگ‌های زنده (در صورت مرتبط بودن)</li>
                    <li>دوربین حرفه‌ای با قابلیت عکاسی در نور کم (در صورت مرتبط بودن)</li>
                    <li>باتری با طول عمر بالا برای استفاده طولانی مدت (در صورت مرتبط بودن)</li>
                    <li>طراحی زیبا و مدرن با مواد اولیه باکیفیت</li>
                    <li>مناسب برای استفاده روزمره و حرفه‌ای</li>
               </ul>
              </article>
            </TabsContent>

            <TabsContent value="details" className="bg-card p-6 md:p-8 rounded-lg border border-border shadow-sm">
               <h3 className="text-xl font-semibold mb-6 text-card-foreground">مشخصات فنی</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                   <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">برند:</span>
                       <span className="font-medium text-foreground">{product.title.split(' ')[0]}</span>
                   </div>
                   {product.variations?.find(v => v.type === 'رنگ') && (
                     <div className="flex justify-between border-b border-border/70 pb-2">
                         <span className="text-muted-foreground">رنگ‌های موجود:</span>
                         <span className="font-medium text-foreground">{product.variations.find(v => v.type === 'رنگ')?.options.join('، ')}</span>
                     </div>
                   )}
                    <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">گارانتی:</span>
                       <span className="font-medium text-foreground">۱۸ ماهه رسمی + کد فعالسازی</span>
                   </div>
                   <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">کشور سازنده:</span>
                       <span className="font-medium text-foreground">{product.isIranian ? 'ایران' : 'خارجی'}</span>
                   </div>
                     <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">ابعاد:</span>
                       <span className="font-medium text-foreground text-left" dir="ltr">15 x 8 x 1 cm</span>
                   </div>
                    <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">وزن:</span>
                       <span className="font-medium text-foreground">۱۸۰ گرم</span>
                   </div>
                    <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">کد محصول:</span>
                       <span className="font-medium text-foreground font-mono">KG-{product.id.toString().padStart(5, '0')}</span>
                   </div>
                   <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">سال عرضه:</span>
                       <span className="font-medium text-foreground">۲۰۲۴</span>
                   </div>
               </div>
            </TabsContent>
             <TabsContent value="shipping" className="bg-card p-6 md:p-8 rounded-lg border border-border shadow-sm">
               <h3 className="text-xl font-semibold mb-6 text-card-foreground">اطلاعات ارسال و بازگشت کالا</h3>
               <div className="space-y-6 text-muted-foreground text-sm">
                   <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                         <ShippingIcon className="w-5 h-5 text-primary"/>
                       </div>
                       <div>
                           <h4 className="font-semibold text-card-foreground mb-1">نحوه ارسال</h4>
                           <p>ارسال برای تهران توسط پیک ویژه (۱ تا ۲ روز کاری) و برای سایر شهرها توسط پست پیشتاز (۳ تا ۵ روز کاری) انجام می‌شود. هزینه ارسال بر اساس وزن مرسوله و مقصد، در مرحله نهایی خرید محاسبه و نمایش داده می‌شود.</p>
                       </div>
                   </div>
                   <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                            <RefreshCw className="w-5 h-5 text-primary"/>
                        </div>
                       <div>
                           <h4 className="font-semibold text-card-foreground mb-1">شرایط بازگشت کالا</h4>
                           <p>شما می‌توانید تا ۷ روز کاری پس از دریافت سفارش، در صورت عدم استفاده و باز نشدن پلمپ کالا (در صورت وجود)، با هماهنگی واحد پشتیبانی، نسبت به بازگشت کالا اقدام نمایید. لطفاً شرایط کامل و موارد استثنا را در صفحه <Link href="/returns-policy" className="text-primary hover:underline font-medium">قوانین بازگشت</Link> مطالعه فرمایید.</p>
                       </div>
                   </div>
                   <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                            <ShieldCheck className="w-5 h-5 text-primary"/>
                       </div>
                       <div>
                           <h4 className="font-semibold text-card-foreground mb-1">تضمین سلامت فیزیکی</h4>
                           <p>تمامی کالاها پیش از ارسال از نظر سلامت ظاهری بررسی شده و با بسته‌بندی ایمن ارسال می‌گردند. در صورت مشاهده هرگونه آسیب‌دیدگی فیزیکی در زمان تحویل بسته از مامور ارسال، لطفاً از دریافت آن خودداری نموده و بلافاصله مراتب را به واحد پشتیبانی اطلاع دهید.</p>
                       </div>
                   </div>
               </div>
             </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16 md:mt-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-foreground">محصولات مشابه و پیشنهادی</h2>
           <Carousel
              opts={{
                align: "start",
                direction: "rtl",
                loop: relatedProducts.length > 4, 
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-4 rtl:-mr-4">
                {relatedProducts.length > 0 ? relatedProducts.map((relatedProduct) => (
                  <CarouselItem key={relatedProduct.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 rtl:pr-4 rtl:pl-0 mb-1">
                     <Link href={`/product/${relatedProduct.id}`} className="block h-full">
                      <Card className="overflow-hidden h-full flex flex-col border group transition-all duration-300 hover:border-primary hover:shadow-xl cursor-pointer bg-card rounded-lg">
                        <CardHeader className="p-0 relative aspect-[4/3]">
                          <Image src={relatedProduct.image as string} width={300} height={225} alt={relatedProduct.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={relatedProduct.aiHint || 'related product'}/>
                          <Badge variant="destructive" className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
                            {formatNumber(relatedProduct.discount)}٪ تخفیف
                          </Badge>
                           <Badge variant="outline" className="absolute top-3 right-3 rtl:left-3 rtl:right-auto bg-background/80 text-xs">
                              {dataGetCategoryNameBySlug(relatedProduct.category)}
                           </Badge>
                        </CardHeader>
                        <CardContent className="p-3 flex-grow flex flex-col">
                          <h5 className="font-semibold text-sm mb-1 h-10 overflow-hidden flex-grow text-card-foreground">{relatedProduct.title}</h5>
                           {relatedProduct.originalPrice && relatedProduct.groupPrice && (
                             <div className="flex justify-between items-baseline text-xs mb-2 mt-1">
                               <span className="text-muted-foreground line-through">{formatNumber(relatedProduct.originalPrice)}</span>
                               <span className="text-primary font-bold">{formatNumber(relatedProduct.groupPrice)} <span className="text-xs">تومان</span></span>
                             </div>
                           )}
                           {relatedProduct.requiredMembers > 0 && (
                              <Progress value={(relatedProduct.members / relatedProduct.requiredMembers) * 100} className="h-1.5 mt-auto rounded-full" />
                           )}
                           <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                            <span>{formatNumber(relatedProduct.members)}/{formatNumber(relatedProduct.requiredMembers)}</span>
                             {relatedProduct.endDate && isEndingSoon(relatedProduct.endDate) ? (
                                  <CountdownTimer endDate={relatedProduct.endDate} size="xs" />
                              ) : relatedProduct.endDate ? (
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {`بیش از ${formatNumber(Math.ceil((relatedProduct.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} ر`}</span>
                              ) : (
                                   <span>زمان نامشخص</span>
                              )}
                          </div>
                        </CardContent>
                         <CardFooter className="p-3 pt-0">
                           <Button size="sm" variant="outline" className="w-full text-xs transition-transform hover:scale-105 duration-300">مشاهده جزئیات</Button>
                        </CardFooter>
                      </Card>
                     </Link>
                  </CarouselItem>
                )) : (
                    <p className="text-center text-muted-foreground col-span-full py-8 w-full">محصول مشابهی یافت نشد.</p>
                 )}
              </CarouselContent>
              {relatedProducts.length > 4 && ( 
                <>
                    <CarouselPrevious className="absolute right-[-12px] rtl:left-[-12px] rtl:right-auto top-1/2 -translate-y-1/2 z-10 bg-background/90 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed h-9 w-9 shadow-md"/>
                    <CarouselNext className="absolute left-[-12px] rtl:right-[-12px] rtl:left-auto top-1/2 -translate-y-1/2 z-10 bg-background/90 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed h-9 w-9 shadow-md"/>
                </>
              )}
            </Carousel>
        </div>
      </main>

      <Footer />
    </div>
  );
}
