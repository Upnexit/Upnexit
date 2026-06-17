import { useState } from "react";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReviewSubmissionDialog = ({ open, onOpenChange }: Props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setName(""); setLocation(""); setRating(5); setReview(""); setHover(0);
  };

  const submit = async () => {
    if (!name.trim() || !review.trim()) {
      toast.error("নাম এবং রিভিউ লিখুন");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("customer_reviews").insert({
      customer_name: name.trim(),
      location: location.trim() || null,
      rating,
      review_text: review.trim(),
      is_active: false,
    });
    setSubmitting(false);
    if (error) {
      toast.error("রিভিউ পাঠানো যায়নি, পরে আবার চেষ্টা করুন");
      return;
    }
    toast.success("ধন্যবাদ! আপনার রিভিউটি যাচাইয়ের জন্য পাঠানো হয়েছে।");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>আপনার মতামত দিন</DialogTitle>
          <DialogDescription>
            আপনার অভিজ্ঞতা শেয়ার করুন। অ্যাডমিন অনুমোদনের পর প্রকাশিত হবে।
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rv-name">নাম *</Label>
            <Input id="rv-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার পূর্ণ নাম" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rv-loc">এলাকা / জেলা</Label>
            <Input id="rv-loc" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="যেমন: ঢাকা, বাংলাদেশ" />
          </div>
          <div className="space-y-2">
            <Label>রেটিং</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(n)}
                  className="p-1 transition-transform hover:scale-110"
                  aria-label={`${n} star`}
                >
                  <Star
                    className={`h-7 w-7 ${
                      (hover || rating) >= n
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rv-text">রিভিউ *</Label>
            <Textarea
              id="rv-text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="আপনার অভিজ্ঞতা লিখুন..."
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            বাতিল
          </Button>
          <Button onClick={submit} disabled={submitting}>
            {submitting ? "পাঠানো হচ্ছে..." : "সাবমিট করুন"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewSubmissionDialog;