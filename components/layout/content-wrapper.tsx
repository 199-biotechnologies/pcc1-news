import React from 'react'
import { cn } from "@/lib/utils"

interface ContentWrapperProps {
  children: React.ReactNode
  className?: string
  prose?: boolean
}

export function ContentWrapper({ 
  children, 
  className = '',
  prose = false 
}: ContentWrapperProps) {
  return (
    <div className={cn(
      "mx-auto max-w-3xl",
      prose && "prose prose-gray dark:prose-invert",
      className
    )}>
      {children}
    </div>
  )
}