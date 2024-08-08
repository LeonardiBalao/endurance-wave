"use client";

import { getMenu } from "@/server/actions/category/get-menu";
import React, { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
}

export default function NavMenu() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories and subcategories from Prisma
    const fetchData = async () => {
      try {
        const fetchedCategories = await getMenu();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul className="flex gap-4 items-center">
      {categories.map((category) => (
        <li key={category.id} className="group">
          {category.name}
          <ul className="hidden group-hover:block">
            {category.subcategories.map((subcategory) => (
              <li key={subcategory.id}>{subcategory.name}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
