# Publier Football Live gratuitement (Vercel)

## Sécurité des clés
Tes clés API ont été exposées dans un chat : régénère-les sur api-football et newsapi après publication.
Sur Vercel, mets-les UNIQUEMENT dans Environment Variables (jamais dans le code Git public).

## Étapes Vercel
1. Compte gratuit https://vercel.com (GitHub)
2. Pousse le projet sur GitHub (repo privé recommandé)
3. Vercel → Add New Project → importe le repo
4. Framework: Next.js (détecté auto)
5. Environment Variables:
   - FOOTBALL_API_KEY
   - FOOTBALL_API_BASE_URL = https://v3.football.api-sports.io
   - NEWS_API_KEY
   - NEWS_API_BASE_URL = https://newsapi.org/v2
6. Deploy → URL https://xxx.vercel.app

## Limite API-Football Free
100 requêtes / jour. Évite de trop rafraîchir en dev.
