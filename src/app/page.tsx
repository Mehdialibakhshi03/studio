'use client'; // Add this directive for client-side interactions like onClick

import Header from '@/components/header';
import Footer from '@/components/footer';
import GroupBuyCard from '@/components/group-buy-card';
import { useToast } from "@/hooks/use-toast"; // Import useToast

export default function Home() {
  const { toast } = useToast(); // Initialize useToast

  // Sample data for group buy items
  const groupBuyItems = [
    {
      id: 1,
      imageUrl: 'https://picsum.photos/400/250?random=1',
      imageAlt: 'گوشی موبایل سامسونگ',
      title: 'گوشی موبایل سامسونگ گلکسی S24',
      description: 'جدیدترین پرچمدار سامسونگ با دوربین فوق‌العاده و هوش مصنوعی پیشرفته.',
      currentParticipants: 78,
      requiredParticipants: 100,
      originalPrice: 55000000,
      groupPrice: 49500000,
      aiHint: 'smartphone samsung galaxy',
    },
    {
      id: 2,
      imageUrl: 'https://picsum.photos/400/250?random=2',
      imageAlt: 'روغن زیتون ارگانیک',
      title: 'روغن زیتون فرابکر ارگانیک (۵ لیتر)',
      description: 'روغن زیتون با کیفیت بالا، محصول باغات شمال کشور، مناسب برای پخت و پز و سالاد.',
      currentParticipants: 45,
      requiredParticipants: 50,
      originalPrice: 1200000,
      groupPrice: 950000,
      aiHint: 'olive oil bottle',
    },
    {
      id: 3,
      imageUrl: 'https://picsum.photos/400/250?random=3',
      imageAlt: 'پلی استیشن ۵',
      title: 'کنسول بازی سونی پلی استیشن ۵',
      description: 'تجربه بازی نسل نهم با گرافیک خیره کننده و سرعت بارگذاری فوق‌العاده.',
      currentParticipants: 15,
      requiredParticipants: 20,
      originalPrice: 32000000,
      groupPrice: 29000000,
      aiHint: 'gaming console playstation',
    },
     {
      id: 4,
      imageUrl: 'https://picsum.photos/400/250?random=4',
      imageAlt: 'قهوه ساز',
      title: 'دستگاه قهوه ساز اسپرسو خانگی',
      description: 'تهیه اسپرسو، کاپوچینو و لاته با کیفیت کافه در منزل شما.',
      currentParticipants: 92,
      requiredParticipants: 150,
      originalPrice: 4500000,
      groupPrice: 3800000,
      aiHint: 'coffee maker espresso machine',
    },
     {
      id: 5,
      imageUrl: 'https://picsum.photos/400/250?random=5',
      imageAlt: 'برنج ایرانی',
      title: 'برنج هاشمی درجه یک گیلان (۱۰ کیلوگرم)',
      description: 'برنج خوش عطر و طعم ایرانی، پخت عالی، محصول شالیزارهای حاصلخیز گیلان.',
      currentParticipants: 210,
      requiredParticipants: 250,
      originalPrice: 1800000,
      groupPrice: 1550000,
      aiHint: 'rice bag sack',
    },
     {
      id: 6,
      imageUrl: 'https://picsum.photos/400/250?random=6',
      imageAlt: 'تلویزیون هوشمند',
      title: 'تلویزیون هوشمند ۵۵ اینچ 4K',
      description: 'کیفیت تصویر بی‌نظیر با رزولوشن 4K و امکانات هوشمند متنوع.',
      currentParticipants: 8,
      requiredParticipants: 10,
      originalPrice: 25000000,
      groupPrice: 22500000,
       aiHint: 'smart tv television',
    },
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
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">فرصت های خرید گروهی</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
