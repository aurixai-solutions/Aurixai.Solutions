import React from "react";
import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex justify-center", className)}>
      <ol className="inline-flex items-center space-x-1 md:space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          const to = item.path || item.href || "/";

          return (
            <li key={index} className="inline-flex items-center">
              {!isFirst && (
                <ChevronRight className="w-3 h-3 text-slate-600 mx-1" />
              )}
              {isLast ? (
                <span className="inline-flex items-center text-xs font-medium text-sky-400 cursor-default">
                  {isFirst && <Home className="w-3 h-3 mr-1.5" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={to}
                  className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-sky-400 transition-colors"
                >
                  {isFirst && <Home className="w-3 h-3 mr-1.5" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
