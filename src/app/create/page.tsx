'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { IPForm } from '@/components/IPForm';
import { PageLoader } from '@/components/LoadingSpinner';
import type { IPCategory } from '@/types';

function CreateContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as IPCategory | null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <IPForm initialData={type ? { type } : undefined} />
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CreateContent />
    </Suspense>
  );
}
