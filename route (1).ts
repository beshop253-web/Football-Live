import { NextResponse } from 'next/server';
import { search } from '../../../lib/football-api';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const result = await search(q);
    return NextResponse.json({ data: result });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { data: { matches: [], teams: [], competitions: [] }, error: 'Erreur de recherche.' },
      { status: 500 }
    );
  }
}
