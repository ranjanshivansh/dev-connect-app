"use cache";
import SectionHeader from '@/components/ui/common/SectionHeader'
import ProductExplorer from '@/components/ui/products/ProductExplorer'
import { getAllApprovedProducts } from '@/lib/products/products-select';
import {CompassIcon } from 'lucide-react'
import React from 'react'

export default async function page() {
const products=await getAllApprovedProducts();
  return (
    <div className='py-20'>
      <div className="wrapper">
        <div className="mb-12">
        <SectionHeader icon={CompassIcon} title='Explore All Products' description='Browse and discover amazing projects from our community'/>
        </div>
        <ProductExplorer products={products}/>
      </div>
    </div>
  )
}
