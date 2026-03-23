import React from "react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import ProductCard from "@/components/ui/products/ProductCard";
import EmptyState from "@/components/ui/common/EmptyState";
import { Calendar1Icon } from "lucide-react";

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } =await params;

  // 🔹 Get user from Clerk
const user = await (await clerkClient()).users.getUser(userId);
  // 🔹 Get products submitted by this user
  const userProducts = await db
    .select()
    .from(products)
    .where(eq(products.userId, userId))
    .orderBy(desc(products.createdAt));

  // 🔹 Total votes
  const totalVotes = userProducts.reduce(
    (sum, p) => sum + (p.voteCount || 0),
    0
  );

  return (
    <div className="w-full mx-auto p-6">
      
      {/* 👤 USER INFO */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={user.imageUrl}
          alt="avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-500">
            {user.primaryEmailAddress?.emailAddress}
          </p>
          <p className="text-sm text-gray-400">
            Joined: {new Date(user.createdAt).toDateString()}
          </p>
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="flex gap-6 mb-10">
        <div className="bg-gray-100 px-4 py-2 rounded-lg">
           {userProducts.length} Products
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-lg">
          {totalVotes} Votes
        </div>
      </div>

      {/* 📦 PRODUCTS */}
      <section className='py-20 bg-muted*40'>
      <div className="wrapper space-y-12">
        <h2 className="text-xl font-semibold mb-4">Products</h2>

        {userProducts.length === 0 ? (
          <EmptyState message="No products submitted yet." icon={Calendar1Icon}/>
        ) : (
          <div className="grid-wrapper">
            {userProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      </section>
    </div>
  );
}