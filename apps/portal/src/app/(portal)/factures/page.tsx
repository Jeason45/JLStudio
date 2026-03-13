import DocumentList from '@/components/portal/DocumentList';

export default function FacturesPage() {
  return <DocumentList type="FACTURE" createHref="/factures/create" />;
}
