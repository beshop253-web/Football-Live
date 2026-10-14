import type { NewsArticle } from './types';

const KEY = process.env.NEWS_API_KEY || '';
const BASE = process.env.NEWS_API_BASE_URL || 'https://newsapi.org/v2';

export async function getFootballNews(pageSize = 20): Promise<NewsArticle[]> {
  if (!KEY) return [];
  try {
    const url = `${BASE}/everything?q=${encodeURIComponent(
      'football OR soccer OR premier league OR champions league'
    )}&language=fr,en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${KEY}`;
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) {
      console.error('NewsAPI error', res.status);
      return [];
    }
    const json = await res.json();
    if (!Array.isArray(json.articles)) return [];
    return json.articles.map((a: any, i: number) => ({
      id: a.url || String(i),
      title: a.title || 'Sans titre',
      summary: a.description || '',
      image: a.urlToImage || '',
      source: a.source?.name || 'News',
      date: a.publishedAt || '',
      category: 'Football',
      url: a.url,
    }));
  } catch (e) {
    console.error('NewsAPI fetch failed', e);
    return [];
  }
}
