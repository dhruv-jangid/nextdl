import fs from "fs";
import path from "path";

function fixFontPaths(): void {
  const cssDir = "out/_next/static/css";

  if (!fs.existsSync(cssDir)) {
    return;
  }

  const cssFiles: string[] = fs
    .readdirSync(cssDir)
    .filter((file: string) => file.endsWith(".css"))
    .map((file: string) => path.join(cssDir, file));

  if (cssFiles.length === 0) {
    return;
  }

  cssFiles.forEach((filePath: string) => {
    try {
      let content: string = fs.readFileSync(filePath, "utf8");

      content = content.replace(
        /(@font-face[^}]*url\(['"]?)\/Geist\.woff2(['"]?\))/g,
        "$1../../../Geist.woff2$2"
      );

      content = content.replace(
        /(@font-face[^}]*url\(['"]?)\/GeistMono\.woff2(['"]?\))/g,
        "$1../../../GeistMono.woff2$2"
      );

      fs.writeFileSync(filePath, content, "utf8");
      console.log(`Fixed font paths in: ${path.basename(filePath)}`);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  });

  console.log("Font path fixing completed!");
}

fixFontPaths();
