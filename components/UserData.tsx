import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import ProductCard from "@/components/ui/products/ProductCard";
import EmptyState from "@/components/ui/common/EmptyState";
import { Calendar1Icon } from "lucide-react";
import TechChart from "@/components/ui/TechCharts";

export default async function UserData({ userId }: { userId: string }) {
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);

  const userProducts = await db
    .select()
    .from(products)
    .where(and(eq(products.userId, userId), eq(products.status, "approved")))
    .orderBy(desc(products.createdAt));

  const totalVotes = userProducts.reduce(
    (sum, p) => sum + (p.voteCount || 0),
    0,
  );

  const techCount: Record<string, number> = {};

  userProducts.forEach((p) => {
    p.technologies?.forEach((tech) => {
      techCount[tech] = (techCount[tech] || 0) + 1;
    });
  });

  const chartData = Object.entries(techCount)
    .map(([tech, count]) => ({ tech, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  let level = "Beginner";

  if (totalVotes > 5) level = "Intermediate";
  if (totalVotes > 100) level = "Advanced";

  const topTech = chartData[0];
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* 👤 USER INFO */}
        <div className="flex items-center gap-4">
          <img src={user.imageUrl} className="w-14 h-14 rounded-full" />
          <div>
            <h1 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-gray-500">
              {user.primaryEmailAddress?.emailAddress}
            </p>
            <p className="text-xs text-gray-400">
              Joined: {new Date(user.createdAt).toDateString()}
            </p>
          </div>
        </div>

        {/* 📊 Dashboard */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex md:flex-col gap-4">
            <div className="bg-yellow-500/10 border rounded-xl px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500">Products</p>
              <p className="text-lg font-semibold">{userProducts.length}</p>
            </div>

            <div className="bg-red-500/10 border rounded-xl px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500">Votes</p>
              <p className="text-lg font-semibold">{totalVotes}</p>
            </div>
            <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-sm">
              Top Skill: <b>{topTech?.tech}</b>
            </div>
            <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-sm">
              {" "}
              Level: {level}
            </div>
          </div>

          <div className="md:col-span-2 min-w-0 flex justify-center">
            <div className="w-full max-w-3xl">
              <TechChart data={chartData} />
            </div>
          </div>
        </div>
      </div>
      {/* 📦 PRODUCTS */}
      <section className="space-y-6 px-7 mb-4">
        <h2 className="text-lg font-semibold">Products</h2>

        {userProducts.length === 0 ? (
          <EmptyState
            message="No products submitted yet."
            icon={Calendar1Icon}
          />
        ) : (
          <div className="grid-wrapper max-w-full">
            {userProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
