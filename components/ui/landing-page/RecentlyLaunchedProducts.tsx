
import React from 'react'
import SectionHeader from '../common/SectionHeader'
import { Calendar1Icon, RocketIcon } from 'lucide-react'
import ProductCard from '../products/ProductCard';
import EmptyState from '../common/EmptyState';
import { getRecentlyLaunchedProducts } from '@/lib/products/products-select';



export default async function RecentlyLaunchedProducts() {
  "use cache";
   const recentProducts:any = await getRecentlyLaunchedProducts();
  return (
    <section className='py-20 bg-muted*40'>
        <div className="wrapper space-y-12">
            <SectionHeader title='Recently Launched' icon={RocketIcon} description='Discover the latest products from our community'/>
            {recentProducts.length>0?(
            <div className="grid-wrapper">
                          {recentProducts.map((product:any)=>
                          <ProductCard key={product.id} product={product} />
                          )}
                        </div>
                ):<EmptyState message="No products launched in the last week. Check back soon for new launches." icon={Calendar1Icon}/>}
        </div>
      
    </section>
  )
}
