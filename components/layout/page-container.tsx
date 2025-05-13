import React from 'react'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className="flex-1">
      {children}
    </main>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'default' | 'light' | 'gradient'
}

export function Section({ 
  children, 
  className = '', 
  background = 'default' 
}: SectionProps) {
  const bgClass = 
    background === 'light' ? 'bg-gray-50' : 
    background === 'gradient' ? 'bg-gradient-to-b from-white to-gray-50' : 
    '';

  return (
    <section className={`w-full py-8 md:py-12 ${bgClass} ${className}`}>
      <div className="container px-4 md:px-6 mx-auto">
        {children}
      </div>
    </section>
  )
}

interface PageHeaderProps {
  title: string
  description?: string
  tag?: string
}

export function PageHeader({ title, description, tag }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 text-center">
      {tag && (
        <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
          {tag}
        </div>
      )}
      <div className="space-y-2">
        <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">{title}</h1>
        {description && (
          <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}