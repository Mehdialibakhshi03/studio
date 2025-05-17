
'use client';

import React, { useState } from 'react'; // Added useState
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User, Phone, Lock, UserPlus, LogIn, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';

const registerSchema = z.object({
  fullName: z.string().min(3, 'نام و نام خانوادگی حداقل باید ۳ حرف باشد'),
  phoneNumber: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر (مانند 09123456789) وارد کنید'),
  password: z.string().min(8, 'رمز عبور حداقل باید ۸ کاراکتر باشد'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'شما باید با قوانین و مقررات موافقت کنید',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'رمز عبور و تکرار آن یکسان نیستند',
  path: ['confirmPassword'], 
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter(); // Initialize useRouter
  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsRegistering(true);
    try {
      // TODO: Replace with your actual API endpoint for registration
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: values.fullName, // Laravel often uses 'name' for full name
          phone_number: values.phoneNumber, // Or 'phone' depending on your API
          password: values.password,
          password_confirmation: values.confirmPassword, // Laravel standard for password confirmation
          // agree_to_terms: values.agreeToTerms, // Optional: send if your API requires it
        }),
      });

      if (response.ok) {
        // const data = await response.json(); // Optional: if API returns user data or token
        toast({
          title: 'ثبت نام موفق',
          description: `حساب کاربری شما با موفقیت ایجاد شد، ${values.fullName}! لطفاً وارد شوید.`,
          variant: 'default'
        });
        router.push('/login'); // Redirect to login page
      } else {
        const errorData = await response.json();
        let errorMessage = errorData.message || 'مشکلی در ثبت نام پیش آمد. لطفا دوباره تلاش کنید.';
        // Handle Laravel validation errors
        if (errorData.errors) {
          const firstErrorField = Object.keys(errorData.errors)[0];
          if (firstErrorField && errorData.errors[firstErrorField]) {
            errorMessage = errorData.errors[firstErrorField][0];
          }
        }
        toast({
          title: 'خطا در ثبت نام',
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
      console.error('Error registering user:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <AuthLayout 
        title="ایجاد حساب کاربری جدید"
        illustrationUrl="https://placehold.co/1200x800.png"
        illustrationAlt="ثبت نام کاربر جدید"
        illustrationAiHint="user registration new account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <User className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                  نام و نام خانوادگی
                </FormLabel>
                <FormControl>
                  <Input placeholder="مثلا: علی رضایی" {...field} className="py-3 px-4" disabled={isRegistering} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Phone className="ml-2 rtl:mr-2 h-4 w-4 text-muted-foreground" />
                  شماره موبایل
                </FormLabel>
                <FormControl>
                  <Input type="tel" dir="ltr" placeholder="09123456789" {...field} className="py-3 px-4 text-left tracking-wider" disabled={isRegistering}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input type="password" placeholder="حداقل ۸ کاراکتر" {...field} className="py-3 px-4" disabled={isRegistering}/>
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
                  <Input type="password" placeholder="تکرار رمز عبور" {...field} className="py-3 px-4" disabled={isRegistering}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0 rounded-md border p-4 shadow-sm bg-secondary/30">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isRegistering}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    <Link href="/terms" className="text-primary hover:underline font-medium">قوانین و مقررات</Link> استفاده از پلتفرم را خوانده‌ام و می‌پذیرم.
                  </FormLabel>
                   <FormMessage className="!mt-1.5" />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-base py-3 transition-transform hover:scale-105 duration-300" disabled={isRegistering}>
             {isRegistering ? (
                <Loader2 className="ml-2 rtl:mr-2 h-5 w-5 animate-spin" />
              ) : (
                <UserPlus className="ml-2 rtl:mr-2 h-5 w-5" />
              )}
            {isRegistering ? 'در حال ثبت نام...' : 'ایجاد حساب کاربری'}
          </Button>
        </form>
      </Form>
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          قبلاً ثبت نام کرده‌اید؟{' '}
          <Link href="/login" className="font-medium text-primary hover:text-accent hover:underline transition-colors">
            وارد شوید
            <LogIn className="inline-block mr-1 rtl:ml-1 h-4 w-4 relative -top-0.5" />
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
