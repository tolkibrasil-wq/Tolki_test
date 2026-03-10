import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";

const TESTIMONIALS = [
  {
    name: "Carlos Mendes",
    role: "CEO, AutoPeças Express",
    text: "Aumentamos em 340% nossos agendamentos com o chatbot da Tolki. Incrível!",
    avatar: "CM",
    stars: 5,
    color: "#7C3AED",
  },
  {
    name: "Ana Beatriz",
    role: "Diretora, Clínica Viva Saúde",
    text: "Os disparos em massa reduziram nosso custo de aquisição em 60%.",
    avatar: "AB",
    stars: 5,
    color: "#3B82F6",
  },
  {
    name: "Roberto Silva",
    role: "Fundador, TechStore",
    text: "O atendimento 24h pelo WhatsApp triplicou nossas vendas online.",
    avatar: "RS",
    stars: 5,
    color: "#06B6D4",
  },
  {
    name: "Mariana Costa",
    role: "Gerente, Imobiliária Prime",
    text: "Captamos 5x mais leads qualificados com a automação da Tolki.",
    avatar: "MC",
    stars: 5,
    color: "#EC4899",
  },
];

const Star: React.FC<{ filled: boolean; delay: number }> = ({
  filled,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: frame - delay, fps, config: { damping: 8 } });
  return (
    <span
      style={{
        fontSize: 20,
        color: filled ? "#FBBF24" : "#4B5563",
        transform: `scale(${scale})`,
        display: "inline-block",
        marginRight: 2,
      }}
    >
      ★
    </span>
  );
};

const TestimonialCard: React.FC<{
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
}> = ({ testimonial, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterDelay = index * 25;
  const slideUp = spring({
    frame: frame - enterDelay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const opacity = interpolate(slideUp, [0, 1], [0, 1]);
  const translateY = interpolate(slideUp, [0, 1], [80, 0]);

  const glowPulse = interpolate(
    frame - enterDelay,
    [30, 60, 90],
    [0, 0.4, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        padding: "28px 24px",
        border: "1px solid rgba(255,255,255,0.1)",
        opacity,
        transform: `translateY(${translateY}px)`,
        boxShadow: `0 0 ${30 * glowPulse}px ${testimonial.color}40`,
        width: 420,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${testimonial.color}, transparent)`,
          opacity: slideUp,
        }}
      />

      {/* Header with avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}88)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {testimonial.name}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            {testimonial.role}
          </div>
        </div>
      </div>

      {/* Stars */}
      <div style={{ marginBottom: 12 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < testimonial.stars} delay={enterDelay + 10 + i * 3} />
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: 15,
          lineHeight: 1.6,
          fontFamily: "DM Sans, sans-serif",
          margin: 0,
          fontStyle: "italic",
        }}
      >
        "{testimonial.text}"
      </p>
    </div>
  );
};

export const SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Counter animation
  const counterValue = Math.min(
    Math.floor(interpolate(frame, [20, 100], [0, 2847], { extrapolateRight: "clamp" })),
    2847
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0533 50%, #0a1628 100%)",
        fontFamily: "DM Sans, sans-serif",
        padding: 60,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-30, 0])}px)`,
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            fontFamily: "Outfit, sans-serif",
            background: "linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            margin: 0,
          }}
        >
          O que nossos clientes dizem
        </h2>
      </div>

      {/* Counter */}
      <Sequence from={15}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              fontFamily: "Outfit, sans-serif",
              color: "#fff",
            }}
          >
            +{counterValue.toLocaleString("pt-BR")}
          </span>
          <span
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.6)",
              marginLeft: 12,
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            empresas transformadas
          </span>
        </div>
      </Sequence>

      {/* Cards grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
