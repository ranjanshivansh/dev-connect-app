import { auth, clerkClient, clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async(auth)=>{
  const {userId,orgId}=await auth();

  if(userId && !orgId){
    try{
      const client=await clerkClient();
      const {data:organisations}=
      await client.users.getOrganizationMembershipList({userId:userId});

      if(organisations && organisations.length>0){
        return NextResponse.next();
      }
      
      const user=await client.users.getUser(userId);
      const orgName=user.fullName?`${user.fullName}'s Organisation`:user.firstName?
      `${user.firstName}'s Organisation`:user.emailAddresses[0].emailAddress?
      `${user.emailAddresses[0].emailAddress}'s Organisation`:'My Organisation';

      await client.organizations.createOrganization({
        name:orgName,
        createdBy:userId
      })

      console.log("Autocreated organisation :",orgName);
    }catch(error){
      console.log("Error auto-creating organisation:",error);
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};