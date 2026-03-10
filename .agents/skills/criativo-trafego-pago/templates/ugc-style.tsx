/**
 * Template: UGC Style (User Generated Content)
 *
 * Criativo estilo "pessoa real falando pra camera" com legendas animadas.
 * Ideal para TikTok Ads e Instagram Reels.
 * Performance superior em campanhas de conversao.
 *
 * Props:
 * - legendas: Array de legendas com timing
 * - ctaTexto: Texto do CTA final
 * - corDestaque: Cor para palavras destacadas
 * - corFundo: Cor de fundo das legendas
 * - videoSrc: Caminho do video UGC de fundo
 * - nomePerfil: Nome do "perfil" fake (estilo TikTok)
 * - descricaoPost: Descricao do post fake
 *
 * Uso:
 * <Composition
 *   id="ugc-criativo"
 *   component={UGCStyle}
 *   width={1080}
 *   height={1920}
 *   fps={30}
 *   durationInFrames={810} // 27 segundos
 *   defaultProps={{
 *     legendas: [
 *       { texto: "Gente, eu PRECISO contar isso", inicio: 0, fim: 60, destaque: ["PRECISO"] },
 *       { texto: "Eu tava gastando HORAS fazendo isso", inicio: 60, fim: 120, destaque: ["HORAS"] },
 *       { texto: "Ate que descobri esse app", inicio: 120, fim: 180, destaque: ["esse app"] },
 *     ],
 *     ctaTexto: "Link na bio",
 *     corDestaque: "#FFD700",
 *     corFundo: "rgba(0,0,0,0.75)",
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
  OffthreadVideo,
} from 'remotion';

interface Legenda {
  texto: string;
  inicio: number; // frame de inicio
  fim: number; // frame de fim
  destaque?: string[]; // palavras para destacar
}

interface Props {
  legendas: Legenda[];
  ctaTexto: string;
  corDestaque: string;
  corFundo: string;
  videoSrc?: string;
  nomePerfil?: string;
  descricaoPost?: string;
}

// ===== LEGENDA ANIMADA ESTILO TIKTOK =====
const LegendaAnimada: React.FC<{
  legenda: Legenda;
  corDestaque: string;
  corFundo: string;
}> = ({ legenda, corDestaque, corFundo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });

  const palavras = legenda.texto.split(' ');

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 500,
        left: 44,
        right: 44,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        transform: `translateY(${interpolate(entryProgress, [0, 1], [30, 0])}px)`,
        opacity: entryProgress,
      }}
    >
      {palavras.map((palavra, i) => {
        const isDestaque = legenda.destaque?.some((d) =>
          palavra.toLowerCase().includes(d.toLowerCase())
        );

        const wordDelay = i * 2;
        const wordProgress = spring({
          frame: frame - wordDelay,
          fps,
          config: { damping: 10, stiffness: 250 },
        });

        return (
          <span
            key={i}
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: isDestaque ? corDestaque : 'white',
              background: corFundo,
              padding: '6px 14px',
              borderRadius: 8,
              opacity: Math.max(0, wordProgress),
              transform: `scale(${interpolate(Math.max(0, wordProgress), [0, 1], [0.8, isDestaque ? 1.1 : 1])})`,
              textTransform: 'uppercase',
            }}
          >
            {palavra}
          </span>
        );
      })}
    </div>
  );
};

// ===== UI FAKE TIKTOK =====
const TikTokUI: React.FC<{
  nomePerfil?: string;
  descricaoPost?: string;
}> = ({ nomePerfil = '@usuario', descricaoPost = 'Voce precisa ver isso 👀' }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Perfil e descricao (bottom-left) */}
      <div
        style={{
          position: 'absolute',
          bottom: 160,
          left: 20,
          right: 120,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 8 }}>
          {nomePerfil}
        </div>
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.9)', lineHeight: 1.3 }}>
          {descricaoPost}
        </div>
      </div>

      {/* Botoes laterais fake (right side) */}
      <div
        style={{
          position: 'absolute',
          right: 16,
          bottom: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          zIndex: 10,
        }}
      >
        {[
          { icon: '❤️', count: '24.5K' },
          { icon: '💬', count: '1,203' },
          { icon: '↗️', count: '4,521' },
        ].map(({ icon, count }, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36 }}>{icon}</div>
            <div style={{ fontSize: 18, color: 'white', fontWeight: 600, marginTop: 4 }}>
              {count}
            </div>
          </div>
        ))}
      </div>

      {/* Musica rodando (bottom) */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 20, color: 'white' }}>🎵</span>
        <div
          style={{
            fontSize: 20,
            color: 'white',
            overflow: 'hidden',
            width: 200,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              transform: `translateX(${-frame * 1.5}px)`,
            }}
          >
            som original - {nomePerfil} &nbsp;&nbsp;&nbsp; som original - {nomePerfil}
          </span>
        </div>
      </div>
    </>
  );
};

// ===== CTA FINAL =====
const CTAFinal: React.FC<{ texto: string; corDestaque: string }> = ({ texto, corDestaque }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 8, stiffness: 300 } });
  const pulse = Math.sin(frame * 0.15) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        background: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          transform: `scale(${scale * pulse})`,
          fontSize: 64,
          fontWeight: 900,
          color: 'white',
          textAlign: 'center',
          padding: '24px 48px',
          background: corDestaque,
          borderRadius: 20,
          boxShadow: `0 8px 40px ${corDestaque}66`,
        }}
      >
        {texto}
      </div>

      <div
        style={{
          marginTop: 32,
          transform: `translateY(${Math.sin(frame * 0.2) * 10}px)`,
          fontSize: 48,
          color: 'white',
        }}
      >
        👇
      </div>
    </AbsoluteFill>
  );
};

// ===== COMPOSICAO PRINCIPAL =====
export const UGCStyle: React.FC<Props> = ({
  legendas,
  ctaTexto,
  corDestaque,
  corFundo,
  videoSrc,
  nomePerfil,
  descricaoPost,
}) => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {/* Video de fundo UGC */}
      {videoSrc && (
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </AbsoluteFill>
      )}

      {/* Placeholder se nao tiver video */}
      {!videoSrc && (
        <AbsoluteFill
          style={{
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 200, opacity: 0.3 }}>📱</div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.3)', marginTop: 20 }}>
            Substitua por seu video UGC
          </div>
        </AbsoluteFill>
      )}

      {/* UI fake do TikTok */}
      <TikTokUI nomePerfil={nomePerfil} descricaoPost={descricaoPost} />

      {/* Legendas */}
      {legendas.map((legenda, i) => (
        <Sequence key={i} from={legenda.inicio} durationInFrames={legenda.fim - legenda.inicio}>
          <LegendaAnimada legenda={legenda} corDestaque={corDestaque} corFundo={corFundo} />
        </Sequence>
      ))}

      {/* CTA final (ultimos 4 segundos) */}
      <Sequence from={durationInFrames - fps * 4} durationInFrames={fps * 4}>
        <CTAFinal texto={ctaTexto} corDestaque={corDestaque} />
      </Sequence>
    </AbsoluteFill>
  );
};
