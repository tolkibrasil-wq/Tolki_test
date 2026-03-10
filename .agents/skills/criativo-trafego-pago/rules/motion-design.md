# Motion Design para Conversao com Remotion

## Principios de Motion para Ads

### 1. Hierarquia de Movimento
O olho segue o movimento. Use isso para guiar a atencao:

```
Prioridade 1: Hook visual (maior movimento, primeira coisa que aparece)
Prioridade 2: Texto/mensagem principal
Prioridade 3: Elementos de suporte (icones, badges, provas)
Prioridade 4: CTA (ultimo, mas com movimento que chama atencao)
```

### 2. Ritmo e Timing

| Momento | Frames (30fps) | Segundos | O que acontece |
|---------|----------------|----------|----------------|
| Hook | 0-90 | 0-3s | Impacto visual maximo |
| Problema | 90-240 | 3-8s | Identificacao com a dor |
| Solucao | 240-450 | 8-15s | Apresentacao do produto |
| Prova | 450-750 | 15-25s | Depoimentos, resultados |
| CTA | 750-900 | 25-30s | Chamada para acao |

### 3. Velocidade das Transicoes

```tsx
// Rapido (hooks, transicoes entre cenas): 8-12 frames
const FAST = 10; // ~0.33s

// Medio (entrada de texto, elementos): 15-20 frames
const MEDIUM = 18; // ~0.6s

// Suave (fade, elementos de fundo): 25-30 frames
const SMOOTH = 25; // ~0.83s
```

---

## Padroes de Animacao para Ads

### Entrada de Texto (Text Reveals)

```tsx
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

// Slide Up com Spring (mais natural)
export const TextSlideUp: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });

  return (
    <div
      style={{
        transform: `translateY(${interpolate(progress, [0, 1], [80, 0])}px)`,
        opacity: progress,
        fontSize: 64,
        fontWeight: 'bold',
        color: 'white',
        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}
    >
      {text}
    </div>
  );
};

// Typewriter (bom para hooks)
export const Typewriter: React.FC<{ text: string; speed?: number }> = ({ text, speed = 2 }) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.floor(frame / speed);
  const displayText = text.slice(0, charsToShow);

  return (
    <div style={{ fontSize: 56, fontWeight: 'bold', color: 'white', fontFamily: 'monospace' }}>
      {displayText}
      {charsToShow < text.length && (
        <span style={{ opacity: frame % 10 < 5 ? 1 : 0 }}>|</span>
      )}
    </div>
  );
};

// Scale Pop (impacto)
export const ScalePop: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.4 },
  });

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
      {children}
    </div>
  );
};
```

### Transicoes entre Cenas

```tsx
// Swipe Horizontal (Instagram-like)
export const SwipeTransition: React.FC<{
  children: React.ReactNode;
  direction?: 'left' | 'right';
  startFrame: number;
  duration?: number;
}> = ({ children, direction = 'left', startFrame, duration = 10 }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  const offset = direction === 'left' ? width : -width;
  const translateX = interpolate(progress, [0, 1], [offset, 0]);

  return (
    <div style={{ transform: `translateX(${translateX}px)`, position: 'absolute', inset: 0 }}>
      {children}
    </div>
  );
};

// Zoom In Transition
export const ZoomTransition: React.FC<{
  children: React.ReactNode;
  startFrame: number;
}> = ({ children, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  return (
    <div
      style={{
        transform: `scale(${interpolate(progress, [0, 1], [3, 1])})`,
        opacity: progress,
        position: 'absolute',
        inset: 0,
      }}
    >
      {children}
    </div>
  );
};

// Glitch Effect (TikTok style)
export const GlitchReveal: React.FC<{ children: React.ReactNode; triggerFrame: number }> = ({
  children,
  triggerFrame,
}) => {
  const frame = useCurrentFrame();
  const glitchActive = frame >= triggerFrame && frame < triggerFrame + 6;

  return (
    <div style={{ position: 'relative' }}>
      {glitchActive && (
        <>
          <div style={{ position: 'absolute', left: frame % 3 * 4, color: 'cyan', mixBlendMode: 'screen' }}>
            {children}
          </div>
          <div style={{ position: 'absolute', left: -(frame % 3 * 4), color: 'red', mixBlendMode: 'screen' }}>
            {children}
          </div>
        </>
      )}
      <div style={{ opacity: glitchActive ? 0.8 : 1 }}>{children}</div>
    </div>
  );
};
```

