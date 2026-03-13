'use client'
import { Paintbrush } from 'lucide-react'

function PlaceholderPanel({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-3 text-zinc-500">
        {icon}
      </div>
      <h3 className="text-[12px] font-semibold text-zinc-300 mb-1">{title}</h3>
      <p className="text-[10px] text-zinc-600 leading-relaxed">{description}</p>
      <div className="mt-4 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-500">
        Coming soon
      </div>
    </div>
  )
}

export function StyleSelectorPanel() {
  return <PlaceholderPanel icon={<Paintbrush className="w-5 h-5" />} title="Styles" description="Manage all CSS classes used in your site. View, edit, and clean up unused styles." />
}
