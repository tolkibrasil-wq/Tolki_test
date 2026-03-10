# Especificacoes Tecnicas por Plataforma

## Meta Ads (Instagram + Facebook)

### Formatos de Video

| Formato | Aspecto | Resolucao | Duracao | Uso |
|---------|---------|-----------|---------|-----|
| Feed Quadrado | 1:1 | 1080x1080 | 1-120s | Feed IG/FB |
| Feed Vertical | 4:5 | 1080x1350 | 1-120s | Feed IG/FB (mais area) |
| Stories/Reels | 9:16 | 1080x1920 | 1-90s | Stories, Reels, Shorts |
| Feed Horizontal | 16:9 | 1920x1080 | 1-120s | FB Feed, In-Stream |
| Carousel Video | 1:1 | 1080x1080 | 1-120s | Carousel ads |

### Safe Zones (Meta)

```
Stories/Reels 9:16 (1080x1920):
┌──────────────────────┐
│    250px TOP SAFE    │ ← Nao colocar texto aqui (UI do app)
│                      │
│  ┌──────────────┐    │
│  │              │    │
│  │  AREA SEGURA │    │
│  │  para texto  │    │
│  │  e elementos │    │
│  │              │    │
│  └──────────────┘    │
│                      │
│   340px BOTTOM SAFE  │ ← CTA e controles do app ficam aqui
└──────────────────────┘

Margens laterais: 64px de cada lado
```

### Boas Praticas Meta Ads

1. **Duracao ideal**: 15-30s para melhor performance
2. **Hook em 3s**: Meta cobra por view de 3s - prenda rapido
3. **Texto na imagem**: Maximo 20% da area (regra flexivel mas ainda relevante)
4. **Legendas**: Obrigatorias - 85% assiste sem som
5. **Thumb nativa**: Primeiro frame deve parecer conteudo organico
6. **Loop**: Se possivel, faca o final conectar com o inicio
7. **CTA visual**: Adicione botao/seta apontando para o CTA do Meta
8. **Formato mais performatico**: 9:16 para Reels, 4:5 para Feed

### Objetivos e Formatos Recomendados

| Objetivo | Formato | Duracao |
|----------|---------|---------|
| Awareness | 9:16 Reels | 15-30s |
| Consideracao | 4:5 Feed | 15-60s |
| Conversao | 9:16 ou 4:5 | 15-30s |
| Retargeting | 1:1 Feed | 6-15s |

---

## TikTok Ads

### Formatos de Video

| Formato | Aspecto | Resolucao | Duracao | Uso |
|---------|---------|-----------|---------|-----|
| Vertical Full | 9:16 | 1080x1920 | 5-60s | In-Feed, TopView |
| Quadrado | 1:1 | 1080x1080 | 5-60s | In-Feed (menos comum) |
| Horizontal | 16:9 | 1920x1080 | 5-60s | Search Ads |

### Safe Zones (TikTok)

```
TikTok 9:16 (1080x1920):
┌──────────────────────┐
│   150px TOP SAFE     │ ← Logo TikTok e status bar
│                      │
│  ┌──────────────┐    │
│  │              │    │
│  │  AREA SEGURA │    │
│  │  para texto  │    │
│  │  e elementos │    │
│  │              │    │
│  └──────────────┘    │
│                      │
│   480px BOTTOM SAFE  │ ← Username, descricao, musica, botoes
│   ███████████████    │
└──────────────────────┘

Margem direita: 100px (botoes de interacao)
Margens laterais: 44px de cada lado
```

### Boas Praticas TikTok Ads

1. **Duracao ideal**: 21-34s (sweet spot do algoritmo)
2. **NUNCA pareca anuncio**: Conteudo nativo > producao polida
3. **Vertical SEMPRE**: 9:16 obrigatorio para melhor performance
4. **Som ON**: TikTok e sound-on platform, mas legendas ajudam
5. **Trending sounds**: Use sons e musicas em alta quando possivel
6. **Cortes rapidos**: Troque de cena a cada 2-3 segundos
7. **Texto grande**: Fonte minimo 50px, bold, com sombra ou fundo
8. **Hook em 1 segundo**: TikTok e mais rapido que Instagram
9. **UGC style**: Videos estilo "pessoa real filmando" performam melhor
10. **Spark Ads**: Boost de posts organicos > anuncios tradicionais

### Objetivos e Formatos TikTok

| Objetivo | Formato | Duracao |
|----------|---------|---------|
| Reach | In-Feed 9:16 | 9-15s |
| Traffic | In-Feed 9:16 | 15-30s |
| Conversoes | In-Feed 9:16 | 21-34s |
| App Install | In-Feed 9:16 | 15-30s |

---

## Comparativo Rapido

| Aspecto | Meta Ads | TikTok Ads |
|---------|----------|------------|
| Tom | Conversacional/Profissional | Ultra casual/Nativo |
| Hook | 3 segundos | 1 segundo |
| Som | Off-first (85% mudo) | On-first (som importa) |
| Estetica | Polida OK | Quanto mais "real" melhor |
| Duracao ideal | 15-30s | 21-34s |
| CTA | Visual + texto | Sutil, integrado ao conteudo |
| Legendas | Obrigatorias | Muito recomendadas |
| Formato top | 9:16 ou 4:5 | 9:16 sempre |

---

## Configuracoes de Render no Remotion

### Meta Ads
```tsx
// Feed 4:5
export const MetaFeed = () => (
  <Composition
    id="meta-feed"
    component={AdCreative}
    width={1080}
    height={1350}
    fps={30}
    durationInFrames={30 * 30} // 30 segundos
  />
);

// Reels/Stories 9:16
export const MetaReels = () => (
  <Composition
    id="meta-reels"
    component={AdCreative}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={30 * 30}
  />
);
```

### TikTok Ads
```tsx
// TikTok In-Feed 9:16
export const TikTokFeed = () => (
  <Composition
    id="tiktok-feed"
    component={AdCreative}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={30 * 27} // 27 segundos (sweet spot)
  />
);
```

### Codec e Qualidade
```bash
# Meta Ads - H.264 MP4
npx remotion render src/index.ts meta-reels out/meta-reels.mp4 --codec=h264 --crf=18

# TikTok Ads - H.264 MP4
npx remotion render src/index.ts tiktok-feed out/tiktok-feed.mp4 --codec=h264 --crf=18

# Arquivo maximo: 4GB (Meta) / 500MB (TikTok)
# Bitrate recomendado: 8-12 Mbps
```
