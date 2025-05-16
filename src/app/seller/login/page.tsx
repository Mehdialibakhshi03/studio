
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import SellerAuthLayout from '@/components/seller-auth-layout';
import { useToast } from '@/hooks/use-toast';
import { Mail, KeyRound, LogIn, UserPlus, Smartphone, ArrowLeft, ListChecks, PieChart, Headset } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const sellerLoginSchema = z.object({
  identifier: z.string().min(1, 'ایمیل یا شماره موبایل الزامی است'),
  password: z.string().min(1, 'رمز عبور الزامی است'),
});

const sellerOtpSchema = z.object({
  phoneNumber: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر (مانند 09123456789) وارد کنید'),
});

const otpVerifySchema = z.object({
  otp: z.string().length(6, 'کد تایید باید ۶ رقم باشد'),
});

type SellerLoginFormValues = z.infer<typeof sellerLoginSchema>;
type SellerOtpFormValues = z.infer<typeof sellerOtpSchema>;
type OtpVerifyFormValues = z.infer<typeof otpVerifySchema>;

const SellerLoginBenefits = [
    { title: "مدیریت کامل محصولات", description: "به راحتی محصولات خود را اضافه، ویرایش و مدیریت کنید.", icon: ListChecks },
    { title: "پیگیری سفارشات و درآمد", description: "آمار فروش و درآمد خود را به صورت شفاف مشاهده کنید.", icon: PieChart },
    { title: "پشتیبانی ویژه فروشندگان", description: "در صورت بروز مشکل، تیم پشتیبانی ما همراه شماست.", icon: Headset },
];

