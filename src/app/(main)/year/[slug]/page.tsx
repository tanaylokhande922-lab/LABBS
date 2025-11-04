'use client';

import ResourceDisplay from '@/components/resources/resource-display';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowUpRight, FileText } from 'lucide-react';
import { useParams } from 'next/navigation';

const pathDetails: { [key: string]: { title: string } } = {
  '1st-year': { title: '1st Year Resources' },
  '2nd-year': { title: '2nd Year Resources' },
  gate: { title: 'GATE Preparation Resources' },
  upsc: { title: 'UPSC Preparation Resources' },
};

const resourceCategories = [
  { id: 'syllabus', name: 'Syllabus' },
  { id: 'question-papers', name: 'Question Papers' },
  { id: 'book-pdfs', name: 'Book PDFs' },
  { id: 'subject-treasure', name: 'Subject Treasure' },
];

// Google Drive links can be embedded using a specific URL format
const syllabusDriveLink =
  'https://drive.google.com/file/d/1rZGeYu9UYM375_GNkt5T4ZWZa6trZdLs/preview';

export default function YearResourcesPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const details = (slug && pathDetails[slug]) || { title: 'Resources' };
  const is1stYearSyllabus = slug === '1st-year';

  if (!slug) {
    return null; // Or a loading/error state
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{details.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find all your academic materials in one place.
        </p>
      </div>

      <Accordion type="multiple" className="w-full space-y-4">
        {resourceCategories.map((category) => {
          if (is1stYearSyllabus && category.id === 'syllabus') {
            return (
              <Dialog key={category.id}>
                <DialogTrigger asChild>
                  <div className="flex cursor-pointer items-center justify-between rounded-lg border bg-card px-4 py-4 text-md font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>{category.name}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-5/6 top-1/2 -translate-y-1/2">
                  <DialogHeader>
                    <DialogTitle>{category.name}</DialogTitle>
                  </DialogHeader>
                  <div className="h-full w-full overflow-hidden rounded-lg border">
                    <iframe
                      src={syllabusDriveLink}
                      className="h-full w-full"
                      allow="autoplay"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            );
          }

          return (
            <AccordionItem
              value={category.id}
              key={category.id}
              className="rounded-lg border bg-card px-4 shadow-sm"
            >
              <AccordionTrigger className="text-md py-4 font-semibold hover:no-underline">
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                <ResourceDisplay path={`${slug}/${category.id}`} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
