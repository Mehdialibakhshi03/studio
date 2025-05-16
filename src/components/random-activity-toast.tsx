
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Zap, CheckCircle, Users, Info } from 'lucide-react';

interface ToastMessage {
  id: string;
  message: string;
  icon: React.ElementType;
  type: 'success' | 'info' | 'join';
}

const sampleMessages: Omit<ToastMessage, 'id'>[] = [
  { message: "کاربری از تهران به گروه 'گوشی سامسونگ S24' پیوست!", icon: Users, type: 'join' },
  { message: "گروه خرید 'لپتاپ ایسوس' با موفقیت تکمیل شد!", icon: CheckCircle, type: 'success' },
  { message: "تخفیف جدیدی برای 'هدفون بی سیم' اضافه شد! سریع چک کن.", icon: Info, type: 'info' },
  { message: "۵ نفر همین الان به گروه 'قهوه ساز حرفه ای' ملحق شدند.", icon: Users, type: 'join' },
  { message: "ظرفیت گروه 'کفش ورزشی نایک' رو به اتمام است!", icon: Zap, type: 'info' },
  { message: "فروش ویژه آخر هفته برای محصولات دیجیتال شروع شد!", icon: Zap, type: 'info' },
  { message: "کاربری از اصفهان به گروه 'زعفران قائنات' پیوست.", icon: Users, type: 'join' },
];

const RandomActivityToast: React.FC = () => {
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<'bottom-left' | 'bottom-right'>('bottom-right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const displayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showRandomToast = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (displayTimerRef.current) clearTimeout(displayTimerRef.current);

    const randomIndex = Math.floor(Math.random() * sampleMessages.length);
    const randomPosition = Math.random() < 0.5 ? 'bottom-left' : 'bottom-right';
    
    const newToast: ToastMessage = {
      ...sampleMessages[randomIndex],
      id: new Date().toISOString() + Math.random(), // Unique ID
    };

    setCurrentToast(newToast);
    setPosition(randomPosition);
    setIsVisible(true);

    // Hide toast after some time
    displayTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      // Schedule next toast after this one is hidden
      scheduleNextToast();
    }, 5000); // Display for 5 seconds
  };

  const scheduleNextToast = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const randomDelay = Math.random() * (15000 - 7000) + 7000; // Between 7-15 seconds
    timerRef.current = setTimeout(showRandomToast, randomDelay);
  };

  useEffect(() => {
    scheduleNextToast(); // Start the cycle

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
    };
  }, []);

  if (!currentToast || !isVisible) {
    return null;
  }

  const IconComponent = currentToast.icon;

  return (
    <div
      className={cn(
        "fixed p-4 rounded-lg shadow-xl text-sm font-medium text-foreground bg-card border border-border transition-all duration-500 ease-in-out z-[200]",
        "max-w-xs w-full sm:w-auto",
        position === 'bottom-left' ? 'bottom-4 left-4 rtl:right-4 rtl:left-auto' : 'bottom-4 right-4 rtl:left-4 rtl:right-auto',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      )}
      role="alert"
      dir="rtl"
    >
      <div className="flex items-center gap-3">
        <IconComponent 
          className={cn(
            "h-5 w-5",
            currentToast.type === 'success' && 'text-green-500',
            currentToast.type === 'info' && 'text-blue-500',
            currentToast.type === 'join' && 'text-primary'
          )} 
        />
        <p>{currentToast.message}</p>
      </div>
    </div>
  );
};

export default RandomActivityToast;
