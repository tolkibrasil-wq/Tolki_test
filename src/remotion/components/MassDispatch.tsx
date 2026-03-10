import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";

const CONTACTS = [
  { name: "Maria Souza", phone: "(**) *****-1234", status: "sent" },
  { name: "João Lima", phone: "(**) *****-5678", status: "sent" },
  { name: "Ana Paula", phone: "(**) *****-9012", status: "sent" },
  { name: "Carlos Dias", phone: "(**) *****-3456", status: "sending" },
  { name: "Fernanda Reis", phone: "(**) *****-7890", status: "sending" },
  { name: "Pedro Santos", phone: "(**) *****-2345", status: "pending" },
  { name: "Juliana Martins", phone: "(**) *****-6789", status: "pending" },
  { name: "Ricardo Oliveira", phone: "(**) *****-0123", status: "pending" },
];

const MessageRow: React.FC<{
  contact: (typeof CONTACTS)[0];
  index: number;
}> = ({ contact, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rowDelay = 30 + index * 18;
  const enterSpring = spring({
    frame: frame - rowDelay,
    fps,
    config: { damping: 14 },
  });

  const slideX = interpolate(enterSpring, [0, 1], [-60, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Status animation - transitions from pending -> sending -> sent
  const statusFrame = frame - rowDelay - 20;
  const isSent = statusFrame > index * 12 + 30;
  const isSending = !isSent && statusFrame > index * 12;

  const checkScale = spring({
    frame: isSent ? statusFrame - index * 12 - 30 : 0,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        background: "rgba(255,255,255,0.03)",
        borderRadius: 12,
        marginBottom: 6,
        border: "1px solid rgba(255,255,255,0.05)",
        opacity,
        transform: `translateX(${slideX}px)`,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${
            ["#7C3AED", "#3B82F6", "#06B6D4", "#EC4899"][index % 4]
          }, ${["#3B82F6", "#06B6D4", "#EC4899", "#7C3AED"][index % 4]})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 700,
          color: "#fff",
          marginRight: 12,
          flexShrink: 0,
          fontFamily: "Outfit, sans-serif",
        }}
      >
        {contact.name
          .split(" ")
          .map((w) => w[0])
          .join("")}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "Outfit, sans-serif",
          }}
        >
          {contact.name}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          {contact.phone}
        </div>
      </div>

      {/* Status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {isSent ? (
          <div
            style={{
              transform: `scale(${checkScale})`,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ color: "#22C55E", fontSize: 18 }}>✓✓</span>
            <span
              style={{
                color: "#22C55E",
                fontSize: 11,
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Enviado
            </span>
          </div>
        ) : isSending ? (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 16,
                height: 16,
                border: "2px solid rgba(124,58,237,0.3)",
                borderTop: "2px solid #7C3AED",
                borderRadius: "50%",
                transform: `rotate(${frame * 8}deg)`,
              }}
            />
            <span
              style={{
                color: "#7C3AED",
                fontSize: 11,
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Enviando...
            </span>
          </div>
        ) : (
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 11,
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Na fila
          </span>
        )}
      </div>
    </div>
  );
};

export const MassDispatch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14 } });

  // Animated counters
  const totalSent = Math.min(
    Math.floor(interpolate(frame, [60, 240], [0, 12847], { extrapolateRight: "clamp" })),
    12847
  );
  const deliveryRate = Math.min(
    interpolate(frame, [80, 200], [0, 98.7], { extrapolateRight: "clamp" }),
    98.7
  );
  const openRate = Math.min(
    interpolate(frame, [100, 220], [0, 73.2], { extrapolateRight: "clamp" }),
    73.2
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d1f3c 50%, #0a1628 100%)",
        padding: 50,
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {/* Ambient particles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (i * 73) % 100;
        const y = (i * 47) % 100;
        const speed = 0.3 + (i % 5) * 0.15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: ["#7C3AED", "#3B82F6", "#06B6D4"][i % 3],
              opacity: 0.3 + Math.sin(frame * speed * 0.05) * 0.2,
              transform: `translateY(${Math.sin(frame * speed * 0.03) * 20}px)`,
            }}
          />
        );
      })}

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
          opacity: interpolate(headerSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            fontFamily: "Outfit, sans-serif",
            color: "#fff",
            margin: "0 0 8px 0",
          }}
        >
          Disparo em Massa
          <span style={{ color: "#7C3AED" }}> Inteligente</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, margin: 0 }}>
          Envie milhares de mensagens personalizadas com um clique
        </p>
      </div>

      {/* Stats row */}
      <Sequence from={40}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            marginBottom: 30,
          }}
        >
          {[
            { label: "Mensagens Enviadas", value: totalSent.toLocaleString("pt-BR"), color: "#7C3AED" },
            { label: "Taxa de Entrega", value: `${deliveryRate.toFixed(1)}%`, color: "#22C55E" },
            { label: "Taxa de Abertura", value: `${openRate.toFixed(1)}%`, color: "#3B82F6" },
          ].map((stat, i) => {
            const statSpring = spring({
              frame: frame - 40 - i * 10,
              fps,
              config: { damping: 12 },
            });
            return (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  opacity: interpolate(statSpring, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(statSpring, [0, 1], [20, 0])}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: stat.color,
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </Sequence>

      {/* Message list */}
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          background: "rgba(255,255,255,0.02)",
          borderRadius: 16,
          padding: 12,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {CONTACTS.map((c, i) => (
          <MessageRow key={i} contact={c} index={i} />
        ))}
      </div>

      {/* Progress bar */}
      <Sequence from={60}>
        <div
          style={{
            maxWidth: 560,
            margin: "20px auto 0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              Progresso do disparo
            </span>
            <span style={{ color: "#7C3AED", fontSize: 12, fontWeight: 600 }}>
              {Math.min(Math.floor(interpolate(frame, [60, 280], [0, 100], { extrapolateRight: "clamp" })), 100)}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 3,
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 3,
                background: "linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4)",
                width: `${Math.min(interpolate(frame, [60, 280], [0, 100], { extrapolateRight: "clamp" }), 100)}%`,
                transition: "width 0.1s",
              }}
            />
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
