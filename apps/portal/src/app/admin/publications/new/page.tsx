'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';
import PublicationEditor from '@/components/admin/publications/PublicationEditor';

export default function NewPublicationPage() {
  return (
    <div>
      <PageHeaderRibbon label="Publications · Nouvelle" />
      <div style={{ marginBottom: 16 }}>
        <Link
          href="/admin/publications"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 12, color: 'var(--agency-ink-3)', textDecoration: 'none',
          }}
        >
          <ArrowLeft size={12} /> Retour aux publications
        </Link>
      </div>
      <PublicationEditor mode="create" />
    </div>
  );
}
