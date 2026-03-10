/**
 * Template: Lista de Beneficios Animados
 *
 * Criativo que apresenta beneficios um a um com animacoes de impacto.
 * Estilo "listicle" - muito eficaz em TikTok e Reels.
 *
 * Props:
 * - titulo: Headline do criativo (ex: "5 razoes para usar X")
 * - beneficios: Array de { texto, emoji } (3-5 itens ideal)
 * - ctaTexto: Texto do CTA
 * - produto: Nome do produto
 * - corPrimaria: Cor principal
 * - corFundo: Cor de fundo
 * - estilo: "contador" | "cards" | "minimal"
 *
 * Uso:
 * <Composition
 *   id="lista-beneficios"
 *   component={ListaBeneficios}
 *   width={1080}
 *   height={1920}
 *   fps={30}
 *   durationInFrames={900}
 *   defaultProps={{
 *     titulo: "5 motivos pra usar isso AGORA",
 *     beneficios: [
 *       { texto: "Economiza 3 horas por dia", emoji: "⏰" },
 *       { texto: "Resultado em 7 dias", emoji: "📈" },
 *       { texto: "Sem conhecimento tecnico", emoji: "🎯" },
 *       { texto: "Suporte 24h", emoji: "💬" },
 *       { texto: "Garantia de 30 dias", emoji: "🛡️" },
 *     ],
 *     ctaTexto: "Teste gratis por 7 dias",
 *     produto: "MeuApp",
 *     corPrimaria: "#6C63FF",
 *     corFundo: "#0a0a1a",
 *     estilo: "contador",
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

interface Beneficio {
  texto: string;
  emoji: string;
}

interface Props {
  titulo: string;
  beneficios: Beneficio[];
  ctaTexto: string;
  produto: string;
  corPrimaria: string;
  corFundo: string;
  estilo: 'contador' | 'cards' | 'minimal';
}

// ===== TITULO =====
const TituloScene: React.FC<{ texto: string; cor: string }> = ({ texto, cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 10, stiffness: 200 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${cor}22, ${cor}11)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          transform: `scale(${progress})`,
          fontSize: 60,
          fontWeight: 900,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.3,
          textTransform: 'uppercase',
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};

// ===== BENEFICIO ESTILO CONTADOR =====
const BeneficioContador: React.FC<{
  beneficio: Beneficio;
  numero: number;
  cor: string;
}> = ({ beneficio, numero, cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numScale = spring({ frame, fps, config: { damping: 6, stiffness: 400, mass: 0.3 } });
  const textProgress = spring({ frame: frame - 8, fps, config: { damping: 12, stiffness: 200 } });
  const emojiProgress = spring({ frame: frame - 15, fps, config: { damping: 8, stiffness: 300 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Numero grande */}
      <div
        style={{
          transform: `scale(${numScale})`,
          fontSize: 200,
          fontWeight: 900,
          color: cor,
          opacity: 0.15,
          position: 'absolute',
        }}
      >
        {numero}
      </div>

      {/* Emoji */}
      <div
        style={{
          transform: `scale(${Math.max(0, emojiProgress)})`,
          fontSize: 100,
          marginBottom: 24,
        }}
      >
        {beneficio.emoji}
      </div>

      {/* Numero pequeno + texto */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          opacity: Math.max(0, textProgress),
          transform: `translateY(${interpolate(Math.max(0, textProgress), [0, 1], [30, 0])}px)`,
        }}
      >
        <div
          style={{
            background: cor,
            color: 'white',
            width: 56,
            height: 56,
            borderRadius: 28,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 28,
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          {numero}
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.3,
          }}
        >
          {beneficio.texto}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ===== BENEFICIO ESTILO CARDS =====
