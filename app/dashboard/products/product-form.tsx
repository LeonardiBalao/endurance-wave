"use client";

import { Brand, Category, Subcategory } from "@prisma/client";
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
import {
  CheckIcon,
  PlusCircle,
  Trash2,
  Upload,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { getSubcategories } from "@/server/actions/category/get-subcategories";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "sonner";
import { UploadButton } from "@/app/api/uploadthing/upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { productSchema } from "@/types/schemas/product-schema";
import TiptapAbout from "@/components/structural/tiptap-about";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct } from "@/server/actions/category/create-product";

interface ReviewFormProps {
  categories: Category[];
  brands: Brand[];
  userId: string;
}

export default function ProductForm({
  categories,
  userId,
  brands,
}: ReviewFormProps) {
  const [loading, setLoading] = useState(false);
  const [openBrands, setOpenBrands] = useState(false);
  const [advantages, setAdvantages] = useState("");
  const [disadvantages, setDisadvantages] = useState("");
  const [affiliateURL, setAffiliateURL] = useState("");

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      keywords: "",
      tags: "",
      description: "",
      advantages: [],
      affiliateURL: [],
      brand: "",
      disadvantages: [],
      gender: "",
      mainImageALT: "",
      about: "",
      mainImageURL: "",
      name: "",
      price: "0",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const product = {
      ...values,
      userId: userId,
    };
    const { error, success } = await createProduct(product);
    if (error) {
      return toast.error(`${error}`);
    }
    toast.success(success);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-10 items-center flex-wrap">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Brand</FormLabel>
                  <Popover open={openBrands} onOpenChange={setOpenBrands}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openBrands}
                        className="w-[200px] justify-between"
                      >
                        {field.value ? field.value : "Select brand"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command label="Command Menu">
                        <CommandInput
                          placeholder="Search brand..."
                          className="h-9"
                        />
                        <CommandEmpty>No brand found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {brands.map((c: Category) => (
                              <CommandItem
                                key={c.id}
                                value={c.name}
                                onSelect={(currentValue: string) => {
                                  form.setValue(
                                    "brand",
                                    currentValue === field.value
                                      ? ""
                                      : currentValue
                                  );
                                  setOpenBrands(false);
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
            name="gender"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mainImageURL"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-start items-start gap-4">
                <div className="flex gap-4 w-70%">
                  <div className="flex flex-col gap-4 w-full">
                    <FormLabel>Main Image</FormLabel>
                    {form.getValues("mainImageURL") && (
                      <div className="w-full mx-auto py-5">
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
                  </div>
                </div>
                <div className="flex gap-4 justify-between items-end">
                  <div className="flex flex-col gap-4">
                    <FormLabel>Image alternative text</FormLabel>
                    <Input
                      type="text"
                      placeholder="Tenis"
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
                            <div className="flex gap-2 items-center text-black">
                              <UploadCloud size={30} />
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Tenis AeroPRO MTF"
                    {...field}
                  />
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
            name="price"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>Price in USD</FormLabel>
                <FormControl>
                  <Input
                    placeholder="250,50 USD"
                    type="number"
                    step={0.01}
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About the product</FormLabel>
                <FormControl>
                  <TiptapAbout val={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="advantages"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Advantages</FormLabel>
                {form.getValues("advantages") && (
                  <ol className="pl-8">
                    {form.getValues("advantages").map((c, i) => (
                      <li className="list-decimal text-sm" key={i}>
                        {c}
                      </li>
                    ))}
                  </ol>
                )}
                <div className="flex gap-2 items-center">
                  <Textarea
                    placeholder="Great Price..."
                    onChange={(event) => setAdvantages(event.target.value)}
                    value={advantages}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        form.setValue("advantages", [
                          ...form.getValues("advantages"),
                          advantages,
                        ]);
                        setAdvantages("");
                      }
                    }}
                  />
                  <PlusCircle
                    className="cursor-pointer"
                    onClick={() =>
                      form.setValue("advantages", [
                        ...form.getValues("advantages"),
                        advantages,
                      ])
                    }
                  />
                  <Trash2
                    className="cursor-pointer"
                    onClick={() =>
                      form.setValue(
                        "advantages",
                        form
                          .getValues("advantages")
                          .slice(0, form.getValues("advantages").length - 1)
                      )
                    }
                  />
                </div>
                <FormControl>
                  <Input type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="disadvantages"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Disadvantages</FormLabel>
                {form.getValues("disadvantages") && (
                  <ol className="pl-8">
                    {form.getValues("disadvantages").map((c, i) => (
                      <li className="list-decimal text-sm" key={i}>
                        {c}
                      </li>
                    ))}
                  </ol>
                )}
                <div className="flex gap-2 items-center">
                  <Textarea
                    placeholder="Bad confort..."
                    onChange={(event) => setDisadvantages(event.target.value)}
                    value={disadvantages}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        form.setValue("disadvantages", [
                          ...form.getValues("disadvantages"),
                          disadvantages,
                        ]);
                        setDisadvantages("");
                      }
                    }}
                  />
                  <PlusCircle
                    className="cursor-pointer"
                    onClick={() =>
                      form.setValue("disadvantages", [
                        ...form.getValues("disadvantages"),
                        disadvantages,
                      ])
                    }
                  />
                  <Trash2
                    className="cursor-pointer"
                    onClick={() =>
                      form.setValue(
                        "disadvantages",
                        form
                          .getValues("disadvantages")
                          .slice(0, form.getValues("disadvantages").length - 1)
                      )
                    }
                  />
                </div>
                <FormControl>
                  <Input type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="affiliateURL"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Affiliate URLs</FormLabel>
                {form.getValues("affiliateURL") && (
                  <ol className="pl-8">
                    {form.getValues("affiliateURL").map((c, i) => (
                      <li className="list-decimal text-sm" key={i}>
                        {c}
                      </li>
                    ))}
                  </ol>
                )}
                <div className="flex gap-2 items-center">
                  <Input
                    type="text"
                    placeholder="www.amazon...."
                    onChange={(event) => setAffiliateURL(event.target.value)}
                    value={affiliateURL}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        form.setValue("affiliateURL", [
                          ...form.getValues("affiliateURL"),
                          affiliateURL,
                        ]);
                        setAffiliateURL("");
                      }
                    }}
                  />
                  <PlusCircle
                    className="cursor-pointer"
                    onClick={() =>
                      form.setValue("affiliateURL", [
                        ...form.getValues("affiliateURL"),
                        affiliateURL,
                      ])
                    }
                  />
                  <Trash2
                    className="cursor-pointer"
                    onClick={() =>
                      form.setValue(
                        "affiliateURL",
                        form
                          .getValues("affiliateURL")
                          .slice(0, form.getValues("affiliateURL").length - 1)
                      )
                    }
                  />
                </div>
                <FormControl>
                  <Input type="hidden" />
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
    </>
  );
}
