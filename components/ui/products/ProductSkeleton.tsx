import React from 'react'
import SectionHeader from '../common/SectionHeader'
import { RocketIcon } from 'lucide-react'
import ProductCard from './ProductCard'
import EmptyState from '../common/EmptyState'
import { Skeleton } from '../skeleton'

export default function ProductSkeleton() {
  return (
    <section className='py-20'>
       <div className="wrapper space-y-12">
            <div className='flex items-center gap-3 mb-3'>
                <Skeleton className='size-6'/>
                <Skeleton className='h-9 w-64'/>
            </div>
            <div className="grid-wrapper">
                {Array.from({length:6}).map((_,index)=>(
                    <div key={index} className='border rounded-lg p-6'>
                        <div className="flex-1">
                        <Skeleton className='h-6 w-3/4 mb-2'/>
                        <Skeleton className='h-4 w-full'/>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className='h-6 w-16'/>
                            <Skeleton className='h-6 w-20'/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
