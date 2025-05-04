
'use client';

import React, { useState, useEffect } from 'react'; // Import React
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Users, Clock, ShoppingCart, ChevronLeft, ChevronRight, Share2, Heart, MessageSquare, Info, ShieldCheck, Package, CheckCircle, AlertCircle, XCircle, Truck as ShippingIcon, RefreshCw, Users2, Eye, Store } from 'lucide-react'; // Added more icons
import { groupPurchases, stores } from '@/app/page'; // Import the sample data including stores
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import Radio Group
import { Label } from "@/components/ui/label"; // Import Label
import { cn } from "@/lib/utils"; // Import cn for conditional class names
import { Separator } from '@/components/ui/separator'; // Import Separator
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip" // Import Tooltip components
import CountdownTimer from '@/components/countdown-timer'; // Import CountdownTimer

// Helper function to find product by ID
const getProductById = (id: number) => {
  // Find in main groupPurchases
  let product = groupPurchases.find(product => product.id === id);
  if (product) return product;

  // Find within store products if not found in main list
  for (const store of stores) {
      product = store.products.find(p => p.id === id);
      if (product) return product;
  }
  return undefined; // Return undefined if not found anywhere
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


// Helper function to format numbers with Persian commas
const formatNumber = (num: number | undefined) => {
  if (num === undefined || num === null) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Sample related products (adjust logic if needed)
const getRelatedProducts = (currentProductId: number, category?: string) => {
  const allProducts = [...groupPurchases, ...stores.flatMap(s => s.products)];
  const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.id, p])).values()); // Ensure uniqueness

  return uniqueProducts
    .filter(p => p.id !== currentProductId && (category ? p.category === category : true))
    .slice(0, 8); // Get up to 8 related products
};


// Check if the deal ends within 24 hours
const isEndingSoon = (endDate: Date | undefined): boolean => {
    if (!endDate) return false;
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();
    const hoursRemaining = timeDiff / (1000 * 60 * 60);
    return hoursRemaining > 0 && hoursRemaining <= 24;
};


// Define the type for the params promise
type ParamsPromise = { id: string };

