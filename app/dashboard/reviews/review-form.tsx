"use client";

import MainCard from "@/components/structural/main-card";
import { Category, Subcategory } from "@prisma/client";
// import { useReviewStore } from "@/lib/store/review-store";
import { ChangeEvent, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
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
import { CheckIcon, Star, Trash, Upload, UploadCloud } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { createReview } from "@/server/actions/category/create-review";
import { Toaster } from "@/components/ui/sonner";
import { UploadButton } from "@/app/api/uploadthing/upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ReviewFormProps {
  categories: Category[];
  userId: string;
}

export default function ReviewForm({ categories, userId }: ReviewFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);

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
      introductionImageURL:
        "https://utfs.io/f/a17cb278-7a10-4393-ab4d-6f51fb357c75-1ztc2k.png",
      introductionImageALT: "",
      mainImageURL:
        "https://utfs.io/f/a17cb278-7a10-4393-ab4d-6f51fb357c75-1ztc2k.png",
      mainImageALT: "",
      comparativeImageALT: "",
      comparativeImageURL:
        "https://utfs.io/f/a17cb278-7a10-4393-ab4d-6f51fb357c75-1ztc2k.png",
    },
    mode: "onChange",
  });

  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    const review = {
      ...values,
      userId: userId,
    };
    console.log(review);
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
              name="introductionImageURL"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start items-start gap-4">
                  <div className="flex gap-4 w-[350px]">
                    <div className="flex flex-col gap-4">
                      <FormLabel>Introduction Image</FormLabel>
                      {form.getValues("introductionImageURL") && (
                        <div className="w-[250px]">
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={form.getValues("introductionImageURL")}
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
              name="comparativeImageURL"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start items-start gap-4">
                  <div className="flex gap-4 w-[350px]">
                    <div className="flex flex-col gap-4">
                      <FormLabel>Comparative Image</FormLabel>
                      {form.getValues("comparativeImageURL") && (
                        <div className="w-[250px]">
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={form.getValues("comparativeImageURL")}
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
                          form.setValue(
                            "comparativeImageALT",
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
                        form.setError("comparativeImageURL", {
                          type: "validate",
                          message: err.message,
                        });
                        setLoading(false);
                        return;
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("comparativeImageURL", res[0].url);
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
                      placeholder="Introduction Image"
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </MainCard>
    </>
  );
}
