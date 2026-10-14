# Football Live — publication stores & architecture

Application d'information football. Aucun pari, aucune cote.

## Identité

- Nom : Football Live
- Bundle / package : `com.footballlive.app`
- Langue par défaut : français
- Langues : fr, en, es, de, it, ja, zh
- Hébergement v1 : Railway (migrable vers VPS via les mêmes variables)

## Démarrage

```bash
cp .env.example .env
npm install
npm run dev
```

Les clés API ne sont lues que côté serveur (`FOOTBALL_API_KEY`, `NEWS_API_KEY`). Ne jamais les préfixer par `NEXT_PUBLIC_`.

## Obtenir une clé football

1. Créer un compte sur https://dashboard.api-football.com/register
2. Copier la clé dans Account → My Access
3. La coller dans Railway (ou `.env` local) sous `FOOTBALL_API_KEY`
4. Laisser `FOOTBALL_PROVIDER=api-football`

Sans clé, l'app peut utiliser le fournisseur public de secours (`FOOTBALL_API_BASE_URL`).

## News

1. https://newsapi.org → clé gratuite
2. `NEWS_API_KEY` dans Railway uniquement

## PWA + stores

La v1 est une PWA installable. Pour Google Play et App Store, envelopper avec Capacitor :

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init "Football Live" com.footballlive.app --web-dir out
npx cap add android
npx cap add ios
```

Comptes développeur à créer au moment de la soumission :

- Google Play Console (25 USD, une fois)
- Apple Developer Program (99 USD / an)

Icônes stores : 1024×1024 (iOS) et 512×512 (Play). Utiliser le logo généré.

## Migration Railway → serveur propre

Changer uniquement :

- `APP_URL`
- `NEXT_PUBLIC_APP_URL`
- éventuel reverse proxy

Le code fournisseur API reste identique.
