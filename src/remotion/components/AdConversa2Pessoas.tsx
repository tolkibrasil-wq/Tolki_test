import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// ==========================================
// TYPES
// ==========================================

interface Fala {
  pessoa: 1 | 2;
  texto: string;
  duracao: number; // em frames
  destaques?: string[]; // palavras para highlight
  isHook?: boolean;
}

interface AdConversa2PessoasProps {
  roteiro: Fala[];
  hookTexto: string;
  ctaTexto: string;
  ctaSubtexto?: string;
  pessoa1Nome?: string;
  pessoa2Nome?: string;
  corPrimaria?: string;
  corSecundaria?: string;
  corDestaque?: string;
  corHook?: string;
}

// ==========================================
// DESIGN TOKENS (Tolki brand)
// ==========================================
const FONTS = {
  heading: "Outfit, sans-serif",
  body: "DM Sans, sans-serif",
};

const COLORS = {
  bg: "#0a0a1a",
  bgGradient: "linear-gradient(180deg, #0a0a1a 0%, #12082a 50%, #0a0a1a 100%)",
  person1: "#7C3AED",
  person2: "#3B82F6",
  highlight: "#FFD700",
  hookBg: "#FF3366",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.5)",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};

// ==========================================
// SAFE ZONES OVERLAY (dev helper - transparent in prod)
// ==========================================
const SafeZones: React.FC = () => (
  <>
    {/* Top safe zone - 250px for Stories/Reels UI */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 150,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
    {/* Bottom safe zone - 340px for CTA button + controls */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  </>
);

// ==========================================
// BACKGROUND (animated subtle grid + glow)
// ==========================================
const Background: React.FC<{ corPrimaria: string; corSecundaria: string }> = ({
  corPrimaria,
  corSecundaria,
}) => {
  const frame = useCurrentFrame();
  const breathe = Math.sin(frame * 0.02) * 0.03 + 0.1;

  return (
    <AbsoluteFill>
      {/* Base gradient */}
      <div style={{ position: "absolute", inset: 0, background: COLORS.bgGradient }} />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: corPrimaria,
          filter: "blur(120px)",
          opacity: breathe,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          right: "15%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: corSecundaria,
          filter: "blur(120px)",
          opacity: breathe * 0.8,
        }}
      />
    </AbsoluteFill>
  );
};

