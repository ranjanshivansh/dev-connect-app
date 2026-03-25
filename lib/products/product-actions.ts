'use server';

import z, { success } from "zod";
import { auth, currentUser } from '@clerk/nextjs/server'
import { error } from "console";
import { productSchema } from "./product-validation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { refresh, revalidatePath } from "next/cache";

type FormState={
    success:boolean,
    errors?:Record<string,string[]>
    message:string
}
export const addProductAction=async (prevState:FormState,formData:FormData)=>{
    console.log(formData);
    //auth
    try{
        const {userId,orgId}=await auth();
        if(!userId){
        return{
            success:false,
            message:"You must be signed in to submit a project",
    }
}
    if(!orgId){
        return{
            success:false,
            message:"You must be apart of an organisation to submit a product",
        };
    }      
     //data
        const user= await currentUser();
        const userEmail=user?.primaryEmailAddress?.emailAddress||"anonymnous";
    
        const rawData=Object.fromEntries(formData.entries());

        //validateData
        const validateData=productSchema.safeParse(rawData);
        if(!validateData.success){
            console.log(validateData.error.flatten().fieldErrors);
            return{
                success:false,
                errors:validateData.error.flatten().fieldErrors,
                message:"Invalid Data",
            };
        }
        const {name,slug,tagline,description,websiteUrl,tag,technologies,githubUrl}=validateData.data;

        const tagsArray=tag?tag.filter((tagg)=>typeof tagg==="string"):[];
        const technologiesArray=technologies?technologies.filter((technology)=>typeof technology==="string"):[];
        //transform the data

        await db.insert(products)
                .values({name,slug,tagline,description,technologies,githubUrl,websiteUrl,tags:tagsArray,status:"pending",submittedBy:userEmail,organizationId:orgId,userId:userId,});
                revalidatePath("/");
                return{
                    success:true,
                    errors:{},
                    message:"Product submitted successfully! It will be reviewed shortly.",
                };
    }catch(error){
        console.error(error);
        if(error instanceof z.ZodError){
            return{
                success:false,
                errors:error.flatten().fieldErrors,
                message:"Validation failed.Please check the form.",
            };
        }
        return{
        success:false,
        errors:error,
        message:"Failed to Submit Product",
    }
    }
}

export const upvoteProductAction=async(productId:number)=>{
    try{
      const {userId,orgId}=await auth();
      if(!userId){
      return{
        success:false,
        message:"You must be signed in to submit a project",
       }
      }
      if(!orgId){
      return{
        success:false,
        message:"You must be apart of an organisation to submit a product",
        };
      }
        await db.update(products)
                .set({
                    voteCount:sql`GREATEST(0,vote_count+1)`,
                })
                .where(eq(products.id,productId));
        revalidatePath("/");
        return{
            success:true,
            message:"Product Upvoted Successfully"
        }
}catch(error){
        console.log(error);
        return{
           success:false,
           message:"Failed to upvote product",
           voteCount:0
        }
    }
}

export const downvoteProductAction=async(productId:number)=>{
    try{
      const {userId,orgId}=await auth();
      if(!userId){
      return{
        success:false,
        message:"You must be signed in to submit a project",
       }
      }
      if(!orgId){
      return{
        success:false,
        message:"You must be apart of an organisation to submit a product",
        };
      }
        await db.update(products)
                .set({
                    voteCount:sql`GREATEST(0,vote_count-1)`,
                })
                .where(eq(products.id,productId));
            revalidatePath("/");
        return{
            success:true,
            message:"Product Downvoted Successfully"
        }
}catch(error){
        console.log(error);
        return{
           success:false,
           message:"Failed to downvote product",
           voteCount:0
        }
    }
}