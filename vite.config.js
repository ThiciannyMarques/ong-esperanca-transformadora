import { defineConfig } from "vite";
import { minify } from "html-minifier-terser";
import { cpSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const opcoesHtml = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  removeRedundantAttributes: true
};

function copiarRecursosEstaticos() {
  let saida = "dist";

  return {
    name: "copiar-recursos-estaticos",
    apply: "build",
    configResolved(config) {
      saida = config.build.outDir;
    },
    async closeBundle() {
      cpSync("imagens", join(saida, "imagens"), { recursive: true });
      mkdirSync(join(saida, "html"), { recursive: true });

      for (const arquivo of readdirSync("html")) {
        const original = readFileSync(join("html", arquivo), "utf-8");
        writeFileSync(join(saida, "html", arquivo), await minify(original, opcoesHtml));
      }
    }
  };
}

function minificarIndex() {
  return {
    name: "minificar-index",
    enforce: "post",
    transformIndexHtml(html) {
      return minify(html, opcoesHtml);
    }
  };
}

export default defineConfig({
  base: "./",
  publicDir: false,
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 0
  },
  plugins: [minificarIndex(), copiarRecursosEstaticos()]
});
