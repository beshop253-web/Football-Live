import { NextResponse } from 'next/server';
import { getFootballNews } from '../../../lib/news-api';

export const revalidate = 600;

export async function GET() {
  try {
    const data = await getFootballNews(20);
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { data: [], error: 'Impossible de récupérer les actualités.' },
      { status: 500 }
    );
  }
}
