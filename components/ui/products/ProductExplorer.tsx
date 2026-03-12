"use client";
import React, { useEffect, useMemo, useState } from 'react'
import { Input } from '../input'
import { Button } from '../button'
import { ClockIcon, SearchIcon, TrendingUpIcon } from 'lucide-react'
import { getAllProducts } from '@/lib/products/products-select'
import ProductCard from './ProductCard'
import { ProductType } from '@/types'


export default function ProductExplorer({
    products
}:{
    products:ProductType[];
}) {
    const [searchValue,setSearchValue]=useState("");
    const [sortBy,setSortBy]=useState<"trending"|
    "recent"|"newest">("trending");

    const filteredProducts=useMemo(()=>{
        const filtered=[...products];
        if(searchValue.length>0){
             return filtered.filter((product)=>{
              return product.name.toLowerCase().includes(searchValue.toLowerCase());
            });
        }
          switch(sortBy){
            case 'trending':
                return filtered.sort((a,b)=>b.voteCount-a.voteCount);
            case 'recent':
                return filtered.sort((a,b)=>
                new Date(b.createdAt||"").getTime()-new Date(a.createdAt||"").getTime());
            case 'newest':
                 return filtered.sort((a,b)=>
                new Date(b.createdAt||"").getTime()-new Date(a.createdAt||"").getTime());
            default:return filtered;
          }

    },[searchValue,products,sortBy]);
  return (
    <div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
                <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4'/>
                <Input type='text' placeholder='Search products...' className='pl-10' value={searchValue}
                       onChange={(e)=>{
                        setSearchValue(e.target.value);
                       }}/>
            </div>
            <div className="flex gap-2">
                <Button variant={sortBy=="trending"?"default":"outline"} onClick={()=>setSortBy("trending")}><TrendingUpIcon/>Trending</Button>
                <Button variant={sortBy==="recent"?"default":"outline"} onClick={()=>{setSortBy("recent")}}><ClockIcon/>Recent</Button>
            </div>
        </div>
        <div className="mb-6">
        <p className='text-sm text-muted-foreground'>Showing {filteredProducts.length} products</p>
        </div>
        <div className="grid-wrapper">
            {filteredProducts.map((product)=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>


    </div>
  )
}
