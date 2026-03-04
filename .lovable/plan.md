

## পরিকল্পনা: ফুটার সেকশন আপডেট

### যা করা হবে:

1. **Newsletter সেকশন সম্পূর্ণ বাদ** — লাইন 81-95 এর Newsletter কলাম এবং grid কে `lg:grid-cols-3` করা হবে।

2. **Background কালার বাদ দিয়ে স্কেচ পূর্ণ ফুটার জুড়ে দেখানো** — বর্তমান gradient overlay গুলো হালকা করে স্কেচ ইমেজকে পুরো ফুটারের পেছনে `object-cover` দিয়ে ফুল সাইজে দেখানো হবে। `maxHeight` সীমাবদ্ধতা তুলে দেওয়া হবে।

3. **মেঘের অ্যানিমেশন যোগ** — ফুটারে CSS keyframe অ্যানিমেশন দিয়ে ভাসমান মেঘ তৈরি করা হবে। SVG বা CSS দিয়ে ২-৩টি মেঘের আকৃতি তৈরি করে `@keyframes float-cloud` দিয়ে বাম থেকে ডানে ধীরে ভেসে যাওয়ার অ্যানিমেশন দেওয়া হবে। প্রতিটি মেঘে আলাদা duration ও delay থাকবে।

### টেকনিক্যাল ডিটেইলস:
- Newsletter grid কলাম বাদ → `grid-cols-2 lg:grid-cols-3`
- Background: gradient overlay এর opacity কমানো, sketch image কে `inset-0 w-full h-full object-cover` দেওয়া
- ৩টি CSS animated cloud SVG element যোগ — `translateX(-100%)` থেকে `translateX(100vw)` পর্যন্ত চলবে, `opacity: 0.15-0.25`, duration `25s-40s`
- `pb-16 lg:pb-0` রেখে মোবাইল nav bar এর জন্য জায়গা রাখা হবে

