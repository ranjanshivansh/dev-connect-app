import SectionHeader from "@/components/ui/common/SectionHeader";
import ProductSubmitForm from "@/components/ui/products/ProductSubmitForm";
import { SparkleIcon } from "lucide-react";

export default function page() {
  return (
    <section className="py-20">
    <div className="wrapper">
        <div className="mb-12">
      <SectionHeader title="Submit Your Project" icon={SparkleIcon} description="Share your creation with the community. Your submission will be reviewed before going live."/>
    </div>
    <div className="max-w-2xl mx-auto">
        <ProductSubmitForm/>    
    </div> 
    </div>
    </section>
  )
}
