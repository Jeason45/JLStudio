'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { icons, type LucideIcon } from 'lucide-react'
import { Search, X, Loader2 } from 'lucide-react'

// ────────────────────────────────────────────────────────
// Lucide local categories (existing)
// ────────────────────────────────────────────────────────

const ICON_CATEGORIES: Record<string, string[]> = {
  'Populaire': [
    'Zap', 'Star', 'Heart', 'Check', 'ArrowRight', 'Sparkles', 'Rocket',
    'Target', 'Shield', 'Lock', 'Globe', 'Bot', 'Lightbulb', 'TrendingUp',
    'BarChart3', 'Users', 'Mail', 'Bell', 'Search', 'Settings', 'Home',
    'Clock', 'Calendar', 'Cloud', 'Download', 'Upload', 'Share2', 'Eye',
    'Flame', 'Diamond', 'Crown', 'Award', 'Gift', 'Coins', 'CreditCard',
    'ShoppingCart', 'Package', 'Truck', 'Smartphone', 'Laptop', 'Monitor',
    'Wifi', 'Database', 'Server', 'Code', 'Terminal', 'Palette', 'Pen',
  ],
  'Business': [
    'Briefcase', 'Building', 'Building2', 'Calculator', 'ChartBar',
    'ChartLine', 'ChartPie', 'CircleDollarSign', 'Coins', 'CreditCard',
    'DollarSign', 'FileText', 'FolderOpen', 'Handshake', 'Landmark',
    'LineChart', 'PieChart', 'Presentation', 'Receipt', 'Scale',
    'Stamp', 'TrendingDown', 'TrendingUp', 'Wallet', 'BadgePercent',
  ],
  'Tech & Dev': [
    'Bot', 'BrainCircuit', 'Bug', 'CircuitBoard', 'Cloud', 'CloudCog',
    'Code', 'Code2', 'Cog', 'Cpu', 'Database', 'FileCode', 'FileJson',
    'Fingerprint', 'GitBranch', 'Github', 'Globe', 'HardDrive', 'Keyboard',
    'Laptop', 'Layers', 'Lock', 'Monitor', 'MousePointerClick', 'Network',
    'Plug', 'QrCode', 'Rocket', 'Server', 'Settings', 'Shield', 'ShieldCheck',
    'Smartphone', 'Terminal', 'Wifi', 'Zap',
  ],
  'Communication': [
    'AtSign', 'Bell', 'BellRing', 'Forward', 'Inbox', 'Languages',
    'Mail', 'MailOpen', 'Megaphone', 'MessageCircle', 'MessageSquare',
    'MessagesSquare', 'Mic', 'Phone', 'PhoneCall', 'Radio', 'Rss',
    'Send', 'Share', 'Share2', 'Signal', 'Speaker', 'Video', 'Voicemail',
  ],
  'Media': [
    'Camera', 'CameraOff', 'Clapperboard', 'Film', 'Focus', 'Frame',
    'Headphones', 'Image', 'ImagePlus', 'Music', 'Music2', 'Pause',
    'Play', 'PlayCircle', 'Podcast', 'Radio', 'Repeat', 'Shuffle',
    'SkipBack', 'SkipForward', 'Speaker', 'Tv', 'Video', 'Volume2',
  ],
  'Navigation': [
    'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowUpRight',
    'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'Compass',
    'CornerDownRight', 'ExternalLink', 'Home', 'Link', 'Map', 'MapPin',
    'Menu', 'MoveRight', 'Navigation', 'Route', 'Signpost',
  ],
  'UI': [
    'AlertCircle', 'AlertTriangle', 'BadgeCheck', 'Ban', 'BookOpen',
    'Check', 'CheckCircle', 'ChevronDown', 'Circle', 'CircleAlert',
    'Copy', 'Edit', 'Eye', 'EyeOff', 'Filter', 'Flag', 'Grip',
    'Hash', 'HelpCircle', 'Info', 'Loader', 'Maximize', 'Minimize',
    'MoreHorizontal', 'Plus', 'RefreshCw', 'RotateCcw', 'Save',
    'Search', 'Sliders', 'SortAsc', 'Trash2', 'X', 'XCircle',
  ],
  'Nature': [
    'Bird', 'Bug', 'Cat', 'CloudRain', 'CloudSnow', 'CloudSun',
    'Dog', 'Droplets', 'Fish', 'Flower', 'Leaf', 'Moon',
    'Mountain', 'Snowflake', 'Sprout', 'Sun', 'Sunrise', 'Sunset',
    'Thermometer', 'TreePine', 'Trees', 'Umbrella', 'Waves', 'Wind',
  ],
  'Sante': [
    'Activity', 'Ambulance', 'Apple', 'Baby', 'Bandage', 'Bean', 'Bone',
    'Brain', 'Cross', 'Dumbbell', 'HeartPulse', 'Hospital', 'Pill',
    'Salad', 'Stethoscope', 'Syringe', 'Thermometer', 'Weight',
  ],
  'Shopping': [
    'BadgePercent', 'Banknote', 'Barcode', 'Box', 'CreditCard', 'Gift',
    'Package', 'PackageCheck', 'PackageOpen', 'Percent', 'Receipt',
    'ScanBarcode', 'ShoppingBag', 'ShoppingCart', 'Store', 'Tag',
    'Tags', 'Ticket', 'Truck', 'Wallet',
  ],
  'Securite': [
    'Eye', 'EyeOff', 'Fingerprint', 'Key', 'KeyRound', 'Lock',
    'LockKeyhole', 'LockOpen', 'ScanFace', 'Shield', 'ShieldAlert',
    'ShieldCheck', 'ShieldOff', 'Siren', 'Unlock', 'UserCheck',
  ],
}

