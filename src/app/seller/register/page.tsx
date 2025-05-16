
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import SellerAuthLayout from '@/components/seller-auth-layout';
import { useToast } from '@/hooks/use-toast';
import { Store, Phone, Lock, UserPlus, LogIn, Mail, User, MapPin, CreditCard, UploadCloud, FileText, ShieldCheck, Users, DollarSign, Rocket, Zap, Award, Sparkles, HelpCircle } from 'lucide-react';

const sellerRegisterSchema = z.object({
  storeName: z.string().min(3, 'نام فروشگاه/فرد حداقل باید ۳ حرف باشد'),
  sellerType: z.enum(['individual', 'company'], { required_error: 'نوع فروشنده را انتخاب کنید' }),
  contactPersonName: z.string().optional(), // Required if company
  phoneNumber: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر (مانند 09123456789) وارد کنید'),
  email: z.string().email('ایمیل معتبر وارد کنید'),
  password: z.string().min(8, 'رمز عبور حداقل باید ۸ کاراکتر باشد'),
  confirmPassword: z.string(),
  address: z.string().min(10, 'آدرس کامل حداقل باید ۱۰ حرف باشد'),
  postalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد').optional().or(z.literal('')),
  shabaNumber: z.string().regex(/^IR\d{24}$/, 'شماره شبا معتبر (مانند IR123456789012345678901234) وارد کنید').optional().or(z.literal('')),
  idCardFile: z.any().optional(),
  businessLicenseFile: z.any().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'شما باید با قوانین و مقررات فروشندگان موافقت کنید',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'رمز عبور و تکرار آن یکسان نیستند',
  path: ['confirmPassword'],
}).refine(data => data.sellerType === 'individual' || (data.sellerType === 'company' && data.contactPersonName && data.contactPersonName.length >= 3), {
    message: 'نام مسئول برای شخص حقوقی الزامی است (حداقل ۳ حرف)',
    path: ['contactPersonName'],
});

type SellerRegisterFormValues = z.infer<typeof sellerRegisterSchema>;

const SellerBenefits = [
    { title: "بدون هزینه اولیه", description: "راه اندازی فروشگاه شما کاملا رایگان است.", icon: DollarSign, variant: "success" as "success" | "info" },
    { title: "فروش گروهی خودکار", description: "به سادگی محصولات خود را برای فروش گروهی عرضه کنید.", icon: Users, variant: "info" as "success" | "info"},
    { title: "پرداخت سریع و امن", description: "تسویه حساب منظم و از طریق درگاه‌های امن بانکی.", icon: ShieldCheck, variant: "success" as "success" | "info" },
    { title: "دسترسی به هزاران مشتری", description: "محصولاتتان را در معرض دید جامعه بزرگی از خریداران قرار دهید.", icon: Rocket, variant: "info" as "success" | "info"},
];

const SellerIncentives = [
    { text: "اولین فروش شما بدون کارمزد خواهد بود 🎉", icon: Award },
    { text: "سیستم خودکار پیشنهاد گروهی روی محصولات شما فعال می‌شود", icon: Zap },
    { text: "در کمتر از ۵ دقیقه فروشنده شوید – بدون نیاز به مجوز رسمی در ابتدا", icon: Sparkles },
    { text: "پشتیبانی اختصاصی فروشنده‌ها ۷/۲۴", icon: HelpCircle },
];


