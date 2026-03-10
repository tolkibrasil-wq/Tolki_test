/**
 * Template: Antes vs Depois (Transformacao)
 *
 * Criativo de transformacao com split screen ou transicao.
 * Ideal para: fitness, educacao, SaaS, beleza, resultados.
 *
 * Props:
 * - titulo: Headline do criativo
 * - antes: { texto, emoji, itens[] } - Estado antes
 * - depois: { texto, emoji, itens[] } - Estado depois
 * - ponte: Texto conectando antes→depois (ex: "Com [Produto]...")
 * - ctaTexto: Texto do CTA
 * - corAntes: Cor do "antes" (geralmente negativa)
 * - corDepois: Cor do "depois" (geralmente positiva)
 * - corCTA: Cor do botao CTA
 *
 * Uso:
 * <Composition
 *   id="antes-depois"
 *   component={AntesDepois}
 *   width={1080}
 *   height={1920}
 *   fps={30}
 *   durationInFrames={900}
 *   defaultProps={{
 *     titulo: "Sua rotina ANTES vs DEPOIS",
 *     antes: {
 *       texto: "ANTES",
 *       emoji: "😫",
 *       itens: ["Perdia 3 horas por dia", "Estressado", "Sem resultado"],
 *     },
 *     depois: {
 *       texto: "DEPOIS",
 *       emoji: "🚀",
 *       itens: ["15 minutos e pronto", "Tranquilo", "Resultado garantido"],
 *     },
 *     ponte: "Com o AppX tudo mudou",
 *     ctaTexto: "Comece agora - Link na bio",
 *     corAntes: "#FF3366",
 *     corDepois: "#00D4AA",
 *     corCTA: "#FF6B35",
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

interface LadoProps {
  texto: string;
  emoji: string;
  itens: string[];
}

interface Props {
  titulo: string;
  antes: LadoProps;
  depois: LadoProps;
  ponte: string;
  ctaTexto: string;
  corAntes: string;
  corDepois: string;
  corCTA: string;
}

// ===== TITULO INICIAL =====
const TituloScene: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 10, stiffness: 200 } });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          transform: `scale(${progress})`,
          fontSize: 64,
          fontWeight: 900,
          color: 'white',
          textAlign: 'center',
          textTransform: 'uppercase',
          lineHeight: 1.3,
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};

// ===== LADO (ANTES ou DEPOIS) =====
const LadoScene: React.FC<{
  lado: LadoProps;
  cor: string;
  isAntes: boolean;
}> = ({ lado, cor, isAntes }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { damping: 12, stiffness: 250 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${cor}22, ${cor}11)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Emoji grande */}
      <div
        style={{
          fontSize: 120,
          transform: `scale(${headerProgress})`,
          marginBottom: 24,
        }}
      >
        {lado.emoji}
      </div>

      {/* Label ANTES/DEPOIS */}
      <div
        style={{
          background: cor,
          color: 'white',
          padding: '12px 48px',
          borderRadius: 50,
          fontSize: 36,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: 4,
          marginBottom: 48,
          opacity: headerProgress,
          boxShadow: `0 4px 20px ${cor}66`,
        }}
      >
        {lado.texto}
      </div>

      {/* Lista de itens */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 800 }}>
        {lado.itens.map((item, i) => {
          const itemProgress = spring({
            frame: frame - 15 - i * 10,
            fps,
            config: { damping: 12, stiffness: 200 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: Math.max(0, itemProgress),
                transform: `translateX(${interpolate(Math.max(0, itemProgress), [0, 1], [isAntes ? -60 : 60, 0])}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: 'rgba(255,255,255,0.08)',
                padding: '16px 24px',
                borderRadius: 16,
                borderLeft: `4px solid ${cor}`,
              }}
            >
              <span style={{ fontSize: 32, color: cor }}>{isAntes ? '✗' : '✓'}</span>
              <span style={{ fontSize: 36, color: 'white', fontWeight: 600 }}>{item}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ===== TRANSICAO SPLIT =====
const SplitTransition: React.FC<{
  antes: LadoProps;
  depois: LadoProps;
  corAntes: string;
  corDepois: string;
}> = ({ antes, depois, corAntes, corDepois }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const splitProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const splitY = interpolate(splitProgress, [0, 1], [height, height / 2]);

  return (
    <AbsoluteFill>
      {/* Lado ANTES (top) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: splitY,
          background: `linear-gradient(180deg, ${corAntes}33, ${corAntes}11)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 8 }}>{antes.emoji}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: corAntes }}>{antes.texto}</div>
      </div>

      {/* Divisor */}
      <div
        style={{
          position: 'absolute',
          top: splitY - 3,
          left: 0,
          right: 0,
          height: 6,
          background: 'white',
          boxShadow: '0 0 20px rgba(255,255,255,0.5)',
          zIndex: 5,
        }}
      />

      {/* Lado DEPOIS (bottom) */}
      <div
        style={{
          position: 'absolute',
          top: splitY,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, ${corDepois}11, ${corDepois}33)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 8 }}>{depois.emoji}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: corDepois }}>{depois.texto}</div>
      </div>

      {/* Label VS */}
      <div
        style={{
          position: 'absolute',
          top: splitY - 32,
          left: '50%',
          transform: `translateX(-50%) scale(${splitProgress})`,
          background: 'white',
          color: '#0a0a0a',
          width: 64,
          height: 64,
          borderRadius: 32,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 24,
          fontWeight: 900,
          zIndex: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        VS
      </div>
    </AbsoluteFill>
  );
};

