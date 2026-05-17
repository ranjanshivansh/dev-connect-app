import { db } from "@/db";
import { products } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { error } from "console";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const {userId}= await auth();
    if(!userId){
        return NextResponse.json({
            error:"Unauthorized"
        },{
            status:401
        });
    }
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    const userProducts = await db
    .select()
    .from(products)
    .where(and(eq(products.userId, userId), eq(products.status, "approved")))
    .orderBy(desc(products.createdAt));
    
    return NextResponse.json({
        user,
        userProducts
    })
}