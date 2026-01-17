'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Globe,
  BookOpen,
  Scroll,
  Sword,
  Users,
  Calendar,
  Lightbulb,
  Save,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import { TagInput } from './TagInput';
import { useStore } from '@/store';
import type { IPCategory, LicenseType, ContentStatus, IPAssetFormData } from '@/types';

interface IPFormProps {
  initialData?: Partial<IPAssetFormData>;
  assetId?: string;
  mode?: 'create' | 'edit';
}

const typeOptions: { value: IPCategory; label: string; icon: typeof User; description: string }[] = [
  { value: 'character', label: 'Character', icon: User, description: 'Create a memorable character with backstory and traits' },
  { value: 'world', label: 'World', icon: Globe, description: 'Build an entire universe with lore and locations' },
  { value: 'story', label: 'Story', icon: BookOpen, description: 'Write short fiction, flash fiction, or story outlines' },
  { value: 'lore', label: 'Lore', icon: Scroll, description: 'Document history, mythology, and world events' },
  { value: 'item', label: 'Item', icon: Sword, description: 'Design magical artifacts, weapons, or objects' },
  { value: 'faction', label: 'Faction', icon: Users, description: 'Create organizations, guilds, or groups' },
  { value: 'event', label: 'Event', icon: Calendar, description: 'Document significant historical or future events' },
  { value: 'concept', label: 'Concept', icon: Lightbulb, description: 'Define magic systems, technologies, or abstract ideas' },
];

const licenseOptions: { value: LicenseType; label: string; description: string }[] = [
  { value: 'open', label: 'Open', description: 'Anyone can use, modify, and share' },
  { value: 'attribution', label: 'Attribution', description: 'Free to use with credit' },
  { value: 'non-commercial', label: 'Non-Commercial', description: 'Free for non-commercial use only' },
  { value: 'exclusive', label: 'Exclusive', description: 'Available for exclusive licensing' },
  { value: 'restricted', label: 'Restricted', description: 'View only, no derivative works' },
];

export function IPForm({ initialData, assetId, mode = 'create' }: IPFormProps) {
  const router = useRouter();
  const { createAsset, updateAsset, getAssetsByType } = useStore();
  const worlds = getAssetsByType('world');

  const [formData, setFormData] = useState<IPAssetFormData>({
    type: initialData?.type || 'character',
    title: initialData?.title || '',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    license: initialData?.license || 'attribution',
    tags: initialData?.tags || [],
    worldId: initialData?.worldId || '',
    status: initialData?.status || 'draft',
    details: initialData?.details || {},
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNum === 1) {
      if (!formData.type) newErrors.type = 'Please select a type';
    } else if (stepNum === 2) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
      if (formData.summary.length > 300) newErrors.summary = 'Summary must be under 300 characters';
    } else if (stepNum === 3) {
      if (!formData.content.trim()) newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (status: ContentStatus) => {
    if (!validateStep(3)) return;

    const dataToSave = { ...formData, status };

    if (mode === 'edit' && assetId) {
      updateAsset(assetId, dataToSave);
      router.push(`/ip/${assetId}`);
    } else {
      const newAsset = createAsset(dataToSave);
      router.push(`/ip/${newAsset.slug}`);
    }
  };

  const selectedType = typeOptions.find((t) => t.value === formData.type);
  const TypeIcon = selectedType?.icon || User;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s <= step
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`w-full h-1 mx-2 ${
                    s < step ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  style={{ minWidth: '60px' }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Type</span>
          <span>Details</span>
          <span>Content</span>
          <span>Publish</span>
        </div>
      </div>

      {/* Step 1: Select Type */}
      {step === 1 && (
        <div className="animate-in">
          <h2 className="text-2xl font-bold mb-2">What are you creating?</h2>
          <p className="text-gray-500 mb-6">Choose the type of IP you want to share with the world.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {typeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: option.value })}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    formData.type === option.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      formData.type === option.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{option.label}</h3>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {errors.type && <p className="mt-2 text-sm text-red-500">{errors.type}</p>}

          <div className="flex justify-end mt-8">
            <button onClick={handleNext} className="btn-primary">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Basic Details */}
      {step === 2 && (
        <div className="animate-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary-500 text-white flex items-center justify-center">
              <TypeIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create your {selectedType?.label}</h2>
              <p className="text-gray-500">Add the basic details</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={`Give your ${selectedType?.label.toLowerCase()} a name`}
                className="input-field"
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Summary *</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="A brief description (displayed in cards and search results)"
                rows={3}
                className="input-field resize-none"
              />
              <div className="flex justify-between mt-1">
                {errors.summary && <p className="text-sm text-red-500">{errors.summary}</p>}
                <p className={`text-xs ${formData.summary.length > 300 ? 'text-red-500' : 'text-gray-400'}`}>
                  {formData.summary.length}/300
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="input-field"
              />
              {formData.coverImage && (
                <div className="mt-2 rounded-lg overflow-hidden aspect-video max-w-xs">
                  <img src={formData.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {formData.type !== 'world' && worlds.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Associated World</label>
                <select
                  value={formData.worldId}
                  onChange={(e) => setFormData({ ...formData, worldId: e.target.value })}
                  className="input-field"
                >
                  <option value="">None - Standalone</option>
                  {worlds.map((world) => (
                    <option key={world.id} value={world.id}>
                      {world.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <TagInput
                value={formData.tags}
                onChange={(tags) => setFormData({ ...formData, tags })}
                placeholder="Add tags like 'fantasy', 'magic', 'villain'..."
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={handleBack} className="btn-ghost gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button onClick={handleNext} className="btn-primary">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Content */}
      {step === 3 && (
        <div className="animate-in">
          <h2 className="text-2xl font-bold mb-2">Write your content</h2>
          <p className="text-gray-500 mb-6">
            Use Markdown to format your content. Include headings, lists, and emphasis.
          </p>

          <div>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder={`# ${formData.title || 'Your Title'}\n\nStart writing your ${selectedType?.label.toLowerCase()} here...\n\n## Section\n\nAdd details, backstory, descriptions...`}
              rows={20}
              className="input-field font-mono text-sm resize-none"
            />
            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={handleBack} className="btn-ghost gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button onClick={handleNext} className="btn-primary">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 4: License & Publish */}
      {step === 4 && (
        <div className="animate-in">
          <h2 className="text-2xl font-bold mb-2">Choose a license</h2>
          <p className="text-gray-500 mb-6">
            Decide how others can use your creation.
          </p>

          <div className="space-y-3 mb-8">
            {licenseOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, license: option.value })}
                className={`flex items-center justify-between w-full p-4 rounded-xl border-2 text-left transition-all ${
                  formData.license === option.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div>
                  <h3 className="font-medium">{option.label}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    formData.license === option.value
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}
                >
                  {formData.license === option.value && (
                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Preview Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-8">
            <h3 className="text-sm font-medium mb-3">Preview</h3>
            <div className="flex gap-4">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Preview"
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-primary-500 flex items-center justify-center">
                  <TypeIcon className="w-10 h-10 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">{formData.title || 'Untitled'}</h4>
                <p className="text-sm text-gray-500 line-clamp-2">{formData.summary || 'No summary'}</p>
                <div className="flex gap-2 mt-2">
                  <span className="badge-primary">{selectedType?.label}</span>
                  <span className="badge-gray">{formData.license}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={handleBack} className="btn-ghost gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex gap-3">
              <button onClick={() => handleSubmit('draft')} className="btn-secondary gap-1">
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button onClick={() => handleSubmit('published')} className="btn-primary gap-1">
                <Eye className="w-4 h-4" />
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
