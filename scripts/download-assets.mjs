import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

const logos = [
  "https://lusion.co/assets/images/logo/@logo--cocacola.svg",
  "https://lusion.co/assets/images/logo/@logo--maxmara.svg",
  "https://lusion.co/assets/images/logo/@logo--calvin-klein.svg",
  "https://lusion.co/assets/images/logo/@logo--porsche.svg",
  "https://lusion.co/assets/images/logo/@logo--wallpaper.svg",
  "https://lusion.co/assets/images/logo/@logo--hyundai.svg",
  "https://lusion.co/assets/images/logo/@logo--google.svg",
  "https://lusion.co/assets/images/logo/@logo--apple.svg",
  "https://lusion.co/assets/images/logo/@logo--webby-awards.svg",
  "https://lusion.co/assets/images/logo/@logo--stanford.svg",
  "https://lusion.co/assets/images/logo/@logo--sony.svg",
  "https://lusion.co/assets/images/logo/@logo--awwwards.svg",
  "https://lusion.co/assets/images/logo/@logo--nvidia.svg",
  "https://lusion.co/assets/images/logo/@logo--akqa.svg",
  "https://lusion.co/assets/images/logo/@logo--nexus-studios.svg",
];

const dir = "public/images/logos";
if (!existsSync(dir)) await mkdir(dir, { recursive: true });

async function download(url) {
  const filename = url.split("/").pop().replace("@", "");
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(`${dir}/${filename}`, buf);
    console.log(`✓ ${filename} (${buf.length} bytes)`);
  } catch (e) {
    console.error(`✗ ${filename}: ${e.message}`);
  }
}

// Download 4 at a time
for (let i = 0; i < logos.length; i += 4) {
  await Promise.all(logos.slice(i, i + 4).map(download));
}

console.log("\nDone! Downloaded to", dir);
