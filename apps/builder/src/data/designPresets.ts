// ─── Design Presets ───
// Palettes, typography pairings, tag style presets, and full themes

import type { Brand } from '@/types/site'
import type { TagStyleKey } from '@/types/classes'
import type { ElementStyleOverride } from '@/types/elements'

// ─── Color Palette Presets ───

export interface ColorPalettePreset {
  id: string
  name: string
  category: 'light' | 'dark' | 'vibrant' | 'pastel' | 'corporate' | 'luxe'
  colors: Brand['colors']
}

export const COLOR_PALETTES: ColorPalettePreset[] = [
  // ─── Light ───
  { id: 'indigo-light', name: 'Indigo', category: 'light', colors: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#f59e0b', background: '#ffffff', foreground: '#0f172a', muted: '#f1f5f9' } },
  { id: 'emerald-light', name: 'Emerald', category: 'light', colors: { primary: '#10b981', secondary: '#059669', accent: '#f97316', background: '#ffffff', foreground: '#0f172a', muted: '#f0fdf4' } },
  { id: 'rose-light', name: 'Rose', category: 'light', colors: { primary: '#f43f5e', secondary: '#e11d48', accent: '#8b5cf6', background: '#ffffff', foreground: '#0f172a', muted: '#fff1f2' } },
  { id: 'amber-light', name: 'Amber', category: 'light', colors: { primary: '#f59e0b', secondary: '#d97706', accent: '#6366f1', background: '#ffffff', foreground: '#0f172a', muted: '#fffbeb' } },
  { id: 'cyan-light', name: 'Cyan', category: 'light', colors: { primary: '#06b6d4', secondary: '#0891b2', accent: '#f43f5e', background: '#ffffff', foreground: '#0f172a', muted: '#ecfeff' } },
  { id: 'sky-light', name: 'Sky', category: 'light', colors: { primary: '#0ea5e9', secondary: '#0284c7', accent: '#f97316', background: '#ffffff', foreground: '#0c1524', muted: '#f0f9ff' } },
  { id: 'teal-light', name: 'Teal', category: 'light', colors: { primary: '#14b8a6', secondary: '#0d9488', accent: '#e11d48', background: '#ffffff', foreground: '#0f172a', muted: '#f0fdfa' } },
  { id: 'violet-light', name: 'Violet', category: 'light', colors: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#10b981', background: '#ffffff', foreground: '#0f172a', muted: '#f5f3ff' } },
  { id: 'slate-light', name: 'Slate', category: 'light', colors: { primary: '#475569', secondary: '#334155', accent: '#6366f1', background: '#ffffff', foreground: '#0f172a', muted: '#f8fafc' } },
  { id: 'orange-light', name: 'Orange', category: 'light', colors: { primary: '#f97316', secondary: '#ea580c', accent: '#0ea5e9', background: '#ffffff', foreground: '#0f172a', muted: '#fff7ed' } },

  // ─── Dark ───
  { id: 'dark-pro', name: 'Dark Pro', category: 'dark', colors: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#f59e0b', background: '#09090b', foreground: '#fafafa', muted: '#18181b' } },
  { id: 'dark-emerald', name: 'Dark Emerald', category: 'dark', colors: { primary: '#10b981', secondary: '#34d399', accent: '#f97316', background: '#0a0a0a', foreground: '#f5f5f5', muted: '#171717' } },
  { id: 'dark-rose', name: 'Dark Rose', category: 'dark', colors: { primary: '#f43f5e', secondary: '#fb7185', accent: '#a78bfa', background: '#0c0a09', foreground: '#fafaf9', muted: '#1c1917' } },
  { id: 'dark-cyan', name: 'Dark Cyan', category: 'dark', colors: { primary: '#06b6d4', secondary: '#22d3ee', accent: '#f43f5e', background: '#0a0a0a', foreground: '#fafafa', muted: '#171717' } },
  { id: 'dark-amber', name: 'Dark Amber', category: 'dark', colors: { primary: '#f59e0b', secondary: '#fbbf24', accent: '#8b5cf6', background: '#0c0a09', foreground: '#fafaf9', muted: '#1c1917' } },
  { id: 'dark-midnight', name: 'Midnight', category: 'dark', colors: { primary: '#818cf8', secondary: '#a78bfa', accent: '#34d399', background: '#020617', foreground: '#f8fafc', muted: '#0f172a' } },
  { id: 'dark-charcoal', name: 'Charcoal', category: 'dark', colors: { primary: '#a3a3a3', secondary: '#d4d4d4', accent: '#fbbf24', background: '#0a0a0a', foreground: '#f5f5f5', muted: '#171717' } },
  { id: 'dark-ocean', name: 'Ocean', category: 'dark', colors: { primary: '#0ea5e9', secondary: '#38bdf8', accent: '#f97316', background: '#0c1524', foreground: '#e2e8f0', muted: '#162032' } },

  // ─── Vibrant ───
  { id: 'neon-purple', name: 'Neon Purple', category: 'vibrant', colors: { primary: '#a855f7', secondary: '#c084fc', accent: '#22d3ee', background: '#0a0118', foreground: '#f5f3ff', muted: '#1e1033' } },
  { id: 'electric-blue', name: 'Electric Blue', category: 'vibrant', colors: { primary: '#3b82f6', secondary: '#60a5fa', accent: '#f43f5e', background: '#030712', foreground: '#f9fafb', muted: '#111827' } },
  { id: 'hot-pink', name: 'Hot Pink', category: 'vibrant', colors: { primary: '#ec4899', secondary: '#f472b6', accent: '#06b6d4', background: '#0f0008', foreground: '#fdf2f8', muted: '#1f0011' } },
  { id: 'lime-punch', name: 'Lime Punch', category: 'vibrant', colors: { primary: '#84cc16', secondary: '#a3e635', accent: '#8b5cf6', background: '#0a0f00', foreground: '#f7fee7', muted: '#1a2200' } },
  { id: 'sunset', name: 'Sunset', category: 'vibrant', colors: { primary: '#f97316', secondary: '#fb923c', accent: '#a855f7', background: '#0c0400', foreground: '#fff7ed', muted: '#1c0f00' } },

  // ─── Pastel ───
  { id: 'pastel-lavender', name: 'Lavender', category: 'pastel', colors: { primary: '#a78bfa', secondary: '#c4b5fd', accent: '#f9a8d4', background: '#faf5ff', foreground: '#3b0764', muted: '#f3e8ff' } },
  { id: 'pastel-mint', name: 'Mint', category: 'pastel', colors: { primary: '#6ee7b7', secondary: '#a7f3d0', accent: '#fda4af', background: '#f0fdf4', foreground: '#052e16', muted: '#dcfce7' } },
  { id: 'pastel-peach', name: 'Peach', category: 'pastel', colors: { primary: '#fdba74', secondary: '#fed7aa', accent: '#c4b5fd', background: '#fffbf5', foreground: '#431407', muted: '#fff7ed' } },
  { id: 'pastel-sky', name: 'Sky Pastel', category: 'pastel', colors: { primary: '#7dd3fc', secondary: '#bae6fd', accent: '#fda4af', background: '#f0f9ff', foreground: '#0c4a6e', muted: '#e0f2fe' } },
  { id: 'pastel-blush', name: 'Blush', category: 'pastel', colors: { primary: '#fda4af', secondary: '#fecdd3', accent: '#a78bfa', background: '#fff5f7', foreground: '#4c0519', muted: '#ffe4e6' } },

  // ─── Corporate ───
  { id: 'corp-navy', name: 'Navy', category: 'corporate', colors: { primary: '#1e3a5f', secondary: '#2563eb', accent: '#f59e0b', background: '#ffffff', foreground: '#0f172a', muted: '#f1f5f9' } },
  { id: 'corp-trust', name: 'Trust Blue', category: 'corporate', colors: { primary: '#2563eb', secondary: '#1d4ed8', accent: '#10b981', background: '#ffffff', foreground: '#111827', muted: '#eff6ff' } },
  { id: 'corp-finance', name: 'Finance', category: 'corporate', colors: { primary: '#0f766e', secondary: '#115e59', accent: '#eab308', background: '#ffffff', foreground: '#0f172a', muted: '#f0fdfa' } },
  { id: 'corp-steel', name: 'Steel', category: 'corporate', colors: { primary: '#374151', secondary: '#4b5563', accent: '#2563eb', background: '#ffffff', foreground: '#111827', muted: '#f3f4f6' } },
  { id: 'corp-law', name: 'Law', category: 'corporate', colors: { primary: '#1e293b', secondary: '#334155', accent: '#b45309', background: '#ffffff', foreground: '#0f172a', muted: '#f8fafc' } },

  // ─── Luxe ───
  { id: 'luxe-gold', name: 'Gold', category: 'luxe', colors: { primary: '#b8860b', secondary: '#d4a520', accent: '#1e293b', background: '#fffdf5', foreground: '#1a1207', muted: '#fef9e7' } },
  { id: 'luxe-noir', name: 'Noir & Gold', category: 'luxe', colors: { primary: '#d4a520', secondary: '#b8860b', accent: '#ffffff', background: '#0a0a0a', foreground: '#f5f0e1', muted: '#1a1a1a' } },
  { id: 'luxe-champagne', name: 'Champagne', category: 'luxe', colors: { primary: '#9c6644', secondary: '#b88b6e', accent: '#1a1a2e', background: '#fefcf6', foreground: '#2d1810', muted: '#f5efe6' } },
  { id: 'luxe-marble', name: 'Marble', category: 'luxe', colors: { primary: '#1a1a2e', secondary: '#2d2d44', accent: '#c9a96e', background: '#fafaf8', foreground: '#1a1a2e', muted: '#f0f0ec' } },
  { id: 'luxe-emerald', name: 'Royal Emerald', category: 'luxe', colors: { primary: '#064e3b', secondary: '#047857', accent: '#d4a520', background: '#fefffe', foreground: '#022c22', muted: '#ecfdf5' } },
  { id: 'luxe-sapphire', name: 'Sapphire', category: 'luxe', colors: { primary: '#1e3a5f', secondary: '#1e40af', accent: '#c9a96e', background: '#fefeff', foreground: '#0c1524', muted: '#eef2ff' } },
]

export const PALETTE_CATEGORIES = [
  { id: 'light', label: 'Clair' },
  { id: 'dark', label: 'Sombre' },
  { id: 'vibrant', label: 'Vibrant' },
  { id: 'pastel', label: 'Pastel' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'luxe', label: 'Luxe' },
] as const

// ─── Typography Presets (font pairings) ───

export interface TypographyPreset {
  id: string
  name: string
  category: 'modern' | 'classic' | 'minimal' | 'creative' | 'editorial'
  heading: string
  body: string
  size: 'compact' | 'default' | 'large'
}

export const TYPOGRAPHY_PRESETS: TypographyPreset[] = [
  // ─── Modern ───
  { id: 'typo-inter', name: 'Inter Clean', category: 'modern', heading: 'Inter', body: 'Inter', size: 'default' },
  { id: 'typo-plus-inter', name: 'Plus Jakarta + Inter', category: 'modern', heading: 'Plus Jakarta Sans', body: 'Inter', size: 'default' },
  { id: 'typo-dm-inter', name: 'DM Sans + Inter', category: 'modern', heading: 'DM Sans', body: 'Inter', size: 'default' },
  { id: 'typo-space-mono', name: 'Space Grotesk + DM Sans', category: 'modern', heading: 'Space Grotesk', body: 'DM Sans', size: 'default' },
  { id: 'typo-outfit', name: 'Outfit', category: 'modern', heading: 'Outfit', body: 'Outfit', size: 'default' },
  { id: 'typo-manrope', name: 'Manrope', category: 'modern', heading: 'Manrope', body: 'Manrope', size: 'default' },
  { id: 'typo-sora', name: 'Sora + Inter', category: 'modern', heading: 'Sora', body: 'Inter', size: 'default' },
  { id: 'typo-cabinet', name: 'Cabinet Grotesk + Satoshi', category: 'modern', heading: 'Cabinet Grotesk', body: 'Satoshi', size: 'default' },

  // ─── Classic ───
  { id: 'typo-playfair-lato', name: 'Playfair + Lato', category: 'classic', heading: 'Playfair Display', body: 'Lato', size: 'default' },
  { id: 'typo-merriweather', name: 'Merriweather + Source Sans', category: 'classic', heading: 'Merriweather', body: 'Source Sans 3', size: 'default' },
  { id: 'typo-cormorant', name: 'Cormorant + Proza Libre', category: 'classic', heading: 'Cormorant Garamond', body: 'Proza Libre', size: 'large' },
  { id: 'typo-libre', name: 'Libre Baskerville + Open Sans', category: 'classic', heading: 'Libre Baskerville', body: 'Open Sans', size: 'default' },
  { id: 'typo-dm-serif', name: 'DM Serif + DM Sans', category: 'classic', heading: 'DM Serif Display', body: 'DM Sans', size: 'default' },

  // ─── Minimal ───
  { id: 'typo-helvetica', name: 'System Stack', category: 'minimal', heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', body: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', size: 'default' },
  { id: 'typo-work-sans', name: 'Work Sans', category: 'minimal', heading: 'Work Sans', body: 'Work Sans', size: 'compact' },
  { id: 'typo-karla', name: 'Karla', category: 'minimal', heading: 'Karla', body: 'Karla', size: 'default' },
  { id: 'typo-rubik', name: 'Rubik', category: 'minimal', heading: 'Rubik', body: 'Rubik', size: 'default' },

  // ─── Creative ───
  { id: 'typo-clash', name: 'Clash Display + General Sans', category: 'creative', heading: 'Clash Display', body: 'General Sans', size: 'large' },
  { id: 'typo-anton', name: 'Anton + Roboto', category: 'creative', heading: 'Anton', body: 'Roboto', size: 'large' },
  { id: 'typo-bebas', name: 'Bebas Neue + Open Sans', category: 'creative', heading: 'Bebas Neue', body: 'Open Sans', size: 'large' },
  { id: 'typo-righteous', name: 'Righteous + Poppins', category: 'creative', heading: 'Righteous', body: 'Poppins', size: 'default' },

  // ─── Editorial ───
  { id: 'typo-fraunces', name: 'Fraunces + Outfit', category: 'editorial', heading: 'Fraunces', body: 'Outfit', size: 'large' },
  { id: 'typo-editorial', name: 'Newsreader + Inter', category: 'editorial', heading: 'Newsreader', body: 'Inter', size: 'default' },
  { id: 'typo-lora', name: 'Lora + Nunito', category: 'editorial', heading: 'Lora', body: 'Nunito', size: 'default' },
]

export const TYPOGRAPHY_CATEGORIES = [
  { id: 'modern', label: 'Moderne' },
  { id: 'classic', label: 'Classique' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'creative', label: 'Créatif' },
  { id: 'editorial', label: 'Éditorial' },
] as const

// ─── Tag Style Presets (design systems) ───

export interface TagStylePreset {
  id: string
  name: string
  category: 'saas' | 'luxe' | 'glassmorphism' | 'brutalist' | 'corporate' | 'minimal'
  description: string
  tagStyles: Partial<Record<TagStyleKey, Partial<ElementStyleOverride>>>
  borderRadius: Brand['borderRadius']
  spacing: Brand['spacing']
}

export const TAG_STYLE_PRESETS: TagStylePreset[] = [
  {
    id: 'ts-saas-modern',
    name: 'SaaS Modern',
    category: 'saas',
    description: 'Clean, lisible, optimise pour la conversion',
    borderRadius: 'md',
    spacing: 'default',
    tagStyles: {
      body: { fontFamily: 'Inter', fontSize: '16px', lineHeight: '1.6', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontSize: '3.5rem', fontWeight: 700, lineHeight: '1.1', letterSpacing: '-0.02em', color: 'var(--color-foreground)' },
      h2: { fontSize: '2.5rem', fontWeight: 700, lineHeight: '1.15', letterSpacing: '-0.01em', color: 'var(--color-foreground)' },
      h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: '1.25', color: 'var(--color-foreground)' },
      h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: '1.35', color: 'var(--color-foreground)' },
      h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: '1.4', color: 'var(--color-foreground)' },
      h6: { fontSize: '0.875rem', fontWeight: 700, lineHeight: '1.5', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-foreground)' },
      p: { fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'none' },
      button: { fontSize: '0.875rem', fontWeight: 500, borderRadius: '8px', padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
  {
    id: 'ts-saas-bold',
    name: 'SaaS Bold',
    category: 'saas',
    description: 'Titres larges, impact maximal',
    borderRadius: 'lg',
    spacing: 'relaxed',
    tagStyles: {
      body: { fontFamily: 'DM Sans', fontSize: '16px', lineHeight: '1.6', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontSize: '4.5rem', fontWeight: 800, lineHeight: '1.05', letterSpacing: '-0.03em', color: 'var(--color-foreground)' },
      h2: { fontSize: '3rem', fontWeight: 800, lineHeight: '1.1', letterSpacing: '-0.02em', color: 'var(--color-foreground)' },
      h3: { fontSize: '2rem', fontWeight: 700, lineHeight: '1.2', color: 'var(--color-foreground)' },
      h4: { fontSize: '1.5rem', fontWeight: 700, lineHeight: '1.3', color: 'var(--color-foreground)' },
      h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: '1.4', color: 'var(--color-foreground)' },
      h6: { fontSize: '0.8rem', fontWeight: 800, lineHeight: '1.5', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-foreground)' },
      p: { fontSize: '1.125rem', lineHeight: '1.75', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'none' },
      button: { fontSize: '1rem', fontWeight: 600, borderRadius: '12px', padding: '12px 28px', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
  {
    id: 'ts-luxe-serif',
    name: 'Luxe Serif',
    category: 'luxe',
    description: 'Elegance classique, serif pour les titres',
    borderRadius: 'none',
    spacing: 'relaxed',
    tagStyles: {
      body: { fontFamily: 'Lato', fontSize: '16px', lineHeight: '1.7', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontFamily: 'Playfair Display', fontSize: '3.75rem', fontWeight: 400, lineHeight: '1.1', letterSpacing: '-0.01em', color: 'var(--color-foreground)' },
      h2: { fontFamily: 'Playfair Display', fontSize: '2.75rem', fontWeight: 400, lineHeight: '1.15', color: 'var(--color-foreground)' },
      h3: { fontFamily: 'Playfair Display', fontSize: '2rem', fontWeight: 400, lineHeight: '1.25', color: 'var(--color-foreground)' },
      h4: { fontFamily: 'Playfair Display', fontSize: '1.5rem', fontWeight: 400, lineHeight: '1.35', color: 'var(--color-foreground)' },
      h5: { fontSize: '1rem', fontWeight: 400, lineHeight: '1.5', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-foreground)' },
      h6: { fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.6', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-foreground)' },
      p: { fontSize: '1.0625rem', lineHeight: '1.8', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'underline' },
      button: { fontSize: '0.8125rem', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.15em', borderRadius: '0px', padding: '14px 32px', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
  {
    id: 'ts-luxe-modern',
    name: 'Luxe Moderne',
    category: 'luxe',
    description: 'Luxe contemporain, sans-serif elegant',
    borderRadius: 'sm',
    spacing: 'relaxed',
    tagStyles: {
      body: { fontFamily: 'DM Sans', fontSize: '15px', lineHeight: '1.7', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontFamily: 'Cormorant Garamond', fontSize: '4rem', fontWeight: 300, lineHeight: '1.05', letterSpacing: '-0.01em', color: 'var(--color-foreground)' },
      h2: { fontFamily: 'Cormorant Garamond', fontSize: '3rem', fontWeight: 300, lineHeight: '1.1', color: 'var(--color-foreground)' },
      h3: { fontFamily: 'Cormorant Garamond', fontSize: '2.25rem', fontWeight: 400, lineHeight: '1.2', color: 'var(--color-foreground)' },
      h4: { fontSize: '1.25rem', fontWeight: 500, lineHeight: '1.35', color: 'var(--color-foreground)' },
      h5: { fontSize: '0.9375rem', fontWeight: 500, lineHeight: '1.5', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-foreground)' },
      h6: { fontSize: '0.75rem', fontWeight: 500, lineHeight: '1.6', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-foreground)' },
      p: { fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'none' },
      button: { fontSize: '0.8125rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px', padding: '12px 28px', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
  {
    id: 'ts-glass',
    name: 'Glassmorphism',
    category: 'glassmorphism',
    description: 'Effets de verre, arriere-plans flous',
    borderRadius: 'lg',
    spacing: 'default',
    tagStyles: {
      body: { fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.6', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontSize: '3.5rem', fontWeight: 700, lineHeight: '1.1', letterSpacing: '-0.02em', color: 'var(--color-foreground)' },
      h2: { fontSize: '2.5rem', fontWeight: 600, lineHeight: '1.15', letterSpacing: '-0.01em', color: 'var(--color-foreground)' },
      h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: '1.25', color: 'var(--color-foreground)' },
      h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: '1.35', color: 'var(--color-foreground)' },
      h5: { fontSize: '1rem', fontWeight: 500, lineHeight: '1.5', color: 'var(--color-foreground)' },
      h6: { fontSize: '0.8rem', fontWeight: 600, lineHeight: '1.5', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-foreground)' },
      p: { fontSize: '0.9375rem', lineHeight: '1.7', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'none' },
      button: { fontSize: '0.875rem', fontWeight: 500, borderRadius: '12px', padding: '10px 24px', backdropFilter: 'blur(12px)', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
  {
    id: 'ts-brutalist',
    name: 'Brutalist',
    category: 'brutalist',
    description: 'Brut, direct, borders epaisses',
    borderRadius: 'none',
    spacing: 'compact',
    tagStyles: {
      body: { fontFamily: 'Space Grotesk', fontSize: '16px', lineHeight: '1.5', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontSize: '5rem', fontWeight: 900, lineHeight: '0.95', letterSpacing: '-0.04em', textTransform: 'uppercase', color: 'var(--color-foreground)' },
      h2: { fontSize: '3.5rem', fontWeight: 900, lineHeight: '1', letterSpacing: '-0.03em', textTransform: 'uppercase', color: 'var(--color-foreground)' },
      h3: { fontSize: '2.25rem', fontWeight: 800, lineHeight: '1.1', textTransform: 'uppercase', color: 'var(--color-foreground)' },
      h4: { fontSize: '1.5rem', fontWeight: 800, lineHeight: '1.2', textTransform: 'uppercase', color: 'var(--color-foreground)' },
      h5: { fontSize: '1.125rem', fontWeight: 700, lineHeight: '1.3', textTransform: 'uppercase', color: 'var(--color-foreground)' },
      h6: { fontSize: '0.875rem', fontWeight: 900, lineHeight: '1.4', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-foreground)' },
      p: { fontSize: '1rem', lineHeight: '1.6', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'none' },
      button: { fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: '0px', padding: '12px 24px', borderWidth: '3px', borderStyle: 'solid', borderColor: 'var(--color-foreground)', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
  {
    id: 'ts-brutalist-mono',
    name: 'Brutalist Mono',
    category: 'brutalist',
    description: 'Monospace brut, style terminal',
    borderRadius: 'none',
    spacing: 'compact',
    tagStyles: {
      body: { fontFamily: 'Space Mono', fontSize: '14px', lineHeight: '1.6', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontFamily: 'Space Mono', fontSize: '3.5rem', fontWeight: 700, lineHeight: '1', textTransform: 'uppercase', color: 'var(--color-foreground)' },
      h2: { fontFamily: 'Space Mono', fontSize: '2.5rem', fontWeight: 700, lineHeight: '1.05', textTransform: 'uppercase', color: 'var(--color-foreground)' },
      h3: { fontFamily: 'Space Mono', fontSize: '1.75rem', fontWeight: 700, lineHeight: '1.15', color: 'var(--color-foreground)' },
      h4: { fontFamily: 'Space Mono', fontSize: '1.25rem', fontWeight: 700, lineHeight: '1.25', color: 'var(--color-foreground)' },
      h5: { fontFamily: 'Space Mono', fontSize: '1rem', fontWeight: 700, lineHeight: '1.35', color: 'var(--color-foreground)' },
      h6: { fontFamily: 'Space Mono', fontSize: '0.75rem', fontWeight: 700, lineHeight: '1.5', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-foreground)' },
      p: { fontFamily: 'Space Mono', fontSize: '0.875rem', lineHeight: '1.7', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'none' },
      button: { fontFamily: 'Space Mono', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', borderRadius: '0px', padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
  {
    id: 'ts-corp-clean',
    name: 'Corporate Clean',
    category: 'corporate',
    description: 'Professionnel, structure, lisible',
    borderRadius: 'sm',
    spacing: 'default',
    tagStyles: {
      body: { fontFamily: 'Open Sans', fontSize: '16px', lineHeight: '1.65', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontFamily: 'Open Sans', fontSize: '2.75rem', fontWeight: 700, lineHeight: '1.15', letterSpacing: '-0.01em', color: 'var(--color-foreground)' },
      h2: { fontFamily: 'Open Sans', fontSize: '2rem', fontWeight: 700, lineHeight: '1.2', color: 'var(--color-foreground)' },
      h3: { fontFamily: 'Open Sans', fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.3', color: 'var(--color-foreground)' },
      h4: { fontFamily: 'Open Sans', fontSize: '1.25rem', fontWeight: 600, lineHeight: '1.35', color: 'var(--color-foreground)' },
      h5: { fontFamily: 'Open Sans', fontSize: '1rem', fontWeight: 600, lineHeight: '1.45', color: 'var(--color-foreground)' },
      h6: { fontSize: '0.8rem', fontWeight: 700, lineHeight: '1.5', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-foreground)' },
      p: { fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'none' },
      button: { fontSize: '0.875rem', fontWeight: 600, borderRadius: '4px', padding: '10px 22px', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
  {
    id: 'ts-minimal-zen',
    name: 'Minimal Zen',
    category: 'minimal',
    description: 'Espace blanc, hierarchie subtile',
    borderRadius: 'sm',
    spacing: 'relaxed',
    tagStyles: {
      body: { fontFamily: 'Work Sans', fontSize: '15px', lineHeight: '1.7', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontSize: '2.5rem', fontWeight: 300, lineHeight: '1.2', letterSpacing: '-0.01em', color: 'var(--color-foreground)' },
      h2: { fontSize: '2rem', fontWeight: 300, lineHeight: '1.25', color: 'var(--color-foreground)' },
      h3: { fontSize: '1.5rem', fontWeight: 400, lineHeight: '1.3', color: 'var(--color-foreground)' },
      h4: { fontSize: '1.125rem', fontWeight: 500, lineHeight: '1.4', color: 'var(--color-foreground)' },
      h5: { fontSize: '0.9375rem', fontWeight: 500, lineHeight: '1.5', color: 'var(--color-foreground)' },
      h6: { fontSize: '0.75rem', fontWeight: 500, lineHeight: '1.6', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-foreground)' },
      p: { fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'none' },
      button: { fontSize: '0.8125rem', fontWeight: 400, borderRadius: '4px', padding: '10px 24px', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
  {
    id: 'ts-minimal-geo',
    name: 'Minimal Geometric',
    category: 'minimal',
    description: 'Precision geometrique, grids propres',
    borderRadius: 'none',
    spacing: 'default',
    tagStyles: {
      body: { fontFamily: 'Karla', fontSize: '16px', lineHeight: '1.6', color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' },
      h1: { fontSize: '3rem', fontWeight: 700, lineHeight: '1.1', color: 'var(--color-foreground)' },
      h2: { fontSize: '2.25rem', fontWeight: 700, lineHeight: '1.15', color: 'var(--color-foreground)' },
      h3: { fontSize: '1.5rem', fontWeight: 700, lineHeight: '1.25', color: 'var(--color-foreground)' },
      h4: { fontSize: '1.125rem', fontWeight: 700, lineHeight: '1.35', color: 'var(--color-foreground)' },
      h5: { fontSize: '0.875rem', fontWeight: 700, lineHeight: '1.45', color: 'var(--color-foreground)' },
      h6: { fontSize: '0.75rem', fontWeight: 700, lineHeight: '1.5', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-foreground)' },
      p: { fontSize: '1rem', lineHeight: '1.65', color: 'var(--color-foreground)' },
      a: { color: 'var(--color-primary)', textDecoration: 'none' },
      button: { fontSize: '0.875rem', fontWeight: 700, borderRadius: '0px', padding: '12px 24px', backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    },
  },
]

export const TAG_STYLE_CATEGORIES = [
  { id: 'saas', label: 'SaaS' },
  { id: 'luxe', label: 'Luxe' },
  { id: 'glassmorphism', label: 'Glass' },
  { id: 'brutalist', label: 'Brutalist' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'minimal', label: 'Minimal' },
] as const

// ─── Full Theme Presets (palette + typo + tag styles combined) ───

export interface ThemePreset {
  id: string
  name: string
  description: string
  paletteId: string
  typographyId: string
  tagStyleId: string
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'theme-saas-indigo', name: 'SaaS Startup', description: 'Indigo + Inter + SaaS Modern', paletteId: 'indigo-light', typographyId: 'typo-inter', tagStyleId: 'ts-saas-modern' },
  { id: 'theme-saas-dark', name: 'SaaS Dark', description: 'Dark Pro + DM Sans + SaaS Bold', paletteId: 'dark-pro', typographyId: 'typo-dm-inter', tagStyleId: 'ts-saas-bold' },
  { id: 'theme-saas-emerald', name: 'SaaS Growth', description: 'Emerald + Sora + SaaS Modern', paletteId: 'emerald-light', typographyId: 'typo-sora', tagStyleId: 'ts-saas-modern' },
  { id: 'theme-luxe-gold', name: 'Luxe Gold', description: 'Noir & Gold + Playfair + Luxe Serif', paletteId: 'luxe-noir', typographyId: 'typo-playfair-lato', tagStyleId: 'ts-luxe-serif' },
  { id: 'theme-luxe-champagne', name: 'Luxe Champagne', description: 'Champagne + Cormorant + Luxe Moderne', paletteId: 'luxe-champagne', typographyId: 'typo-cormorant', tagStyleId: 'ts-luxe-modern' },
  { id: 'theme-luxe-marble', name: 'Luxe Marble', description: 'Marble + DM Serif + Luxe Serif', paletteId: 'luxe-marble', typographyId: 'typo-dm-serif', tagStyleId: 'ts-luxe-serif' },
  { id: 'theme-glass-neon', name: 'Glassmorphism Neon', description: 'Neon Purple + Inter + Glass', paletteId: 'neon-purple', typographyId: 'typo-inter', tagStyleId: 'ts-glass' },
  { id: 'theme-glass-ocean', name: 'Glassmorphism Ocean', description: 'Dark Ocean + Outfit + Glass', paletteId: 'dark-ocean', typographyId: 'typo-outfit', tagStyleId: 'ts-glass' },
  { id: 'theme-brutalist-bw', name: 'Brutalist B&W', description: 'Charcoal + Space Grotesk + Brutalist', paletteId: 'dark-charcoal', typographyId: 'typo-space-mono', tagStyleId: 'ts-brutalist' },
  { id: 'theme-brutalist-electric', name: 'Brutalist Electric', description: 'Electric Blue + Space Mono + Brutalist Mono', paletteId: 'electric-blue', typographyId: 'typo-space-mono', tagStyleId: 'ts-brutalist-mono' },
  { id: 'theme-corp-navy', name: 'Corporate Navy', description: 'Navy + Open Sans + Corporate Clean', paletteId: 'corp-navy', typographyId: 'typo-merriweather', tagStyleId: 'ts-corp-clean' },
  { id: 'theme-corp-trust', name: 'Corporate Trust', description: 'Trust Blue + Rubik + Corporate Clean', paletteId: 'corp-trust', typographyId: 'typo-rubik', tagStyleId: 'ts-corp-clean' },
  { id: 'theme-minimal-zen', name: 'Minimal Zen', description: 'Slate + Work Sans + Minimal Zen', paletteId: 'slate-light', typographyId: 'typo-work-sans', tagStyleId: 'ts-minimal-zen' },
  { id: 'theme-minimal-geo', name: 'Minimal Geometric', description: 'Steel + Karla + Minimal Geometric', paletteId: 'corp-steel', typographyId: 'typo-karla', tagStyleId: 'ts-minimal-geo' },
  { id: 'theme-pastel-soft', name: 'Pastel Soft', description: 'Lavender + Outfit + SaaS Modern', paletteId: 'pastel-lavender', typographyId: 'typo-outfit', tagStyleId: 'ts-saas-modern' },
  { id: 'theme-editorial', name: 'Editorial', description: 'Slate + Fraunces + Minimal Zen', paletteId: 'slate-light', typographyId: 'typo-fraunces', tagStyleId: 'ts-minimal-zen' },
  { id: 'theme-creative-sunset', name: 'Creative Sunset', description: 'Sunset + Anton + Brutalist', paletteId: 'sunset', typographyId: 'typo-anton', tagStyleId: 'ts-brutalist' },
  { id: 'theme-creative-lime', name: 'Creative Lime', description: 'Lime Punch + Bebas + Brutalist', paletteId: 'lime-punch', typographyId: 'typo-bebas', tagStyleId: 'ts-brutalist' },
]

// ─── Helpers ───

export function getPaletteById(id: string): ColorPalettePreset | undefined {
  return COLOR_PALETTES.find(p => p.id === id)
}

export function getTypographyById(id: string): TypographyPreset | undefined {
  return TYPOGRAPHY_PRESETS.find(t => t.id === id)
}

export function getTagStyleById(id: string): TagStylePreset | undefined {
  return TAG_STYLE_PRESETS.find(t => t.id === id)
}

// ─── Style Families (group everything by design style) ───

export interface StyleFamily {
  id: string
  name: string
  description: string
  icon: string // lucide icon name
  paletteIds: string[]
  typographyIds: string[]
  tagStyleIds: string[]
  themeIds: string[]
}

export const STYLE_FAMILIES: StyleFamily[] = [
  {
    id: 'saas',
    name: 'SaaS / Startup',
    description: 'Clean, conversion-optimise, tech-friendly',
    icon: 'rocket',
    paletteIds: ['indigo-light', 'emerald-light', 'sky-light', 'violet-light', 'cyan-light', 'dark-pro', 'dark-emerald', 'dark-midnight'],
    typographyIds: ['typo-inter', 'typo-plus-inter', 'typo-dm-inter', 'typo-sora', 'typo-outfit', 'typo-manrope', 'typo-space-mono'],
    tagStyleIds: ['ts-saas-modern', 'ts-saas-bold'],
    themeIds: ['theme-saas-indigo', 'theme-saas-dark', 'theme-saas-emerald'],
  },
  {
    id: 'luxe',
    name: 'Luxe / Premium',
    description: 'Elegant, raffine, haut de gamme',
    icon: 'gem',
    paletteIds: ['luxe-gold', 'luxe-noir', 'luxe-champagne', 'luxe-marble', 'luxe-emerald', 'luxe-sapphire'],
    typographyIds: ['typo-playfair-lato', 'typo-cormorant', 'typo-dm-serif', 'typo-libre', 'typo-merriweather', 'typo-fraunces', 'typo-lora'],
    tagStyleIds: ['ts-luxe-serif', 'ts-luxe-modern'],
    themeIds: ['theme-luxe-gold', 'theme-luxe-champagne', 'theme-luxe-marble'],
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Effets de verre, flous, neon',
    icon: 'layers',
    paletteIds: ['neon-purple', 'electric-blue', 'hot-pink', 'dark-ocean', 'dark-cyan', 'dark-midnight'],
    typographyIds: ['typo-inter', 'typo-outfit', 'typo-manrope', 'typo-sora', 'typo-dm-inter'],
    tagStyleIds: ['ts-glass'],
    themeIds: ['theme-glass-neon', 'theme-glass-ocean'],
  },
  {
    id: 'brutalist',
    name: 'Brutalist / Bold',
    description: 'Brut, direct, impact maximal',
    icon: 'zap',
    paletteIds: ['dark-charcoal', 'electric-blue', 'lime-punch', 'sunset', 'hot-pink', 'dark-pro'],
    typographyIds: ['typo-space-mono', 'typo-anton', 'typo-bebas', 'typo-righteous', 'typo-clash'],
    tagStyleIds: ['ts-brutalist', 'ts-brutalist-mono'],
    themeIds: ['theme-brutalist-bw', 'theme-brutalist-electric', 'theme-creative-sunset', 'theme-creative-lime'],
  },
  {
    id: 'corporate',
    name: 'Corporate / Business',
    description: 'Professionnel, serieux, credible',
    icon: 'building',
    paletteIds: ['corp-navy', 'corp-trust', 'corp-finance', 'corp-steel', 'corp-law', 'slate-light'],
    typographyIds: ['typo-merriweather', 'typo-rubik', 'typo-libre', 'typo-dm-serif', 'typo-karla'],
    tagStyleIds: ['ts-corp-clean'],
    themeIds: ['theme-corp-navy', 'theme-corp-trust'],
  },
  {
    id: 'minimal',
    name: 'Minimal / Zen',
    description: 'Epure, espace blanc, subtil',
    icon: 'minimize',
    paletteIds: ['slate-light', 'corp-steel', 'pastel-lavender', 'pastel-mint', 'pastel-sky', 'pastel-blush', 'pastel-peach'],
    typographyIds: ['typo-work-sans', 'typo-karla', 'typo-rubik', 'typo-outfit', 'typo-helvetica', 'typo-fraunces', 'typo-lora', 'typo-editorial'],
    tagStyleIds: ['ts-minimal-zen', 'ts-minimal-geo'],
    themeIds: ['theme-minimal-zen', 'theme-minimal-geo', 'theme-pastel-soft', 'theme-editorial'],
  },
]
