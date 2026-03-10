import React from "react";
import { Composition } from "remotion";
import { SocialProof } from "./components/SocialProof";
import { WhatsAppChat } from "./components/WhatsAppChat";
import { MassDispatch } from "./components/MassDispatch";
import { InstitutionalVideo } from "./components/InstitutionalVideo";
import {
  AdRoteiro1PacienteVoltaSozinho,
  AdRoteiro2ContaNaoFecha,
  AdRoteiro4ZeroAnuncio,
  FRAME_COUNTS,
} from "./components/AdConversa2Pessoas";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SocialProof"
        component={SocialProof}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="WhatsAppChat"
        component={WhatsAppChat}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="MassDispatch"
        component={MassDispatch}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="InstitutionalVideo"
        component={InstitutionalVideo}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Ads Tráfego Pago - Formato 9:16 (Reels/TikTok) */}
      <Composition
        id="AdRoteiro1-PacienteVoltaSozinho"
        component={AdRoteiro1PacienteVoltaSozinho}
        durationInFrames={FRAME_COUNTS.roteiro1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AdRoteiro2-ContaNaoFecha"
        component={AdRoteiro2ContaNaoFecha}
        durationInFrames={FRAME_COUNTS.roteiro2}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AdRoteiro4-ZeroAnuncio"
        component={AdRoteiro4ZeroAnuncio}
        durationInFrames={FRAME_COUNTS.roteiro4}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
