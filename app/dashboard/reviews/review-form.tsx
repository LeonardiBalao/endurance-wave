"use client";

import { Category, Product, Subcategory } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
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
import { CheckIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { reviewSchema } from "@/types/schemas/review-schema";
import { useRouter } from "next/navigation";
import { getSubcategories } from "@/server/actions/category/get-subcategories";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "sonner";
import TiptapIntroduction from "@/components/structural/tiptap-introduction";
import TiptapConclusion from "@/components/structural/tiptap-conclusion";
import TiptapComparative from "@/components/structural/tiptap-comparative";
import { createReview } from "@/server/actions/category/create-review";
import { UploadButton } from "@/app/api/uploadthing/upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Main from "@/components/structural/main";
import SecondaryCard from "@/components/structural/secondary-card";

interface ReviewFormProps {
  categories: Category[];
  userId: string;
  products: Product[];
}

export default function ReviewForm({
  categories,
  userId,
  products,
}: ReviewFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: "",
      category: "",
      subcategory: "",
      keywords: "",
      tags: "",
      description: "",
      introduction: "",
      comparative: "",
      conclusion: "",
      introductionImageURL: "/",
      introductionImageALT: "",
      mainImageURL: "/",
      mainImageALT: "",
      product: "",
    },
    mode: "onChange",
  });

  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [productsArray, setProductsArray] = useState<Product[]>([]);

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    let review = {
      ...values,
      userId: userId,
      pArray: productsArray,
    };
    const { error, success } = await createReview(review);
    if (error) {
      return toast.error(`${error}`);
    }
    toast.success(success);
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
    <Main className="container py-4">
      <SecondaryCard title="Add Review">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-10 items-center flex-wrap">
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
                name="product"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Products</FormLabel>
                    {productsArray.map((p) => (
                      <div
                        className="cursor-pointer w-full flex"
                        onClick={() =>
                          setProductsArray([
                            ...productsArray.filter((pA) => pA.id !== p.id),
                          ])
                        }
                        key={p.id}
                      >
                        <div className="w-[70%] mx-auto py-5">
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={p.mainImageURL}
                              alt={p.mainImageALT}
                              fill
                              className="border-2 border-black rounded-sm  shadow-lg object-cover"
                              unoptimized
                            />
                          </AspectRatio>
                        </div>
                        {p.name}
                      </div>
                    ))}
                    <Popover open={openProducts} onOpenChange={setOpenProducts}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openProducts}
                          className="w-[200px] justify-between"
                        >
                          {field.value ? field.value : "Select category"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command label="Command Menu">
                          <CommandInput
                            placeholder="Search product..."
                            className="h-9"
                          />
                          <CommandEmpty>No product found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {products.map((c: Product) => (
                                <CommandItem
                                  key={c.id}
                                  value={c.name}
                                  onSelect={(currentValue: string) => {
                                    form.setValue(
                                      "product",
                                      currentValue === field.value
                                        ? ""
                                        : currentValue
                                    );
                                    setProductsArray([...productsArray, c]);
                                    setOpenProducts(false);
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
            </div>
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
              name="mainImageURL"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start items-start gap-4">
                  <FormLabel>Main Image</FormLabel>
                  {form.getValues("mainImageURL") && (
                    <div className="w-[70%] mx-auto py-5">
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={form.getValues("mainImageURL")}
                          alt={form.getValues("mainImageALT")}
                          fill
                          className="border-2 border-black rounded-sm  shadow-lg object-cover"
                          unoptimized
                        />
                      </AspectRatio>
                    </div>
                  )}
                  <div className="flex gap-4 justify-between items-end">
                    <div className="flex flex-col gap-4">
                      <FormLabel>Image alternative text</FormLabel>
                      <Input
                        type="text"
                        placeholder="lion"
                        onChange={(event) =>
                          form.setValue("mainImageALT", event.target.value)
                        }
                      />
                    </div>
                    <UploadButton
                      className="mr-auto scale-75 ut-button:ring-primary hover:ut-button:bg-primary/100 ut-uploading:primary/50 ut-ready:primary ut-allowed-content:hidden ut-label:hidden ut-button:duration-500 ut-button:transition-all ut-button:bg-primary/75"
                      endpoint="imageUploader"
                      onUploadBegin={() => {
                        setLoading(true);
                      }}
                      onUploadError={(err) => {
                        form.setError("mainImageURL", {
                          type: "validate",
                          message: err.message,
                        });
                        setLoading(false);
                        return;
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("mainImageURL", res[0].url);
                        setLoading(false);
                        return;
                      }}
                      content={{
                        button({ ready }) {
                          if (ready)
                            return (
                              <div className="flex gap-2 items-center">
                                <Upload size={16} />
                                Add Image
                              </div>
                            );
                          return <div>Uploading...</div>;
                        },
                      }}
                    />
                  </div>

                  <FormControl>
                    <Input
                      placeholder="Comparative Image"
                      type="hidden"
                      {...field}
                    />
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
              name="introductionImageURL"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start items-start gap-4">
                  <FormLabel>Introduction Image</FormLabel>
                  {form.getValues("introductionImageURL") && (
                    <div className="w-[70%] mx-auto py-5">
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={form.getValues("introductionImageURL")}
                          alt={form.getValues("introductionImageALT")}
                          fill
                          className="border-2 border-black rounded-sm  shadow-lg object-cover"
                          unoptimized
                        />
                      </AspectRatio>
                    </div>
                  )}
                  <div className="flex gap-4 justify-between items-end">
                    <div className="flex flex-col gap-4">
                      <FormLabel>Image alternative text</FormLabel>
                      <Input
                        type="text"
                        placeholder="bitch running"
                        onChange={(event) =>
                          form.setValue(
                            "introductionImageALT",
                            event.target.value
                          )
                        }
                      />
                    </div>
                    <UploadButton
                      className="mr-auto scale-75 ut-button:ring-primary hover:ut-button:bg-primary/100 ut-uploading:primary/50 ut-ready:primary ut-allowed-content:hidden ut-label:hidden ut-button:duration-500 ut-button:transition-all ut-button:bg-primary/75"
                      endpoint="imageUploader"
                      onUploadBegin={() => {
                        setLoading(true);
                      }}
                      onUploadError={(err) => {
                        form.setError("introductionImageURL", {
                          type: "validate",
                          message: err.message,
                        });
                        setLoading(false);
                        return;
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("introductionImageURL", res[0].url);
                        setLoading(false);
                        return;
                      }}
                      content={{
                        button({ ready }) {
                          if (ready)
                            return (
                              <div className="flex gap-2 items-center">
                                <Upload size={16} />
                                Add Image
                              </div>
                            );
                          return <div>Uploading...</div>;
                        },
                      }}
                    />
                  </div>

                  <FormControl>
                    <Input
                      placeholder="Comparative Image"
                      type="hidden"
                      {...field}
                    />
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
            <div className="flex gap-4 items-center">
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
                    {field.value &&
                      field.value.split(",").map((s, i) => (
                        <Badge className="mr-2" key={i}>
                          {s}
                        </Badge>
                      ))}
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
                    {field.value &&
                      field.value.split(",").map((s, i) => (
                        <Badge className="mr-2" key={i}>
                          {s}
                        </Badge>
                      ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SecondaryCard>
    </Main>
  );
}
