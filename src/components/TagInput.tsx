'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { useStore } from '@/store';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({
  value,
  onChange,
  placeholder = 'Add tags...',
  maxTags = 10,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { tags: allTags } = useStore();

  const suggestions = allTags
    .filter(
      (tag) =>
        tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.includes(tag.name)
    )
    .slice(0, 5);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag) && value.length < maxTags) {
      onChange([...value, trimmedTag]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="input-field flex flex-wrap gap-2 min-h-[42px] p-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:bg-primary-200 dark:hover:bg-primary-800 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {value.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[100px] bg-transparent border-none outline-none text-sm"
          />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (inputValue || suggestions.length > 0) && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 max-h-48 overflow-y-auto">
          {inputValue && !suggestions.some((s) => s.name.toLowerCase() === inputValue.toLowerCase()) && (
            <button
              type="button"
              onClick={() => addTag(inputValue)}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 text-primary-500" />
              Create &quot;{inputValue}&quot;
            </button>
          )}
          {suggestions.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => addTag(tag.name)}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>{tag.name}</span>
              {tag.count && (
                <span className="text-xs text-gray-400">{tag.count} uses</span>
              )}
            </button>
          ))}
        </div>
      )}

      <p className="mt-1 text-xs text-gray-500">
        Press Enter or comma to add tags. {value.length}/{maxTags} tags used.
      </p>
    </div>
  );
}
