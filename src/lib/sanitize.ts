import { z } from 'zod';

// ============ Sanitization Helpers ============

/** Remove HTML tags and trim whitespace */
export const sanitizeText = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '')       // strip HTML tags
    .replace(/[<>"'`;]/g, '')      // remove dangerous chars
    .trim();
};

/** Sanitize email */
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

/** Sanitize phone - keep only digits, +, -, spaces */
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^0-9+\-\s()]/g, '').trim();
};

// ============ Validation Schemas ============

export const contactFormSchema = z.object({
  name: z.string()
    .min(1, 'নাম আবশ্যক')
    .max(100, 'নাম ১০০ অক্ষরের বেশি হতে পারবে না')
    .transform(sanitizeText),
  email: z.string()
    .min(1, 'ইমেইল আবশ্যক')
    .email('সঠিক ইমেইল দিন')
    .max(255)
    .transform(sanitizeEmail),
  phone: z.string()
    .max(20)
    .transform(sanitizePhone)
    .optional()
    .or(z.literal('')),
  message: z.string()
    .min(1, 'বার্তা আবশ্যক')
    .max(2000, 'বার্তা ২০০০ অক্ষরের বেশি হতে পারবে না')
    .transform(sanitizeText),
});

export const orderFormSchema = z.object({
  name: z.string()
    .min(1, 'নাম আবশ্যক')
    .max(100)
    .transform(sanitizeText),
  phone: z.string()
    .min(1, 'ফোন নম্বর আবশ্যক')
    .max(20)
    .transform(sanitizePhone),
  email: z.string()
    .max(255)
    .transform(sanitizeEmail)
    .optional()
    .or(z.literal('')),
  institution: z.string()
    .max(200)
    .transform(sanitizeText)
    .optional()
    .or(z.literal('')),
  address: z.string()
    .max(500)
    .transform(sanitizeText)
    .optional()
    .or(z.literal('')),
  details: z.string()
    .max(2000)
    .transform(sanitizeText)
    .optional()
    .or(z.literal('')),
});

export const consultationFormSchema = z.object({
  name: z.string()
    .min(1, 'নাম আবশ্যক')
    .max(100)
    .transform(sanitizeText),
  email: z.string()
    .min(1, 'ইমেইল আবশ্যক')
    .email('সঠিক ইমেইল দিন')
    .max(255)
    .transform(sanitizeEmail),
  phone: z.string()
    .max(20)
    .transform(sanitizePhone)
    .optional()
    .or(z.literal('')),
  message: z.string()
    .max(2000)
    .transform(sanitizeText)
    .optional()
    .or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type OrderFormData = z.infer<typeof orderFormSchema>;
export type ConsultationFormData = z.infer<typeof consultationFormSchema>;