const BeneficioCard: React.FC<{
  beneficio: Beneficio;
  numero: number;
  cor: string;
}> = ({ beneficio, numero, cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardProgress = spring({ frame, fps, config: { damping: 10, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 64 }}>
      <div
        style={{
          transform: `scale(${cardProgress}) rotate(${interpolate(cardProgress, [0, 1], [-5, 0])}deg)`,
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: 32,
          padding: '48px 40px',
          width: '100%',
          maxWidth: 900,
          border: `2px solid ${cor}44`,
          boxShadow: `0 20px 60px ${cor}22`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 64 }}>{beneficio.emoji}</div>
          <div
            style={{
              background: cor,
              color: 'white',
              padding: '6px 20px',
              borderRadius: 20,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            #{numero}
          </div>
        </div>
        <div style={{ fontSize: 44, fontWeight: 700, color: 'white', lineHeight: 1.4 }}>
          {beneficio.texto}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ===== BENEFICIO ESTILO MINIMAL =====
const BeneficioMinimal: React.FC<{
  beneficio: Beneficio;
  numero: number;
  cor: string;
}> = ({ beneficio, numero, cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = spring({ frame, fps, config: { damping: 20, stiffness: 150 } });
  const textProgress = spring({ frame: frame - 5, fps, config: { damping: 15, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      {/* Linha horizontal animada */}
      <div
        style={{
          width: `${interpolate(lineProgress, [0, 1], [0, 60])}%`,
          height: 3,
          background: cor,
          marginBottom: 40,
        }}
      />

      <div style={{ fontSize: 80, marginBottom: 16, opacity: Math.max(0, textProgress) }}>
        {beneficio.emoji}
      </div>

      <div
        style={{
          opacity: Math.max(0, textProgress),
          transform: `translateY(${interpolate(Math.max(0, textProgress), [0, 1], [20, 0])}px)`,
          fontSize: 48,
          fontWeight: 600,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {beneficio.texto}
      </div>

      {/* Indicador de progresso */}
      <div style={{ position: 'absolute', bottom: 200, display: 'flex', gap: 12 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            style={{
              width: i + 1 === numero ? 32 : 12,
              height: 12,
              borderRadius: 6,
              background: i + 1 === numero ? cor : 'rgba(255,255,255,0.2)',
              transition: 'width 0.3s',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ===== RESUMO FINAL =====
const ResumoScene: React.FC<{
  beneficios: Beneficio[];
  produto: string;
  cor: string;
}> = ({ beneficios, produto, cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 64 }}>
      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: cor,
          textTransform: 'uppercase',
          letterSpacing: 2,
          marginBottom: 32,
        }}
      >
        {produto}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 800 }}>
        {beneficios.map((b, i) => {
          const itemProgress = spring({
            frame: frame - i * 6,
            fps,
            config: { damping: 12, stiffness: 200 },
          });
          return (
            <div
              key={i}
              style={{
                opacity: Math.max(0, itemProgress),
                transform: `translateX(${interpolate(Math.max(0, itemProgress), [0, 1], [-30, 0])}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 30,
                color: 'white',
              }}
            >
              <span style={{ fontSize: 28 }}>{b.emoji}</span>
              <span style={{ fontWeight: 600 }}>{b.texto}</span>
            </div>
          );
        })}
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
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <div
        style={{
          transform: `scale(${scale * pulse})`,
          background: `linear-gradient(135deg, ${cor}, ${cor}dd)`,
          color: 'white',
          padding: '28px 56px',
          borderRadius: 24,
          fontSize: 44,
          fontWeight: 800,
          textAlign: 'center',
          boxShadow: `0 12px 40px ${cor}66`,
        }}
      >
        {texto}
      </div>

      <div
        style={{
          marginTop: 28,
          transform: `translateY(${Math.sin(frame * 0.2) * 8}px)`,
          fontSize: 44,
          color: 'white',
          opacity: 0.7,
        }}
      >
        👇
      </div>
    </AbsoluteFill>
  );
};

// ===== COMPOSICAO PRINCIPAL =====
export const ListaBeneficios: React.FC<Props> = ({
  titulo,
  beneficios,
  ctaTexto,
  produto,
  corPrimaria,
  corFundo,
  estilo,
}) => {
  const { fps } = useVideoConfig();
  const beneficioSeconds = 4;
  const beneficioFrames = fps * beneficioSeconds;

  const BeneficioComponent =
    estilo === 'cards'
      ? BeneficioCard
      : estilo === 'minimal'
        ? BeneficioMinimal
        : BeneficioContador;

  return (
    <AbsoluteFill style={{ background: corFundo }}>
      {/* Titulo (0-3s) */}
      <Sequence from={0} durationInFrames={fps * 3}>
        <TituloScene texto={titulo} cor={corPrimaria} />
      </Sequence>

      {/* Beneficios (3s + 4s cada) */}
      {beneficios.map((beneficio, i) => (
        <Sequence
          key={i}
          from={fps * 3 + i * beneficioFrames}
          durationInFrames={beneficioFrames}
        >
          <BeneficioComponent beneficio={beneficio} numero={i + 1} cor={corPrimaria} />
        </Sequence>
      ))}

      {/* Resumo (apos todos os beneficios, 3s) */}
      <Sequence
        from={fps * 3 + beneficios.length * beneficioFrames}
        durationInFrames={fps * 3}
      >
        <ResumoScene beneficios={beneficios} produto={produto} cor={corPrimaria} />
      </Sequence>

      {/* CTA (ultimos 4s) */}
      <Sequence
        from={fps * 3 + beneficios.length * beneficioFrames + fps * 3}
        durationInFrames={fps * 4}
      >
        <CTAScene texto={ctaTexto} cor={corPrimaria} />
      </Sequence>
    </AbsoluteFill>
  );
};
