import { Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div style={{ padding: '8px 0' }}>
      <Skeleton height={28} width={180} style={{ marginBottom: 24 }} />
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <Skeleton height={64} width={150} rounded={12} />
        <Skeleton height={64} width={150} rounded={12} />
        <Skeleton height={64} width={150} rounded={12} />
      </div>
      <Skeleton height={300} rounded={12} />
    </div>
  );
}
