'use server';

import z, { success } from "zod";
import { auth, currentUser } from '@clerk/nextjs/server'
import { error } from "console";
import { productSchema } from "./product-validation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { refresh, revalidatePath } from "next/cache";
import { fetchGithubReadme } from "../github";
import { getRepoCode } from "../github-code";
import { calculateProjectSimilarity } from "../smilarity";
import { FormState } from "@/types";

  
export const addProductAction=async (prevState:FormState,formData:FormData):Promise<FormState>=>{
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
        let fullDescription = description;
        let code = "";

        if (githubUrl) {
            const readme = await fetchGithubReadme(githubUrl);
            const repoCode = await getRepoCode(githubUrl);
            code = repoCode;
        }

        const existingProjects = await db
                                        .select()
                                        .from(products)
                                        .where(eq(products.status, "approved"));
        
        let maxSimilarity = 0;
        let mostSimilarProject: any = null;

        const newProjectForComparison = {
            description: fullDescription,
            tags:tag,
            technologies: technologiesArray,
            code,
        };

        for (const project of existingProjects) {
            const score = calculateProjectSimilarity(
                newProjectForComparison,
                {
                    description: project.description,
                    tags: project.tags || [],
                    technologies: project.technologies || [],
                    code: project.codeText||"", // MVP (no stored code yet)
                }
            );

            if (score > maxSimilarity) {
                maxSimilarity = score;
                mostSimilarProject = project;
            }
        }
        console.log("codelength"+code.length);
        await db.insert(products)
                .values({name,slug,tagline,description:fullDescription,technologies,githubUrl,websiteUrl,tags:tagsArray,status:"pending",submittedBy:userEmail,organizationId:orgId,userId:userId,similarityScore: maxSimilarity,similarProjectId: mostSimilarProject?.id || null,codeText:code});
                revalidatePath("/");
                return {
                        success: true,
                        errors: {},
                        message: "Product submitted successfully!",
                        similarity: maxSimilarity,
                        similarProject: mostSimilarProject
                            ? {
                                id: mostSimilarProject.id,
                                name: mostSimilarProject.name,
                            }
                            : null,
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
        errors:{},
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