export default function ProductDetailPage({ params }: { params: ParamsPromise }) {
  const resolvedParams = React.use(params); // Unwrap the promise
  const productId = parseInt(resolvedParams.id, 10); // Access id from resolved params
  const product = getProductById(productId);
  const store = getStoreByProductId(productId); // Find the store selling this product
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<{ [key: string]: string }>({});
  const [progressValue, setProgressValue] = useState(0);
  const [groupStatus, setGroupStatus] = useState<'active' | 'filling' | 'completed' | 'failed'>('active');
  const [viewers, setViewers] = useState(0); // State for simulated viewers
  const [showPurchasedRecently, setShowPurchasedRecently] = useState(false); // State for Math.random based UI
  const [purchasedCount, setPurchasedCount] = useState(0); // State for random number

  // Simulate dynamic viewer count and random purchase count
  useEffect(() => {
    // Run only on client after hydration
    const randomViewers = Math.floor(Math.random() * 30) + 5; // 5 to 35 viewers
    setViewers(randomViewers);

    // Decide if "purchased recently" badge should be shown
    const shouldShow = Math.random() > 0.6; // Slightly less frequent
    setShowPurchasedRecently(shouldShow);
    if (shouldShow) {
      setPurchasedCount(Math.floor(Math.random() * 10) + 3); // 3 to 12
    }

    const interval = setInterval(() => {
      setViewers(v => Math.max(3, v + Math.floor(Math.random() * 5) - 2)); // Fluctuate viewer count
    }, 7000); // Update every 7 seconds

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once on mount


  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      // Set initial selected variations if they exist
      if (product.variations) {
        const initialSelections: { [key: string]: string } = {};
        product.variations.forEach(variation => {
          initialSelections[variation.type] = variation.options[0]; // Default to first option
        });
        setSelectedVariations(initialSelections);
      }

       // Animate progress bar and determine status
      const targetProgress = product.requiredMembers > 0 ? (product.members / product.requiredMembers) * 100 : 0;
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 2; // Faster animation
        if (currentProgress >= targetProgress) {
          setProgressValue(targetProgress);
          clearInterval(progressInterval);
        } else {
          setProgressValue(currentProgress);
        }
      }, 30); // Adjust speed as needed

      // Determine group status based on members and time
      const now = new Date();
      if (product.members >= product.requiredMembers) {
          setGroupStatus('completed');
      } else if (product.endDate && product.endDate < now) { // Check if endDate has passed
          setGroupStatus('failed');
      } else if (targetProgress > 75) { // Higher threshold for 'filling'
          setGroupStatus('filling');
      } else {
          setGroupStatus('active');
      }


      return () => clearInterval(progressInterval);

    }
  }, [product]);

  if (!product) {
    notFound(); // Show 404 if product not found
  }

  const handleVariationChange = (type: string, value: string) => {
    setSelectedVariations(prev => ({ ...prev, [type]: value }));
  };

  const handleJoinClick = () => {
    console.log(`Joining group buy for ${product.title} with quantity ${quantity} and variations:`, selectedVariations);
    toast({
      title: "با موفقیت اضافه شد!",
      description: `${quantity} عدد از محصول ${product.title} به سبد خرید شما اضافه شد.`,
    });
    // Add logic to actually add to cart/group
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

   // Using picsum for more variety
   const galleryImages = [
    product.image,
    `https://picsum.photos/seed/${product.id + 10}/500/500`,
    `https://picsum.photos/seed/${product.id + 20}/500/500`,
    `https://picsum.photos/seed/${product.id + 30}/500/500`,
  ];

   const getStatusInfo = () => {
    switch (groupStatus) {
      case 'completed':
        return { text: "ظرفیت تکمیل شد! خرید نهایی شد.", icon: CheckCircle, color: "text-green-600" };
      case 'failed':
        return { text: "مهلت خرید به پایان رسید و ظرفیت تکمیل نشد.", icon: XCircle, color: "text-red-600" };
      case 'filling':
        return { text: "در حال تکمیل ظرفیت... به زودی تکمیل می‌شود!", icon: AlertCircle, color: "text-yellow-600 animate-pulse" }; // Added pulse animation
      case 'active':
      default:
        const remaining = product.requiredMembers - product.members;
        return { text: `${remaining} نفر دیگر تا تکمیل ظرفیت و تخفیف ویژه!`, icon: Users2, color: "text-blue-600" }; // Changed icon and text
    }
  };

  const statusInfo = getStatusInfo();
  const relatedProducts = getRelatedProducts(product.id, product.category);


  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-background min-h-screen text-foreground">
      <Header />

      <main className="container mx-auto px-4 lg:px-8 xl:px-16 py-12"> {/* Added lg/xl padding */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Product Images (Left Column in RTL, spanning 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg border border-border">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={product.aiHint || 'product image'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw" // Adjusted sizes
                  priority // Prioritize loading the main image
                />
              )}
              <Badge variant="destructive" className="absolute top-4 left-4 text-lg px-3 py-1 shadow-md"> {/* Adjusted position */}
                {product.discount}٪ تخفیف
              </Badge>
                 {/* Social Proof: Viewers */}
                 {viewers > 0 && (
                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 backdrop-blur-sm shadow">
                        <Eye className="w-3.5 h-3.5"/>
                        {viewers} نفر در حال مشاهده
                    </div>
                 )}
            </div>
            {/* Image Gallery Thumbnails */}
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
                    sizes="10vw"
                    loading="lazy" // Lazy load thumbnails
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details (Right Columns in RTL, spanning 3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.title}</h1>

            {/* Badges and Rating */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">{getCategoryNameBySlug(product.category)}</Badge>
              {product.isIranian && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700">
                  <Image src="https://picsum.photos/seed/iranflag/20/20" width={16} height={16} alt="پرچم ایران" className="w-4 h-4 rounded-full" data-ai-hint="iran flag" />
                  تولید ایران
                </Badge>
              )}
              {product.isFeatured && (
                <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white shadow">
                  <Star className="w-4 h-4 ml-1 rtl:mr-1 fill-current" />
                  پیشنهاد ویژه
                </Badge>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>۴.۵ (۱۲۰ رأی)</span> {/* Sample Rating */}
              </div>
               {/* Social Proof: Purchased Recently (Client-side rendered) */}
               {showPurchasedRecently && purchasedCount > 0 && (
                 <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50 dark:bg-green-900/30 animate-pulse">
                    🔥 {purchasedCount} نفر در ساعت گذشته خریدند
                 </Badge>
               )}
            </div>

             {/* Seller Info Card */}
            {store && (
                 <Card className="bg-secondary/40 border-border shadow-sm">
                   <CardHeader className="flex flex-row items-center gap-4 p-4">
                     <Avatar className="w-14 h-14 border-2 border-background">
                       <AvatarImage src={store.logo} alt={`لوگوی ${store.name}`} data-ai-hint={store.aiHint} />
                       <AvatarFallback className="text-lg">{store.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div className="flex-grow">
                       <p className="text-xs text-muted-foreground mb-0.5">فروشنده:</p>
                       <CardTitle className="text-base font-semibold">{store.name}</CardTitle>
                       {store.offersInstallments && (
                           <Badge variant="outline" className="mt-1 text-green-600 border-green-300 bg-green-50 dark:bg-green-900/30 text-xs">
                               امکان خرید اقساطی
                           </Badge>
                        )}
                     </div>
                     <Button variant="link" size="sm" asChild className="self-start mt-1">
                       <Link href={`/store/${store.id}`}>
                           <Store className="mr-2 h-4 w-4" /> مشاهده فروشگاه
                        </Link>
                     </Button>
                   </CardHeader>
                 </Card>
             )}

            {/* Package Contents */}
             {product.isPackage && product.packageContents && (
              <Card className="bg-secondary/50 border-border shadow-sm">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    محتویات بسته
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pr-4">
                    {product.packageContents.map((content, index) => (
                      <li key={index}>
                        {content.name} ({content.quantity})
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

             {/* Variations Selection */}
            {product.variations && product.variations.length > 0 && (
              <div className="space-y-5 border-t border-border pt-6">
                {product.variations.map((variation) => (
                  <div key={variation.type}>
                    <Label className="text-base font-semibold mb-3 block">{variation.type}: <span className="text-primary font-bold">{selectedVariations[variation.type]}</span></Label>
                    <RadioGroup
                      dir="rtl"
                      value={selectedVariations[variation.type]}
                      onValueChange={(value) => handleVariationChange(variation.type, value)}
                      className="flex flex-wrap gap-3" // Increased gap
                    >
                      {variation.options.map((option) => (
                        <Label
                          key={option}
                          htmlFor={`${variation.type}-${option}`}
                          className={cn(
                            "cursor-pointer rounded-md border border-input px-4 py-2 text-sm transition-all duration-200 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:ring-offset-2 has-[:checked]:shadow-md", // Added shadow on check
                            "bg-background hover:bg-accent/50 hover:border-primary/50" // Subtle hover
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

            {/* Price Section */}
            <div className="space-y-2 border-t border-border pt-6">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-primary">{formatNumber(product.groupPrice)} <span className="text-base font-normal">تومان</span></span>
                <span className="text-lg text-muted-foreground line-through">{formatNumber(product.originalPrice)} <span className="text-sm">تومان</span></span>
              </div>
               {product.originalPrice && product.groupPrice && (
                <p className="text-green-600 font-semibold text-sm">
                   شما {formatNumber(product.originalPrice - product.groupPrice)} تومان سود می‌کنید! ({product.discount}٪ تخفیف گروهی)
                </p>
               )}
            </div>

            {/* Group Buy Progress */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground">وضعیت خرید گروهی</h3>
              <div className="flex justify-between text-sm text-muted-foreground items-center">
                 <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                           <div className="flex items-center gap-1.5 cursor-default">
                               <Users className="h-4 w-4" />
                               <span>{product.members} / {product.requiredMembers} نفر عضو</span>
                           </div>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{product.requiredMembers - product.members} نفر تا تکمیل ظرفیت</p>
                        </TooltipContent>
                    </Tooltip>
                 </TooltipProvider>

                 {product.endDate && isEndingSoon(product.endDate) ? (
                      <CountdownTimer endDate={product.endDate} className="font-semibold" />
                  ) : product.endDate ? (
                      <div className="flex items-center gap-1">
                         <Clock className="h-4 w-4" />
                         <span>{`بیش از ${Math.ceil((product.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} روز باقی مانده`}</span>
                      </div>
                  ) : (
                      <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>زمان نامشخص</span>
                      </div>
                  )}
              </div>
               {/* Animated Progress Bar */}
              <Progress value={progressValue} className="h-2.5 [&>div]:transition-all [&>div]:duration-500 [&>div]:ease-out rounded-full" />
              <div className={`flex items-center justify-center gap-1.5 text-sm font-medium mt-2 ${statusInfo.color}`}>
                 <statusInfo.icon className="h-5 w-5" />
                 <span>{statusInfo.text}</span>
              </div>

               {/* Recent Members - Enhanced */}
                {product.recentMembers && product.recentMembers.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-3">آخرین اعضا پیوسته به گروه:</p>
                    <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
                      {product.recentMembers.slice(0, 7).map((member, index) => ( // Show up to 7
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
                                     <AvatarFallback>+{product.members - 7}</AvatarFallback>
                                   </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{product.members - 7}+ عضو دیگر</p>
                                </TooltipContent>
                            </Tooltip>
                         </TooltipProvider>
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Actions (Quantity, Add to Cart, Wishlist, Share) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-border pt-6">
              {/* Quantity Selector */}
               <div className="flex items-center border border-input rounded-md h-12 shadow-sm">
                 <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-full w-12 rounded-l-md rounded-r-none border-l border-input text-muted-foreground hover:bg-secondary">
                   <ChevronRight className="h-5 w-5" />
                 </Button>
                 <span className="px-4 font-semibold text-lg w-16 text-center flex items-center justify-center h-full">{quantity}</span>
                 <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-full w-12 rounded-r-md rounded-l-none border-r border-input text-muted-foreground hover:bg-secondary">
                   <ChevronLeft className="h-5 w-5" />
                 </Button>
               </div>

              {/* Add to Cart/Join Group Button */}
              <Button size="lg" onClick={handleJoinClick} className="flex-grow w-full sm:w-auto transition-transform hover:scale-[1.02] duration-300 h-12 shadow-md" disabled={groupStatus === 'completed' || groupStatus === 'failed'}>
                 <ShoppingCart className="h-5 w-5 ml-2 rtl:mr-2" />
                 {groupStatus === 'completed' || groupStatus === 'failed' ? 'گروه بسته شد' : 'پیوستن به گروه و افزودن به سبد'}
               </Button>

              {/* Wishlist and Share Buttons */}
              <div className="flex gap-2">
                 <TooltipProvider delayDuration={100}>
                     <Tooltip>
                         <TooltipTrigger asChild>
                             <Button variant="outline" size="icon" aria-label="افزودن به علاقه‌مندی" className="h-12 w-12 border-border shadow-sm text-muted-foreground hover:text-rose-500 hover:border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30">
                               <Heart className="h-6 w-6" />
                             </Button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>افزودن به علاقه‌مندی</p>
                         </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
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

        {/* Product Tabs (Description, Reviews, Details, Shipping/Returns) */}
        <div className="mt-16 md:mt-20">
           <Tabs defaultValue="description" className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 bg-secondary rounded-lg p-1 shadow-sm">
              <TabsTrigger value="description" className="text-base data-[state=active]:shadow-md">توضیحات</TabsTrigger>
              <TabsTrigger value="details" className="text-base data-[state=active]:shadow-md">مشخصات فنی</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base data-[state=active]:shadow-md">نظرات کاربران ({product.recentMembers?.length ?? 0 + 5})</TabsTrigger>
              <TabsTrigger value="shipping" className="text-base data-[state=active]:shadow-md">ارسال و بازگشت</TabsTrigger>
            </TabsList>

            {/* Description Tab */}
            <TabsContent value="description" className="bg-card p-6 md:p-8 rounded-lg border border-border shadow-sm text-foreground">
              <h3 className="text-xl font-semibold mb-5">معرفی محصول</h3>
              <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4">
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                </p>
                 <p>
                  کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
               <Separator className="my-6"/>
               <h4 className="text-lg font-semibold mb-3 !text-foreground">ویژگی‌های کلیدی:</h4>
               <ul className="list-disc space-y-2 pr-5">
                    <li>پردازنده قدرتمند برای اجرای روان برنامه‌ها</li>
                    <li>صفحه نمایش باکیفیت با رنگ‌های زنده</li>
                    <li>دوربین حرفه‌ای با قابلیت عکاسی در نور کم</li>
                    <li>باتری با طول عمر بالا برای استفاده طولانی مدت</li>
                    <li>طراحی زیبا و مدرن با مواد اولیه باکیفیت</li>
               </ul>
              </article>
            </TabsContent>

             {/* Details Tab */}
            <TabsContent value="details" className="bg-card p-6 md:p-8 rounded-lg border border-border shadow-sm">
               <h3 className="text-xl font-semibold mb-6 text-foreground">مشخصات فنی</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                   <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">برند:</span>
                       <span className="font-medium text-foreground">{product.title.split(' ')[0]}</span> {/* Example: Extract brand */}
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
                       <span className="font-medium text-foreground text-left" dir="ltr">15 x 8 x 1 cm</span> {/* Sample data */}
                   </div>
                    <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">وزن:</span>
                       <span className="font-medium text-foreground">۱۸۰ گرم</span> {/* Sample data */}
                   </div>
                    <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">کد محصول:</span>
                       <span className="font-medium text-foreground font-mono">KG-{product.id.toString().padStart(5, '0')}</span>
                   </div>
                   {/* Add more specifications dynamically if available */}
                   <div className="flex justify-between border-b border-border/70 pb-2">
                       <span className="text-muted-foreground">سال عرضه:</span>
                       <span className="font-medium text-foreground">۲۰۲۴</span>
                   </div>
               </div>
            </TabsContent>

             {/* Reviews Tab */}
            <TabsContent value="reviews" className="bg-card p-6 md:p-8 rounded-lg border border-border shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h3 className="text-xl font-semibold mb-4 md:mb-0 text-foreground">نظرات کاربران ({product.recentMembers?.length ?? 0 + 5})</h3>
                <Button> <MessageSquare className="w-4 h-4 ml-2"/> ثبت نظر جدید</Button>
              </div>
              <div className="space-y-8">
                {/* Sample Review 1 */}
                <div className="flex gap-4 border-b border-border/70 pb-6">
                   <Avatar className="mt-1">
                     <AvatarImage src="https://picsum.photos/seed/userRev1/40/40" alt="کاربر ۱" />
                     <AvatarFallback>ع ر</AvatarFallback>
                   </Avatar>
                   <div className="flex-grow">
                       <div className="flex justify-between items-center mb-1.5">
                           <span className="font-semibold text-foreground">علی رضایی</span>
                           <span className="text-xs text-muted-foreground">۲ روز پیش</span>
                       </div>
                       <div className="flex gap-0.5 mb-3">
                           {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                           ))}
                       </div>
                       <p className="text-sm text-muted-foreground leading-relaxed mb-3">کیفیت محصول عالی بود و قیمت گروهی هم خیلی مناسب بود. سریع به دستم رسید. ممنون از خریدگروهی.</p>
                       <div className="flex gap-3">
                            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-muted-foreground hover:bg-secondary hover:text-primary">
                                <Heart className="w-3.5 h-3.5 ml-1" /> مفید بود (۵)
                            </Button>
                             <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-muted-foreground hover:bg-secondary hover:text-primary">
                                <MessageSquare className="w-3.5 h-3.5 ml-1" /> پاسخ
                            </Button>
                       </div>
                   </div>
                </div>
                 {/* Sample Review 2 */}
                <div className="flex gap-4 border-b border-border/70 pb-6">
                   <Avatar className="mt-1">
                     <AvatarImage src="https://picsum.photos/seed/userRev2/40/40" alt="کاربر ۲" />
                     <AvatarFallback>م ا</AvatarFallback>
                   </Avatar>
                   <div className="flex-grow">
                       <div className="flex justify-between items-center mb-1.5">
                           <span className="font-semibold text-foreground">مریم احمدی</span>
                           <span className="text-xs text-muted-foreground">۵ روز پیش</span>
                       </div>
                       <div className="flex gap-0.5 mb-3">
                           {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                           ))}
                       </div>
                       <p className="text-sm text-muted-foreground leading-relaxed mb-3">بسته بندی خوب بود و محصول سالم رسید. قیمت واقعا به صرفه بود. پیشنهاد می‌کنم.</p>
                        <div className="flex gap-3">
                            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-muted-foreground hover:bg-secondary hover:text-primary">
                                <Heart className="w-3.5 h-3.5 ml-1" /> مفید بود (۱۲)
                            </Button>
                       </div>
                   </div>
                </div>
                 {/* Placeholder for more reviews */}
                 <div className="text-center text-muted-foreground py-4">نظرات بیشتری بارگذاری خواهد شد...</div>
              </div>
            </TabsContent>

            {/* Shipping & Returns Tab */}
             <TabsContent value="shipping" className="bg-card p-6 md:p-8 rounded-lg border border-border shadow-sm">
               <h3 className="text-xl font-semibold mb-6 text-foreground">اطلاعات ارسال و بازگشت کالا</h3>
               <div className="space-y-6 text-muted-foreground text-sm">
                   <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                         <ShippingIcon className="w-5 h-5 text-primary"/>
                       </div>
                       <div>
                           <h4 className="font-semibold text-foreground mb-1">نحوه ارسال</h4>
                           <p>ارسال برای تهران توسط پیک ویژه (۱ تا ۲ روز کاری) و برای سایر شهرها توسط پست پیشتاز (۳ تا ۵ روز کاری) انجام می‌شود. هزینه ارسال بر اساس وزن مرسوله و مقصد، در مرحله نهایی خرید محاسبه و نمایش داده می‌شود.</p>
                       </div>
                   </div>
                   <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                            <RefreshCw className="w-5 h-5 text-primary"/>
                        </div>
                       <div>
                           <h4 className="font-semibold text-foreground mb-1">شرایط بازگشت کالا</h4>
                           <p>شما می‌توانید تا ۷ روز کاری پس از دریافت سفارش، در صورت عدم استفاده و باز نشدن پلمپ کالا (در صورت وجود)، با هماهنگی واحد پشتیبانی، نسبت به بازگشت کالا اقدام نمایید. لطفاً شرایط کامل و موارد استثنا را در صفحه <Link href="/returns-policy" className="text-primary hover:underline font-medium">قوانین بازگشت</Link> مطالعه فرمایید.</p>
                       </div>
                   </div>
                   <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                            <ShieldCheck className="w-5 h-5 text-primary"/>
                       </div>
                       <div>
                           <h4 className="font-semibold text-foreground mb-1">تضمین سلامت فیزیکی</h4>
                           <p>تمامی کالاها پیش از ارسال از نظر سلامت ظاهری بررسی شده و با بسته‌بندی ایمن ارسال می‌گردند. در صورت مشاهده هرگونه آسیب‌دیدگی فیزیکی در زمان تحویل بسته از مامور ارسال، لطفاً از دریافت آن خودداری نموده و بلافاصله مراتب را به واحد پشتیبانی اطلاع دهید.</p>
                       </div>
                   </div>
               </div>
             </TabsContent>

          </Tabs>
        </div>


        {/* Related Products */}
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
                {relatedProducts.map((relatedProduct) => (
                  <CarouselItem key={relatedProduct.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 rtl:pr-4 mb-1">
                     <Link href={`/product/${relatedProduct.id}`} className="block h-full">
                      <Card className="overflow-hidden h-full flex flex-col border group transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer bg-card">
                        <CardHeader className="p-0 relative aspect-[4/3]">
                          <Image src={relatedProduct.image} width={300} height={225} alt={relatedProduct.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={relatedProduct.aiHint}/>
                          <Badge variant="destructive" className="absolute top-3 left-3">
                            {relatedProduct.discount}٪ تخفیف
                          </Badge>
                           {/* Removed Add to Cart button from related product hover */}
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
                            <span>{relatedProduct.members}/{relatedProduct.requiredMembers}</span>
                             {relatedProduct.endDate && isEndingSoon(relatedProduct.endDate) ? (
                                  <CountdownTimer endDate={relatedProduct.endDate} size="xs" />
                              ) : relatedProduct.endDate ? (
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {`بیش از ${Math.ceil((relatedProduct.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} ر`}</span>
                              ) : (
                                   <span>زمان نامشخص</span>
                              )}
                          </div>
                        </CardContent>
                         <CardFooter className="p-3 pt-0">
                           <Button size="sm" variant="outline" className="w-full text-xs">مشاهده جزئیات</Button>
                        </CardFooter>
                      </Card>
                     </Link>
                  </CarouselItem>
                ))}
                 {relatedProducts.length === 0 && (
                    <p className="text-center text-muted-foreground col-span-full py-8">محصول مشابهی یافت نشد.</p>
                 )}
              </CarouselContent>
              <CarouselPrevious className="absolute right-[-12px] rtl:left-[-12px] rtl:right-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed h-9 w-9 shadow-md"/>
              <CarouselNext className="absolute left-[-12px] rtl:right-[-12px] rtl:left-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed h-9 w-9 shadow-md"/>
            </Carousel>
        </div>
      </main>

      <Footer />
    </div>
  );
}


// Helper function to get category name by slug
const getCategoryNameBySlug = (slug: string | undefined) => {
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
    return categories.find(cat => cat.slug === slug)?.name || slug || 'دسته بندی';
}
