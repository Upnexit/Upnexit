CREATE TABLE public.customer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_image text,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text text NOT NULL,
  location text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.customer_reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_reviews TO authenticated;
GRANT ALL ON public.customer_reviews TO service_role;

ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active customer reviews"
  ON public.customer_reviews FOR SELECT
  TO anon, authenticated
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone authenticated or anon can submit reviews"
  ON public.customer_reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (is_active = false);

CREATE POLICY "Admins can update customer reviews"
  ON public.customer_reviews FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete customer reviews"
  ON public.customer_reviews FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_customer_reviews_updated_at
  BEFORE UPDATE ON public.customer_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.customer_reviews (customer_name, customer_image, rating, review_text, location, sort_order) VALUES
('মোহাম্মদ রফিকুল ইসলাম', 'https://i.pravatar.cc/150?img=1', 5, 'অসাধারণ সার্ভিস! সময়মতো ডেলিভারি পেয়েছি এবং প্রোডাক্টের কোয়ালিটি দারুণ। ভবিষ্যতেও অর্ডার করব ইনশাআল্লাহ।', 'ঢাকা, বাংলাদেশ', 0),
('ফাতেমা আক্তার', 'https://i.pravatar.cc/150?img=2', 5, 'প্যাকেজিং অনেক সুন্দর ছিল। কাস্টমার সার্ভিস দ্রুত রেসপন্স করে। সবমিলিয়ে দারুণ অভিজ্ঞতা।', 'চট্টগ্রাম, বাংলাদেশ', 1),
('আব্দুল্লাহ আল মামুন', 'https://i.pravatar.cc/150?img=3', 4, 'প্রোডাক্ট কোয়ালিটি ভালো। ডেলিভারি একটু দেরিতে হলেও সাপোর্ট টিম খুব হেল্পফুল ছিল।', 'রাজশাহী, বাংলাদেশ', 2),
('সুমাইয়া ইসলাম', 'https://i.pravatar.cc/150?img=4', 5, 'মাশাআল্লাহ! এত প্রফেশনাল কাজ দেখে মুগ্ধ হয়েছি। সবাইকে রিকমেন্ড করব।', 'খুলনা, বাংলাদেশ', 3),
('তানভীর হাসান', 'https://i.pravatar.cc/150?img=5', 5, 'দাম অনুযায়ী সার্ভিস অনেক ভালো। টেকনিক্যাল সাপোর্ট ২৪ ঘণ্টা পাওয়া যায়, এটাই সবচেয়ে বড় প্লাস পয়েন্ট।', 'সিলেট, বাংলাদেশ', 4),
('নাজমুন নাহার', 'https://i.pravatar.cc/150?img=6', 5, 'ওয়েবসাইট ডিজাইন অসাধারণ হয়েছে। ক্লায়েন্টরা খুব পছন্দ করেছে। ধন্যবাদ পুরো টিমকে।', 'বরিশাল, বাংলাদেশ', 5),
('রাশেদুল হক', 'https://i.pravatar.cc/150?img=7', 4, 'সফটওয়্যার ব্যবহার করে আমার ব্যবসার কাজ অনেক সহজ হয়েছে। কর্মী ব্যবস্থাপনা এখন অনেক ইজি।', 'রংপুর, বাংলাদেশ', 6),
('সালমা খাতুন', 'https://i.pravatar.cc/150?img=8', 5, 'অর্ডার দেওয়ার পরেই তারা যোগাযোগ করেছে এবং সমস্ত detail বুঝিয়ে দিয়েছে। সত্যিই প্রফেশনাল।', 'ময়মনসিংহ, বাংলাদেশ', 7),
('জাহিদুল ইসলাম', 'https://i.pravatar.cc/150?img=9', 5, 'নওগাঁ থেকে অর্ডার করেছিলাম, প্রোডাক্ট অক্ষত অবস্থায় পেয়েছি। প্যাকিং দেখে মুগ্ধ।', 'নওগাঁ, বাংলাদেশ', 8),
('রুমানা পারভিন', 'https://i.pravatar.cc/150?img=10', 5, 'কুমিল্লা থেকে বলছি — সার্ভিস কোয়ালিটি অসাধারণ। দাম তুলনায় ভ্যালু অনেক বেশি।', 'কুমিল্লা, বাংলাদেশ', 9),
('হাবিবুর রহমান', 'https://i.pravatar.cc/150?img=11', 5, 'স্কুল ম্যানেজমেন্ট সফটওয়্যার ব্যবহার করছি, কাজ অনেক সহজ। সাপোর্ট টিম সবসময় হেল্পফুল।', 'ঢাকা, বাংলাদেশ', 10),
('শামীমা সুলতানা', 'https://i.pravatar.cc/150?img=12', 4, 'ডেলিভারি একটু দেরি হলেও প্রোডাক্ট কোয়ালিটি দেখে সব কষ্ট ভুলে গেছি।', 'চট্টগ্রাম, বাংলাদেশ', 11),
('মাহফুজুর রহমান', 'https://i.pravatar.cc/150?img=13', 5, 'হাসপাতাল ম্যানেজমেন্ট সিস্টেম দারুণ কাজ করছে। রোগী রেকর্ড রাখা এখন সহজ।', 'রাজশাহী, বাংলাদেশ', 12),
('আফসানা মিমি', 'https://i.pravatar.cc/150?img=14', 5, 'কাস্টম সফটওয়্যারটি আমাদের প্রয়োজন অনুযায়ী বানিয়ে দিয়েছে। অসাধারণ অভিজ্ঞতা।', 'খুলনা, বাংলাদেশ', 13),
('ইমরান হোসেন', 'https://i.pravatar.cc/150?img=15', 5, 'ই-কমার্স ওয়েবসাইট তৈরি করিয়েছি। সেল অনেক বেড়েছে এর পর থেকে।', 'সিলেট, বাংলাদেশ', 14),
('তাহমিনা আক্তার', 'https://i.pravatar.cc/150?img=16', 4, 'বাজেট ফ্রেন্ডলি প্যাকেজ পেয়েছি। কাজের কোয়ালিটিতে কোনো compromise নেই।', 'বরিশাল, বাংলাদেশ', 15),
('সাইফুল ইসলাম', 'https://i.pravatar.cc/150?img=17', 5, 'রংপুর থেকে অর্ডার, সব কিছু perfect। ভবিষ্যতেও কাজ করতে চাই এদের সাথে।', 'রংপুর, বাংলাদেশ', 16),
('নুসরাত জাহান', 'https://i.pravatar.cc/150?img=18', 5, 'ময়মনসিংহ থেকে বলছি — সাপোর্ট রেসপন্স খুব দ্রুত। সব সমস্যা ইনস্ট্যান্ট সলভ করে।', 'ময়মনসিংহ, বাংলাদেশ', 17),
('আশরাফুল আলম', 'https://i.pravatar.cc/150?img=19', 5, 'প্রোজেক্ট সময়ের আগেই শেষ করে দিয়েছে। কাজে কোনো compromise নেই।', 'নওগাঁ, বাংলাদেশ', 18),
('রেহানা পারভিন', 'https://i.pravatar.cc/150?img=20', 5, 'কাস্টমার কেয়ারের ব্যবহার অনেক ভালো। সব প্রশ্নের উত্তর ধৈর্য সহকারে দিয়েছে।', 'কুমিল্লা, বাংলাদেশ', 19),
('তৌহিদুল ইসলাম', 'https://i.pravatar.cc/150?img=21', 4, 'ডোমেইন হোস্টিং সার্ভিস ভালো। আপটাইম সবসময় ভালো থাকে।', 'ঢাকা, বাংলাদেশ', 20),
('শারমিন আক্তার', 'https://i.pravatar.cc/150?img=22', 5, 'মোবাইল অ্যাপ ডেভেলপমেন্ট দারুণ হয়েছে। ইউজার ফিডব্যাক অনেক পজিটিভ।', 'চট্টগ্রাম, বাংলাদেশ', 21),
('মিজানুর রহমান', 'https://i.pravatar.cc/150?img=23', 5, 'SEO সার্ভিসের পর আমাদের ওয়েবসাইট গুগলে প্রথম পেজে এসেছে। সত্যিই কাজে আসে।', 'রাজশাহী, বাংলাদেশ', 22),
('লুৎফুন্নাহার', 'https://i.pravatar.cc/150?img=24', 5, 'গ্রাফিক্স ডিজাইন ও ব্র্যান্ডিং কাজে দারুণ ক্রিয়েটিভিটি দেখেছি। হাইলি রিকমেন্ডেড।', 'খুলনা, বাংলাদেশ', 23),
('আনিসুর রহমান', 'https://i.pravatar.cc/150?img=25', 5, 'সব মিলিয়ে এটি বাংলাদেশের সেরা আইটি কোম্পানিগুলোর একটি। সবাইকে recommend করছি।', 'সিলেট, বাংলাদেশ', 24);