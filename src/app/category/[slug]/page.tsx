
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
import { ShoppingCart, Users, Clock, Star, Filter, ListRestart, Tag, Package as PackageIcon } from 'lucide-react';
import CountdownTimer from '@/components/countdown-timer';
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
  const params = useParams<PageParams>(); // Removed React.use()
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

  const [availableSellers, setAvailableSellers] = useState<Store[]>([]);

  useEffect(() => {
    const currentCategory = categories.find(cat => cat.slug === categorySlug);
    if (currentCategory) {
      setCategoryName(currentCategory.name);
      const categoryProducts = allGroupProducts.filter(p => p.category === categorySlug);
      setProducts(categoryProducts);

      // Extract unique sellers for this category
      const sellerIdsInCateogry = new Set<number>();
      categoryProducts.forEach(p => {
        const store = allStores.find(s => s.products.some(sp => sp.id === p.id));
        if(store) sellerIdsInCateogry.add(store.id);
      });
      setAvailableSellers(allStores.filter(s => sellerIdsInCateogry.has(s.id)));

    } else {
      notFound();
    }
  }, [categorySlug]);

  useEffect(() => {
    let tempProducts = [...products];

    // Filter by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter by seller
    if (selectedSeller !== 'all') {
      const store = allStores.find(s => s.id === parseInt(selectedSeller));
      if (store) {
        const sellerProductIds = new Set(store.products.map(p => p.id));
        tempProducts = tempProducts.filter(p => sellerProductIds.has(p.id));
      }
    }

    // Filter by price range
    if (minPrice) {
      tempProducts = tempProducts.filter(p => p.groupPrice >= parseFloat(minPrice));
    }
    if (maxPrice) {
      tempProducts = tempProducts.filter(p => p.groupPrice <= parseFloat(maxPrice));
    }

    // Sort products
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
      case 'popularity': // Placeholder for popularity - could be based on members/required ratio
      default:
        tempProducts.sort((a,b) => (b.members/b.requiredMembers) - (a.members/a.requiredMembers));
        break;
    }

    setFilteredProducts(tempProducts);
  }, [products, searchTerm, selectedSeller, minPrice, maxPrice, sortBy]);

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
  };


  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto px-4 lg:px-8 xl:px-16 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
          {categoryName || 'دسته بندی محصولات'}
        </h1>

        {/* Filters Section */}
        <Card className="mb-8 p-4 md:p-6 bg-card shadow-md border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="search-filter" className="mb-1.5 block text-sm font-medium text-muted-foreground">جستجو در عنوان</Label>
              <Input
                id="search-filter"
                type="text"
                placeholder="مثلا: گوشی سامسونگ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <Label htmlFor="seller-filter" className="mb-1.5 block text-sm font-medium text-muted-foreground">فروشنده</Label>
              <Select value={selectedSeller} onValueChange={setSelectedSeller}>
                <SelectTrigger id="seller-filter" className="h-10">
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
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="min-price" className="mb-1.5 block text-sm font-medium text-muted-foreground">حداقل قیمت</Label>
                <Input id="min-price" type="number" placeholder="مثلا: ۱۰۰,۰۰۰" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="h-10" />
              </div>
              <div>
                <Label htmlFor="max-price" className="mb-1.5 block text-sm font-medium text-muted-foreground">حداکثر قیمت</Label>
                <Input id="max-price" type="number" placeholder="مثلا: ۵,۰۰۰,۰۰۰" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-10" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-grow">
                    <Label htmlFor="sort-by" className="mb-1.5 block text-sm font-medium text-muted-foreground">مرتب سازی</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sort-by" className="h-10">
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
                 <Button onClick={resetFilters} variant="outline" className="h-10 w-full sm:w-auto mt-auto shrink-0">
                    <ListRestart className="w-4 h-4 ml-2 rtl:mr-2" />
                    پاک کردن
                </Button>
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(item => (
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
        ) : (
          <div className="text-center py-12">
            <Filter className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">محصولی با این مشخصات یافت نشد.</p>
            <p className="text-sm text-muted-foreground mt-2">لطفا فیلترهای خود را تغییر دهید یا آنها را پاک کنید.</p>
            <Button onClick={resetFilters} variant="outline" className="mt-6">
                <ListRestart className="w-4 h-4 ml-2 rtl:mr-2" />
                پاک کردن همه فیلترها
            </Button>
          </div>
        )}
        {/* TODO: Pagination if many products */}
      </main>
      <Footer />
    </div>
  );
}
