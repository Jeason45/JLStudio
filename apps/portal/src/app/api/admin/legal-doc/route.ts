import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { generatePDFFromTemplate } from '@/lib/mustachePdfGenerator';

// GET /api/admin/legal-doc?kind=cgv | dpa[&contactId=...]
// Génère et renvoie (inline) le PDF des CGV ou d'un DPA. Pas de stockage : c'est
// un document juridique à télécharger / joindre librement.
export async function GET(req: NextRequest) {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const kind = req.nextUrl.searchParams.get('kind');
  if (kind !== 'cgv' && kind !== 'dpa') {
    return NextResponse.json({ error: 'kind invalide (cgv | dpa)' }, { status: 400 });
  }

  const site = await getAgencySite();
  const company = await prisma.portalCompanySettings.findUnique({ where: { siteId: site.id } });

  const data: Record<string, unknown> = {
    company_name: company?.companyName || 'JL Studio',
    adresse_agence: [company?.address, company?.zipCode, company?.city].filter(Boolean).join(', '),
    telephone_agence: company?.phone || '',
    email_agence: company?.email || '',
    siret_agence: company?.siret || '',
    logoUrl: company?.logoUrl || '',
    date: new Date().toLocaleDateString('fr-FR'),
    mediateur_nom: '[à compléter]',
    mediateur_url: '[site du médiateur]',
  };

  let filename = `CGV_${(company?.companyName || 'JLStudio').replace(/\s+/g, '')}.pdf`;

  if (kind === 'dpa') {
    const contactId = req.nextUrl.searchParams.get('contactId');
    if (!contactId) {
      return NextResponse.json({ error: 'contactId requis pour un DPA' }, { status: 400 });
    }
    const contact = await prisma.contact.findFirst({ where: { id: contactId, siteId: site.id } });
    if (!contact) {
      return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });
    }
    data.nom_client = contact.companyName || contact.name;
    data.adresse_client = contact.address || '';
    data.code_postal_client = contact.postalCode || '';
    data.ville_client = contact.city || '';
    data.email_client = contact.email || '';
    filename = `DPA_${(contact.companyName || contact.name || 'client').replace(/\s+/g, '')}.pdf`;
  }

  const result = await generatePDFFromTemplate({ templateSlug: kind, data });
  if (!result.success || !result.buffer) {
    return NextResponse.json({ error: result.error || 'Erreur de génération' }, { status: 500 });
  }

  return new NextResponse(new Uint8Array(result.buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
