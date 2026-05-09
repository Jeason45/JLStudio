'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, Receipt, FileSignature, Users, FolderKanban, Building2 } from 'lucide-react';
import { SECTION_COLORS } from './sectionColors';

// ─── Types ───────────────────────────────────────────────────

interface ContactResult {
  id: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  companyName: string | null;
  status: string;
  type: string | null;
}
interface DocumentResult {
  id: string;
  type: 'DEVIS' | 'FACTURE' | 'CONTRAT';
  status: string;
  documentNumber: string | null;
  title: string;
  totalAmount: number | null;
  contact: { id: string; name: string | null; companyName: string | null } | null;
}
interface ProjectResult {
  id: string;
  name: string;
  status: string;
  priority: string;
  contact: { id: string; name: string | null; companyName: string | null } | null;
}
interface SearchResults {
  contacts: ContactResult[];
  documents: DocumentResult[];
  projects: ProjectResult[];
}

interface FlatItem {
  type: 'contact' | 'document' | 'project';
  id: string;
  href: string;
  primary: string;
  secondary: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────

export function SearchPalette({ mobile }: { mobile: boolean }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Debounced fetch
  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data: SearchResults = await res.json();
          setResults(data);
          setSelectedIndex(0);
        }
      } catch { /* ignore */ }
      finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [query]);

  // Click outside → close
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // ⌘K / Ctrl+K → focus input + open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Build flat list for keyboard nav
  const flat: FlatItem[] = buildFlatList(results);

  const navigate = useCallback((item: FlatItem) => {
    setOpen(false);
    setQuery('');
    setResults(null);
    router.push(item.href);
  }, [router]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || flat.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % flat.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + flat.length) % flat.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flat[selectedIndex];
      if (item) navigate(item);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: mobile ? '100%' : 540 }}>
      <div
        style={{
          background: 'var(--agency-surface-2)',
          border: `1px solid ${open ? 'var(--agency-accent)' : 'var(--agency-border)'}`,
          borderRadius: 8,
          padding: mobile ? '6px 10px' : '7px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
          color: 'var(--agency-ink-3)',
          fontSize: 13,
          width: '100%',
          cursor: 'text',
          transition: 'border-color 0.15s',
        }}
      >
        <Search size={14} style={{ flexShrink: 0, opacity: 0.55 }} />
        <input
          ref={inputRef}
          type="search"
          name="jlstudio-global-search"
          placeholder={mobile ? 'Rechercher…' : 'Rechercher un devis, lead, client, projet…'}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-1p-ignore="true"
          data-lpignore="true"
          data-form-type="other"
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--agency-ink-1)', flex: 1, fontFamily: 'inherit',
            fontSize: 13, minWidth: 0,
          }}
        />
        {!mobile && (
          <span
            style={{
              fontSize: 10, fontWeight: 500,
              padding: '2px 6px', borderRadius: 4,
              background: 'var(--agency-surface-3, var(--agency-surface-2))',
              color: 'var(--agency-ink-3)',
              border: '1px solid var(--agency-border)',
              lineHeight: 1, flexShrink: 0,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            ⌘K
          </span>
        )}
      </div>

      {open && query.trim() && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0, right: 0,
            background: 'var(--agency-surface-1)',
            border: '1px solid var(--agency-border)',
            borderRadius: 10,
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            zIndex: 1100,
            maxHeight: 480,
            overflowY: 'auto',
          }}
        >
          {loading && flat.length === 0 ? (
            <Empty message="Recherche…" />
          ) : flat.length === 0 ? (
            <Empty message={`Aucun résultat pour "${query.trim()}"`} />
          ) : (
            <ResultsList
              results={results!}
              flat={flat}
              selectedIndex={selectedIndex}
              onSelect={navigate}
              onHover={setSelectedIndex}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────

function buildFlatList(r: SearchResults | null): FlatItem[] {
  if (!r) return [];
  const items: FlatItem[] = [];

  for (const c of r.contacts) {
    const fullName = c.companyName || c.name || `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'Contact';
    items.push({
      type: 'contact',
      id: c.id,
      href: '/admin/clients',
      primary: fullName,
      secondary: c.email,
      badge: c.status,
      badgeColor: c.status === 'NEW' ? '#34d399' : c.status === 'ACTIVE' ? '#22c55e' : '#94a3b8',
      icon: <Users size={14} style={{ color: SECTION_COLORS.contacts }} />,
    });
  }

  for (const d of r.documents) {
    const Icon = d.type === 'DEVIS' ? FileText : d.type === 'FACTURE' ? Receipt : FileSignature;
    const editRoute =
      d.type === 'DEVIS' ? '/admin/documents/create-devis'
      : d.type === 'FACTURE' ? '/admin/documents/create-facture'
      : '/admin/documents/create-contrat';
    const clientLabel = d.contact?.companyName || d.contact?.name || '—';
    const amount = d.totalAmount ? `${d.totalAmount.toLocaleString('fr-FR')} €` : '';
    items.push({
      type: 'document',
      id: d.id,
      href: `${editRoute}?id=${d.id}`,
      primary: `${d.documentNumber || d.id.slice(0, 8)} · ${d.title}`,
      secondary: [clientLabel, amount].filter(Boolean).join(' · '),
      badge: d.status,
      badgeColor: d.status === 'PAID' ? '#22c55e' : d.status === 'SENT' ? '#3B82F6' : '#94a3b8',
      icon: <Icon size={14} style={{ color: SECTION_COLORS.communication }} />,
    });
  }

  for (const p of r.projects) {
    const clientLabel = p.contact?.companyName || p.contact?.name || '—';
    items.push({
      type: 'project',
      id: p.id,
      href: '/admin/projets',
      primary: p.name,
      secondary: clientLabel,
      badge: p.status,
      badgeColor: p.status === 'IN_PROGRESS' ? '#fbbf24' : p.status === 'COMPLETED' ? '#22c55e' : '#94a3b8',
      icon: <FolderKanban size={14} style={{ color: SECTION_COLORS.projets }} />,
    });
  }

  return items;
}

function ResultsList({
  results, flat, selectedIndex, onSelect, onHover,
}: {
  results: SearchResults;
  flat: FlatItem[];
  selectedIndex: number;
  onSelect: (item: FlatItem) => void;
  onHover: (idx: number) => void;
}) {
  const groups: Array<{ label: string; type: 'contact' | 'document' | 'project'; count: number }> = [];
  if (results.contacts.length > 0) groups.push({ label: 'Contacts', type: 'contact', count: results.contacts.length });
  if (results.documents.length > 0) groups.push({ label: 'Documents', type: 'document', count: results.documents.length });
  if (results.projects.length > 0) groups.push({ label: 'Projets', type: 'project', count: results.projects.length });

  let cursor = 0;
  return (
    <div>
      {groups.map((group) => {
        const start = cursor;
        cursor += group.count;
        return (
          <div key={group.type}>
            <GroupHeader label={group.label} count={group.count} />
            {flat.slice(start, start + group.count).map((item, i) => (
              <ResultRow
                key={item.id}
                item={item}
                selected={selectedIndex === start + i}
                onSelect={() => onSelect(item)}
                onHover={() => onHover(start + i)}
              />
            ))}
          </div>
        );
      })}
      <div style={{
        padding: '10px 14px',
        borderTop: '1px solid var(--agency-border)',
        background: 'var(--agency-surface-2)',
        fontSize: 10, color: 'var(--agency-ink-3)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        <span><Kbd>↑↓</Kbd> naviguer · <Kbd>↵</Kbd> ouvrir</span>
        <span><Kbd>esc</Kbd> fermer</span>
      </div>
    </div>
  );
}

function GroupHeader({ label, count }: { label: string; count: number }) {
  return (
    <div
      style={{
        padding: '10px 14px 4px',
        fontSize: 9, fontWeight: 700,
        color: 'var(--agency-ink-3)',
        textTransform: 'uppercase', letterSpacing: '0.12em',
        display: 'flex', justifyContent: 'space-between',
      }}
    >
      <span>{label}</span>
      <span style={{ opacity: 0.6 }}>{count}</span>
    </div>
  );
}

function ResultRow({
  item, selected, onSelect, onHover,
}: {
  item: FlatItem; selected: boolean; onSelect: () => void; onHover: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      style={{
        width: '100%',
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px',
        background: selected ? 'var(--agency-surface-2)' : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        color: 'var(--agency-ink-1)', fontFamily: 'inherit',
        borderLeft: selected ? '2px solid var(--agency-accent)' : '2px solid transparent',
        transition: 'background 0.08s',
      }}
    >
      <span
        style={{
          width: 24, height: 24, borderRadius: 6,
          background: 'var(--agency-surface-3, var(--agency-surface-2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {item.icon}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: 'block',
            fontSize: 12, fontWeight: 600,
            color: 'var(--agency-ink-1)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}
        >
          {item.primary}
        </span>
        {item.secondary && (
          <span
            style={{
              display: 'block',
              fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}
          >
            {item.secondary}
          </span>
        )}
      </span>
      {item.badge && (
        <span
          style={{
            fontSize: 9, fontWeight: 600,
            padding: '3px 7px', borderRadius: 999,
            color: item.badgeColor,
            background: `${item.badgeColor}1F`,
            flexShrink: 0,
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

function Empty({ message }: { message: string }) {
  return (
    <div style={{
      padding: '24px 16px',
      textAlign: 'center',
      fontSize: 12,
      color: 'var(--agency-ink-3)',
    }}>
      {message}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: '1px 5px', borderRadius: 3,
        background: 'var(--agency-surface-3, var(--agency-surface-1))',
        border: '1px solid var(--agency-border)',
        fontSize: 10, color: 'var(--agency-ink-2)',
      }}
    >
      {children}
    </span>
  );
}