// ==========================================
// HOOK SCENE (primeiros 3 segundos)
// ==========================================
const HookScene: React.FC<{ texto: string; cor: string }> = ({ texto, cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.4 },
  });

  const shake = frame < 8 ? Math.sin(frame * 3) * 4 : 0;

  // Flicker effect for attention
  const flicker = frame < 4 ? (frame % 2 === 0 ? 1 : 0.7) : 1;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 64,
      }}
    >
      {/* Glow burst */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${cor}44, transparent 70%)`,
          filter: "blur(60px)",
          opacity: interpolate(frame, [0, 15, 30], [0, 0.8, 0.3], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Hook badge */}
      <div
        style={{
          transform: `scale(${scale * flicker}) translateX(${shake}px)`,
          background: `linear-gradient(135deg, ${cor}, ${cor}cc)`,
          borderRadius: 24,
          padding: "32px 48px",
          maxWidth: 900,
          boxShadow: `0 20px 60px ${cor}44`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            fontFamily: FONTS.heading,
            color: "rgba(255,255,255,0.7)",
            textTransform: "uppercase",
            letterSpacing: 3,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          🔥 HOOK
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            color: COLORS.text,
            textAlign: "center",
            lineHeight: 1.2,
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {texto}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SPEAKER INDICATOR
// ==========================================
const SpeakerIndicator: React.FC<{
  pessoa: 1 | 2;
  nome: string;
  cor: string;
  isActive: boolean;
}> = ({ pessoa, nome, cor, isActive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const pulse = isActive ? Math.sin(frame * 0.2) * 0.05 + 1 : 1;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity: entryScale,
        transform: `scale(${entryScale * pulse})`,
      }}
    >
      {/* Avatar circle */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${cor}, ${cor}aa)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 24,
          fontWeight: 800,
          fontFamily: FONTS.heading,
          color: "white",
          boxShadow: isActive ? `0 0 20px ${cor}66` : "none",
          border: `3px solid ${isActive ? "white" : "transparent"}`,
        }}
      >
        P{pessoa}
      </div>

      <div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            fontFamily: FONTS.heading,
            color: COLORS.text,
          }}
        >
          {nome}
        </div>
        {isActive && (
          <div
            style={{
              fontSize: 14,
              color: cor,
              fontFamily: FONTS.body,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: cor,
                display: "inline-block",
                opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0.3,
              }}
            />
            falando
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// FALA ANIMADA (legendas estilo TikTok)
// ==========================================
const FalaAnimada: React.FC<{
  fala: Fala;
  corPessoa: string;
  corDestaque: string;
  nomePessoa: string;
}> = ({ fala, corPessoa, corDestaque, nomePessoa }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });

  // Split text into words for animated reveal
  const palavras = fala.texto.split(" ");
  const wordsPerSecond = 4;
  const framesPerWord = Math.floor(fps / wordsPerSecond);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 44px" }}>
      {/* Speaker indicator at top */}
      <div style={{ position: "absolute", top: 180, left: 44, right: 44 }}>
        <SpeakerIndicator
          pessoa={fala.pessoa}
          nome={nomePessoa}
          cor={corPessoa}
          isActive
        />
      </div>

      {/* Audio waveform visual (fake) */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 44,
          right: 44,
          display: "flex",
          justifyContent: "center",
          gap: 4,
          height: 40,
          alignItems: "center",
        }}
      >
        {Array.from({ length: 30 }, (_, i) => {
          const h = Math.abs(Math.sin(frame * 0.15 + i * 0.5)) * 24 + 4;
          return (
            <div
              key={i}
              style={{
                width: 4,
                height: h,
                borderRadius: 2,
                background: `${corPessoa}${Math.floor(40 + Math.abs(Math.sin(i)) * 40).toString(16)}`,
              }}
            />
          );
        })}
      </div>

      {/* Caption area */}
      <div
        style={{
          marginBottom: 400,
          opacity: entryProgress,
          transform: `translateY(${interpolate(entryProgress, [0, 1], [20, 0])}px)`,
        }}
      >
        {/* Speech bubble */}
        <div
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(20px)",
            borderRadius: 24,
            padding: "28px 32px",
            border: `2px solid ${corPessoa}33`,
            position: "relative",
          }}
        >
          {/* Colored top accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 24,
              right: 24,
              height: 3,
              borderRadius: "0 0 3px 3px",
              background: `linear-gradient(90deg, ${corPessoa}, transparent)`,
            }}
          />

          {/* Text with word-by-word reveal */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 8px",
              justifyContent: "flex-start",
            }}
          >
            {palavras.map((palavra, i) => {
              const wordFrame = i * framesPerWord;
              const isVisible = frame >= wordFrame;
              const isNew = frame >= wordFrame && frame < wordFrame + framesPerWord;

              const isDestaque = fala.destaques?.some(
                (d) => palavra.toLowerCase().replace(/[.,!?]/g, "").includes(d.toLowerCase())
              );

              // Check if it's a number/value
              const isNumero = /R?\$?\s?\d/.test(palavra);

              const wordSpring = spring({
                frame: Math.max(0, frame - wordFrame),
                fps,
                config: { damping: 10, stiffness: 250 },
              });

              if (!isVisible) return null;

              return (
                <span
                  key={i}
                  style={{
                    fontSize: 44,
                    fontWeight: isDestaque || isNumero ? 900 : 700,
                    fontFamily: FONTS.heading,
                    color: isDestaque
                      ? corDestaque
                      : isNumero
                        ? "#00D4AA"
                        : COLORS.text,
                    opacity: interpolate(wordSpring, [0, 1], [0.3, 1]),
                    transform: `scale(${isNew ? interpolate(wordSpring, [0, 1], [1.15, 1]) : 1})`,
                    display: "inline-block",
                    textShadow: isDestaque || isNumero ? `0 0 20px ${isDestaque ? corDestaque : "#00D4AA"}44` : "none",
                    background: isNew && (isDestaque || isNumero)
                      ? `${isDestaque ? corDestaque : "#00D4AA"}22`
                      : "transparent",
                    borderRadius: 6,
                    padding: isNew && (isDestaque || isNumero) ? "2px 6px" : "0",
                  }}
                >
                  {palavra}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// CTA SCENE
// ==========================================
const CTAScene: React.FC<{
  texto: string;
  subtexto?: string;
  corPrimaria: string;
}> = ({ texto, subtexto, corPrimaria }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.5 },
  });

  const pulse = Math.sin(frame * 0.12) * 0.04 + 1;

  const arrowBounce = Math.sin(frame * 0.2) * 12;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 64,
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${corPrimaria}33, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Tolki logo */}
      <div
        style={{
          opacity: interpolate(scale, [0, 1], [0, 0.6]),
          fontSize: 28,
          fontWeight: 800,
          fontFamily: FONTS.heading,
          background: `linear-gradient(135deg, ${corPrimaria}, #06B6D4)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: 32,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Tolki
      </div>

      {/* Main CTA card */}
      <div
        style={{
          transform: `scale(${scale * pulse})`,
          background: `linear-gradient(135deg, ${corPrimaria}, ${corPrimaria}cc)`,
          borderRadius: 28,
          padding: "36px 56px",
          maxWidth: 850,
          textAlign: "center",
          boxShadow: `0 20px 80px ${corPrimaria}55`,
        }}
      >
        <div
          style={{
            fontSize: 46,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            color: COLORS.text,
            lineHeight: 1.3,
          }}
        >
          {texto}
        </div>
      </div>

      {/* Subtexto */}
      {subtexto && (
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            fontWeight: 600,
            fontFamily: FONTS.body,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            opacity: interpolate(frame, [10, 25], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }),
          }}
        >
          {subtexto}
        </div>
      )}

      {/* Arrow pointing down */}
      <div
        style={{
          marginTop: 32,
          transform: `translateY(${arrowBounce}px)`,
          fontSize: 48,
          color: COLORS.text,
          opacity: 0.8,
        }}
      >
        👇
      </div>

      {/* Saiba Mais button (mimics Meta/TikTok CTA) */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 44,
          right: 44,
          background: "white",
          borderRadius: 12,
          padding: "18px 0",
          textAlign: "center",
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
          transform: `translateY(${interpolate(frame, [15, 30], [20, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          })}px)`,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            fontFamily: FONTS.heading,
            color: "#0a0a1a",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Saiba Mais →
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// NUMERO DESTAQUE (para dados impactantes)
// ==========================================
const NumeroDestaque: React.FC<{
  valor: string;
  label: string;
  cor: string;
  delay?: number;
}> = ({ valor, label, cor, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 6, stiffness: 400, mass: 0.3 },
  });

  return (
    <div
      style={{
        transform: `scale(${Math.max(0, scale)})`,
        textAlign: "center",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          fontFamily: FONTS.heading,
          color: cor,
          textShadow: `0 0 40px ${cor}44`,
        }}
      >
        {valor}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          fontFamily: FONTS.body,
          color: "rgba(255,255,255,0.5)",
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
};

