import Link from "next/link";
import { FileText, BookOpen, ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type ContentType = "research" | "blog" | "news";

interface ContentFeedItemProps {
  type: ContentType;
  title: string;
  description?: string | null;
  date: Date | string;
  link: string;
  isExternal?: boolean;
  journal?: string | null;
  author?: string | null;
}

export function ContentFeedItem({
  type,
  title,
  description,
  date,
  link,
  isExternal = false,
  journal,
  author,
}: ContentFeedItemProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const typeConfig = {
    research: {
      label: "Research",
      icon: FileText,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    blog: {
      label: "Article",
      icon: BookOpen,
      color: "bg-green-50 text-green-700 border-green-200",
    },
    news: {
      label: "News",
      icon: FileText,
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  const content = (
    <article className="group py-6 border-b last:border-0 hover:bg-gray-50/50 -mx-4 px-4 transition-colors">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Type badge and metadata */}
              <div className="flex items-center gap-3 mb-2 text-sm">
                <Badge variant="outline" className={`${config.color} border font-light text-xs`}>
                  {config.label}
                </Badge>
                {journal && <span className="text-gray-500 font-light italic">{journal}</span>}
                {author && <span className="text-gray-500 font-light">by {author}</span>}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-light leading-tight mb-1 group-hover:text-teal-600 transition-colors">
                {title}
              </h3>
              
              {/* Description */}
              {description && (
                <p className="text-sm text-gray-600 font-light line-clamp-2 mb-2">
                  {description}
                </p>
              )}
              
              {/* Date */}
              <div className="flex items-center gap-1 text-xs text-gray-500 font-light">
                <Calendar className="h-3 w-3" />
                <time dateTime={new Date(date).toISOString()}>{formattedDate}</time>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex-shrink-0 mt-1">
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  if (!link) {
    return <div className="block">{content}</div>;
  }

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return (
    <Link href={link} className="block">
      {content}
    </Link>
  );
}