import { Product } from "@prisma/client";

declare global {
  type ProductWithoutPrice = Omit<Product, "price" | "rating">;
  type ProductWithPriceAsString = ProductWithoutPrice & {
    price: string;
    rating: string;
  };
}

export default global;