// ==========================================
// TRANSITION (swipe between scenes)
// ==========================================
const SceneTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {children}
    </AbsoluteFill>
  );
};

// ==========================================
// COMPOSICAO PRINCIPAL
// ==========================================
export const AdConversa2Pessoas: React.FC<AdConversa2PessoasProps> = ({
  roteiro,
  hookTexto,
  ctaTexto,
  ctaSubtexto,
  pessoa1Nome = "Pessoa 1",
  pessoa2Nome = "Pessoa 2",
  corPrimaria = COLORS.person1,
  corSecundaria = COLORS.person2,
  corDestaque = COLORS.highlight,
  corHook = COLORS.hookBg,
}) => {
  const { fps } = useVideoConfig();

  // Calculate scene timings
  const hookDuration = fps * 3; // 3 seconds
  const ctaDuration = fps * 6; // 6 seconds

  // Build sequences
  let currentFrame = hookDuration;

  return (
    <AbsoluteFill>
      <Background corPrimaria={corPrimaria} corSecundaria={corSecundaria} />
      <SafeZones />

      {/* HOOK (0-3s) */}
      <Sequence from={0} durationInFrames={hookDuration}>
        <SceneTransition>
          <HookScene texto={hookTexto} cor={corHook} />
        </SceneTransition>
      </Sequence>

      {/* FALAS DO ROTEIRO */}
      {roteiro.map((fala, i) => {
        const from = currentFrame;
        currentFrame += fala.duracao;

        return (
          <Sequence key={i} from={from} durationInFrames={fala.duracao}>
            <SceneTransition>
              <FalaAnimada
                fala={fala}
                corPessoa={fala.pessoa === 1 ? corPrimaria : corSecundaria}
                corDestaque={corDestaque}
                nomePessoa={fala.pessoa === 1 ? pessoa1Nome : pessoa2Nome}
              />
            </SceneTransition>
          </Sequence>
        );
      })}

      {/* CTA (ultimos 6s) */}
      <Sequence from={currentFrame} durationInFrames={ctaDuration}>
        <SceneTransition>
          <CTAScene
            texto={ctaTexto}
            subtexto={ctaSubtexto}
            corPrimaria={corPrimaria}
          />
        </SceneTransition>
      </Sequence>
    </AbsoluteFill>
  );
};

