
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Phone, KeyRound, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import AuthLayout from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast'; // Ensure this is correctly imported as useToast

const loginSchema = z.object({
  phoneNumber: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر (مانند 09123456789) وارد کنید'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'کد تایید باید ۶ رقم باشد'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export default function LoginPage() {
  const [step, setStep] = useState<'phoneNumber' | 'otp'>('phoneNumber');
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState('');
  const { toast } = useToast();

  const phoneForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const handlePhoneNumberSubmit = (values: LoginFormValues) => {
    console.log('Phone number submitted:', values.phoneNumber);
    setSubmittedPhoneNumber(values.phoneNumber);
    setStep('otp');
    toast({
      title: 'کد تایید ارسال شد',
      description: `کد تایید به شماره ${values.phoneNumber} ارسال گردید.`,
      variant: 'default',
    });
    // TODO: Implement actual OTP sending logic
  };

  const handleOtpSubmit = (values: OtpFormValues) => {
    console.log('OTP submitted:', values.otp, 'for phone:', submittedPhoneNumber);
    toast({
      title: 'ورود موفق',
      description: 'شما با موفقیت وارد شدید.',
      variant: 'default',
    });
    // TODO: Implement actual OTP verification and login logic
    // router.push('/'); // Redirect to dashboard or home
  };

  return (
    <AuthLayout 
      title={step === 'phoneNumber' ? "ورود با شماره موبایل" : "ورود با کد تایید"}
      illustrationUrl="https://placehold.co/1200x800.png"
      illustrationAlt={step === 'phoneNumber' ? "ورود به حساب کاربری" : "تایید کد یکبار مصرف"}
      illustrationAiHint={step === 'phoneNumber' ? "secure login user interface" : "otp verification mobile security"}
    >
      {step === 'phoneNumber' && (
        <Form {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(handlePhoneNumberSubmit)} className="space-y-6">
            <FormField
              control={phoneForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Phone className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    شماره موبایل
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      dir="ltr"
                      placeholder="09123456789"
                      {...field}
                      className="text-lg tracking-wider py-3 px-4 text-left"
                    />
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

      {step === 'otp' && (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-6">
            <p className="text-sm text-muted-foreground text-center">
              کد ۶ رقمی ارسال شده به شماره <span className="font-semibold text-primary" dir="ltr">{submittedPhoneNumber}</span> را وارد کنید.
            </p>
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <KeyRound className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                    کد تایید
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text" // Changed to text for better control over input, browsers might handle "number" differently
                      dir="ltr"
                      maxLength={6}
                      placeholder="● ● ● ● ● ●"
                      {...field}
                      className="text-2xl tracking-[0.5em] text-center font-mono py-3 px-4" // Increased tracking for digit separation illusion
                      autoComplete="one-time-code" // Helps with OTP autofill
                      inputMode="numeric" // Suggests numeric keyboard on mobile
                      pattern="\d{6}" // Basic pattern validation
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="flex flex-col sm:flex-row gap-3">
                <Button type="button" variant="outline" onClick={() => setStep('phoneNumber')} className="w-full text-base py-3">
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
                onClick={() => {
                  // Simulate OTP resend
                  toast({
                    title: 'کد تایید مجددا ارسال شد',
                    description: `کد جدیدی به شماره ${submittedPhoneNumber} ارسال گردید.`,
                    variant: 'default',
                  });
                  // In a real app, you would call handlePhoneNumberSubmit or a dedicated resend function
                  // handlePhoneNumberSubmit({phoneNumber: submittedPhoneNumber})
                }} 
                className="text-primary hover:text-accent"
              >
                ارسال مجدد کد
              </Button>
            </div>
          </form>
        </Form>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          {step === 'phoneNumber' ? 'هنوز حساب کاربری ندارید؟' : 'بازگشت به صفحه اصلی؟'}{' '}
          <Link 
            href={step === 'phoneNumber' ? "/register" : "/"} 
            className="font-medium text-primary hover:text-accent hover:underline transition-colors"
          >
            {step === 'phoneNumber' ? 'ثبت نام کنید' : 'صفحه اصلی'}
            {step === 'phoneNumber' && <UserPlus className="inline-block mr-1 rtl:ml-1 h-4 w-4 relative -top-0.5" />}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
