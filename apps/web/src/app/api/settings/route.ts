import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { settingsUpdateSchema } from '@/lib/validations';

// GET - Récupérer les paramètres de l'entreprise
export async function GET() {
  try {
    let settings = await prisma.companySettings.findUnique({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.companySettings.create({
        data: { id: 'default' },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour les paramètres
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = settingsUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const settings = await prisma.companySettings.upsert({
      where: { id: 'default' },
      update: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        siret: data.siret,
        iban: data.iban,
        bic: data.bic,
        tvaNumber: data.tvaNumber,
        defaultPaymentTerms: data.defaultPaymentTerms,
        penaltyRate: data.penaltyRate !== undefined ? parseFloat(String(data.penaltyRate)) : undefined,
        legalForm: data.legalForm,
        capital: data.capital,
        rcsCity: data.rcsCity,
        representantName: data.representantName,
        representantRole: data.representantRole,
      },
      create: {
        id: 'default',
        name: data.name || '',
        address: data.address || '',
        phone: data.phone || '',
        email: data.email || '',
        siret: data.siret || '',
        iban: data.iban || '',
        bic: data.bic || '',
        tvaNumber: data.tvaNumber || '',
        defaultPaymentTerms: data.defaultPaymentTerms || '30 jours',
        penaltyRate: data.penaltyRate ? parseFloat(String(data.penaltyRate)) : 3.0,
        legalForm: data.legalForm || '',
        capital: data.capital || '',
        rcsCity: data.rcsCity || '',
        representantName: data.representantName || '',
        representantRole: data.representantRole || '',
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
