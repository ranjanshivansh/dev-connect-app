"use client";
import { Label } from '@radix-ui/react-label'
import React, { useActionState } from 'react'
import { Input } from '../input'
import FormField from '../forms/form-field';
import { Loader2Icon, SparkleIcon, SparklesIcon } from 'lucide-react';
import { Button } from '../button';
import { addProductAction } from '@/lib/products/product-actions';
import { success } from 'zod';
import { error } from 'console';
import { FormState } from '@/types';
import { cn } from '@/lib/utils';


const initialState:FormState={
        success:false,
        errors:{},
        message:"",
}

export default function ProductSubmitForm() {

    const [state,formAction,isPending]=useActionState<FormState>(addProductAction,initialState);
    const {errors,message,success}=state;
  return (
    <form className='space-y-6' action={formAction}>
      {message && 
        <div className={cn("p-4 rounded-lg border",success?"bg-primary/10 border-primary text-primary":"bg-destructive/10 border-destructive text-destructive")} role="alert" aria-live="polite">
          {message}      
      </div>}
       <div className="space-y-2">
        <FormField
        label="Product Name"
         id="name"
         name="name"
         placeholder="My Awesome Product"
         required
         onChange={()=>{}}
         error={errors?.name??[]}
         />
       </div>
       <div className="space-y-2">
        <FormField label="Slug"
         id="slug"
          name="slug"
         placeholder="my-awesome-product"
         required
         onChange={()=>{}}
         error={errors?.slug??[]}
         helperText='URL-friendly version of your product name'
         />
       </div>
       <div className="space-y-2">
        <FormField label="Tagline"
         id="tagline"
          name="tagline"
         placeholder="A brief, catchy description"
         required
         onChange={()=>{}}
         error={errors?.tagline??[]}
         />
       </div>
       <div className="space-y-2">
        <FormField label="Description"
         id="description"
         name="description"
         placeholder="Tell us more About your product..."
         required
         onChange={()=>{}}
         error={errors?.description??[]}
         textarea
         />
       </div>
       <div className="space-y-2">
        <FormField label="Website URL"
         id="websiteUrl"
          name="websiteUrl"
         placeholder="https://yourproduct.com"
         required
         onChange={()=>{}}
         error={errors?.websiteUrl??[]}
         helperText="Enter your product's website or landing page"
         />
       </div>
       <div className="space-y-2">
        <FormField label="Tags"
         id="tag"
         name="tag"
         placeholder="AI,Productivity,SaaS"
         required
         onChange={()=>{}}
         error={errors?.tag??[]}
         helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
         />
       </div>
       <Button type="submit" className="w-full">
        {isPending?(
            <Loader2Icon className='size-4'/>):
            (
                <>
                 <SparklesIcon className='size-4'/>
                 Submit Product
                </>
            )
        }
       </Button>
    </form>
  )
}
