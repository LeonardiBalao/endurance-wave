"use client";

import MainCard from "@/components/structural/main-card";
import { Brand, Category, Subcategory } from "@prisma/client";
import { useEffect, useState } from "react";
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
import { CaretSortIcon, ResetIcon } from "@radix-ui/react-icons";
import {
  CheckIcon,
  PlusCircle,
  Star,
  Trash,
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
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [openBrands, setOpenBrands] = useState(false);
  const [characteristic, setCharacteristic] = useState("");

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: "",
      subcategory: "",
      keywords: "",
      tags: "",
      description: "",
      advantages: "",
      affiliateURL: "",
      brand: "",
      characteristics: [],
      disadvantages: "",
      gender: "",
      mainImageALT: "",
      about: "",
      mainImageURL: "",
      name: "",
      price: "",
      secondaryImageALT: "",
      secondaryImageURL: "",
      videoURL: "",
    },
    mode: "onChange",
  });

  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const review = {
      ...values,
      userId: userId,
    };
    console.log(review);
    // // const { error, success } = await createReview(review);
    // if (error) {
    //   return toast.error(`${error}`);
    // }
    // toast.success(success);
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
        title="Add product"
        description="Create a new product"
        className="gap-10 flex flex-col"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              name="mainImageURL"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start items-start gap-4">
                  <div className="flex gap-4 w-[350px]">
                    <div className="flex flex-col gap-4">
                      <FormLabel>Main Image</FormLabel>
                      {form.getValues("mainImageURL") && (
                        <div className="w-[250px]">
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={form.getValues("mainImageURL")}
                              alt="Photo by Drew Beamer"
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
                      type="number"
                      placeholder="250,50 USD"
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
              name="characteristics"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Characteristics</FormLabel>
                  {form.getValues("characteristics") && (
                    <ul className="pl-8">
                      {form.getValues("characteristics").map((c, i) => (
                        <li className="list-disc text-sm" key={i}>
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex gap-2 items-center">
                    <Textarea
                      placeholder="Great confort..."
                      onChange={(event) =>
                        setCharacteristic(event.target.value)
                      }
                    />
                    <PlusCircle
                      className="cursor-pointer"
                      onClick={() =>
                        form.setValue("characteristics", [
                          ...form.getValues("characteristics"),
                          characteristic,
                        ])
                      }
                    />
                    <Trash2
                      className="cursor-pointer"
                      onClick={() =>
                        form.setValue(
                          "characteristics",
                          form
                            .getValues("characteristics")
                            .slice(
                              0,
                              form.getValues("characteristics").length - 1
                            )
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
      </MainCard>
    </>
  );
}
