"use client";

import MainCard from "@/components/structural/main-card";
import { Category, Subcategory } from "@prisma/client";
import { useReviewStore } from "@/lib/store/review-store";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon, Trash, Upload, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { reviewSchema } from "@/types/schemas/review-schema";
import { useRouter } from "next/navigation";
import NewSubcategory from "./new-subcategory";
import NewCategory from "./new-category";
import { getSubcategories } from "@/server/actions/category/get-subcategories";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "sonner";
import TiptapIntroduction from "@/components/structural/tiptap-introduction";
import TiptapConclusion from "@/components/structural/tiptap-conclusion";
import TiptapComparative from "@/components/structural/tiptap-comparative";

interface ReviewFormProps {
  categories: Category[];
}

export default function ReviewForm({ categories }: ReviewFormProps) {
  const router = useRouter();
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) {
      return toast.error("File not found.");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64Images([...base64Images, reader.result as string]);
    };
  };

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      category: "",
      subcategory: "",
      description: "",
      keywords: "",
      introduction: "",
      conclusion: "",
      comparative: "",
      productsId: [""],
      rating: 1,
      tags: "",
      title: "",
    },
    mode: "onChange",
  });

  const { addCategoryId } = useReviewStore();

  const [loading, setLoading] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);

  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const onSubmit = (values: z.infer<typeof reviewSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    setSubcategories([]);
    const fetchData = async () => {
      const data = await getSubcategories(category);
      setSubcategories(data);
    };
    fetchData();
  }, [category]);

  return (
    <>
      <MainCard
        title="Add review"
        description="Create a new review"
        className="gap-10 flex flex-col"
      >
        <div className="flex gap-10">
          <NewCategory />
          <NewSubcategory categories={categories} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-10 items-center">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
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
                                    setCategory(c.name);
                                    addCategoryId(c.id);
                                    setOpenCategory(false);
                                    form.setValue("subcategory", "");
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
              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Sub Category</FormLabel>
                    <Popover
                      open={openSubcategory}
                      onOpenChange={setOpenSubcategory}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openSubcategory}
                          className="w-[200px] justify-between"
                        >
                          {field.value ? field.value : "Select subcategory"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command label="Command Menu">
                          <CommandInput
                            placeholder="Search subcategory..."
                            className="h-9"
                          />
                          <CommandEmpty>No subcategory found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {subcategories.map((c: Category) => (
                                <CommandItem
                                  key={c.id}
                                  value={c.name}
                                  onSelect={(currentValue: string) => {
                                    form.setValue(
                                      "subcategory",
                                      currentValue === field.value
                                        ? ""
                                        : currentValue
                                    );
                                    addCategoryId(c.id);
                                    setOpenSubcategory(false);
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
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Keywords</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="shoes, shirts..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="#male, #running..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Introduction</FormLabel>
                  <FormControl>
                    <TiptapIntroduction val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comparative"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comparative</FormLabel>
                  <FormControl>
                    <TiptapComparative val={field.value} />
                  </FormControl>
                  <FormDescription>{field.value}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conclusion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conclusion</FormLabel>
                  <FormControl>
                    <TiptapConclusion val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Input
              className="w-[400px] cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              placeholder="Upload"
            />
            {base64Images.length !== 0 && (
              <div className="flex gap-4 items-center">
                {base64Images.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    height={50}
                    width={50}
                    alt="photo"
                    className="rounded-lg"
                  />
                ))}
                <Trash onClick={() => setBase64Images([])} />
              </div>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </MainCard>
    </>
  );
}
