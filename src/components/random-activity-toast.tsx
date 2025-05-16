
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
  
  const scheduleNextToastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const displayDurationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const exitAnimationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = () => {
    if (scheduleNextToastTimerRef.current) clearTimeout(scheduleNextToastTimerRef.current);
    if (displayDurationTimerRef.current) clearTimeout(displayDurationTimerRef.current);
    if (exitAnimationTimerRef.current) clearTimeout(exitAnimationTimerRef.current);
  };

  const showRandomToast = () => {
    clearAllTimers(); 

    const randomIndex = Math.floor(Math.random() * sampleMessages.length);
    const randomPosition = Math.random() < 0.5 ? 'bottom-left' : 'bottom-right';
    
    const newToast: ToastMessage = {
      ...sampleMessages[randomIndex],
      id: new Date().toISOString() + Math.random().toString(),
    };

    setCurrentToast(newToast);
    setPosition(randomPosition);
    setIsVisible(true);

    displayDurationTimerRef.current = setTimeout(() => {
      setIsVisible(false); 

      exitAnimationTimerRef.current = setTimeout(() => {
        setCurrentToast(null); 
        scheduleNextToast();   
      }, 500); 
    }, 5000); 
  };

  const scheduleNextToast = () => {
    clearAllTimers();
    const randomDelay = Math.random() * (15000 - 7000) + 7000; 
    scheduleNextToastTimerRef.current = setTimeout(showRandomToast, randomDelay);
  };

  useEffect(() => {
    scheduleNextToast(); 

    return () => {
      clearAllTimers(); 
    };
  }, []); 

  if (!currentToast) { 
    return null;
  }

  const IconComponent = currentToast.icon;

  const animationClasses = isVisible 
    ? `animate-in fade-in-75 ${position === 'bottom-left' ? 'slide-in-from-left-12' : 'slide-in-from-right-12'}`
    : `animate-out fade-out-75 ${position === 'bottom-left' ? 'slide-out-to-left-12' : 'slide-out-to-right-12'}`;

  return (
    <div
      key={currentToast.id} 
      className={cn(
        "fixed p-4 rounded-lg shadow-xl text-sm font-medium text-foreground bg-card border border-border z-[200]",
        "max-w-xs w-full sm:w-auto duration-500 ease-out", 
        position === 'bottom-left' ? 'bottom-4 left-4 rtl:right-4 rtl:left-auto' : 'bottom-4 right-4 rtl:left-4 rtl:right-auto',
        animationClasses
      )}
      style={{ animationFillMode: 'forwards' }} 
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
