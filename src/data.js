const maxItems = 6; // Adjust this based on your expected max files

export function randomitem(){
  math.floor(math.random()*maxitem)+1;
}

const generateItems = (category) => {
  const items = [];
  for (let i = 1; i <= maxItems; i++) {
    // Simulate trying to "pull" line art file
    try {
      const lineArtPath = `/images/${category}/${category}-${i}-line.png`;
      // We can't check file existence, so assume it exists and let <img> handle errors
      items.push({
        id: i,
        variants: [
          { style: "Line Art", src: lineArtPath },
        
          {
            style: "White Fill",
            src: `/images/${category}/${category}-${i}-white.png`,
          },
          {
            style: "Grey Fill",
            src: `/images/${category}/${category}-${i}-grey.png`,
          },
          {
            style: "preview",
            src: `/images/${category}/${category}-${i}-prev.png`,
          },
        ],
      });
    } catch (e) {
      // Since we can't catch file errors, this is a placeholder
      break; // Stop when we "assume" no more files
    }
  }
  return items;
};

export const items = {
  background: generateItems("background"),
  baccessory: generateItems("baccessory"),
  hair: generateItems("hair"),
ear: generateItems("ear"),
  body: generateItems("body"),
  eye: generateItems("eye"),
  eyebrow: generateItems("eyebrow"),
  mouth: generateItems("mouth"),
  nose: generateItems("nose"),
  bang: generateItems("bang"),
  sock: generateItems("sock"),
  glove: generateItems("glove"),
  shoes: generateItems("shoes"),
  bottom: generateItems("bottom"),
  top: generateItems("top"),
  accessory: generateItems("accessory"),
};
