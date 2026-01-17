'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { IPForm } from '@/components/IPForm';
import { useStore } from '@/store';

export default function EditIPPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { assets, currentUser } = useStore();
  const asset = assets.find((a) => a.slug === slug);

  if (!asset) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Not Found</h1>
          <p className="text-gray-500 mb-4">This creation doesn&apos;t exist or has been removed.</p>
          <Link href="/explore" className="btn-primary">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  // Check if user owns this asset
  if (currentUser?.id !== asset.author.id) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Not Authorized</h1>
          <p className="text-gray-500 mb-4">You don&apos;t have permission to edit this creation.</p>
          <Link href={`/ip/${slug}`} className="btn-primary">
            View Creation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <h1 className="text-2xl font-bold mb-1">Edit: {asset.title}</h1>
          <p className="text-gray-500">Make changes to your creation</p>
        </div>

        <IPForm
          mode="edit"
          assetId={asset.id}
          initialData={{
            type: asset.type,
            title: asset.title,
            summary: asset.summary,
            content: asset.content,
            coverImage: asset.coverImage,
            license: asset.license,
            tags: asset.tags.map((t) => t.name),
            worldId: asset.worldId,
            status: asset.status,
            details: {},
          }}
        />
      </div>
    </div>
  );
}
