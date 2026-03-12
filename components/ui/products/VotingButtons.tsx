"use client"
import React, { useOptimistic, useTransition } from 'react'
import { Button } from '../button'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { downvoteProductAction, upvoteProductAction } from '@/lib/products/product-actions';

export default function VotingButtons({
    hasVoted,
    voteCount:initialVoteCount,
    productId
}:{
    hasVoted?:boolean;
    voteCount:number;
    productId:number;
}) {
    const [optimisticVoteCount,setOptimisticVoteCount]=useOptimistic(initialVoteCount,(currentCount,change:number)=>Math.max(0,
        currentCount+change)
    );
    const [isPending,startTransition]=useTransition();
    const handleUpvote=async()=>{
        startTransition(async()=>{
            setOptimisticVoteCount(1);
        const result=await upvoteProductAction(productId);
        console.log(result);
        })
    };

    const handleDownvote=async()=>{
        startTransition(async()=>{
        setOptimisticVoteCount(-1);
        const result=await downvoteProductAction(productId);
        console.log(result);
        })
    }
  return (
    <div className="flex flex-col items-center gap-1 shrink-0" 
    onClick={(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }}>
                <Button onClick={handleUpvote} variant="ghost" size="icon-sm" className={cn("h-8 w-8 text-primary ", hasVoted?"bg-primary/10 text-primary hover:bg-primary/20":"hover:bg-primary/10 hover:text-primary")}>
                <ChevronUpIcon className="size-5" />
                </Button>   
                <span className="text-sm font-semibold transition-colors text-foreground">{optimisticVoteCount}</span>
                <Button onClick={handleDownvote} variant="ghost" size="icon-sm" className={cn("h-8 w-8 text-primary ", hasVoted?"hover:text-destructive":"opacity-50 cursor-not-allowed")}>
                <ChevronDownIcon className="size-5"/>
                </Button>         
                </div>
  )
}
