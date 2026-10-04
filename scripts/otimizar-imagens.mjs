import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";

const FONTE = "imagens-fonte";
const SAIDA = "imagens";

const imagens = [
  { nome: "banner-home", ext: "jpg", larguras: [597] },
  { nome: "projeto-educacao", ext: "jpg", larguras: [740, 400] },
  { nome: "projeto-alimentacao", ext: "jpg", larguras: [740, 400] }
];

mkdirSync(SAIDA, { recursive: true });

function tamanho(arquivo) {
  return statSync(arquivo).size;
}

for (const { nome, ext, larguras } of imagens) {
  const origem = `${FONTE}/${nome}.${ext}`;

  for (const [indice, largura] of larguras.entries()) {
    const sufixo = indice === 0 ? "" : `-${largura}`;
    const base = `${SAIDA}/${nome}${sufixo}`;
    const redimensionada = sharp(origem).resize({ width: largura, withoutEnlargement: true });

    await redimensionada.clone().webp({ quality: 78, effort: 6 }).toFile(`${base}.webp`);
    await redimensionada.clone().jpeg({ quality: 76, mozjpeg: true, progressive: true }).toFile(`${base}.jpg`);

    console.log(`${base}: webp ${tamanho(`${base}.webp`)} B, jpg ${tamanho(`${base}.jpg`)} B`);
  }
}

await sharp(`${FONTE}/logo.png`)
  .resize(96, 96)
  .png({ palette: true, quality: 80, compressionLevel: 9 })
  .toFile(`${SAIDA}/logo.png`);

console.log(`${SAIDA}/logo.png: ${tamanho(`${SAIDA}/logo.png`)} B`);
