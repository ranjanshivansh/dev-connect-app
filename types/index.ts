import { products } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

// @/types/index.ts

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
  similarity?: number;
  similarProject?: {
    id: number;
    name: string;
  } | null;
};

export type ProductType=InferSelectModel<typeof products>;

export type UserDataResponse = {
  user: {
    firstName: string;
    lastName: string;
    imageUrl: string;
    createdAt: number;
    primaryEmailAddress?: {
      emailAddress: string;
    };
  };

  userProducts: ProductType[];
};