const ALL_ICON_NAMES = Object.keys(icons)

function pascalToKebab(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

// ────────────────────────────────────────────────────────
// Iconify collections
// ────────────────────────────────────────────────────────

interface IconifyCollection {
  prefix: string
  label: string
  total: number
}

const ICONIFY_COLLECTIONS: IconifyCollection[] = [
  { prefix: 'lucide', label: 'Lucide', total: 1950 },
  { prefix: 'heroicons', label: 'Heroicons', total: 584 },
  { prefix: 'ph', label: 'Phosphor', total: 7488 },
  { prefix: 'mdi', label: 'Material Design', total: 7447 },
  { prefix: 'tabler', label: 'Tabler', total: 5237 },
  { prefix: 'bi', label: 'Bootstrap', total: 2716 },
  { prefix: 'fa6-solid', label: 'Font Awesome', total: 1389 },
  { prefix: 'feather', label: 'Feather', total: 287 },
  { prefix: 'carbon', label: 'Carbon', total: 2145 },
  { prefix: 'ri', label: 'Remix', total: 2860 },
]

interface IconifyIcon {
  name: string
  prefix: string
  svg: string
}

// ────────────────────────────────────────────────────────
// Hook: debounced Iconify API fetch
// ────────────────────────────────────────────────────────

function useIconifySearch(query: string, prefix: string, limit: number) {
  const [results, setResults] = useState<IconifyIcon[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    // Cancel previous request
    abortRef.current?.abort()

    const trimmed = query.trim()

    // If no query, load collection browse
    if (!trimmed) {
      const controller = new AbortController()
      abortRef.current = controller
      setLoading(true)

      const params = new URLSearchParams({ prefix, limit: String(limit) })
      fetch(`/api/icons?${params}`, { signal: controller.signal })
        .then(r => r.json())
        .then((data: { icons: IconifyIcon[]; total?: number }) => {
          if (!controller.signal.aborted) {
            setResults(data.icons || [])
            setTotal(data.total || data.icons?.length || 0)
            setLoading(false)
          }
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setLoading(false)
          }
        })

      return () => controller.abort()
    }

    // Debounced search
    const timer = setTimeout(() => {
      const controller = new AbortController()
      abortRef.current = controller
      setLoading(true)

      const params = new URLSearchParams({ query: trimmed, prefix, limit: String(limit) })
      fetch(`/api/icons?${params}`, { signal: controller.signal })
        .then(r => r.json())
        .then((data: { icons: IconifyIcon[]; total?: number }) => {
          if (!controller.signal.aborted) {
            setResults(data.icons || [])
            setTotal(data.total || data.icons?.length || 0)
            setLoading(false)
          }
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setLoading(false)
          }
        })
    }, 300)

    return () => {
      clearTimeout(timer)
      abortRef.current?.abort()
    }
  }, [query, prefix, limit])

  return { results, total, loading }
}

// ────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────

type PickerTab = 'lucide' | 'iconify'

interface IconPickerProps {
  value: string
  onChange: (iconName: string) => void
  onClose: () => void
}

