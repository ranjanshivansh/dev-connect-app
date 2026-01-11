
import React from 'react'
import SectionHeader from '../common/SectionHeader'
import { ArrowUpRightIcon, StarIcon } from 'lucide-react'
import { Button } from '../button'
import Link from "next/link";
import ProductCard from '../products/ProductCard';
import { getFeaturedProducts } from '@/lib/products/products-select';

//  const featuredProducts = [
//   {
//     id: 1,
//     name: "ParityKit",
//     description:
//       "Maximize your global revenue with intelligent price localization. Automatically adjust pricing based on purchasing power parity to increase conversions worldwide.",
//     tags: ["SaaS", "Pricing", "Global"],
//     votes: 626,
//     isFeatured: true,
//   },
//   {
//     id: 2,
//     name: "ProofyBubble",
//     description:
//       "Boost your website conversions with real-time social proof notifications. Show recent purchases, sign-ups, and user activity to build trust and credibility.",
//     tags: ["Marketing", "SaaS", "Conversion"],
//     votes: 523,
//     isFeatured: true,
//   },
//   {
//     id: 3,
//     name: "APIHub",
//     description:
//       "Centralized API management platform with real-time monitoring, documentation, and testing tools. Keep all your APIs organized and secure.",
//     tags: ["Developer Tools", "API", "Infrastructure"],
//     votes: 445,
//     isFeatured: true,
//   },
//   {
//     id: 4,
//     name: "EmailCraft",
//     description:
//       "Design, send, and track beautiful email campaigns with our intuitive drag-and-drop editor and powerful automation tools.",
//     tags: ["Marketing", "Email", "SaaS"],
//     votes: 380,
//     isFeatured: true,
//   },
//   {
//     id: 5,
//     name: "Developer to Leader Course",
//     description:
//       "Learn to lead a team of developers and become a leader in your field. Designed for developers ready to take the next step in their career.",
//     tags: ["Leadership", "Management", "Development"],
//     votes: 340,
//     isFeatured: true,
//   },
//   {
//     id: 6,
//     name: "DataViz Pro",
//     description:
//       "Create interactive charts, graphs, and dashboards from any data source. Perfect for presentations, reports, and data analysis.",
//     tags: ["Analytics", "Design", "SaaS"],
//     votes: 234,
//     isFeatured: true,
//   },
//   {
//     id: 7,
//     name: "Modern Full Stack Next.js Course",
//     description:
//       "Learn to build modern full stack applications with Next.js, covering authentication, databases, and deployment.",
//     tags: ["Next.js", "Tailwind CSS", "Full Stack"],
//     votes: 124,
//     isFeatured: false,
//   },
// ];

export async function FeaturedProducts() {
  "use cache";
  const featuredProducts=await getFeaturedProducts();
  return (
    <section className='py-20 bg-muted/20 '>
        <div className="wrapper">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader title='Featured Today' icon={StarIcon} description="Top picks from our community this week." />
            <Button variant="outline" asChild className='hidden sm:flex'><Link href='/explore'>View All <ArrowUpRightIcon className='size-4'/></Link></Button>
            </div>
            <div className="grid-wrapper">
              {featuredProducts.map((product)=>
              <ProductCard key={product.id} product={product} />
              )}
            </div>
        </div>
    </section>
  )
}

export default FeaturedProducts