// ==========================================
// ROTEIRO 1: "O Paciente que Volta Sozinho"
// ==========================================
const ROTEIRO_1: Fala[] = [
  {
    pessoa: 1,
    texto: "Um dentista me mandou isso ontem... 47 agendamentos em 30 dias gastando R$ 117 reais. Cento e dezessete.",
    duracao: 210, // 7s
    destaques: ["47", "R$", "117", "Cento", "dezessete"],
  },
  {
    pessoa: 2,
    texto: "Isso é real? Como?",
    duracao: 60, // 2s
  },
  {
    pessoa: 1,
    texto: "Ele parou de ficar correndo atrás de paciente novo. Pegou a base que já tinha — gente que já passou pela clínica, pediu orçamento e sumiu — e ativou com mensagem automática no timing certo.",
    duracao: 270, // 9s
    destaques: ["parou", "base", "automática", "timing"],
  },
  {
    pessoa: 2,
    texto: "Mas isso não é aquele spam de WhatsApp?",
    duracao: 75, // 2.5s
    destaques: ["spam"],
  },
  {
    pessoa: 1,
    texto: "Não, justamente. É uma IA que entende o momento do paciente. Se ele pediu orçamento de lente há 40 dias e não fechou, ela retoma a conversa de forma natural. O paciente acha que é a recepcionista.",
    duracao: 300, // 10s
    destaques: ["IA", "natural", "recepcionista"],
  },
  {
    pessoa: 2,
    texto: "E o cara gastou R$ 117?",
    duracao: 60, // 2s
    destaques: ["R$", "117"],
  },
  {
    pessoa: 1,
    texto: "Porque não é tráfego pago. É reativação de base. O paciente já conhece a clínica, já confia. Só precisava de um empurrão no momento certo.",
    duracao: 240, // 8s
    destaques: ["reativação", "confia", "empurrão"],
  },
];

// Total: 3s hook + 40.5s roteiro + 6s CTA = 49.5s ≈ 50s
const TOTAL_FRAMES_R1 = 90 + 210 + 60 + 270 + 75 + 300 + 60 + 240 + 180;

export const AdRoteiro1PacienteVoltaSozinho: React.FC = () => {
  return (
    <AdConversa2Pessoas
      roteiro={ROTEIRO_1}
      hookTexto="Um dentista me mandou isso aqui ontem... olha esse número."
      ctaTexto="Quer saber quantos pacientes escondidos estão na sua base agora?"
      ctaSubtexto="Toca em Saiba Mais"
      pessoa1Nome="Especialista"
      pessoa2Nome="Entrevistador"
      corPrimaria="#7C3AED"
      corSecundaria="#3B82F6"
      corDestaque="#FFD700"
      corHook="#FF3366"
    />
  );
};

// ==========================================
// ROTEIRO 2: "A Conta que Não Fecha"
// ==========================================
const ROTEIRO_2: Fala[] = [
  {
    pessoa: 1,
    texto: "Faz uma conta rápida comigo. Quanto um dentista gasta de tráfego pago por mês?",
    duracao: 150, // 5s
    destaques: ["conta", "tráfego"],
  },
  {
    pessoa: 2,
    texto: "Uns 3, 4 mil?",
    duracao: 60, // 2s
    destaques: ["3,", "4"],
  },
  {
    pessoa: 1,
    texto: "Tá. E quantos pacientes fecha com isso?",
    duracao: 75, // 2.5s
  },
  {
    pessoa: 2,
    texto: "Se for bom, uns 15, 20?",
    duracao: 60, // 2s
    destaques: ["15,", "20"],
  },
  {
    pessoa: 1,
    texto: "Então tá pagando R$ 200 por paciente. Agora me diz: quantos pacientes ANTIGOS pediram orçamento nos últimos 6 meses e não fecharam?",
    duracao: 240, // 8s
    destaques: ["R$", "200", "ANTIGOS", "6"],
  },
  {
    pessoa: 2,
    texto: "Sei lá... 200? 300?",
    duracao: 60, // 2s
    destaques: ["200", "300"],
  },
  {
    pessoa: 1,
    texto: "Exato. São 300 pessoas que JÁ conhecem a clínica, JÁ confiam, e estão ali paradas na sua lista. E você tá pagando R$ 200 pra buscar gente NOVA que nunca te viu.",
    duracao: 300, // 10s
    destaques: ["300", "JÁ", "R$", "200", "NOVA"],
  },
  {
    pessoa: 1,
    texto: "A gente pega essa base, ativa com IA, e o custo por agendamento cai pra menos de R$ 5. Sem anúncio, sem tráfego.",
    duracao: 210, // 7s
    destaques: ["IA", "R$", "5", "Sem"],
  },
];

