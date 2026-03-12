'use server';

import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductType } from "@/types";
import { eq } from "drizzle-orm";
import { success } from "zod";

export const approveProductAction= async(productId:ProductType["id"])=>{
    console.log('Product approved',productId);
 try{
    await db.update(products).set({status:"approved"})
                              .where(eq(products.id,productId));
    return {
        success:true,
        message:"Product Approved successfully",
    }
 }catch(error){
    console.error(error);
    return{
       success:false,
       message:"Failed to approve product", 
    }
 }
}

export const rejectProductAction=async(productId:ProductType["id"])=>{
    try{
    console.log('Product rejcted',productId);
    await db.update(products).set({status:"rejected"}).where(eq(products.id,productId));
    return{
        success:true,
        message:"Product rejected succesfully"
    }
    }catch(error){
        return{
        success:false,
        message:"Failed to reject product"
    }
    }
}
