import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { SplitSection } from "@/components/home/SplitSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TrustBadges />
      <CategoryGrid />
      <FeaturedProducts />
      <SplitSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
