'use client';

import { useState } from 'react';
import ResourceDisplay from './resource-display';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Folder, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface SubCategory {
  id: string;
  name: string;
  href?: string;
}

interface NestedResourceDisplayProps {
  categoryName: string;
  basePath: string;
  subCategories: SubCategory[];
}

export default function NestedResourceDisplay({
  categoryName,
  basePath,
  subCategories,
}: NestedResourceDisplayProps) {
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);

  const handleSubCategoryClick = (subCategory: SubCategory) => {
    // If it has a direct link, don't set it as the selected sub-category
    if (!subCategory.href) {
      setSelectedSubCategory(subCategory);
    }
  };

  const handleBackClick = () => {
    setSelectedSubCategory(null);
  };

  if (selectedSubCategory) {
    return (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            {selectedSubCategory.name}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <ResourceDisplay path={`${basePath}/${selectedSubCategory.id}`} />
        </div>
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{categoryName}</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
        {subCategories.map((sub) => {
          if (sub.href) {
            return (
              <Button
                key={sub.id}
                variant="outline"
                className="h-auto justify-between gap-3 py-4"
                asChild
              >
                <Link href={sub.href} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-3">
                    <Folder className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{sub.name}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            );
          }

          return (
            <Button
              key={sub.id}
              variant="outline"
              className="h-auto justify-start gap-3 py-4"
              onClick={() => handleSubCategoryClick(sub)}
            >
              <Folder className="h-5 w-5 text-primary" />
              <span className="font-semibold">{sub.name}</span>
            </Button>
          );
        })}
      </div>
    </>
  );
}
