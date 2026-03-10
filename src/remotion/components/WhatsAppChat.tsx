import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";

interface Message {
  text: string;
  from: "user" | "bot";
  delay: number;
  typing?: number;
}

const MESSAGES: Message[] = [
  { text: "Olá! Gostaria de saber sobre os planos 😊", from: "user", delay: 0 },
  { text: "", from: "bot", delay: 30, typing: 25 },
  {
    text: "Olá! Bem-vindo à Tolki! 🚀\nTemos planos a partir de R$197/mês.\n\nQual seu segmento?",
    from: "bot",
    delay: 55,
  },
  { text: "Sou do ramo imobiliário", from: "user", delay: 95 },
  { text: "", from: "bot", delay: 115, typing: 20 },
  {
    text: "Perfeito! Para imobiliárias recomendo o Plano Pro:\n\n✅ Chatbot 24h para captação\n✅ Disparos segmentados\n✅ CRM integrado\n✅ Agendamento automático\n\nQuer agendar uma demonstração?",
    from: "bot",
    delay: 135,
  },
  { text: "Sim! Pode ser amanhã às 14h?", from: "user", delay: 180 },
  { text: "", from: "bot", delay: 200, typing: 15 },
  {
    text: "Agendado! ✅\n📅 Amanhã, 14h\n📱 Você receberá o link por aqui.\n\nAlgo mais que posso ajudar?",
    from: "bot",
    delay: 215,
  },
];

const TypingIndicator: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 4, padding: "4px 0" }}>
      {[0, 1, 2].map((i) => {
        const bounce = Math.sin((frame + i * 8) * 0.15) * 3;
        return (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.5)",
              transform: `translateY(${bounce}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

const ChatBubble: React.FC<{
  message: Message;
}> = ({ message }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: frame - message.delay,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const isBot = message.from === "bot";
  const isTyping = message.typing && frame >= message.delay && frame < message.delay + message.typing;

  if (frame < message.delay) return null;
  if (message.text === "" && !isTyping) return null;

  const scale = interpolate(enterSpring, [0, 1], [0.3, 1]);
  const opacity = interpolate(enterSpring, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        marginBottom: 10,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: isBot ? "left bottom" : "right bottom",
      }}
    >
      {isBot && (
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
            flexShrink: 0,
            fontSize: 14,
            color: "#fff",
            fontWeight: 700,
          }}
        >
          T
        </div>
      )}
      <div
        style={{
          background: isBot
            ? "rgba(124,58,237,0.2)"
            : "rgba(6,182,212,0.2)",
          border: `1px solid ${isBot ? "rgba(124,58,237,0.3)" : "rgba(6,182,212,0.3)"}`,
          borderRadius: isBot ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
          padding: "12px 16px",
          maxWidth: 380,
          backdropFilter: "blur(10px)",
        }}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <p
            style={{
              color: "#fff",
              fontSize: 15,
              lineHeight: 1.5,
              margin: 0,
              fontFamily: "DM Sans, sans-serif",
              whiteSpace: "pre-line",
            }}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export const WhatsAppChat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0533 50%, #0a1628 100%)",
        padding: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "20%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Phone mockup */}
      <div
        style={{
          width: 520,
          borderRadius: 32,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
          transform: `scale(${interpolate(headerSpring, [0, 1], [0.8, 1])})`,
          opacity: interpolate(headerSpring, [0, 1], [0, 1]),
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(90deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            T
          </div>
          <div>
            <div
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Tolki Assistente
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22C55E",
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                Online agora
              </span>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div style={{ padding: "20px 16px", minHeight: 480 }}>
          {MESSAGES.map((msg, i) => (
            <ChatBubble key={i} message={msg} />
          ))}
        </div>
      </div>

      {/* Label */}
      <Sequence from={240}>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            textAlign: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 16,
              fontFamily: "DM Sans, sans-serif",
              opacity: interpolate(
                spring({ frame: frame - 240, fps, config: { damping: 12 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            Chatbot inteligente • Atendimento 24h • Respostas instantâneas
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
