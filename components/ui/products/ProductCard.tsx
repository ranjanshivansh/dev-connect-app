import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle,CardFooter } from "../card";
import { Badge } from "../badge";
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "lucide-react";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import VotingButtons from "./VotingButtons";
import { ProductType } from "@/types";



export default function ProductCard({product}:{product:ProductType}) {
    const hasVoted=false;
  return (
    <div>
      <Link href={`/products/${product.slug}`}>
      <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-45">
        <CardHeader className="flex-1">
            <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
            <CardTitle className="text-lg group-hover:transition-colors">{product.name}</CardTitle>
            {product.voteCount>100 && <Badge className="gap-1 bg-primary text-primary-foreground">
                <StarIcon className="size-3 fill-current"/>Featured</Badge>}
            </div>
            <CardDescription>{product.description}</CardDescription>
            </div>
            <VotingButtons hasVoted={hasVoted} voteCount={product.voteCount} productId={product.id}/>
            </div>
        </CardHeader>

        <CardFooter>
            <div className="flex items-center gap-2">
            {product.tags?.map((tag)=><Badge variant="secondary" key={tag}>{tag}</Badge>)}
            </div>
        </CardFooter>
      </Card>
      </Link>
    </div>
  )
}

