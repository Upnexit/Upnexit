import { useEffect } from "react";

/**
 * Global scroll-reveal: auto-tags every <section> on the page with
 * `data-reveal` (alternating direction) and animates it in when it
 * enters the viewport. Also picks up lazy-loaded sections and any
 * element the developer marks manually with [data-reveal].
 */
const REVEAL_VARIANTS = ["up", "left", "up", "right", "zoom", "up"] as const;

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    let counter = 0;
    const tagAndObserve = () => {
      // Auto-tag top-level <section> elements that haven't been tagged yet.
      const sections = document.querySelectorAll("section:not([data-reveal])");
      sections.forEach((el) => {
        const variant = REVEAL_VARIANTS[counter % REVEAL_VARIANTS.length];
        el.setAttribute("data-reveal", variant);
        counter++;
      });
      // Observe everything marked for reveal that isn't already visible.
      const targets = document.querySelectorAll(
        "[data-reveal]:not(.is-visible), .reveal-section:not(.is-visible)"
      );
      targets.forEach((el) => observer.observe(el));
    };

    tagAndObserve();

    const mo = new MutationObserver(() => tagAndObserve());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      observer.disconnect();
    };
  }, []);
}

export default useScrollReveal;