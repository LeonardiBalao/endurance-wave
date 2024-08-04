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

import { createCategory } from "@/server/actions/category/create-category";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { categorySchema } from "@/types/schemas/category-schema";
import MainCard from "@/components/structural/main-card";

export default function NewCategory() {
  const router = useRouter();
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
    router.refresh();
    return toast.success(success);
  };

  return (
    <MainCard
      title="New Category"
      description="Create a new category"
      titleClassSize="text-lg"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[250px] justify-between flex items-end gap-2"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add category</FormLabel>
                <FormControl>
                  <Input placeholder="Or create new" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"ghost"}
            className={cn("", loading ? "animate-pulse" : "")}
          >
            <PlusCircle size={18} />
          </Button>
        </form>
      </Form>
    </MainCard>
  );
}
