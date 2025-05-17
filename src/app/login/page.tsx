
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Phone, KeyRound, LogIn, UserPlus, ArrowLeft, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';

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
  const router = useRouter(); // Initialize useRouter

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

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

  const handlePhoneNumberSubmit = async (values: LoginFormValues) => {
    setIsSendingOtp(true);
    try {
      //  TODO: Replace with your actual API endpoint for sending OTP
      const response = await fetch('/api/v1/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: values.phoneNumber }),
      });

      if (response.ok) {
        // const data = await response.json(); // Optional: if API returns any data
        setSubmittedPhoneNumber(values.phoneNumber);
        setStep('otp');
        toast({
          title: 'کد تایید ارسال شد',
          description: `کد تایید به شماره ${values.phoneNumber} ارسال گردید.`,
          variant: 'default',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'خطا در ارسال کد',
          description: errorData.message || 'مشکلی در ارسال کد تایید پیش آمد. لطفا دوباره تلاش کنید.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'خطای شبکه',
        description: 'امکان برقراری ارتباط با سرور وجود ندارد. لطفا اتصال اینترنت خود را بررسی کنید.',
        variant: 'destructive',
      });
      console.error('Error sending OTP:', error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpSubmit = async (values: OtpFormValues) => {
    setIsVerifyingOtp(true);
    try {
      // TODO: Replace with your actual API endpoint for OTP verification and login
      const response = await fetch('/api/v1/auth/login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: submittedPhoneNumber, otp: values.otp }),
      });

      if (response.ok) {
        const data = await response.json();
        // TODO: Store the token (e.g., in localStorage or state management)
        // localStorage.setItem('authToken', data.token); 
        toast({
          title: 'ورود موفق',
          description: 'شما با موفقیت وارد شدید.',
          variant: 'default',
        });
        router.push('/'); // Redirect to dashboard or home
      } else {
        const errorData = await response.json();
        let errorMessage = errorData.message || 'کد تایید نامعتبر است یا مشکلی پیش آمده.';
        if (errorData.errors && errorData.errors.otp) {
          errorMessage = errorData.errors.otp[0];
        }
        toast({
          title: 'خطا در ورود',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'خطای شبکه',
        description: 'امکان برقراری ارتباط با سرور وجود ندارد. لطفا اتصال اینترنت خود را بررسی کنید.',
        variant: 'destructive',
      });
      console.error('Error verifying OTP:', error);
    } finally {
      setIsVerifyingOtp(false);
    }
  };
  
  const handleResendOtp = async () => {
    if (!submittedPhoneNumber) return;
    // Effectively, we re-run the send OTP logic for the current number.
    // You might have a dedicated resend endpoint or just call the send OTP endpoint again.
    setIsSendingOtp(true); // Use a loading state if you want to disable the button during resend
    try {
      //  TODO: Replace with your actual API endpoint for resending OTP
      const response = await fetch('/api/v1/auth/send-otp', { // Or a specific resend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: submittedPhoneNumber }),
      });

      if (response.ok) {
        toast({
          title: 'کد تایید مجددا ارسال شد',
          description: `کد جدیدی به شماره ${submittedPhoneNumber} ارسال گردید.`,
          variant: 'default',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'خطا در ارسال مجدد کد',
          description: errorData.message || 'مشکلی در ارسال مجدد کد تایید پیش آمد.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'خطای شبکه',
        description: 'امکان برقراری ارتباط با سرور برای ارسال مجدد کد وجود ندارد.',
        variant: 'destructive',
      });
      console.error('Error resending OTP:', error);
    } finally {
      setIsSendingOtp(false);
    }
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
                      disabled={isSendingOtp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-base py-3 transition-transform hover:scale-105 duration-300" disabled={isSendingOtp}>
              {isSendingOtp ? (
                <Loader2 className="ml-2 rtl:mr-2 h-5 w-5 animate-spin" />
              ) : (
                <LogIn className="ml-2 rtl:mr-2 h-5 w-5" />
              )}
              {isSendingOtp ? 'در حال ارسال کد...' : 'دریافت کد تایید'}
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
                      type="text" 
                      dir="ltr"
                      maxLength={6}
                      placeholder="● ● ● ● ● ●"
                      {...field}
                      className="text-2xl tracking-[0.5em] text-center font-mono py-3 px-4" 
                      autoComplete="one-time-code" 
                      inputMode="numeric" 
                      pattern="\d{6}" 
                      disabled={isVerifyingOtp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="flex flex-col sm:flex-row gap-3">
                <Button type="button" variant="outline" onClick={() => setStep('phoneNumber')} className="w-full text-base py-3" disabled={isVerifyingOtp}>
                    <ArrowLeft className="ml-2 rtl:mr-2 h-5 w-5" />
                    تغییر شماره
                </Button>
                <Button type="submit" className="w-full text-base py-3 transition-transform hover:scale-105 duration-300" disabled={isVerifyingOtp}>
                  {isVerifyingOtp ? (
                    <Loader2 className="ml-2 rtl:mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <LogIn className="ml-2 rtl:mr-2 h-5 w-5" />
                  )}
                  {isVerifyingOtp ? 'در حال بررسی...' : 'ورود'}
                </Button>
             </div>
            <div className="text-center text-sm">
              <Button 
                variant="link" 
                size="sm" 
                type="button" 
                onClick={handleResendOtp} 
                className="text-primary hover:text-accent"
                disabled={isSendingOtp} // Disable if an OTP send operation (initial or resend) is in progress
              >
                {isSendingOtp && submittedPhoneNumber ? <Loader2 className="ml-2 rtl:mr-2 h-4 w-4 animate-spin" /> : null}
                {isSendingOtp && submittedPhoneNumber ? 'در حال ارسال مجدد...' : 'ارسال مجدد کد'}
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
