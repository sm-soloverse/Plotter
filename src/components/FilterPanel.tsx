'use client';

import { useState } from 'react';
import { ChevronDown, X, Filter } from 'lucide-react';
import type { IPCategory, LicenseType, SearchFilters } from '@/types';

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onClear: () => void;
}

const typeOptions: { value: IPCategory; label: string }[] = [
  { value: 'character', label: 'Characters' },
  { value: 'world', label: 'Worlds' },
  { value: 'story', label: 'Stories' },
  { value: 'lore', label: 'Lore' },
  { value: 'item', label: 'Items' },
  { value: 'faction', label: 'Factions' },
  { value: 'event', label: 'Events' },
  { value: 'concept', label: 'Concepts' },
];

const licenseOptions: { value: LicenseType; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'attribution', label: 'Attribution' },
  { value: 'non-commercial', label: 'Non-Commercial' },
  { value: 'exclusive', label: 'Exclusive' },
  { value: 'restricted', label: 'Restricted' },
];

const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

export function FilterPanel({ filters, onChange, onClear }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters =
    (filters.types && filters.types.length > 0) ||
    (filters.licenses && filters.licenses.length > 0) ||
    (filters.tags && filters.tags.length > 0);

  const toggleType = (type: IPCategory) => {
    const currentTypes = filters.types || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];
    onChange({ ...filters, types: newTypes });
  };

  const toggleLicense = (license: LicenseType) => {
    const currentLicenses = filters.licenses || [];
    const newLicenses = currentLicenses.includes(license)
      ? currentLicenses.filter((l) => l !== license)
      : [...currentLicenses, license];
    onChange({ ...filters, licenses: newLicenses });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-xs">
              Active
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy || 'recent'}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as SearchFilters['sortBy'] })}
            className="text-sm bg-transparent border-none focus:outline-none cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Type Filter */}
          <div>
            <h4 className="text-sm font-medium mb-2">Type</h4>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleType(option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    filters.types?.includes(option.value)
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* License Filter */}
          <div>
            <h4 className="text-sm font-medium mb-2">License</h4>
            <div className="flex flex-wrap gap-2">
              {licenseOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleLicense(option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    filters.licenses?.includes(option.value)
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
