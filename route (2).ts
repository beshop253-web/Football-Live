import { NextResponse } from 'next/server';
import { getUpcomingMatches } from '../../../../lib/football-api';

export const revalidate = 120;

export async function GET() {
  try {
    const matches = await getUpcomingMatches(5);
    return NextResponse.json({ data: matches });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { data: [], error: 'Impossible de récupérer les données pour le moment. Réessayez plus tard.' },
      { status: 500 }
    );
  }
}
