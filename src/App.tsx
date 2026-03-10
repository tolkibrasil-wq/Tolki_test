import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { SocialProof } from './remotion/components/SocialProof';
import { WhatsAppChat } from './remotion/components/WhatsAppChat';
import { MassDispatch } from './remotion/components/MassDispatch';
import { InstitutionalVideo } from './remotion/components/InstitutionalVideo';

const compositions = [
  {
    id: 'InstitutionalVideo',
    title: 'Video Institucional',
    desc: 'Apresentação completa da Tolki com 5 cenas: logo, tagline, features, stats e CTA.',
    component: InstitutionalVideo,
    duration: 480,
    width: 1920,
    height: 1080,
    accent: '#7C3AED',
  },
  {
    id: 'WhatsAppChat',
    title: 'Simulação de Conversa',
    desc: 'Chatbot IA atendendo um lead em tempo real — do primeiro contato ao agendamento.',
    component: WhatsAppChat,
    duration: 300,
    width: 1080,
    height: 1080,
    accent: '#3B82F6',
  },
  {
    id: 'MassDispatch',
    title: 'Disparo em Massa',
    desc: 'Dashboard de disparos com contatos, status e barra de progresso animada.',
    component: MassDispatch,
    duration: 300,
    width: 1080,
    height: 1080,
    accent: '#06B6D4',
  },
  {
    id: 'SocialProof',
    title: 'Prova Social',
    desc: 'Depoimentos animados com contador de empresas e estrelas.',
    component: SocialProof,
    duration: 240,
    width: 1080,
    height: 1080,
    accent: '#EC4899',
  },
];

