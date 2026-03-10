import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compositions = [
  { id: "SocialProof", codec: "h264" as const },
  { id: "WhatsAppChat", codec: "h264" as const },
  { id: "MassDispatch", codec: "h264" as const },
  { id: "InstitutionalVideo", codec: "h264" as const },
];

async function main() {
  console.log("📦 Bundling Remotion project...");
  const bundled = await bundle({
    entryPoint: path.resolve(__dirname, "remotion/index.ts"),
    webpackOverride: (config) => config,
  });
  console.log("✅ Bundle complete!\n");

  for (const comp of compositions) {
    console.log(`🎬 Rendering ${comp.id}...`);
    const composition = await selectComposition({
      serveUrl: bundled,
      id: comp.id,
    });

    const outputPath = path.resolve(
      __dirname,
      "..",
      "public",
      `${comp.id}.mp4`
    );

    await renderMedia({
      composition,
      serveUrl: bundled,
      codec: comp.codec,
      outputLocation: outputPath,
    });
    console.log(`✅ ${comp.id} → ${outputPath}\n`);
  }

  console.log("🎉 All videos rendered successfully!");
}

main().catch((err) => {
  console.error("❌ Render failed:", err);
  process.exit(1);
});
