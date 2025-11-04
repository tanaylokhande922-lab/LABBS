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
import { ArrowUpRight, FileText, FolderOpen } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const pathDetails: { [key: string]: { title: string } } = {
  '1st-year': { title: '1st Year Resources' },
  '2nd-year-cs': { title: '2nd Year - Computer Science' },
  '2nd-year-mech': { title: '2nd Year - Mechanical' },
  gate: { title: 'GATE Preparation Resources' },
  upsc: { title: 'UPSC Preparation Resources' },
};

const resourceCategories = [
  { id: 'syllabus', name: 'Syllabus' },
  { id: 'question-papers', name: 'Question Papers' },
  { id: 'book-pdfs', name: 'Book PDFs' },
  { id: 'subject-treasure', name: 'Subject Treasure' },
];

const syllabusDriveLink =
  'https://drive.google.com/file/d/1rZGeYu9UYM375_GNkt5T4ZWZa6trZdLs/view?usp=drive_link';
const winter2024QuestionPaperLink =
  'https://drive.google.com/drive/folders/1GsIJ2wLypRbI5gavvqT4wwilQTM4oWD2?usp=drive_link';
const summer2025QuestionPaperLink =
  'https://drive.google.com/drive/folders/1y-5JRUvJEhBgyQFT9u4JYLTfi6ufTuAt?usp=drive_link';
const summer2025SupplyQuestionPaperLink =
  'https://drive.google.com/drive/folders/1CknMU-u2iw91EViQkHWKNc3XeBK6v8J2?usp=drive_link';

export default function YearResourcesPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  if (!slug) {
    return null; // Or a loading/error state
  }

  const details = pathDetails[slug] || { title: 'Resources' };
  const is1stYear = slug === '1st-year';

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{details.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find all your academic materials in one place.
        </p>
      </div>

      <div className="w-full space-y-4">
        {resourceCategories.map((category) => {
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
                  <FileText className="h-5 w-5 text-primary" />
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
                      <FolderOpen className="h-5 w-5 text-primary" />
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

          if (
            category.id === 'book-pdfs' ||
            category.id === 'subject-treasure'
          ) {
            return (
              <Dialog key={category.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between rounded-lg border bg-card px-4 py-6 text-md font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-5 w-5 text-primary" />
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
          }

          return null;
        })}
      </div>
    </div>
  );
}
