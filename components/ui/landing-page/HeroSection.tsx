import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRightIcon, EyeIcon, RocketIcon, SparkleIcon, UsersIcon } from "lucide-react";
import StatsCard from "./StatsCard";

function HeroSection() {
  const statdata=[
    {
      icon:RocketIcon, value:"10",label:"Projects Shared"
    },
     {
      icon:UsersIcon, value:"3+",label:"Active Creators",hasBorder:true,
    },{
      icon:EyeIcon, value:"1K+",label:"Monthly Visitors"
    }
  ]
  const LiveBadge=()=>{
    return(
     <Badge className="px-4 py-2 mb-8 text-sm backdrop-blur-sm" variant="outline">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"/>
        <span className="relative inlne-flex rounded-full h-2 w-2 bg-primary"/>
        </span>
      <span className="text-muted-foreground">Join thousands of creators sharing their work</span>
      </Badge>
    )
  }
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
        <LiveBadge/>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">Share What You&apos;ve Built, Discover What&apos;s Launching</h1>
      <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">A community platform for creators to showcase their apps, AI tools, SaaS products, and creative projects. Authentic launches, real builders, genuine feedback.</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
      <Button asChild size="lg" className="text-base px-8 shadow-lg">
        <Link href="/submit"><SparkleIcon className="size-5"/> Share Your Project</Link>
      </Button>
      <Button asChild size="lg" className="text-base px-8 shadow-lg" variant="secondary">
        <Link href="/explore">Explore Projects <ArrowRightIcon className="size-5"/></Link>
      </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
      {
        statdata.map((item)=>{
         return <StatsCard key={item.label} {...item}/>
        })
      }
      </div>
      </div>
      </div>
    </section>
  )
}

export default HeroSection

