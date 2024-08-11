"use server";

import prisma from "@/server/db";

interface CreateProductProps {
  userId: string;
  category: string;
  subcategory: string;
  keywords: string;
  tags: string;
  description: string;
  advantages: string[];
  affiliateURL: string[];
  brand: string;
  characteristics: string[];
  disadvantages: string[];
  gender: string;
  mainImageALT: string;
  about: string;
  mainImageURL: string;
  name: string;
  price: string;
  secondaryImageALT: string;
  secondaryImageURL: string;
  videoURL: string;
}

export const createProduct = async (product: CreateProductProps) => {
  try {
    if (!product.userId) return { error: "No user ID" };
    if (!product.category || !product.subcategory)
      return { error: "No category and subcategory" };
    if (
      !product.about ||
      !product.description ||
      !product.name ||
      !product.price
    )
      return { error: "No main text, price, about or title." };
    if (
      !product.mainImageALT ||
      !product.mainImageURL ||
      !product.secondaryImageALT ||
      !product.secondaryImageURL
    )
      return { error: "Missing image property" };
    if (!product.keywords || !product.tags)
      return { error: "No keywords or tags" };

    const category = await prisma.category.findFirst({
      where: {
        name: product.category,
      },
    });

    if (!category) return { error: "No category" };

    const subcategory = await prisma.subcategory.findFirst({
      where: {
        categoryId: category.id,
        name: product.subcategory,
      },
    });

    if (!subcategory) return { error: "No subcategory" };

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
        name: product.name,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        description: product.description,
        about: product.about,
        mainImageURL: product.mainImageURL,
        mainImageALT: product.mainImageALT.replaceAll(" ", "-"),
        secondaryImageURL: product.secondaryImageURL,
        secondaryImageALT: product.secondaryImageALT.replaceAll(" ", "-"),
        tags: product.tags.split(","),
        keywords: product.keywords.split(","),
        brandId: brand.id,
        price: parseFloat(product.price),
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
