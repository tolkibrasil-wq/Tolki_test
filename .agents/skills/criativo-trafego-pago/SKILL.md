---
name: criativo-trafego-pago
description: "Skill completa para criar criativos de trafego pago com Remotion: copy, design e motion para Meta Ads e TikTok Ads"
metadata:
  tags: ads, trafego-pago, copywriting, criativos, meta-ads, tiktok, remotion, motion-design, conversao
---

## Quando usar

Use esta skill sempre que precisar criar criativos para trafego pago, incluindo:
- Videos para Meta Ads (Instagram Reels, Stories, Feed, Facebook)
- Videos para TikTok Ads
- Copy para anuncios (headlines, hooks, CTAs, descricoes)
- Motion design otimizado para conversao
- Templates Remotion prontos para renderizar

## Arquitetura do Criativo

Todo criativo de alta conversao segue esta estrutura:

```
HOOK (0-3s) → PROBLEMA (3-8s) → SOLUCAO (8-15s) → PROVA (15-25s) → CTA (25-30s)
```

### Principios Fundamentais

1. **Hook nos primeiros 3 segundos** - Se nao prender, perde o scroll
2. **Pattern interrupt** - Quebre o padrao visual do feed
3. **Native feel** - Pareca conteudo organico, nao anuncio
4. **Sound-off first** - Funcione sem som (legendas obrigatorias)
5. **Mobile-first** - 98% do consumo e mobile
6. **CTA claro e urgente** - Uma unica acao desejada

## Como usar

### Regras por area

Carregue as regras especificas conforme a necessidade:

- [rules/copywriting.md](rules/copywriting.md) - Frameworks de copy para ads (AIDA, PAS, BAB, 4Ps, hooks magnéticos, CTAs de alta conversão)
- [rules/plataformas.md](rules/plataformas.md) - Specs técnicos e boas práticas por plataforma (Meta Ads, TikTok Ads)
- [rules/motion-design.md](rules/motion-design.md) - Padrões de motion design para conversão com Remotion
- [rules/psicologia-conversao.md](rules/psicologia-conversao.md) - Gatilhos mentais e psicologia de conversão aplicada a criativos

### Templates Remotion

Templates prontos para gerar criativos:

- [templates/hook-problema-solucao.tsx](templates/hook-problema-solucao.tsx) - Template padrão de criativo com estrutura H-P-S-CTA
- [templates/ugc-style.tsx](templates/ugc-style.tsx) - Template estilo UGC (User Generated Content) com legendas animadas
- [templates/antes-depois.tsx](templates/antes-depois.tsx) - Template de transformação antes/depois
- [templates/lista-beneficios.tsx](templates/lista-beneficios.tsx) - Template de lista com benefícios animados

### Workflow completo

Para criar um criativo do zero:

1. **Briefing**: Defina produto, publico, dor, solucao, plataforma
2. **Copy**: Carregue `rules/copywriting.md` e gere variações de copy
3. **Formato**: Carregue `rules/plataformas.md` para specs da plataforma alvo
4. **Motion**: Carregue `rules/motion-design.md` para padrões de animação
5. **Build**: Use um template ou crie composição customizada em Remotion
6. **Render**: Renderize com `npx remotion render`

## Integração com outras skills

Esta skill funciona melhor quando combinada com:
- **remotion-best-practices**: Para domínio técnico do Remotion (animações, áudio, composições)
- **ui-ux-pro-max**: Para design visual avançado (paletas, tipografia, estilos)

### Exemplo de uso combinado

```
1. /criativo-trafego-pago → Define copy + estrutura do criativo
2. /remotion-best-practices → Implementa animações e composições corretas
3. /ui-ux-pro-max → Aplica design system profissional (cores, fontes, espaçamentos)
```

## Checklist de qualidade do criativo

Antes de finalizar qualquer criativo, verifique:

- [ ] Hook prende em < 3 segundos?
- [ ] Funciona sem som (legendas/texto na tela)?
- [ ] CTA claro e visivel?
- [ ] Formato correto para a plataforma alvo?
- [ ] Safe zones respeitadas (sem cortar texto)?
- [ ] Duracao adequada (15-30s para feed, 15-60s para Reels/TikTok)?
- [ ] Contraste de texto suficiente sobre fundo?
- [ ] Branding presente mas nao invasivo?
- [ ] Mobile-first (texto legivel em tela pequena)?
- [ ] Urgencia/escassez no CTA?
