
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingCart, Users, Clock, Star, Filter, ListRestart, Package as PackageIcon, MapPin, AlertTriangle } from 'lucide-react';
import CountdownTimer from '@/components/countdown-timer';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  allGroupProducts,
  categories,
  formatNumber,
  isEndingSoon,
  getCategoryNameBySlug,
  type GroupPurchaseItem,
  type Store,
  stores as allStores
} from '@/lib/data';
import type { StaticImageData } from 'next/image';

type PageParams = { slug: string };

export default function CategoryPage() {
  const params = useParams<PageParams>();
  const categorySlug = params.slug;
  const { toast } = useToast();

  const [categoryName, setCategoryName] = useState<string>('');
  const [products, setProducts] = useState<GroupPurchaseItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<GroupPurchaseItem[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [onlyUrgent, setOnlyUrgent] = useState<boolean>(false);
  const [maxDaysRemaining, setMaxDaysRemaining] = useState<string>('');


  const [availableSellers, setAvailableSellers] = useState<Store[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

  useEffect(() => {
    const currentCategory = categories.find(cat => cat.slug === categorySlug);
    if (currentCategory) {
      setCategoryName(currentCategory.name);
      const categoryProducts = allGroupProducts.filter(p => p.category === categorySlug);
      setProducts(categoryProducts);

      const sellerIdsInCategory = new Set<number>();
      categoryProducts.forEach(p => {
        const store = allStores.find(s => s.products.some(sp => sp.id === p.id));
        if(store) sellerIdsInCategory.add(store.id);
      });
      setAvailableSellers(allStores.filter(s => sellerIdsInCategory.has(s.id)));

      const locationsInCategory = new Set<string>();
      categoryProducts.forEach(p => {
        if (p.location) locationsInCategory.add(p.location);
      });
      setAvailableLocations(Array.from(locationsInCategory));

    } else {
      notFound();
    }
  }, [categorySlug]);

  useEffect(() => {
    let tempProducts = [...products];

    if (searchTerm) {
      tempProducts = tempProducts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedSeller !== 'all') {
      const store = allStores.find(s => s.id === parseInt(selectedSeller));
      if (store) {
        const sellerProductIds = new Set(store.products.map(p => p.id));
        tempProducts = tempProducts.filter(p => sellerProductIds.has(p.id));
      }
    }
    
    if (selectedLocation !== 'all') {
        tempProducts = tempProducts.filter(p => p.location === selectedLocation);
    }

    if (onlyUrgent) {
        tempProducts = tempProducts.filter(p => isEndingSoon(p.endDate));
    }

    if (maxDaysRemaining) {
        const maxDays = parseInt(maxDaysRemaining, 10);
        if (!isNaN(maxDays) && maxDays >= 0) {
            tempProducts = tempProducts.filter(p => {
                if (!p.endDate) return false; 
                const timeDiff = p.endDate.getTime() - new Date().getTime();
                const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                return daysRemaining >=0 && daysRemaining <= maxDays;
            });
        }
    }


    if (minPrice) {
      tempProducts = tempProducts.filter(p => p.groupPrice >= parseFloat(minPrice));
    }
    if (maxPrice) {
      tempProducts = tempProducts.filter(p => p.groupPrice <= parseFloat(maxPrice));
    }

    switch (sortBy) {
      case 'price-asc':
        tempProducts.sort((a, b) => a.groupPrice - b.groupPrice);
        break;
      case 'price-desc':
        tempProducts.sort((a, b) => b.groupPrice - a.groupPrice);
        break;
      case 'ending-soon':
        tempProducts.sort((a, b) => (a.endDate ? a.endDate.getTime() : Infinity) - (b.endDate ? b.endDate.getTime() : Infinity));
        break;
      case 'popularity': 
      default:
        tempProducts.sort((a,b) => (b.members/b.requiredMembers) - (a.members/a.requiredMembers));
        break;
    }

    setFilteredProducts(tempProducts);
  }, [products, searchTerm, selectedSeller, minPrice, maxPrice, sortBy, selectedLocation, onlyUrgent, maxDaysRemaining]);

  const handleJoinClick = (title: string) => {
    toast({
      title: "عضویت موفق!",
      description: `شما با موفقیت به گروه خرید ${title} پیوستید.`,
      variant: "default",
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSeller('all');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('popularity');
    setSelectedLocation('all');
    setOnlyUrgent(false);
    setMaxDaysRemaining('');
  };


  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto px-4 lg:px-8 xl:px-16 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {categoryName || 'دسته بندی محصولات'}
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center shadow-sm">
                <Filter className="w-4 h-4 ml-2 rtl:mr-2" />
                فیلترها
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-card">
              <SheetHeader className="p-6 pb-4 border-b">
                <SheetTitle className="text-card-foreground">فیلتر پیشرفته</SheetTitle>
                <SheetClose className="absolute right-4 top-4 rtl:left-4 rtl:right-auto" />
              </SheetHeader>
              <ScrollArea className="flex-grow">
                <div className="p-6 space-y-6">
                  <div>
                    <Label htmlFor="search-filter" className="mb-1.5 block text-sm font-medium text-muted-foreground">جستجو در عنوان</Label>
                    <Input
                      id="search-filter"
                      type="text"
                      placeholder="مثلا: گوشی سامسونگ"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-10 bg-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location-filter" className="mb-1.5 block text-sm font-medium text-muted-foreground">مکان</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger id="location-filter" className="h-10 bg-background">
                        <SelectValue placeholder="همه مکان‌ها" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">همه مکان‌ها</SelectItem>
                        {availableLocations.map(loc => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="seller-filter" className="mb-1.5 block text-sm font-medium text-muted-foreground">فروشنده</Label>
                    <Select value={selectedSeller} onValueChange={setSelectedSeller}>
                      <SelectTrigger id="seller-filter" className="h-10 bg-background">
                        <SelectValue placeholder="همه فروشندگان" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">همه فروشندگان</SelectItem>
                        {availableSellers.map(seller => (
                          <SelectItem key={seller.id} value={seller.id.toString()}>{seller.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-price" className="mb-1.5 block text-sm font-medium text-muted-foreground">حداقل قیمت</Label>
                      <Input id="min-price" type="number" placeholder="مثلا: ۱۰۰,۰۰۰" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="h-10 bg-background" />
                    </div>
                    <div>
                      <Label htmlFor="max-price" className="mb-1.5 block text-sm font-medium text-muted-foreground">حداکثر قیمت</Label>
                      <Input id="max-price" type="number" placeholder="مثلا: ۵,۰۰۰,۰۰۰" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-10 bg-background" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="max-days-remaining" className="mb-1.5 block text-sm font-medium text-muted-foreground">حداکثر روز مانده</Label>
                    <Input id="max-days-remaining" type="number" placeholder="مثلا: ۳" value={maxDaysRemaining} onChange={(e) => setMaxDaysRemaining(e.target.value)} className="h-10 bg-background" />
                  </div>
                  <div className="flex items-center pt-2">
                    <Checkbox
                        id="urgent-filter"
                        checked={onlyUrgent}
                        onCheckedChange={(checked) => setOnlyUrgent(checked as boolean)}
                    />
                    <Label htmlFor="urgent-filter" className="mr-2 text-sm font-medium text-muted-foreground">
                        فقط گروه‌های فوری (کمتر از ۲۴ ساعت)
                    </Label>
                  </div>
                  <div>
                    <Label htmlFor="sort-by" className="mb-1.5 block text-sm font-medium text-muted-foreground">مرتب سازی</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sort-by" className="h-10 bg-background">
                        <SelectValue placeholder="مرتب سازی بر اساس..." />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="popularity">محبوب‌ترین</SelectItem>
                        <SelectItem value="price-asc">قیمت: کم به زیاد</SelectItem>
                        <SelectItem value="price-desc">قیمت: زیاد به کم</SelectItem>
                        <SelectItem value="ending-soon">زمان پایان: نزدیک‌ترین</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
              <div className="p-6 border-t flex flex-col sm:flex-row justify-end gap-2">
                  <Button onClick={resetFilters} variant="outline" className="w-full sm:w-auto">
                      <ListRestart className="w-4 h-4 ml-2 rtl:mr-2" />
                      پاک کردن همه
                  </Button>
                  <SheetClose asChild>
                      <Button variant="cta" className="w-full sm:w-auto">اعمال فیلتر</Button>
                  </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map(item => (
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className="bg-card rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 group cursor-pointer h-full flex flex-col">
                   <CardHeader className="p-0 relative aspect-[16/10]">
                    <Image src={item.image as string} width={400} height={250} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    <Badge variant="destructive" className="absolute top-3 right-3 text-sm px-2.5 py-1 shadow">
                      {item.discount}٪ تخفیف
                    </Badge>
                     <Badge variant="outline" className="absolute top-3 left-3 bg-background/80 text-xs px-2 py-0.5 text-secondary-foreground">
                      {getCategoryNameBySlug(item.category)}
                    </Badge>
                    {item.location && (
                        <Badge variant="secondary" className="absolute bottom-3 left-3 flex items-center bg-background/80 text-xs px-2 py-0.5 text-secondary-foreground">
                           <MapPin className="w-3 h-3 ml-1 rtl:mr-1"/>
                           {item.location}
                        </Badge>
                    )}
                    {item.isIranian && (
                       <Badge variant="secondary" className="absolute top-11 right-3 flex items-center bg-background/80 text-xs px-2 py-0.5 text-secondary-foreground">
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
                            <PackageIcon className="w-3.5 h-3.5 ml-1.5 rtl:mr-1.5"/>
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
        ) : (
          <div className="text-center py-12 md:py-20">
            <Filter className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">محصولی با این مشخصات یافت نشد.</p>
            <p className="text-sm text-muted-foreground mt-2">لطفا فیلترهای خود را تغییر دهید یا آنها را پاک کنید.</p>
            <Button onClick={resetFilters} variant="outline" className="mt-6">
                <ListRestart className="w-4 h-4 ml-2 rtl:mr-2" />
                پاک کردن همه فیلترها
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

