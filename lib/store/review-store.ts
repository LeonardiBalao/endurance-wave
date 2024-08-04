import { Prisma } from "@prisma/client";
import { create } from "zustand";

export type NewReviewState = {
  review: Prisma.ReviewUncheckedCreateInput;
  addUserId: (userId: string) => void;
  addCategoryId: (categoryId: string) => void;
  addTitle: (title: string) => void;
  addMetaDescription: (metaDescription: string) => void;
  addDescription: (description: string) => void;
  addComparative: (comparative: string) => void;
  addImageAlt: (imageAlt: string) => void;
  addIntroduction: (introduction: string) => void;
  addProductsId: (productsId: string[]) => void;
  addRating: (rating: number) => void;
  addSubcategoryId: (subcategoryId: string) => void;
};

export const useReviewStore = create<NewReviewState>((set) => ({
  review: {
    userId: "",
    categoryId: "",
    title: "",
    metaDescription: "",
    description: "",
    comparative: "",
    imageAlt: "",
    introduction: "",
    productsId: [""],
    rating: 1,
    subcategoryId: "",
  },
  addUserId: (userId) =>
    set((state) => ({
      review: {
        ...state.review,
        userId: userId,
      },
    })),
  addCategoryId: (categoryId) =>
    set((state) => ({
      review: {
        ...state.review,
        categoryId: categoryId,
      },
    })),
  addTitle: (title) =>
    set((state) => ({
      review: {
        ...state.review,
        title: title,
      },
    })),
  addMetaDescription: (metaDescription) =>
    set((state) => ({
      review: {
        ...state.review,
        metaDescription: metaDescription,
      },
    })),
  addDescription: (description) =>
    set((state) => ({
      review: {
        ...state.review,
        description: description,
      },
    })),
  addComparative: (comparative) =>
    set((state) => ({
      review: {
        ...state.review,
        comparative: comparative,
      },
    })),
  addImageAlt: (imageAlt) =>
    set((state) => ({
      review: {
        ...state.review,
        imageAlt: imageAlt,
      },
    })),
  addIntroduction: (introduction) =>
    set((state) => ({
      review: {
        ...state.review,
        introduction: introduction,
      },
    })),
  addProductsId: (productsId) =>
    set((state) => ({
      review: {
        ...state.review,
        productsId: productsId,
      },
    })),
  addRating: (rating) =>
    set((state) => ({
      review: {
        ...state.review,
        rating: rating,
      },
    })),
  addSubcategoryId: (subcategoryId) =>
    set((state) => ({
      review: {
        ...state.review,
        subcategoryId: subcategoryId,
      },
    })),
}));