export default function SellerLoginPage() {
  const [loginStep, setLoginStep] = useState<'password' | 'otpPhone' | 'otpVerify'>('password');
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState('');
  const { toast } = useToast();

  const loginForm = useForm<SellerLoginFormValues>({
    resolver: zodResolver(sellerLoginSchema),
    defaultValues: { identifier: '', password: '' },
  });

  const otpForm = useForm<SellerOtpFormValues>({
    resolver: zodResolver(sellerOtpSchema),
    defaultValues: { phoneNumber: '' },
  });

  const otpVerifyForm = useForm<OtpVerifyFormValues>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: { otp: '' },
  });

  const handlePasswordLoginSubmit = (values: SellerLoginFormValues) => {
    console.log('Seller Password Login:', values);
    toast({
      title: 'ورود موفق',
      description: 'شما با موفقیت وارد پنل فروشندگی شدید.',
      variant: 'default',
    });
    // router.push('/seller/dashboard');
  };

  const handleOtpPhoneSubmit = (values: SellerOtpFormValues) => {
    console.log('Seller OTP Phone:', values.phoneNumber);
    setSubmittedPhoneNumber(values.phoneNumber);
    setLoginStep('otpVerify');
    toast({
      title: 'کد تایید ارسال شد',
      description: `کد تایید به شماره ${values.phoneNumber} ارسال گردید.`,
      variant: 'default',
    });
  };

  const handleOtpVerifySubmit = (values: OtpVerifyFormValues) => {
    console.log('Seller OTP Verify:', values.otp, 'for phone:', submittedPhoneNumber);
    toast({
      title: 'ورود موفق',
      description: 'شما با موفقیت از طریق کد یکبار مصرف وارد شدید.',
      variant: 'default',
    });
    // router.push('/seller/dashboard');
  };

  return (
    <SellerAuthLayout 
      title="ورود به پنل فروشندگان"
      description="کسب و کار خود را مدیریت کنید، محصولات جدید اضافه کنید و فروش خود را افزایش دهید."
      illustrationUrl="https://placehold.co/1200x900.png"
      illustrationAlt="ورود به پنل فروشنده"
      illustrationAiHint="seller dashboard login analytics"
    >
      <Tabs defaultValue="password" value={loginStep.startsWith('otp') ? 'otp' : 'password'} onValueChange={(value) => setLoginStep(value as 'password' | 'otpPhone')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="password" onClick={() => setLoginStep('password')}>ورود با رمز عبور</TabsTrigger>
          <TabsTrigger value="otp" onClick={() => setLoginStep('otpPhone')}>ورود با کد یکبار مصرف</TabsTrigger>
        </TabsList>
        
        <TabsContent value="password">
            {loginStep === 'password' && (
                <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handlePasswordLoginSubmit)} className="space-y-6">
                    <FormField
                        control={loginForm.control}
                        name="identifier"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center">
                            <Mail className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                            ایمیل یا شماره موبایل
                            </FormLabel>
                            <FormControl>
                            <Input placeholder="example@company.com یا 09123456789" {...field} className="py-3 px-4 text-left" dir="ltr" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center">
                            <KeyRound className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                            رمز عبور
                            </FormLabel>
                            <FormControl>
                            <Input type="password" placeholder="رمز عبور خود را وارد کنید" {...field} className="py-3 px-4" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full text-base py-3 transition-transform hover:scale-105 duration-300">
                        <LogIn className="ml-2 rtl:mr-2 h-5 w-5" />
                        ورود به پنل
                    </Button>
                    <div className="text-center text-sm">
                        <Button variant="link" size="sm" type="button" className="text-primary hover:text-accent">
                        فراموشی رمز عبور
                        </Button>
                    </div>
                    </form>
                </Form>
            )}
        </TabsContent>

        <TabsContent value="otp">
          {loginStep === 'otpPhone' && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleOtpPhoneSubmit)} className="space-y-6">
                <FormField
                  control={otpForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Smartphone className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                        شماره موبایل ثبت شده
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" dir="ltr" placeholder="09123456789" {...field} className="text-lg tracking-wider py-3 px-4 text-left" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full text-base py-3 transition-transform hover:scale-105 duration-300">
                  <LogIn className="ml-2 rtl:mr-2 h-5 w-5" />
                  دریافت کد تایید
                </Button>
              </form>
            </Form>
          )}

          {loginStep === 'otpVerify' && (
            <Form {...otpVerifyForm}>
              <form onSubmit={otpVerifyForm.handleSubmit(handleOtpVerifySubmit)} className="space-y-6">
                <p className="text-sm text-muted-foreground text-center">
                  کد ۶ رقمی ارسال شده به شماره <span className="font-semibold text-primary" dir="ltr">{submittedPhoneNumber}</span> را وارد کنید.
                </p>
                <FormField
                  control={otpVerifyForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <KeyRound className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                        کد تایید
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          dir="ltr"
                          maxLength={6}
                          placeholder="● ● ● ● ● ●"
                          {...field}
                          className="text-2xl tracking-[0.5em] text-center font-mono py-3 px-4"
                          autoComplete="one-time-code"
                          inputMode="numeric"
                          pattern="\d{6}"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="button" variant="outline" onClick={() => setLoginStep('otpPhone')} className="w-full text-base py-3">
                    <ArrowLeft className="ml-2 rtl:mr-2 h-5 w-5" />
                    تغییر شماره
                  </Button>
                  <Button type="submit" className="w-full text-base py-3 transition-transform hover:scale-105 duration-300">
                    <LogIn className="ml-2 rtl:mr-2 h-5 w-5" />
                    ورود
                  </Button>
                </div>
                <div className="text-center text-sm">
                  <Button 
                    variant="link" 
                    size="sm" 
                    type="button" 
                    onClick={() => handleOtpPhoneSubmit({phoneNumber: submittedPhoneNumber})} 
                    className="text-primary hover:text-accent"
                  >
                    ارسال مجدد کد
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          هنوز فروشگاه خود را ثبت نکرده‌اید؟{' '}
          <Link href="/seller/register" className="font-medium text-primary hover:text-accent hover:underline transition-colors">
            ایجاد حساب فروشندگی
            <UserPlus className="inline-block mr-1 rtl:ml-1 h-4 w-4 relative -top-0.5" />
          </Link>
        </p>
      </div>

      <div className="mt-10 pt-6 border-t">
        <h3 className="text-md font-semibold text-center text-muted-foreground mb-4">با ورود به پنل فروشندگی به امکانات زیر دسترسی خواهید داشت:</h3>
        <div className="space-y-3">
            {SellerLoginBenefits.map(benefit => (
                 <Alert key={benefit.title} variant="default" className="bg-secondary/50 dark:bg-secondary/20 border-border/50">
                    <benefit.icon className="h-5 w-5 text-primary" />
                    <AlertTitle className="text-primary/90">{benefit.title}</AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                        {benefit.description}
                    </AlertDescription>
                </Alert>
            ))}
        </div>
      </div>
    </SellerAuthLayout>
  );
}

