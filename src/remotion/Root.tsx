import React from "react";
import { Composition } from "remotion";
import { SocialProof } from "./components/SocialProof";
import { WhatsAppChat } from "./components/WhatsAppChat";
import { MassDispatch } from "./components/MassDispatch";
import { InstitutionalVideo } from "./components/InstitutionalVideo";

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
    </>
  );
};
