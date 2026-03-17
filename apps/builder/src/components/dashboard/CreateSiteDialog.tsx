'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { z } from 'zod'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Sparkles, LayoutTemplate, Plus, ArrowLeft, Mail } from 'lucide-react'
import { TemplatesModal } from '@/components/editor/TemplatesModal'
import type { PageTemplate } from '@/data/templates'

const schema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(100),
  description: z.string().max(500).optional(),
  clientEmail: z.string().email('Email invalide').optional().or(z.literal('')),
  clientFirstName: z.string().optional(),
  clientLastName: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface CreateSiteDialogProps {
  children: React.ReactNode
  defaultStep?: 'choose' | 'blank-form'
}

export function CreateSiteDialog({ children, defaultStep = 'choose' }: CreateSiteDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'choose' | 'blank-form'>(defaultStep)
  const [showTemplates, setShowTemplates] = useState(false)
  const [creatingFromTemplate, setCreatingFromTemplate] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: standardSchemaResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const payload: Record<string, string | undefined> = {
      name: data.name,
      description: data.description,
    }
    if (data.clientEmail) {
      payload.clientEmail = data.clientEmail
      payload.clientFirstName = data.clientFirstName
      payload.clientLastName = data.clientLastName
    }
    const res = await fetch('/api/sites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const site = await res.json()
      setOpen(false)
      reset()
      setStep(defaultStep)
      router.push(`/editor/${site.id}`)
      router.refresh()
    }
  }

  const handleSelectTemplate = async (template: PageTemplate) => {
    if (creatingFromTemplate) return
    setCreatingFromTemplate(true)
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: template.name, templateId: template.id }),
      })
      if (!res.ok) {
        console.error('[CreateSiteDialog] create from template failed', res.status, await res.text())
        return
      }
      const site = await res.json()
      setShowTemplates(false)
      setOpen(false)
      reset()
      setStep(defaultStep)
      router.push(`/editor/${site.id}`)
      router.refresh()
    } catch (err) {
      console.error('[CreateSiteDialog] create from template error', err)
    } finally {
      setCreatingFromTemplate(false)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      reset()
      setStep(defaultStep)
    }
  }

  const cards = [
    {
      key: 'ai' as const,
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI site builder',
      description: 'Quickly generate a custom website',
      comingSoon: true,
    },
    {
      key: 'template' as const,
      icon: <LayoutTemplate className="w-6 h-6" />,
      title: 'Template',
      description: 'Start with a design that fits your needs',
      comingSoon: false,
    },
    {
      key: 'blank' as const,
      icon: <Plus className="w-6 h-6" />,
      title: 'Blank site',
      description: 'Build a custom site from scratch',
      comingSoon: false,
    },
  ]

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-lg">
          {step === 'choose' ? (
            <>
              <DialogHeader>
                <DialogTitle>Create a new site</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {cards.map((card) => (
                  <button
                    key={card.key}
                    type="button"
                    onClick={() => {
                      if (card.comingSoon) return
                      if (card.key === 'template') {
                        setOpen(false)
                        setShowTemplates(true)
                        return
                      }
                      setStep('blank-form')
                    }}
                    className={`relative flex flex-col items-center gap-3 p-5 rounded-xl border text-center transition-colors ${
                      card.comingSoon
                        ? 'border-zinc-800 bg-zinc-800/50 text-zinc-500 cursor-not-allowed'
                        : 'border-zinc-700 bg-zinc-800 hover:border-indigo-500 hover:bg-zinc-800/80 text-zinc-100 cursor-pointer'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      card.comingSoon ? 'bg-zinc-700/50' : 'bg-indigo-500/15 text-indigo-400'
                    }`}>
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{card.title}</p>
                      <p className="text-xs text-zinc-500 mt-1">{card.description}</p>
                    </div>
                    {card.comingSoon && (
                      <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-400">
                        Soon
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('choose')}
                    className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <DialogTitle>Nouveau site</DialogTitle>
                </div>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-zinc-300">Nom du site</Label>
                  <Input
                    id="name"
                    placeholder="Mon super site"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    {...register('name')}
                  />
                  {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-zinc-300">Description <span className="text-zinc-500">(optionnel)</span></Label>
                  <Textarea
                    id="description"
                    placeholder="Une courte description..."
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
                    rows={2}
                    {...register('description')}
                  />
                </div>

                {/* Client invitation section */}
                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-medium text-zinc-300">Invitation client</span>
                    <span className="text-xs text-zinc-500">(optionnel)</span>
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Email du client"
                      type="email"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                      {...register('clientEmail')}
                    />
                    {errors.clientEmail && <p className="text-red-400 text-xs">{errors.clientEmail.message}</p>}
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Prenom"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                        {...register('clientFirstName')}
                      />
                      <Input
                        placeholder="Nom"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                        {...register('clientLastName')}
                      />
                    </div>
                    <p className="text-xs text-zinc-500">
                      Un email d&apos;invitation sera envoye au client pour activer son portail.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setStep('choose')} className="text-zinc-400">
                    Retour
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-indigo-500 hover:bg-indigo-600">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Creer le site'}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
      {showTemplates && (
        <TemplatesModal
          onSelect={handleSelectTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </>
  )
}
