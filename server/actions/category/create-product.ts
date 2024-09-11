"use server";

import { generateSlug } from "@/lib/utils/utils";
import prisma from "@/server/db";
import { Prisma } from "@prisma/client";

interface CreateProductProps {
  userId: string;
  keywords: string;
  tags: string;
  description: string;
  advantages: string[];
  affiliateURL: string[];
  brand: string;
  disadvantages: string[];
  gender: string;
  mainImageALT: string;
  about: string;
  mainImageURL: string;
  name: string;
  price: string;
}

export const createProduct = async (product: CreateProductProps) => {
  try {
    if (!product.affiliateURL) return { error: "Missing affiliate link" };
    if (!product.userId) return { error: "No user ID" };

    if (
      !product.about ||
      !product.description ||
      !product.name ||
      !product.price
    )
      return { error: "No main text, price, about or title." };
    if (!product.mainImageALT || !product.mainImageURL)
      return { error: "Missing image property" };
    if (!product.keywords || !product.tags)
      return { error: "No keywords or tags" };

    const brand = await prisma.brand.findFirst({
      where: {
        name: product.brand,
      },
    });

    if (!brand || !product.brand) return { error: "Missing brand" };

    const gender = await prisma.gender.findFirst({
      where: {
        type: product.gender,
      },
    });

    if (!gender) return { error: "No gender." };

    await prisma.product.create({
      data: {
        userId: product.userId,
        slug: generateSlug(product.name),
        name: product.name,
        description: product.description,
        about: product.about,
        mainImageURL: product.mainImageURL,
        mainImageALT: product.mainImageALT.replaceAll(" ", "-"),
        tags: product.tags.split(","),
        keywords: product.keywords.split(","),
        brandId: brand.id,
        price: new Prisma.Decimal(parseFloat(product.price).toFixed(2)),
        advantages: product.advantages,
        disadvantages: product.disadvantages,
        affiliateURL: product.affiliateURL,
        genderId: gender.id,
      },
    });
    return { success: `product "${product.name}" created.` };
  } catch (err) {
    return { error: JSON.stringify(err) };
  }
};
