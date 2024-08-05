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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, PlusCircle } from "lucide-react";
import { categorySchema } from "@/types/schemas/category-schema";
import { subcategorySchema } from "@/types/schemas/subcategory-schema";
import { createsubCategory } from "@/server/actions/category/create-subcategory";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Category, Subcategory } from "@prisma/client";
import MainCard from "@/components/structural/main-card";
import { getSubcategories } from "@/server/actions/category/get-subcategories";

interface NewSubcategoryProps {
  categories: Category[];
}

export default function NewSubcategory({ categories }: NewSubcategoryProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const form = useForm({
    resolver: zodResolver(subcategorySchema),
    defaultValues: {
      category: "",
      subcategory: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof subcategorySchema>) => {
    setLoading(true);
    const { error, success } = await createsubCategory(values);
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
      title="New Subcategory"
      description="Create a new subcategory"
      titleClassSize="text-lg"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[250px] justify-between flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel></FormLabel>
                <Popover open={openCategory} onOpenChange={setOpenCategory}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCategory}
                      className="w-[200px] justify-between"
                    >
                      {field.value ? field.value : "Select category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command label="Command Menu">
                      <CommandInput
                        placeholder="Search category..."
                        className="h-9"
                      />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {categories.map((c: Category) => (
                            <CommandItem
                              key={c.id}
                              value={c.name}
                              onSelect={(currentValue: string) => {
                                form.setValue(
                                  "category",
                                  currentValue === field.value
                                    ? ""
                                    : currentValue
                                );
                                setOpenCategory(false);
                              }}
                            >
                              {c.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  field.value === c.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end justify-between gap-1">
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g: Running shoes"
                      type="text"
                      {...field}
                    />
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
          </div>
        </form>
      </Form>
    </MainCard>
  );
}
