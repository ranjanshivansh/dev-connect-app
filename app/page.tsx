import HeroSection from "@/components/ui/landing-page/HeroSection";
import Image from "next/image";
import FeaturedProducts from '../components/ui/landing-page/FeaturedProducts'
import RecentlyLaunchedProducts from "@/components/ui/landing-page/RecentlyLaunchedProducts";

export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      <FeaturedProducts/>
      <RecentlyLaunchedProducts/>
    </div>
  );
}
