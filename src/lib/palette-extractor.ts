type SampleBin = {
  b: number;
  count: number;
  g: number;
  sumX: number;
  sumY: number;
  r: number;
};

export type ExtractedPalette = {
  colors: string[];
  description: string;
};

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function colorDistance(a: SampleBin, b: SampleBin) {
  return Math.sqrt(
    (a.r - b.r) ** 2 +
      (a.g - b.g) ** 2 +
      (a.b - b.b) ** 2
  );
}

function describePosition(x: number, y: number) {
  const horizontal = x < 0.33 ? "left" : x > 0.66 ? "right" : "center";
  const vertical = y < 0.33 ? "top" : y > 0.66 ? "bottom" : "middle";
  return `${vertical}-${horizontal}`;
}

function describeRole(index: number, bin: SampleBin) {
  const brightness = (bin.r * 299 + bin.g * 587 + bin.b * 114) / 1000;

  if (index === 0) {
    return brightness > 190 ? "light wash" : "main anchor";
  }

  if (index === 1) {
    return brightness < 90 ? "dark support" : "secondary field";
  }

  if (brightness > 200) {
    return "bright highlight";
  }

  if (brightness < 80) {
    return "shadow note";
  }

  return "accent";
}

async function loadImage(file: File) {
  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new Image();
      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("Could not read the uploaded image."));
      nextImage.src = imageUrl;
    });

    return image;
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export async function extractPaletteFromFile(file: File): Promise<ExtractedPalette> {
  const image = await loadImage(file);
  const scale = Math.min(96 / image.width, 96 / image.height, 1);
  const width = Math.max(24, Math.round(image.width * scale));
  const height = Math.max(24, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    throw new Error("Palette extraction is not available in this browser.");
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const { data } = context.getImageData(0, 0, width, height);
  const bins = new Map<string, SampleBin>();

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const index = (y * width + x) * 4;
      const alpha = data[index + 3];

      if (alpha < 180) {
        continue;
      }

      const r = Math.round(data[index] / 24) * 24;
      const g = Math.round(data[index + 1] / 24) * 24;
      const b = Math.round(data[index + 2] / 24) * 24;
      const key = `${r}-${g}-${b}`;
      const current = bins.get(key);

      if (current) {
        current.count += 1;
        current.sumX += x / width;
        current.sumY += y / height;
        continue;
      }

      bins.set(key, {
        b,
        count: 1,
        g,
        r,
        sumX: x / width,
        sumY: y / height
      });
    }
  }

  const ranked = [...bins.values()].sort((a, b) => b.count - a.count);
  const selected: SampleBin[] = [];

  for (const candidate of ranked) {
    if (selected.some((entry) => colorDistance(entry, candidate) < 46)) {
      continue;
    }

    selected.push(candidate);

    if (selected.length === 5) {
      break;
    }
  }

  if (selected.length === 0) {
    throw new Error("Could not extract enough visible colors from that image.");
  }

  const colors = selected.map((bin) => rgbToHex(bin.r, bin.g, bin.b));
  const description = selected
    .map((bin, index) => {
      const position = describePosition(bin.sumX / bin.count, bin.sumY / bin.count);
      const role = describeRole(index, bin);
      return `${rgbToHex(bin.r, bin.g, bin.b)} as a ${role} around the ${position}`;
    })
    .join(", ");

  return {
    colors,
    description
  };
}