// ===== PONTE (TRANSICAO) =====
const PonteScene: React.FC<{ texto: string; cor: string }> = ({ texto, cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 8, stiffness: 200 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${cor}, ${cor}dd)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          transform: `scale(${progress})`,
          fontSize: 56,
          fontWeight: 800,
          color: 'white',
          textAlign: 'center',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};

// ===== CTA =====
const CTAScene: React.FC<{ texto: string; cor: string }> = ({ texto, cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 8, stiffness: 300 } });
  const pulse = Math.sin(frame * 0.15) * 0.04 + 1;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          transform: `scale(${scale * pulse})`,
          background: cor,
          color: 'white',
          padding: '24px 56px',
          borderRadius: 20,
          fontSize: 44,
          fontWeight: 800,
          textAlign: 'center',
          boxShadow: `0 8px 40px ${cor}66`,
        }}
      >
        {texto}
      </div>

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
export const AntesDepois: React.FC<Props> = ({
  titulo,
  antes,
  depois,
  ponte,
  ctaTexto,
  corAntes,
  corDepois,
  corCTA,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#0a0a0a' }}>
      {/* Titulo (0-3s) */}
      <Sequence from={0} durationInFrames={fps * 3}>
        <TituloScene texto={titulo} />
      </Sequence>

      {/* ANTES (3-10s) */}
      <Sequence from={fps * 3} durationInFrames={fps * 7}>
        <LadoScene lado={antes} cor={corAntes} isAntes />
      </Sequence>

      {/* DEPOIS (10-17s) */}
      <Sequence from={fps * 10} durationInFrames={fps * 7}>
        <LadoScene lado={depois} cor={corDepois} isAntes={false} />
      </Sequence>

      {/* Split Side by Side (17-22s) */}
      <Sequence from={fps * 17} durationInFrames={fps * 5}>
        <SplitTransition antes={antes} depois={depois} corAntes={corAntes} corDepois={corDepois} />
      </Sequence>

      {/* Ponte (22-25s) */}
      <Sequence from={fps * 22} durationInFrames={fps * 3}>
        <PonteScene texto={ponte} cor={corDepois} />
      </Sequence>

      {/* CTA (25-30s) */}
      <Sequence from={fps * 25} durationInFrames={fps * 5}>
        <CTAScene texto={ctaTexto} cor={corCTA} />
      </Sequence>
    </AbsoluteFill>
  );
};
