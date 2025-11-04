import ResourceDisplay from '@/components/resources/resource-display';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

export async function generateMetadata({ params }: PageProps) {
  const details = pathDetails[params.slug] || { title: 'Resources' };
  return {
    title: `${details.title} | CampusConnect`,
  };
}

export default function YearResourcesPage({ params }: PageProps) {
  const details = pathDetails[params.slug] || { title: 'Resources' };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{details.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find all your academic materials in one place.
        </p>
      </div>

      <Accordion type="multiple" className="w-full space-y-4">
        {resourceCategories.map((category, index) => (
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
        ))}
      </Accordion>
    </div>
  );
}
