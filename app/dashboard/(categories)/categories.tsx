"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Category } from "@prisma/client";
import { useState } from "react";

interface CategoriesProps {
  categories: Category[];
}

export default function SelectCategory({ categories }: CategoriesProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {category ? category : "Select category..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command label="Command Menu">
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categories.map((c: Category) => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  onSelect={(currentValue: string) => {
                    setCategory(currentValue === category ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {c.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      category === c.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
