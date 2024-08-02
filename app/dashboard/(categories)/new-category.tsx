"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { categorySchema } from "@/types/schemas/category";
import { createCategory } from "@/server/actions/category/create-category";
import { toast } from "sonner";
import { useState } from "react";

export default function NewCategory() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    setLoading(true);
    const { error, success } = await createCategory(values);
    if (error) {
      setLoading(false);
      return toast.error(error);
    }
    setLoading(false);
    return toast.success(success);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Category</FormLabel>
              <FormControl>
                <Input placeholder="Add category" type="text" {...field} />
              </FormControl>
              <FormDescription>Create a category</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={cn("", loading ? "animate-pulse" : "")}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
