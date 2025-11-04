
'use client';

import ResourceDisplay from '@/components/resources/resource-display';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowUpRight, FileText } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

const syllabusDriveLink =
  'https://drive.google.com/file/d/1rZGeYu9UYM375_GNkt5T4ZWZa6trZdLs/view?usp=drive_link';
const winter2024QuestionPaperLink =
  'https://drive.google.com/drive/folders/1GsIJ2wLypRbI5gavvqT4wwilQTM4oWD2?usp=drive_link';

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

      <Accordion type="multiple" className="w-full space-y-4">
        {resourceCategories.map((category) => {
          if (is1stYear && category.id === 'syllabus') {
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

          if (is1stYear && category.id === 'question-papers') {
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
                  <div className="space-y-3">
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
                    <ResourceDisplay path={`${slug}/${category.id}`} />
                  </div>
                </AccordionContent>
              </AccordionItem>
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
