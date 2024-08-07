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
import MainCard from "@/components/structural/main-card";
import { brandSchema } from "@/types/schemas/brand-schema";
import { createBrand } from "@/server/actions/category/create-brand";

export default function NewBrand() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brand: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof brandSchema>) => {
    setLoading(true);
    const { error, success } = await createBrand(values);
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
      title="New Brand"
      description="Create a new brand"
      titleClassSize="text-lg"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[250px] justify-between flex items-end gap-2"
        >
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Brand</FormLabel>
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
