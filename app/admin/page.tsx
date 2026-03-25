import PendingProductsClient from '@/components/PendingProductsClient';
import AdminProductCard from '@/components/ui/admin/AdminProductCard';
import StatsCard from '@/components/ui/admin/StatsCard';
import SectionHeader from '@/components/ui/common/SectionHeader';
import { getAllProducts } from '@/lib/products/products-select';
import { auth, clerkClient } from '@clerk/nextjs/server'
import { ShieldIcon, LoaderIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

// 1. Move the data fetching and auth checks into a separate Server Component
async function AdminDashboardData() {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    // Fetch user to check admin status
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const isAdmin = user.publicMetadata?.isAdmin ?? false;

    if (!isAdmin) redirect("/");
    
    // Fetch and filter products
    const allProducts = await getAllProducts(); 
    const approvedProducts = allProducts.filter((p) => p.status === "approved");
    const pendingProducts = allProducts.filter((p) => p.status === "pending");
    const rejectedProducts = allProducts.filter((p) => p.status === "rejected");

    return (
        <>
            <StatsCard 
                all={allProducts.length}
                approved={approvedProducts.length}
                pending={pendingProducts.length}
                rejected={rejectedProducts.length}
            />
            <section className='my-12'>
                <div className="section-header-with-count mb-6">
                    <h2 className="text-2xl font-bold">
                        Pending Products ({pendingProducts.length})
                    </h2>
                </div>
                <div className="space-y-4">
                    {/* Added a quick fallback if there are no products */}
                    {pendingProducts.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No pending products to review.</p>
                    ) : <PendingProductsClient products={pendingProducts} />}
                </div>
            </section>
        </>
    )
}

// 2. Your main page renders instantly, showing a loading spinner while data fetches
export default function AdminPage() {
  return (
    <div className='py-20'>
        <div className="wrapper">
            <div className="mb-12">
                <SectionHeader 
                    title='Admin Dashboard' 
                    icon={ShieldIcon} 
                    description='Review and Manage submitted products'
                />
            </div>
            
            {/* 3. The Suspense Boundary protects the route from blocking */}
            <Suspense fallback={
                <div className="flex justify-center items-center py-20">
                    <LoaderIcon className="size-8 animate-spin text-primary" />
                </div>
            }>
                <AdminDashboardData />
            </Suspense>
        </div>
    </div>
  )
}