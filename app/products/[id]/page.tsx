import React from 'react'

const page = async({params,}:{params:Promise<{id:string}>;
}) => {
  "use cache"
    const {id}=await params;
  return (
    <div>page {id}</div>
  )
}

export default page