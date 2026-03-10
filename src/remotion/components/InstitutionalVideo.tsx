import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";

const FEATURES = [
  { icon: "🤖", title: "Chatbot IA", desc: "Atendimento 24/7 inteligente" },
  { icon: "📨", title: "Disparos em Massa", desc: "Milhares de mensagens personalizadas" },
  { icon: "📊", title: "CRM Integrado", desc: "Gestão completa de leads" },
  { icon: "🔗", title: "API Aberta", desc: "Integre com qualquer sistema" },
];

const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 10, stiffness: 60 } });
  const glowIntensity = interpolate(frame, [0, 30, 60], [0, 1, 0.6], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          transform: `scale(${interpolate(logoScale, [0, 1], [0.3, 1])})`,
          opacity: interpolate(logoScale, [0, 1], [0, 1]),
        }}
      >
        {/* Logo glow */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(124,58,237,${glowIntensity * 0.4}), transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
        <h1
          style={{
            fontSize: 90,
            fontWeight: 900,
            fontFamily: "Outfit, sans-serif",
            background: "linear-gradient(135deg, #7C3AED, #3B82F6, #06B6D4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            margin: 0,
            position: "relative",
          }}
        >
          Tolki
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 22,
            textAlign: "center",
            fontFamily: "DM Sans, sans-serif",
            marginTop: 8,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Automação Inteligente
        </p>
      </div>
    </div>
  );
};

const TaglineSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = "Transforme seu WhatsApp em uma máquina de vendas".split(" ");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: 60,
      }}
    >
      <h2
        style={{
          fontSize: 52,
          fontWeight: 800,
          fontFamily: "Outfit, sans-serif",
          textAlign: "center",
          lineHeight: 1.3,
          maxWidth: 800,
        }}
      >
        {words.map((word, i) => {
          const wordSpring = spring({
            frame: frame - i * 5,
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const isHighlight = ["WhatsApp", "máquina", "vendas"].includes(word);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: 14,
                opacity: interpolate(wordSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(wordSpring, [0, 1], [30, 0])}px)`,
                color: isHighlight ? "#7C3AED" : "#fff",
              }}
            >
              {word}
            </span>
          );
        })}
      </h2>
    </div>
  );
};

const FeaturesGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
          maxWidth: 800,
        }}
      >
        {FEATURES.map((feat, i) => {
          const delay = i * 15;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12 },
          });
          const glowPulse = interpolate(
            frame - delay,
            [40, 70, 100],
            [0, 0.5, 0.2],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                width: 340,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                borderRadius: 20,
                padding: 30,
                border: "1px solid rgba(255,255,255,0.1)",
                opacity: interpolate(cardSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(cardSpring, [0, 1], [50, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.9, 1])})`,
                boxShadow: `0 0 ${30 * glowPulse}px rgba(124,58,237,${glowPulse * 0.3})`,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>{feat.icon}</div>
              <h3
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                  fontFamily: "Outfit, sans-serif",
                  margin: "0 0 8px 0",
                }}
              >
                {feat.title}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 15,
                  fontFamily: "DM Sans, sans-serif",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: 2847, suffix: "+", label: "Empresas ativas", color: "#7C3AED" },
    { value: 98.7, suffix: "%", label: "Taxa de entrega", color: "#22C55E" },
    { value: 340, suffix: "%", label: "Aumento em vendas", color: "#3B82F6" },
    { value: 24, suffix: "/7", label: "Suporte contínuo", color: "#06B6D4" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 50,
      }}
    >
      {stats.map((stat, i) => {
        const delay = i * 12;
        const statSpring = spring({
          frame: frame - delay,
          fps,
          config: { damping: 12 },
        });
        const currentValue =
          stat.value % 1 === 0
            ? Math.floor(
                interpolate(frame - delay, [0, 40], [0, stat.value], {
                  extrapolateRight: "clamp",
                })
              )
            : parseFloat(
                interpolate(frame - delay, [0, 40], [0, stat.value], {
                  extrapolateRight: "clamp",
                }).toFixed(1)
              );

        return (
          <div
            key={i}
            style={{
              textAlign: "center",
              opacity: interpolate(statSpring, [0, 1], [0, 1]),
              transform: `scale(${interpolate(statSpring, [0, 1], [0.5, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 54,
                fontWeight: 900,
                color: stat.color,
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {currentValue}
              {stat.suffix}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 15,
                fontFamily: "DM Sans, sans-serif",
                marginTop: 4,
              }}
            >
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CTASection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaSpring = spring({ frame, fps, config: { damping: 10 } });
  const pulseScale = 1 + Math.sin(frame * 0.08) * 0.03;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <h2
        style={{
          fontSize: 48,
          fontWeight: 800,
          fontFamily: "Outfit, sans-serif",
          color: "#fff",
          textAlign: "center",
          margin: "0 0 30px 0",
          opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(ctaSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        Comece sua
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          transformação digital
        </span>
      </h2>

      <Sequence from={20}>
        <div
          style={{
            background: "linear-gradient(135deg, #F97316, #EF4444)",
            padding: "18px 48px",
            borderRadius: 14,
            transform: `scale(${pulseScale * interpolate(spring({ frame: frame - 20, fps, config: { damping: 8 } }), [0, 1], [0.5, 1])})`,
            boxShadow: "0 0 40px rgba(249,115,22,0.4)",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Falar com Especialista →
          </span>
        </div>
      </Sequence>

      <Sequence from={40}>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 14,
            fontFamily: "DM Sans, sans-serif",
            marginTop: 16,
            opacity: interpolate(
              spring({ frame: frame - 40, fps, config: { damping: 12 } }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          Teste grátis por 7 dias • Sem cartão de crédito
        </p>
      </Sequence>
    </div>
  );
};

export const InstitutionalVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0533 50%, #0a1628 100%)",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scene 1: Logo Reveal (0-90 frames = 3s) */}
      <Sequence from={0} durationInFrames={90}>
        <LogoReveal />
      </Sequence>

      {/* Scene 2: Tagline (90-180 frames = 3s) */}
      <Sequence from={90} durationInFrames={90}>
        <TaglineSection />
      </Sequence>

      {/* Scene 3: Features Grid (180-300 frames = 4s) */}
      <Sequence from={180} durationInFrames={120}>
        <FeaturesGrid />
      </Sequence>

      {/* Scene 4: Stats (300-390 frames = 3s) */}
      <Sequence from={300} durationInFrames={90}>
        <StatsSection />
      </Sequence>

      {/* Scene 5: CTA (390-480 frames = 3s) */}
      <Sequence from={390} durationInFrames={90}>
        <CTASection />
      </Sequence>
    </AbsoluteFill>
  );
};