const TOTAL_FRAMES_R2 = 90 + 150 + 60 + 75 + 60 + 240 + 60 + 300 + 210 + 180;

export const AdRoteiro2ContaNaoFecha: React.FC = () => {
  return (
    <AdConversa2Pessoas
      roteiro={ROTEIRO_2}
      hookTexto="Faz uma conta rápida comigo. Quanto você gasta de tráfego por mês?"
      ctaTexto="Quer ver quanto custa reativar a sua base?"
      ctaSubtexto="Toca em Saiba Mais"
      pessoa1Nome="Especialista"
      pessoa2Nome="Entrevistador"
      corPrimaria="#7C3AED"
      corSecundaria="#3B82F6"
      corDestaque="#FFD700"
      corHook="#EF4444"
    />
  );
};

// ==========================================
// ROTEIRO 4: "R$ 0 em Anúncio, Agenda Lotada"
// ==========================================
const ROTEIRO_4: Fala[] = [
  {
    pessoa: 1,
    texto: "Essa clínica em BH zerou o orçamento de anúncio mês passado.",
    duracao: 120, // 4s
    destaques: ["zerou", "orçamento"],
  },
  {
    pessoa: 2,
    texto: "E a agenda?",
    duracao: 45, // 1.5s
  },
  {
    pessoa: 1,
    texto: "Lotou. 63 agendamentos. Zero reais em tráfego.",
    duracao: 120, // 4s
    destaques: ["Lotou", "63", "Zero"],
  },
  {
    pessoa: 2,
    texto: "Tá, mas como? De onde vieram esses pacientes?",
    duracao: 75, // 2.5s
  },
  {
    pessoa: 1,
    texto: "Da própria base do consultório. Tinham 1.800 contatos de pacientes antigos e pessoas que pediram orçamento nos últimos 12 meses. A gente plugou a IA e ela começou a conversar com cada um, um por um, personalizado.",
    duracao: 330, // 11s
    destaques: ["1.800", "IA", "personalizado"],
  },
  {
    pessoa: 2,
    texto: "Tipo uma secretária?",
    duracao: 45, // 1.5s
  },
  {
    pessoa: 1,
    texto: "Melhor. Porque ela fala com 200 pessoas ao mesmo tempo, no horário certo, com a mensagem certa. E não esquece de ninguém. Em 72 horas já tinha 20 agendamentos.",
    duracao: 270, // 9s
    destaques: ["200", "72", "20"],
  },
  {
    pessoa: 2,
    texto: "Sem nenhum anúncio?",
    duracao: 60, // 2s
    destaques: ["nenhum"],
  },
  {
    pessoa: 1,
    texto: "Nenhum. O dono falou que pela primeira vez em 4 anos parou de depender de gestor de tráfego.",
    duracao: 210, // 7s
    destaques: ["Nenhum", "4", "parou"],
  },
];

const TOTAL_FRAMES_R4 = 90 + 120 + 45 + 120 + 75 + 330 + 45 + 270 + 60 + 210 + 180;

export const AdRoteiro4ZeroAnuncio: React.FC = () => {
  return (
    <AdConversa2Pessoas
      roteiro={ROTEIRO_4}
      hookTexto="Essa clínica zerou o orçamento de anúncio e a agenda LOTOU."
      ctaTexto="Quer ver como funciona na sua clínica?"
      ctaSubtexto="Toca em Saiba Mais e agenda uma call gratuita"
      pessoa1Nome="Especialista"
      pessoa2Nome="Entrevistador"
      corPrimaria="#7C3AED"
      corSecundaria="#3B82F6"
      corDestaque="#FFD700"
      corHook="#F97316"
    />
  );
};

// Export frame counts for Root.tsx registration
export const FRAME_COUNTS = {
  roteiro1: TOTAL_FRAMES_R1,
  roteiro2: TOTAL_FRAMES_R2,
  roteiro4: TOTAL_FRAMES_R4,
};