export default function SellerRegisterPage() {
  const { toast } = useToast();
  const [sellerType, setSellerType] = useState<'individual' | 'company' | undefined>();

  const form = useForm<SellerRegisterFormValues>({
    resolver: zodResolver(sellerRegisterSchema),
    defaultValues: {
      storeName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      postalCode: '',
      shabaNumber: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = (values: SellerRegisterFormValues) => {
    console.log('Seller Registration data:', values);
    // Simulate file names if files were selected
    const formDataForLog = {
        ...values,
        idCardFile: values.idCardFile?.[0]?.name || 'ارسال نشده',
        businessLicenseFile: values.businessLicenseFile?.[0]?.name || 'ارسال نشده',
    };
    console.log('Seller Registration data (with file names):', formDataForLog);
    toast({
      title: 'ثبت نام فروشنده موفق',
      description: `فروشگاه شما با نام "${values.storeName}" با موفقیت در انتظار تایید است.`,
      variant: 'default'
    });
    // TODO: Implement actual registration logic
    // router.push('/seller/dashboard'); 
  };

  return (
    <SellerAuthLayout 
        title="همین حالا فروشنده شو!"
        description="محصولاتت رو به هزاران مشتری بفروش و کسب و کارت رو رونق بده."
        illustrationUrl="https://placehold.co/1200x900.png"
        illustrationAlt="ثبت نام فروشنده جدید"
        illustrationAiHint="seller registration online marketplace"
    >
      <div className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-primary text-center">مزایای پیوستن به جمع فروشندگان ما:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SellerBenefits.map(benefit => (
                 <Alert key={benefit.title} variant={benefit.variant === 'success' ? 'default' : 'default'} className={benefit.variant === 'success' ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700' : 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'}>
                    <benefit.icon className={`h-5 w-5 ${benefit.variant === 'success' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400' }`} />
                    <AlertTitle className={benefit.variant === 'success' ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}>{benefit.title}</AlertTitle>
                    <AlertDescription className={benefit.variant === 'success' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}>
                        {benefit.description}
                    </AlertDescription>
                </Alert>
            ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Store className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                  نام فروشگاه / نام و نام خانوادگی (فرد حقیقی)
                </FormLabel>
                <FormControl>
                  <Input placeholder="مثلا: فروشگاه کالای دیجیتال مرکزی یا علی رضایی" {...field} className="py-3 px-4" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sellerType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="flex items-center">
                  <User className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                  نوع فروشنده
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSellerType(value as 'individual' | 'company');
                    }}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <FormItem className="flex items-center space-x-2 rtl:space-x-reverse">
                      <FormControl>
                        <RadioGroupItem value="individual" id="individual" />
                      </FormControl>
                      <FormLabel htmlFor="individual" className="font-normal cursor-pointer">شخص حقیقی</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 rtl:space-x-reverse">
                      <FormControl>
                        <RadioGroupItem value="company" id="company" />
                      </FormControl>
                      <FormLabel htmlFor="company" className="font-normal cursor-pointer">شخص حقوقی (شرکت)</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {sellerType === 'company' && (
            <FormField
              control={form.control}
              name="contactPersonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <User className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    نام مسئول / مدیرعامل
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="نام کامل مسئول مربوطه" {...field} className="py-3 px-4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Phone className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    شماره موبایل (جهت دریافت کد تایید)
                  </FormLabel>
                  <FormControl>
                    <Input type="tel" dir="ltr" placeholder="09123456789" {...field} className="py-3 px-4 text-left tracking-wider"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Mail className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    ایمیل
                  </FormLabel>
                  <FormControl>
                    <Input type="email" dir="ltr" placeholder="example@company.com" {...field} className="py-3 px-4 text-left"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center">
                    <Lock className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    رمز عبور
                    </FormLabel>
                    <FormControl>
                    <Input type="password" placeholder="حداقل ۸ کاراکتر" {...field} className="py-3 px-4" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center">
                    <Lock className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    تکرار رمز عبور
                    </FormLabel>
                    <FormControl>
                    <Input type="password" placeholder="تکرار رمز عبور" {...field} className="py-3 px-4" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <MapPin className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                  آدرس کامل فروشگاه / محل سکونت
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک، واحد..." {...field} className="py-3 px-4 min-h-[100px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center">
                    <FileText className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    کد پستی (اختیاری)
                    </FormLabel>
                    <FormControl>
                    <Input type="tel" dir="ltr" placeholder="1234567890" {...field} className="py-3 px-4 text-left tracking-wider"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="shabaNumber"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center">
                    <CreditCard className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    شماره شبا (جهت تسویه حساب - اختیاری)
                    </FormLabel>
                    <FormControl>
                    <Input type="text" dir="ltr" placeholder="IR123456789012345678901234" {...field} className="py-3 px-4 text-left tracking-wider"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="idCardFile"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <UploadCloud className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    تصویر کارت ملی (اختیاری در ابتدا)
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      onChange={(e) => onChange(e.target.files)} 
                      {...rest} 
                      className="py-2 px-3" 
                      accept="image/png, image/jpeg, application/pdf"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">فرمت‌های مجاز: JPG, PNG, PDF - حداکثر حجم: ۲ مگابایت</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {sellerType === 'company' && (
                <FormField
                control={form.control}
                name="businessLicenseFile"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                    <FormLabel className="flex items-center">
                        <UploadCloud className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                        تصویر جواز کسب / آگهی تاسیس (اختیاری در ابتدا)
                    </FormLabel>
                    <FormControl>
                        <Input 
                          type="file" 
                          onChange={(e) => onChange(e.target.files)} 
                          {...rest} 
                          className="py-2 px-3" 
                          accept="image/png, image/jpeg, application/pdf"
                        />
                    </FormControl>
                    <FormDescription className="text-xs">فرمت‌های مجاز: JPG, PNG, PDF - حداکثر حجم: ۲ مگابایت</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}
          </div>

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0 rounded-md border p-4 shadow-sm bg-secondary/30">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    با <Link href="/seller-terms" className="text-primary hover:underline font-medium">قوانین و مقررات فروشندگان</Link> موافقم.
                  </FormLabel>
                   <FormMessage className="!mt-1.5" />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" variant="cta" className="w-full text-base py-3 transition-transform hover:scale-105 duration-300">
            <UserPlus className="ml-2 rtl:mr-2 h-5 w-5" />
            ثبت نام و ایجاد فروشگاه
          </Button>
        </form>
      </Form>

       <div className="mt-8 space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-center text-primary mb-4">چند دلیل دیگر برای فروش در پلتفرم ما:</h3>
                <ul className="space-y-2">
                {SellerIncentives.map((incentive, index) => (
                    <li key={index} className="flex items-start p-3 bg-secondary/20 rounded-md">
                        <incentive.icon className="h-5 w-5 text-accent mt-0.5 ml-2 rtl:mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{incentive.text}</span>
                    </li>
                ))}
                </ul>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-primary mb-2">چطور فروشنده شویم؟</h3>
                <p className="text-sm text-muted-foreground mb-3">ویدیوی کوتاه آموزشی ما را ببینید و به راحتی فروشگاه خود را راه‌اندازی کنید.</p>
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    <HelpCircle className="ml-2 rtl:mr-2 h-4 w-4"/> مشاهده راهنما
                </Button>
            </div>
        </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          قبلاً به عنوان فروشنده ثبت نام کرده‌اید؟{' '}
          <Link href="/seller/login" className="font-medium text-primary hover:text-accent hover:underline transition-colors">
            وارد پنل فروشندگی شوید
            <LogIn className="inline-block mr-1 rtl:ml-1 h-4 w-4 relative -top-0.5" />
          </Link>
        </p>
      </div>
    </SellerAuthLayout>
  );
}
