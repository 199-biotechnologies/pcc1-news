'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FileText, ExternalLink, ArrowUpDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ResearchPaper {
  id: number;
  created_at: string;
  title: string;
  authors: string | null;
  journal: string | null;
  year: number | null;
  volume: string | null;
  pages: string | null;
  doi: string | null;
  description: string | null;
  published_at: string | null;
}

interface ResearchPapersListProps {
  papers: ResearchPaper[];
}

export default function ResearchPapersList({ papers }: ResearchPapersListProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const sortedPapers = useMemo(() => {
    const sorted = [...papers];
    
    sorted.sort((a, b) => {
      // First try to sort by published_at if available
      if (a.published_at && b.published_at) {
        const dateA = new Date(a.published_at).getTime();
        const dateB = new Date(b.published_at).getTime();
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
      }
      
      // Then try year
      if (a.year && b.year) {
        return sortBy === 'newest' ? b.year - a.year : a.year - b.year;
      }
      
      // Finally fall back to created_at
      const createdA = new Date(a.created_at).getTime();
      const createdB = new Date(b.created_at).getTime();
      return sortBy === 'newest' ? createdB - createdA : createdA - createdB;
    });
    
    return sorted;
  }, [papers, sortBy]);

  if (papers.length === 0) {
    return <p className="text-center text-gray-600">No research papers found.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Sort controls */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span className="font-light">{papers.length} papers</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-light">Sort by:</span>
          <Select value={sortBy} onValueChange={(value: 'newest' | 'oldest') => setSortBy(value)}>
            <SelectTrigger className="w-[140px] h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Papers list */}
      <div className="space-y-8">
        {sortedPapers.map((paper) => (
          <div key={paper.id} className="border-b pb-6 last:border-0">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <h2 className="text-xl font-light">{paper.title}</h2>
                {paper.authors && <p className="text-sm text-gray-600 font-light">{paper.authors}</p>}
                <p className="text-sm font-light">
                  {paper.journal && <span className="italic">{paper.journal}</span>}
                  {paper.year && `, ${paper.year}`}
                  {paper.volume && `, ${paper.volume}`}
                  {paper.pages && `, ${paper.pages}`}
                </p>
                {paper.description && <p className="text-sm text-gray-600 font-light">{paper.description}</p>}
                {paper.doi && (
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-sm text-gray-600 font-light">DOI: {paper.doi}</p>
                    <Link
                      href={`https://doi.org/${paper.doi}`}
                      className="text-teal-600 text-sm font-light hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Publication <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}