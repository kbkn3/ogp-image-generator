# ogp-image-generator

cloudflare worker で ogp 画像を生成するAPIサーバー

## 技術スタック

- [Hono](https://hono.dev/)
- [@cloudflare/pages-plugin-vercel-og](https://developers.cloudflare.com/pages/functions/plugins/vercel-og/)
- [biome](https://biomejs.dev/)

## 使い方

```html
<meta property='og:image' content='https://ogp-image-creator.ken0421wabu.workers.dev/gensya?title=タイトル&subTilte=サブタイトル&siteTitle=hogehogeブログ' />
```

## 開発環境

```sh
bun install
bun dev
```

```sh
bun run deploy
```
