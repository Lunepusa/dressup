export const randomitem = (max) => {
  if (max <= 0) {
    console.warn(`Invalid max value for randomitem: ${max}, defaulting to 1`);
    return 1;
  }
  return Math.floor(Math.random() * max) + 1;
};

export const categories = [
  { name: "background", maxItems: 0 },
  { name: "baccessory", maxItems: 0 },
  { name: "hair", maxItems: 3 },
  { name: "ear", maxItems: 1 },
  { name: "body", maxItems: 1 },
  { name: "eye", maxItems: 1 },
  { name: "eyebrow", maxItems: 1 },
  { name: "mouth", maxItems: 1 },
  { name: "nose", maxItems: 1 },
  { name: "bang", maxItems: 3 },
  { name: "sock", maxItems: 2 },
  { name: "glove", maxItems: 2 },
  { name: "shoes", maxItems: 3 },
  { name: "bottom", maxItems: 4 },
  { name: "top", maxItems: 6 },
  { name: "accessory", maxItems: 3 },
];

const generateItems = (category) => {
  const { name, maxItems } = category;
  if (maxItems <= 0) {
    console.warn(`Invalid maxItems for ${name}: ${maxItems}, defaulting to 0`);
    return [];
  }
  console.log(`Generating items for ${name} with maxItems: ${maxItems}`);
  const items = [];
  for (let i = 1; i <= maxItems; i++) {
    const lineArtPath = `/images/${name}/${name}-${i}-line.png`;
    items.push({
      id: i,
      variants: [
        { style: "Line Art", src: lineArtPath },
        { style: "White Fill", src: `/images/${name}/${name}-${i}-white.png` },
        { style: "Grey Fill", src: `/images/${name}/${name}-${i}-grey.png` },
        { style: "preview", src: `/images/${name}/${name}-${i}-prev.png` },
      ],
    });
  }
  console.log(`Generated ${items.length} items for ${name}`);
  return items;
};

export const items = categories.reduce((acc, category) => {
  const categoryItems = generateItems(category);
  if (!categoryItems || categoryItems.length === 0) {
    console.warn(`No items generated for category: ${category.name}`);
  }
  return {
    ...acc,
    [category.name]: categoryItems,
  };
}, {});

// Validate categories
const itemKeys = Object.keys(items);
console.log("Items keys:", itemKeys);
const categoryNames = categories.map((c) => c.name);
categories.forEach((category) => {
  if (!itemKeys.includes(category.name)) {
    console.warn(`Category ${category.name} not found in items`);
  }
  if (typeof category.maxItems !== "number" || isNaN(category.maxItems)) {
    console.warn(`Invalid maxItems for ${category.name}: ${category.maxItems}`);
  }
});
// Check for duplicate names
const nameCounts = categoryNames.reduce(
  (acc, name) => ({
    ...acc,
    [name]: (acc[name] || 0) + 1,
  }),
  {}
);
Object.entries(nameCounts).forEach(([name, count]) => {
  if (count > 1) {
    console.warn(`Duplicate category name: ${name} appears ${count} times`);
  }
});

export default items;
