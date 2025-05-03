'use client';

import React, { useState, useEffect } from 'react'; // Import React
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Users, Clock, ShoppingCart, ChevronLeft, ChevronRight, Share2, Heart, MessageSquare, Info, ShieldCheck, Package, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { groupPurchases } from '@/app/page'; // Import the sample data
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

// Helper function to find product by ID
const getProductById = (id: number) => {
  return groupPurchases.find(product => product.id === id);
};

// Helper function to format numbers with Persian commas
const formatNumber = (num: number | undefined) => {
  if (num === undefined || num === null) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Sample related products (replace with actual logic)
const relatedProducts = groupPurchases.slice(0, 4);

// Define the type for the params promise
type ParamsPromise = Promise<{ id: string }>;

export default function ProductDetailPage({ params }: { params: ParamsPromise }) {
  const resolvedParams = React.use(params); // Unwrap the promise
  const productId = parseInt(resolvedParams.id, 10); // Access id from resolved params
  const product = getProductById(productId);
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<{ [key: string]: string }>({});
  const [progressValue, setProgressValue] = useState(0);
  const [groupStatus, setGroupStatus] = useState<'active' | 'filling' | 'completed' | 'failed'>('active');

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
      const interval = setInterval(() => {
        currentProgress += 1;
        if (currentProgress >= targetProgress) {
          setProgressValue(targetProgress);
          clearInterval(interval);
        } else {
          setProgressValue(currentProgress);
        }
      }, 20); // Adjust speed as needed

      // Determine group status based on members and time (simplified logic)
      if (product.members >= product.requiredMembers) {
          setGroupStatus('completed');
      } else if (product.remainingTime === 'پایان یافته') { // Assuming 'پایان یافته' means expired
          setGroupStatus('failed');
      } else if (targetProgress > 50) {
          setGroupStatus('filling');
      } else {
          setGroupStatus('active');
      }


      return () => clearInterval(interval);

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

  // Mock gallery images (replace with actual multiple images if available)
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
        return { text: "در حال تکمیل ظرفیت...", icon: AlertCircle, color: "text-yellow-600" };
      case 'active':
      default:
        const remaining = product.requiredMembers - product.members;
        return { text: `${remaining} نفر دیگر تا تکمیل ظرفیت!`, icon: Info, color: "text-blue-600" };
    }
  };

  const statusInfo = getStatusInfo();


  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-background min-h-screen text-foreground">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg border border-border">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={product.aiHint || 'product image'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  priority // Prioritize loading the main image
                />
              )}
              <Badge variant="destructive" className="absolute top-4 right-4 text-lg px-3 py-1">
                {product.discount}٪ تخفیف
              </Badge>
            </div>
            {/* Image Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  className={`relative aspect-square w-full rounded-md overflow-hidden border-2 transition-all duration-200 ${selectedImage === img ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border hover:border-primary/70'}`}
                  onClick={() => setSelectedImage(img)}
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

          {/* Product Details */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.title}</h1>

            {/* Badges and Rating */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">{getCategoryNameBySlug(product.category)}</Badge>
              {product.isIranian && (
                <Badge variant="secondary" className="flex items-center">
                  <Image src="https://picsum.photos/seed/iranflag/20/20" width={16} height={16} alt="پرچم ایران" className="w-4 h-4 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                  تولید ایران
                </Badge>
              )}
              {product.isFeatured && (
                <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Star className="w-4 h-4 ml-1 rtl:mr-1 fill-current" />
                  پیشنهاد ویژه
                </Badge>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span>۴.۵ (۱۲۰ رأی)</span> {/* Sample Rating */}
              </div>
            </div>

            {/* Package Contents */}
             {product.isPackage && product.packageContents && (
              <Card className="bg-secondary/50 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    محتویات بسته
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
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
              <div className="space-y-4 border-t border-border pt-6">
                {product.variations.map((variation) => (
                  <div key={variation.type}>
                    <Label className="text-base font-semibold mb-3 block">{variation.type}: <span className="text-primary font-bold">{selectedVariations[variation.type]}</span></Label>
                    <RadioGroup
                      value={selectedVariations[variation.type]}
                      onValueChange={(value) => handleVariationChange(variation.type, value)}
                      className="flex flex-wrap gap-2"
                    >
                      {variation.options.map((option) => (
                        <Label
                          key={option}
                          htmlFor={`${variation.type}-${option}`}
                          className={cn(
                            "cursor-pointer rounded-md border border-input px-3 py-1.5 text-sm transition-all duration-200",
                            selectedVariations[variation.type] === option
                              ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary ring-offset-1"
                              : "bg-background hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${variation.type}-${option}`}
                            className="sr-only" // Hide the actual radio button visually
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
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">{formatNumber(product.groupPrice)} <span className="text-base font-normal">تومان</span></span>
                <span className="text-lg text-muted-foreground line-through">{formatNumber(product.originalPrice)} <span className="text-sm">تومان</span></span>
              </div>
               {product.originalPrice && product.groupPrice && (
                <p className="text-green-600 font-semibold">
                   شما {formatNumber(product.originalPrice - product.groupPrice)} تومان سود می‌کنید! ({product.discount}٪ تخفیف گروهی)
                </p>
               )}
            </div>

            {/* Group Buy Progress */}
            <div className="space-y-3 border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground">وضعیت خرید گروهی</h3>
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{product.members} / {product.requiredMembers} نفر عضو شده‌اند</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{product.remainingTime} باقی مانده</span>
                </div>
              </div>
               {/* Animated Progress Bar */}
              <Progress value={progressValue} className="h-2.5 [&>div]:transition-all [&>div]:duration-500 [&>div]:ease-out" />
              <div className={`flex items-center justify-center gap-1 text-sm font-medium mt-2 ${statusInfo.color}`}>
                 <statusInfo.icon className="h-5 w-5" />
                 <span>{statusInfo.text}</span>
              </div>

               {/* Recent Members */}
                {product.recentMembers && product.recentMembers.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">آخرین اعضا:</p>
                    <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
                      {product.recentMembers.slice(0, 5).map((member, index) => (
                        <Avatar key={index} className="w-8 h-8 border-2 border-background transition-transform hover:scale-110 duration-200">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name}</AvatarFallback>
                        </Avatar>
                      ))}
                      {product.members > 5 && (
                        <Avatar className="w-8 h-8 border-2 border-background bg-muted">
                          <AvatarFallback>+{product.members - 5}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Actions (Quantity, Add to Cart, Wishlist, Share) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-border pt-6">
              {/* Quantity Selector */}
              <div className="flex items-center border border-border rounded-md">
                <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-10 w-10 rounded-r-md rounded-l-none">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="px-4 font-semibold text-lg w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-10 w-10 rounded-l-md rounded-r-none">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              {/* Add to Cart/Join Group Button */}
              <Button size="lg" onClick={handleJoinClick} className="flex-grow w-full sm:w-auto transition-transform hover:scale-105 duration-300" disabled={groupStatus === 'completed' || groupStatus === 'failed'}>
                 <ShoppingCart className="h-5 w-5 ml-2 rtl:mr-2" />
                 {groupStatus === 'completed' || groupStatus === 'failed' ? 'گروه بسته شد' : 'پیوستن به گروه و افزودن به سبد'}
               </Button>

              {/* Wishlist and Share Buttons */}
              <div className="flex gap-2">
                  <Button variant="outline" size="icon" aria-label="افزودن به علاقه‌مندی">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="اشتراک گذاری">
                    <Share2 className="h-5 w-5" />
                  </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs (Description, Reviews, Details) */}
        <div className="mt-16">
           <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex mb-6 bg-secondary rounded-lg p-1">
              <TabsTrigger value="description" className="text-base">توضیحات</TabsTrigger>
              <TabsTrigger value="details" className="text-base">مشخصات فنی</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base">نظرات کاربران (۱۲۰)</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="bg-card p-6 rounded-lg border border-border shadow-sm text-foreground">
              <h3 className="text-xl font-semibold mb-4">معرفی محصول</h3>
              <p className="leading-relaxed text-muted-foreground">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                <br /><br />
                در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
               {/* Add more descriptive content here */}
            </TabsContent>
            <TabsContent value="details" className="bg-card p-6 rounded-lg border border-border shadow-sm">
               <h3 className="text-xl font-semibold mb-4 text-foreground">مشخصات فنی</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                   <div className="flex justify-between border-b border-border py-2">
                       <span className="text-muted-foreground">برند:</span>
                       <span className="font-medium text-foreground">{product.title.split(' ')[0]}</span> {/* Example: Extract brand */}
                   </div>
                   <div className="flex justify-between border-b border-border py-2">
                       <span className="text-muted-foreground">رنگ:</span>
                       <span className="font-medium text-foreground">مشکی</span> {/* Sample data */}
                   </div>
                    <div className="flex justify-between border-b border-border py-2">
                       <span className="text-muted-foreground">گارانتی:</span>
                       <span className="font-medium text-foreground">۱۸ ماهه رسمی</span> {/* Sample data */}
                   </div>
                   <div className="flex justify-between border-b border-border py-2">
                       <span className="text-muted-foreground">کشور سازنده:</span>
                       <span className="font-medium text-foreground">{product.isIranian ? 'ایران' : 'خارجی'}</span>
                   </div>
                   {/* Add more specifications */}
                     <div className="flex justify-between border-b border-border py-2">
                       <span className="text-muted-foreground">ابعاد:</span>
                       <span className="font-medium text-foreground">۱۵ × ۸ × ۱ سانتی‌متر</span> {/* Sample data */}
                   </div>
                    <div className="flex justify-between border-b border-border py-2">
                       <span className="text-muted-foreground">وزن:</span>
                       <span className="font-medium text-foreground">۱۸۰ گرم</span> {/* Sample data */}
                   </div>
               </div>
            </TabsContent>
            <TabsContent value="reviews" className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-foreground">نظرات کاربران</h3>
              <div className="space-y-6">
                {/* Sample Review 1 */}
                <div className="flex gap-4 border-b border-border pb-4">
                   <Avatar>
                     <AvatarImage src="https://picsum.photos/seed/user1/40/40" alt="کاربر ۱" />
                     <AvatarFallback>ک۱</AvatarFallback>
                   </Avatar>
                   <div className="flex-grow">
                       <div className="flex justify-between items-center mb-1">
                           <span className="font-semibold text-foreground">علی رضایی</span>
                           <span className="text-xs text-muted-foreground">۲ روز پیش</span>
                       </div>
                       <div className="flex gap-0.5 mb-2">
                           {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-500 fill-yellow-400' : 'text-gray-300'}`} />
                           ))}
                       </div>
                       <p className="text-sm text-muted-foreground leading-relaxed">کیفیت محصول عالی بود و قیمت گروهی هم خیلی مناسب بود. سریع به دستم رسید. ممنون از خریدگروهی.</p>
                   </div>
                </div>
                 {/* Sample Review 2 */}
                <div className="flex gap-4 border-b border-border pb-4">
                   <Avatar>
                     <AvatarImage src="https://picsum.photos/seed/user2/40/40" alt="کاربر ۲" />
                     <AvatarFallback>ک۲</AvatarFallback>
                   </Avatar>
                   <div className="flex-grow">
                       <div className="flex justify-between items-center mb-1">
                           <span className="font-semibold text-foreground">مریم احمدی</span>
                           <span className="text-xs text-muted-foreground">۵ روز پیش</span>
                       </div>
                       <div className="flex gap-0.5 mb-2">
                           {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-500 fill-yellow-400' : 'text-gray-300'}`} />
                           ))}
                       </div>
                       <p className="text-sm text-muted-foreground leading-relaxed">بسته بندی خوب بود و محصول سالم رسید. قیمت واقعا به صرفه بود. پیشنهاد می‌کنم.</p>
                   </div>
                </div>
                 {/* Add more reviews */}
              </div>
              <div className="mt-8">
                <Button>ثبت نظر جدید</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>


        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">محصولات مشابه</h2>
           <Carousel
              opts={{
                align: "start",
                direction: "rtl",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-4 rtl:-mr-4">
                {relatedProducts.map((relatedProduct) => (
                  <CarouselItem key={relatedProduct.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 rtl:pr-4">
                     <Link href={`/product/${relatedProduct.id}`}>
                      <Card className="overflow-hidden h-full flex flex-col border group transition-all duration-300 hover:border-primary hover:shadow-md cursor-pointer">
                        <CardHeader className="p-0 relative aspect-[4/3]">
                          <Image src={relatedProduct.image} width={300} height={225} alt={relatedProduct.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={relatedProduct.aiHint}/>
                          <Badge variant="destructive" className="absolute top-2 right-2">
                            {relatedProduct.discount}٪ تخفیف
                          </Badge>
                           <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                              <Button size="sm" variant="default" className="h-7 px-2 text-xs">مشاهده</Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 flex-grow flex flex-col">
                          <h5 className="font-semibold text-sm mb-1 h-10 overflow-hidden flex-grow">{relatedProduct.title}</h5>
                           {relatedProduct.originalPrice && relatedProduct.groupPrice && (
                             <div className="flex justify-between items-baseline text-xs mb-2 mt-1">
                               <span className="text-muted-foreground line-through">{formatNumber(relatedProduct.originalPrice)}</span>
                               <span className="text-primary font-bold">{formatNumber(relatedProduct.groupPrice)} <span className="text-xs">تومان</span></span>
                             </div>
                           )}
                           {relatedProduct.requiredMembers > 0 && (
                              <Progress value={(relatedProduct.members / relatedProduct.requiredMembers) * 100} className="h-1.5 mt-auto" />
                           )}
                           <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{relatedProduct.members}/{relatedProduct.requiredMembers}</span>
                            <span>{relatedProduct.remainingTime}</span>
                          </div>
                        </CardContent>
                         <CardFooter className="p-3 pt-0">
                           <Button size="sm" variant="outline" className="w-full text-xs">مشاهده جزئیات</Button>
                        </CardFooter>
                      </Card>
                     </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-10px] rtl:right-[-10px] rtl:left-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border-border hover:bg-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-8 w-8"/>
              <CarouselNext className="absolute right-[-10px] rtl:left-[-10px] rtl:right-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border-border hover:bg-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-8 w-8"/>
            </Carousel>
        </div>
      </div>

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
