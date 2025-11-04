'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { storage } from '@/lib/firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import {
  AlertTriangle,
  Download,
  FileText,
  Loader2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type FileItem = {
  name: string;
  url: string;
};

export default function ResourceDisplay({ path }: { path: string }) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      setFiles([]);

      try {
        const storageRef = ref(storage, path);
        const res = await listAll(storageRef);

        if (res.items.length === 0) {
          setError(
            'No resources found in this category. Check back later!'
          );
          return;
        }

        const fileItems = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );
        setFiles(fileItems);
      } catch (e: any) {
        if (e.code === 'storage/object-not-found') {
          setError(
            'This resource category does not exist or is currently empty.'
          );
        } else {
          setError('An unexpected error occurred while loading resources.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [path]);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="default" className="bg-secondary">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>No Resources Available</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <div
          key={file.name}
          className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-secondary"
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 flex-shrink-0 text-primary" />
            <span className="truncate text-sm font-medium">{file.name}</span>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="flex-shrink-0"
          >
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              View
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
}