export const App: React.FC = () => {
  const [active, setActive] = useState(0);
  const comp = compositions[active];

  return (
    <div style={styles.page}>
      {/* Background */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />
      <div style={styles.gridOverlay} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>Tolki</div>
        <div style={styles.headerSub}>Remotion Showcase</div>
      </header>

      {/* Main content */}
      <main style={styles.main}>
        <h1 style={styles.title}>
          Animações <span style={{ color: '#A78BFA' }}>Remotion</span>
        </h1>
        <p style={styles.subtitle}>
          4 composições criadas com React + Remotion. Clique para assistir cada uma.
        </p>

        {/* Tab selector */}
        <div style={styles.tabs}>
          {compositions.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              style={{
                ...styles.tab,
                ...(active === i ? { ...styles.tabActive, borderColor: c.accent, color: '#fff' } : {}),
              }}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Player */}
        <div style={styles.playerWrapper}>
          <Player
            key={comp.id}
            component={comp.component}
            durationInFrames={comp.duration}
            fps={30}
            compositionWidth={comp.width}
            compositionHeight={comp.height}
            style={{
              width: '100%',
              aspectRatio: `${comp.width}/${comp.height}`,
              borderRadius: 16,
              overflow: 'hidden',
            }}
            controls
            autoPlay
            loop
          />
        </div>

        {/* Info */}
        <div style={styles.info}>
          <h2 style={{ ...styles.infoTitle, color: comp.accent }}>{comp.title}</h2>
          <p style={styles.infoDesc}>{comp.desc}</p>
          <div style={styles.infoMeta}>
            <span style={styles.metaTag}>{comp.width}x{comp.height}</span>
            <span style={styles.metaTag}>{comp.duration / 30}s @ 30fps</span>
            <span style={styles.metaTag}>{comp.duration} frames</span>
          </div>
        </div>

        {/* All compositions grid */}
        <h3 style={styles.gridTitle}>Todas as Composições</h3>
        <div style={styles.grid}>
          {compositions.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setActive(i)}
              style={{
                ...styles.gridCard,
                borderColor: active === i ? c.accent : 'rgba(255,255,255,0.08)',
                cursor: 'pointer',
              }}
            >
              <div style={{ ...styles.gridCardAccent, background: c.accent }} />
              <Player
                component={c.component}
                durationInFrames={c.duration}
                fps={30}
                compositionWidth={c.width}
                compositionHeight={c.height}
                style={{
                  width: '100%',
                  aspectRatio: `${c.width}/${c.height}`,
                  borderRadius: 8,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                }}
                autoPlay
                loop
              />
              <div style={styles.gridCardTitle}>{c.title}</div>
              <div style={styles.gridCardDuration}>{c.duration / 30}s</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Tolki — Composições Remotion | Feito com React + Remotion</p>
      </footer>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#050510',
    color: '#F1F5F9',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlow1: {
    position: 'fixed', top: '-10%', left: '-5%',
    width: 500, height: 500, borderRadius: '50%',
    background: '#7C3AED', filter: 'blur(140px)', opacity: 0.12,
    pointerEvents: 'none',
  },
  bgGlow2: {
    position: 'fixed', bottom: '10%', right: '-10%',
    width: 400, height: 400, borderRadius: '50%',
    background: '#06B6D4', filter: 'blur(140px)', opacity: 0.1,
    pointerEvents: 'none',
  },
  gridOverlay: {
    position: 'fixed', inset: 0, pointerEvents: 'none',
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
  },
  header: {
    position: 'relative', zIndex: 10,
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '20px 24px', maxWidth: 1100, margin: '0 auto',
  },
  logo: {
    fontFamily: "'Outfit', sans-serif", fontSize: '1.6rem', fontWeight: 800,
    background: 'linear-gradient(135deg, #A78BFA, #22D3EE)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  headerSub: {
    fontSize: '0.8rem', color: '#64748B',
    padding: '4px 12px', borderRadius: 100,
    border: '1px solid rgba(255,255,255,0.08)',
  },
  main: {
    position: 'relative', zIndex: 10,
    maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px',
  },
  title: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
    textAlign: 'center' as const, marginBottom: 12, letterSpacing: -1,
  },
  subtitle: {
    textAlign: 'center' as const, color: '#94A3B8',
    fontSize: '1.05rem', marginBottom: 40, maxWidth: 550, marginLeft: 'auto', marginRight: 'auto',
  },
  tabs: {
    display: 'flex', gap: 8, justifyContent: 'center',
    flexWrap: 'wrap' as const, marginBottom: 32,
  },
  tab: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: '10px 20px',
    color: '#94A3B8', fontSize: '0.9rem', fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer', transition: 'all 200ms',
  },
  tabActive: {
    background: 'rgba(255,255,255,0.08)',
  },
  playerWrapper: {
    maxWidth: 900, margin: '0 auto 32px',
    borderRadius: 20, overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 30px 100px rgba(0,0,0,0.5)',
  },
  info: {
    textAlign: 'center' as const, marginBottom: 60,
  },
  infoTitle: {
    fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem',
    fontWeight: 700, marginBottom: 8,
  },
  infoDesc: {
    color: '#94A3B8', fontSize: '0.95rem', maxWidth: 500,
    margin: '0 auto 16px', lineHeight: 1.7,
  },
  infoMeta: {
    display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' as const,
  },
  metaTag: {
    fontSize: '0.75rem', color: '#64748B',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '4px 12px', borderRadius: 100,
  },
  gridTitle: {
    fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem',
    fontWeight: 700, textAlign: 'center' as const, marginBottom: 24,
    color: '#94A3B8',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 16,
  },
  gridCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16, padding: 12,
    transition: 'border-color 200ms, transform 200ms',
    position: 'relative' as const, overflow: 'hidden',
  },
  gridCardAccent: {
    position: 'absolute' as const, top: 0, left: 0, right: 0,
    height: 2, borderRadius: '2px 2px 0 0',
  },
  gridCardTitle: {
    fontFamily: "'Outfit', sans-serif", fontWeight: 600,
    fontSize: '0.9rem', marginTop: 10, marginBottom: 2,
  },
  gridCardDuration: {
    fontSize: '0.75rem', color: '#64748B',
  },
  footer: {
    position: 'relative' as const, zIndex: 10,
    textAlign: 'center' as const, padding: '30px 24px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    color: '#64748B', fontSize: '0.8rem',
  },
};
