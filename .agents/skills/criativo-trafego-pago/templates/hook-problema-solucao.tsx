/**
 * Template: Hook → Problema → Solução → CTA
 *
 * Estrutura clássica de criativo para tráfego pago.
 * Funciona para Meta Ads e TikTok Ads.
 *
 * Props:
 * - hook: Texto do hook (primeiros 3 segundos)
 * - problema: Texto da dor/problema
 * - solucao: Texto da solução
 * - cta: Texto do CTA
 * - produto: Nome do produto
 * - desconto: Texto do desconto (opcional)
 * - corPrimaria: Cor principal da marca
 * - corSecundaria: Cor secundária
 * - backgroundVideo: URL do vídeo de fundo (opcional)
 *
 * Uso:
 * <Composition
 *   id="criativo-hps"
 *   component={HookProblemaSolucao}
 *   width={1080}
 *   height={1920}
 *   fps={30}
 *   durationInFrames={900} // 30 segundos
 *   defaultProps={{
 *     hook: "Para tudo e olha isso",
 *     problema: "Voce ainda perde horas fazendo isso manualmente?",
 *     solucao: "Com o [Produto] voce resolve em 5 minutos",
 *     cta: "Link na bio - vagas limitadas",
 *     produto: "MeuProduto",
 *     corPrimaria: "#FF3366",
 *     corSecundaria: "#1a1a2e",
 *   }}
 * />
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';

interface Props {
  hook: string;
  problema: string;
  solucao: string;
  cta: string;
  produto: string;
  desconto?: string;
  corPrimaria: string;
  corSecundaria: string;
}

// ===== CENA 1: HOOK (0-3s) =====
const HookScene: React.FC<{ text: string; cor: string }> = ({ text, cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 8, stiffness: 300, mass: 0.4 } });
  const shake = frame < 10 ? Math.sin(frame * 2) * 5 : 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${cor}, ${cor}aa)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 64,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) translateX(${shake}px)`,
          fontSize: 72,
          fontWeight: 900,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.2,
          textShadow: '0 4px 30px rgba(0,0,0,0.5)',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ===== CENA 2: PROBLEMA (3-8s) =====
const ProblemaScene: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const y = interpolate(opacity, [0, 1], [60, 0]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #0a0a0a, #1a1a2e)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Emoji/icone de dor */}
      <div style={{ fontSize: 100, marginBottom: 32, opacity }}>
        😩
      </div>
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity,
          fontSize: 52,
          fontWeight: 700,
          color: '#cccccc',
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ===== CENA 3: SOLUCAO (8-15s) =====
const SolucaoScene: React.FC<{ text: string; produto: string; cor: string }> = ({
  text,
  produto,
  cor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const badgeScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 6, stiffness: 400, mass: 0.3 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0a0a0a, ${cor}33)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Badge do produto */}
      <div
        style={{
          transform: `scale(${Math.max(0, badgeScale)})`,
          background: cor,
          color: 'white',
          padding: '12px 32px',
          borderRadius: 50,
          fontSize: 28,
          fontWeight: 800,
          marginBottom: 40,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        {produto}
      </div>

      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
          fontSize: 48,
          fontWeight: 700,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {text}
      </div>

      {/* Checkmarks animados */}
      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {['Rapido', 'Facil', 'Garantido'].map((item, i) => {
          const itemProgress = spring({
            frame: frame - 30 - i * 8,
            fps,
            config: { damping: 12, stiffness: 200 },
          });
          return (
            <div
              key={item}
              style={{
                opacity: Math.max(0, itemProgress),
                transform: `translateX(${interpolate(Math.max(0, itemProgress), [0, 1], [-40, 0])}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 32,
                color: 'white',
              }}
            >
              <span style={{ color: '#00D4AA', fontSize: 36 }}>✓</span>
              {item}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ===== CENA 4: CTA (25-30s) =====
const CTAScene: React.FC<{ text: string; desconto?: string; cor: string }> = ({
  text,
  desconto,
  cor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 8, stiffness: 300, mass: 0.5 } });
  const pulse = Math.sin(frame * 0.15) * 0.03 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${cor}, ${cor}cc)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {desconto && (
        <div
          style={{
            transform: `scale(${scale}) rotate(-3deg)`,
            background: 'white',
            color: cor,
            padding: '16px 40px',
            borderRadius: 16,
            fontSize: 56,
            fontWeight: 900,
            marginBottom: 40,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          {desconto}
        </div>
      )}

      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.4,
          marginBottom: 48,
        }}
      >
        {text}
      </div>

      {/* Botao CTA pulsando */}
      <div
        style={{
          transform: `scale(${pulse})`,
          background: 'white',
          color: cor,
          padding: '20px 64px',
          borderRadius: 60,
          fontSize: 32,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: 1,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        SAIBA MAIS →
      </div>

      {/* Seta animada */}
      <div
        style={{
          marginTop: 24,
          transform: `translateY(${Math.sin(frame * 0.2) * 8}px)`,
          fontSize: 40,
          color: 'white',
          opacity: 0.8,
        }}
      >
        ↓
      </div>
    </AbsoluteFill>
  );
};

// ===== COMPOSICAO PRINCIPAL =====
export const HookProblemaSolucao: React.FC<Props> = ({
  hook,
  problema,
  solucao,
  cta,
  produto,
  desconto,
  corPrimaria,
  corSecundaria,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: corSecundaria }}>
      {/* Cena 1: Hook (0-3s) */}
      <Sequence from={0} durationInFrames={fps * 3}>
        <HookScene text={hook} cor={corPrimaria} />
      </Sequence>

      {/* Cena 2: Problema (3-8s) */}
      <Sequence from={fps * 3} durationInFrames={fps * 5}>
        <ProblemaScene text={problema} />
      </Sequence>

      {/* Cena 3: Solucao (8-20s) */}
      <Sequence from={fps * 8} durationInFrames={fps * 12}>
        <SolucaoScene text={solucao} produto={produto} cor={corPrimaria} />
      </Sequence>

      {/* Cena 4: CTA (20-30s) */}
      <Sequence from={fps * 20} durationInFrames={fps * 10}>
        <CTAScene text={cta} desconto={desconto} cor={corPrimaria} />
      </Sequence>
    </AbsoluteFill>
  );
};
