import HeroSection from "@/components/ui/landing-page/HeroSection";
import Image from "next/image";
import FeaturedProducts from '../components/ui/landing-page/FeaturedProducts'
import RecentlyLaunchedProducts from "@/components/ui/landing-page/RecentlyLaunchedProducts";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";
import ProductSkeleton from "@/components/ui/products/ProductSkeleton";

export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      <FeaturedProducts/>
      <Suspense fallback={<ProductSkeleton/>}>
      <RecentlyLaunchedProducts/>
      </Suspense>
    </div>
  );
}
