import React from "react";
import { usePagination, DOTS } from "./usePagination";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface PaginationProps {
  onPageChange: (n: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className: string;
}

const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={cn("flex flex-row items-center gap-1 justify-center")}>
      <li
        className={cn("pr-2", currentPage === 1 ? "hidden" : null)}
        onClick={onPrevious}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li key={i} className="flex h-9 w-9 items-center justify-center">
              <DotsHorizontalIcon className="h-4 w-4" />
            </li>
          );
        }

        return (
          <li
            key={i}
            className={cn(
              "border rounded-xl cursor-pointer text-xs",
              buttonVariants({
                variant: pageNumber === currentPage ? "outline" : "ghost",
                size: "icon",
              })
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cn(
          "pl-2 flex gap-2",
          currentPage === lastPage ? "hidden" : ""
        )}
        onClick={onNext}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </li>
    </ul>
  );
};

export default Pagination;
