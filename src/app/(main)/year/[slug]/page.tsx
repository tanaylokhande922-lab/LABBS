'use client';

import ResourceDisplay from '@/components/resources/resource-display';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ChevronLeft, FileText, FolderOpen } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import NestedResourceDisplay from '@/components/resources/nested-resource-display';

const pathDetails: { [key: string]: { title: string } } = {
  '1st-year': { title: '1st Year Resources' },
  '2nd-year-cs': { title: '2nd Year - Computer Science' },
  '2nd-year-it': { title: '2nd Year - Information Technology' },
  '2nd-year-ece': { title: '2nd Year - Electronics and Computer Engineering' },
  '2nd-year-ds': { title: '2nd Year - Data Science' },
  gate: { title: 'GATE Preparation Resources' },
  upsc: { title: 'UPSC Preparation Resources' },
};

const resourceCategories = [
  { id: 'syllabus', name: 'Syllabus', icon: <FileText className="h-5 w-5 text-primary" /> },
  { id: 'question-papers', name: 'Question Papers', icon: <FolderOpen className="h-5 w-5 text-primary" /> },
  { id: 'book-pdfs', name: 'Book PDFs', icon: <FolderOpen className="h-5 w-5 text-primary" /> },
  { id: 'subject-treasure', name: 'Subject Treasure', icon: <FolderOpen className="h-5 w-5 text-primary" /> },
];

const firstYearSubjectTreasureSubCategories = [
  { id: 'physics', name: 'Physics' },
  { id: 'm1', name: 'M1' },
  { id: 'eg', name: 'EG' },
  { id: 'beee', name: 'BEEE' },
]

const syllabusDriveLink =
  'https://drive.google.com/file/d/1rZGeYu9UYM375_GNkt5T4ZWZa6trZdLs/view?usp=drive_link';
const eceSyllabusDriveLink = 
  'https://drive.google.com/file/d/1hqzsWEdW2dXo4co3aknY1IqiwAmoKjU1/view?usp=drive_link';
const winter2024QuestionPaperLink =
  'https://drive.google.com/drive/folders/1GsIJ2wLypRbI5gavvqT4wwilQTM4oWD2?usp=drive_link';
const summer2025QuestionPaperLink =
  'https://drive.google.com/drive/folders/1y-5JRUvJEhBgyQFT9u4JYLTfi6ufTuAt?usp=drive_link';
const summer2025SupplyQuestionPaperLink =
  'https://drive.google.com/drive/folders/1CknMU-u2iw91EViQkHWKNc3XeBK6v8J2?usp=drive_link';
const em3PyqLink =
  'https://drive.google.com/file/d/17tYDl1BfaTrVpD_BoCzh_4wjdD56Lrs5/view?usp=drive_link';


export default function YearResourcesPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  if (!slug) {
    return null; // Or a loading/error state
  }

  const details = pathDetails[slug] || { title: 'Resources' };
  const is1stYear = slug === '1st-year';
  const is2ndYear = slug.startsWith('2nd-year-');
  const is2ndYearEce = slug === '2nd-year-ece';

  return (
    <div className="container py-8">
      {is2ndYear && (
        <div className="mb-6">
          <Button asChild variant="outline" size="sm">
            <Link href="/year/2nd-year/select-branch">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Select Branch
            </Link>
          </Button>
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{details.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find all your academic materials in one place.
        </p>
      </div>

      <div className="w-full space-y-4">
        {resourceCategories.map((category) => {
          // Special static content only for 1st Year
          if (is1stYear) {
            if (category.id === 'syllabus') {
              return (
                <Link
                  key={category.id}
                  href={syllabusDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center justify-between rounded-lg border bg-card px-4 py-4 text-md font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              );
            }

            if (category.id === 'question-papers') {
              return (
                <Dialog key={category.id}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between rounded-lg border bg-card px-4 py-6 text-md font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      <div className="flex items-center gap-3">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>{category.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                      <Link
                        href={winter2024QuestionPaperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-secondary"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="truncate text-sm font-medium">
                            Winter-2024_Regular_Sem-1_Question Paper
                          </span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </Link>
                      <Link
                        href={summer2025QuestionPaperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-secondary"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="truncate text-sm font-medium">
                            Summer-2025_ Regular_Sem-2_Question Paper
                          </span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </Link>
                      <Link
                        href={summer2025SupplyQuestionPaperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-secondary"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="truncate text-sm font-medium">
                            Summer-25_Supply_Sem-1_Question Papers
                          </span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            }
            if (category.id === 'subject-treasure') {
                return (
                  <Dialog key={category.id}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between rounded-lg border bg-card px-4 py-6 text-md font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-3">
                          {category.icon}
                          <span>{category.name}</span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                       <NestedResourceDisplay
                        categoryName={category.name}
                        basePath={`${slug}/${category.id}`}
                        subCategories={firstYearSubjectTreasureSubCategories}
                       />
                    </DialogContent>
                  </Dialog>
                );
              }
          }

          // Special static content for 2nd Year
          if (is2ndYear) {
             if (is2ndYearEce && category.id === 'syllabus') {
              return (
                <Link
                  key={category.id}
                  href={eceSyllabusDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center justify-between rounded-lg border bg-card px-4 py-4 text-md font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              );
            }
            if (category.id === 'question-papers') {
              return (
                <Dialog key={category.id}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between rounded-lg border bg-card px-4 py-6 text-md font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      <div className="flex items-center gap-3">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>{category.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                      <Link
                        href={em3PyqLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-secondary"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="truncate text-sm font-medium">
                            EM III ALL PYQ
                          </span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            }
          }
          
          // Dynamic content for all other paths and remaining categories
          return (
            <Dialog key={category.id}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-lg border bg-card px-4 py-6 text-md font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>{category.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <ResourceDisplay path={`${slug}/${category.id}`} />
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}