### Elementos de UI para Ads

```tsx
// Badge de Desconto
export const DiscountBadge: React.FC<{ value: string; delay?: number }> = ({ value, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 6, stiffness: 400, mass: 0.3 },
  });

  const rotate = interpolate(scale, [0, 0.5, 1], [-15, 5, 0]);

  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        background: 'linear-gradient(135deg, #FF3366, #FF6B35)',
        color: 'white',
        padding: '16px 32px',
        borderRadius: 16,
        fontSize: 48,
        fontWeight: 900,
        boxShadow: '0 8px 32px rgba(255,51,102,0.4)',
      }}
    >
      {value}
    </div>
  );
};

// Contador Regressivo
export const Countdown: React.FC<{ from: number; startFrame: number }> = ({ from, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - startFrame);
  const secondsLeft = Math.max(0, from - Math.floor(elapsed / fps));

  const pulse = spring({
    frame: elapsed % fps,
    fps,
    config: { damping: 5, stiffness: 300 },
  });

  return (
    <div
      style={{
        fontSize: 120,
        fontWeight: 900,
        color: secondsLeft <= 3 ? '#FF3366' : 'white',
        transform: `scale(${interpolate(pulse, [0, 1], [1, 1.1])})`,
        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}
    >
      {secondsLeft}
    </div>
  );
};

// Barra de Progresso animada
export const ProgressBar: React.FC<{
  progress: number;
  color?: string;
  delay?: number;
}> = ({ progress, color = '#00D4AA', delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <div style={{ width: '80%', height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.2)' }}>
      <div
        style={{
          width: `${interpolate(width, [0, 1], [0, progress])}%`,
          height: '100%',
          borderRadius: 6,
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          boxShadow: `0 0 20px ${color}66`,
        }}
      />
    </div>
  );
};
```

---

## Padroes de Legendas para Ads

```tsx
// Legenda estilo TikTok/Reels (palavra por palavra com highlight)
export const CaptionHighlight: React.FC<{
  words: Array<{ text: string; startFrame: number; endFrame: number; highlight?: boolean }>;
}> = ({ words }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 400,
        left: 64,
        right: 64,
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      {words
        .filter((w) => frame >= w.startFrame && frame <= w.endFrame)
        .map((word, i) => (
          <span
            key={i}
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: word.highlight ? '#FFD700' : 'white',
              background: word.highlight ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.6)',
              padding: '4px 12px',
              borderRadius: 8,
              textTransform: 'uppercase',
            }}
          >
            {word.text}
          </span>
        ))}
    </div>
  );
};
```

---

## Efeitos de Fundo

```tsx
// Gradiente animado (fundo de texto)
export const AnimatedGradient: React.FC = () => {
  const frame = useCurrentFrame();
  const hue = interpolate(frame, [0, 300], [0, 360]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(${45 + frame * 0.5}deg,
          hsl(${hue}, 80%, 20%),
          hsl(${hue + 60}, 80%, 15%),
          hsl(${hue + 120}, 80%, 10%)
        )`,
      }}
    />
  );
};

// Particulas flutuantes (background sutil)
export const FloatingParticles: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  const particles = Array.from({ length: count }, (_, i) => ({
    x: (i * 137.508) % 100,
    speed: 0.5 + (i % 3) * 0.3,
    size: 3 + (i % 4) * 2,
    opacity: 0.1 + (i % 5) * 0.05,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${((frame * p.speed) % (height + 20)) - 10}px`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  );
};
```

---

## Regras de Ouro do Motion para Ads

1. **Nao anime tudo ao mesmo tempo** - Use delays escalonados (stagger)
2. **Spring > Linear** - Animacoes com spring parecem mais naturais
3. **Menos e mais** - 2-3 animacoes por cena, nao 10
4. **Consistencia** - Use a mesma easing/spring config em todo o video
5. **Performance** - Evite blur e sombras pesadas em excesso
6. **Legibilidade** - Texto deve estar legivel durante TODA a animacao
7. **Pause no CTA** - Segure o CTA por 3-5 segundos sem animacao
8. **Loop suave** - Ultimo frame deve conectar com o primeiro quando possivel
9. **Cortes secos para energia** - Nem tudo precisa de transicao suave
10. **Teste em mobile** - Visualize em tela pequena antes de finalizar