export function IconPicker({ value, onChange, onClose }: IconPickerProps) {
  const [tab, setTab] = useState<PickerTab>('lucide')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Populaire')
  const [iconifyPrefix, setIconifyPrefix] = useState('lucide')

  // Lucide local filtering
  const filteredLucideIcons = useMemo(() => {
    if (search.trim()) {
      const q = search.toLowerCase()
      return ALL_ICON_NAMES.filter(name =>
        name.toLowerCase().includes(q) ||
        pascalToKebab(name).includes(q)
      ).slice(0, 200)
    }
    return ICON_CATEGORIES[activeCategory] || []
  }, [search, activeCategory])

  // Iconify remote search
  const { results: iconifyResults, total: iconifyTotal, loading: iconifyLoading } = useIconifySearch(
    tab === 'iconify' ? search : '',
    iconifyPrefix,
    60
  )

  const handleSelectLucide = useCallback((pascalName: string) => {
    const kebab = pascalToKebab(pascalName)
    onChange(kebab)
    onClose()
  }, [onChange, onClose])

  const handleSelectIconify = useCallback((icon: IconifyIcon) => {
    onChange(`iconify:${icon.prefix}:${icon.name}`)
    onClose()
  }, [onChange, onClose])

  // Check if current value is an Iconify icon
  const isIconifyValue = value.startsWith('iconify:')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in fade-in-0 duration-150">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-[560px] max-h-full flex flex-col shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0">
          <h3 className="text-sm font-semibold text-white">Choisir une icone</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-4 py-2 border-b border-zinc-800 flex gap-1 shrink-0">
          <button
            onClick={() => setTab('lucide')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              tab === 'lucide'
                ? 'bg-wf-blue text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Lucide
          </button>
          <button
            onClick={() => setTab('iconify')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              tab === 'iconify'
                ? 'bg-wf-blue text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Iconify (200k+)
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-zinc-800 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={
                tab === 'lucide'
                  ? 'Rechercher parmi 1 950+ icones...'
                  : `Rechercher dans ${ICONIFY_COLLECTIONS.find(c => c.prefix === iconifyPrefix)?.label || 'Iconify'}...`
              }
              className="w-full h-9 pl-9 pr-3 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-wf-blue"
            />
          </div>
        </div>

        {/* Lucide categories OR Iconify collection selector */}
        {tab === 'lucide' && !search.trim() && (
          <div className="px-4 py-2 border-b border-zinc-800 flex gap-1 overflow-x-auto scrollbar-hide shrink-0">
            {Object.keys(ICON_CATEGORIES).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-wf-blue text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {tab === 'iconify' && (
          <div className="px-4 py-2 border-b border-zinc-800 flex gap-1 overflow-x-auto scrollbar-hide shrink-0">
            {ICONIFY_COLLECTIONS.map(col => (
              <button
                key={col.prefix}
                onClick={() => setIconifyPrefix(col.prefix)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                  iconifyPrefix === col.prefix
                    ? 'bg-wf-blue text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {col.label}
                <span className="text-[10px] opacity-60">{col.total > 1000 ? `${(col.total / 1000).toFixed(1)}k` : col.total}</span>
              </button>
            ))}
          </div>
        )}

        {/* Icon grid */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0 dark-scrollbar">
          {tab === 'lucide' && (
            <>
              <div className="grid grid-cols-10 gap-1">
                {filteredLucideIcons.map(name => {
                  const IconComp = icons[name as keyof typeof icons] as LucideIcon | undefined
                  if (!IconComp) return null
                  const kebab = pascalToKebab(name)
                  const isSelected = kebab === value || name === value
                  return (
                    <button
                      key={name}
                      onClick={() => handleSelectLucide(name)}
                      title={kebab}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                        isSelected
                          ? 'bg-wf-blue text-white ring-2 ring-wf-blue/60'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </button>
                  )
                })}
              </div>
              {filteredLucideIcons.length === 0 && (
                <p className="text-center text-sm text-zinc-500 py-8">
                  Aucune icone trouvee pour &ldquo;{search}&rdquo;
                </p>
              )}
            </>
          )}

          {tab === 'iconify' && (
            <>
              {iconifyLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
                  <span className="ml-2 text-sm text-zinc-500">Chargement...</span>
                </div>
              )}

              {!iconifyLoading && iconifyResults.length > 0 && (
                <div className="grid grid-cols-10 gap-1">
                  {iconifyResults.map(icon => {
                    const iconValue = `iconify:${icon.prefix}:${icon.name}`
                    const isSelected = value === iconValue || (isIconifyValue && value === iconValue)
                    return (
                      <button
                        key={`${icon.prefix}:${icon.name}`}
                        onClick={() => handleSelectIconify(icon)}
                        title={`${icon.prefix}:${icon.name}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                          isSelected
                            ? 'bg-wf-blue text-white ring-2 ring-wf-blue/60'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                      >
                        <span
                          className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current"
                          dangerouslySetInnerHTML={{ __html: icon.svg }}
                        />
                      </button>
                    )
                  })}
                </div>
              )}

              {!iconifyLoading && iconifyResults.length === 0 && (
                <p className="text-center text-sm text-zinc-500 py-8">
                  {search.trim()
                    ? `Aucune icone trouvee pour "${search}"`
                    : 'Aucune icone disponible'}
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-zinc-800 text-xs text-zinc-500 shrink-0">
          {tab === 'lucide' && (
            search.trim()
              ? `${filteredLucideIcons.length} resultat(s)`
              : `${filteredLucideIcons.length} icones dans "${activeCategory}" — 1 950+ au total`
          )}
          {tab === 'iconify' && (
            iconifyLoading
              ? 'Recherche en cours...'
              : `${iconifyResults.length} affichee(s)${iconifyTotal > iconifyResults.length ? ` sur ${iconifyTotal}` : ''} — ${ICONIFY_COLLECTIONS.find(c => c.prefix === iconifyPrefix)?.label || iconifyPrefix}`
          )}
        </div>
      </div>
    </div>
  )
}
