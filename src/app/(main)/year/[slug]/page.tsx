
'use client';

import ResourceDisplay from '@/components/resources/resource-display';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

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

export default function YearResourcesPage({ params }: PageProps) {
  const details = pathDetails[params.slug] || { title: 'Resources' };
  const is1stYearSyllabus = params.slug === '1st-year';

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
              <div
                key={category.id}
                className="rounded-lg border bg-card px-4 shadow-sm"
              >
                <Link
                  href="https://drive.google.com/file/d/1rZGeYu9UYM375_GNkt5T4ZWZa6trZdLs/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-between py-4 text-md font-semibold transition-all hover:underline"
                >
                  {category.name}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              </div>
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
                <ResourceDisplay path={`${params.slug}/${category.id}`} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
