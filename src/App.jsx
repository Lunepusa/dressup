import "./styles.css";
import { useState } from "react";
import { items, randomitem, categories } from "./data.js";

console.log("Imported items keys:", Object.keys(items));

export function CharacterPreview({ selectedItems }) {
  const allSelected = categories.flatMap(
    (category) => selectedItems[category.name] || []
  );

  return (
    <div className="character-preview">
      {allSelected.map((variant, index) => (
        <img
          key={`${variant.itemId}-${variant.style}-${index}`}
          src={variant.src}
          alt={`${variant.style} ${variant.itemId}`}
          style={{ position: "absolute" }}
        />
      ))}
    </div>
  );
}

export function CategorySelector({
  category,
  items,
  selected,
  onChange,
  getRandomItem,
}) {
  if (!items?.length) return <p>No items available.</p>;

  return (
    <div className={`${category.name}-tab`}>
      <div className="util">
        <h3 style={{ textAlign: "left" }}>
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </h3>
        <button
          className="util-button"
          onClick={() => {
            console.log(`Clearing category: ${category.name}`);
            onChange(category.name, null, null, false);
          }}
        >
          Clear
        </button>
        <button
          className="util-button"
          onClick={() => {
            const selection = getRandomItem(category.name);
            onChange(
              category.name,
              selection.itemId,
              { style: selection.style, src: selection.src },
              true
            );
          }}
        >
          Random
        </button>
      </div>
      <div className="items-list">
        {items.map((item) => {
          const selectedVariant = selected.find((v) => v.itemId === item.id);
          return (
            <div key={item.id} className="item-option">
              <img
                src={item.variants[3]?.src}
                alt="Item Preview"
                className="item-preview"
              />
              <div className="style-buttons">
                <button
                  className={`style-button none ${
                    !selectedVariant ? "selected" : ""
                  }`}
                  onClick={() => onChange(category.name, item.id, null)}
                ></button>
                <button
                  className={`style-button line-art ${
                    selectedVariant?.style === "Line Art" ? "selected" : ""
                  }`}
                  onClick={() =>
                    onChange(
                      category.name,
                      item.id,
                      item.variants.find((v) => v.style === "Line Art") ||
                        item.variants[0]
                    )
                  }
                ></button>
                <button
                  className={`style-button white-fill ${
                    selectedVariant?.style === "White Fill" ? "selected" : ""
                  }`}
                  onClick={() =>
                    onChange(
                      category.name,
                      item.id,
                      item.variants.find((v) => v.style === "White Fill") ||
                        item.variants[1]
                    )
                  }
                ></button>
                <button
                  className={`style-button grey-fill ${
                    selectedVariant?.style === "Grey Fill" ? "selected" : ""
                  }`}
                  onClick={() =>
                    onChange(
                      category.name,
                      item.id,
                      item.variants.find((v) => v.style === "Grey Fill") ||
                        item.variants[2]
                    )
                  }
                ></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const getRandomItem = (categoryName) => {
    console.log(`getRandomItem for category: ${categoryName}`);
    const categoryItems = items[categoryName];
    if (!categoryItems) {
      console.warn(`Category not found in items: ${categoryName}`);
      return { itemId: 0, style: "Line Art", src: "" };
    }
    if (categoryItems.length === 0) {
      console.warn(`No items in category: ${categoryName}`);
      return { itemId: 0, style: "Line Art", src: "" };
    }
    const randomId = randomitem(categoryItems.length);
    if (randomId < 1 || randomId > categoryItems.length) {
      console.warn(
        `Invalid randomId ${randomId} for ${categoryName} (length: ${categoryItems.length})`
      );
      return { itemId: 0, style: "Line Art", src: "" };
    }
    const randomItemData = categoryItems[randomId - 1];
    if (!randomItemData) {
      console.warn(`No item data for ${categoryName} ID: ${randomId}`);
      return { itemId: 0, style: "Line Art", src: "" };
    }
    if (
      !randomItemData.variants ||
      !Array.isArray(randomItemData.variants) ||
      randomItemData.variants.length === 0
    ) {
      console.warn(
        `Invalid variants for ${categoryName} ID: ${randomId}`,
        randomItemData
      );
      return { itemId: 0, style: "Line Art", src: "" };
    }
    return {
      itemId: randomId,
      style: "Line Art",
      src: randomItemData.variants[0].src,
    };
  };

  const defaultItems = categories.reduce(
    (acc, category) => ({
      ...acc,
      [category.name]: [getRandomItem(category.name)],
    }),
    {}
  );

  const [selectedItems, setSelectedItems] = useState(defaultItems);
  const [activeCategory, setActiveCategory] = useState(categories[4]);

  const handleItemChange = (
    categoryName,
    itemId,
    variant,
    isRandom = false
  ) => {
    setSelectedItems((prev) => {
      console.log(
        `handleItemChange: Before update - ${categoryName}:`,
        prev[categoryName]
      );
      const current = prev[categoryName] || [];
      let updated;
      if (itemId === null) {
        console.log(`handleItemChange: Clearing ${categoryName}`);
        updated = [];
      } else if (isRandom) {
        updated = variant && variant.src ? [{ itemId, ...variant }] : [];
      } else {
        const selectedVariant =
          variant && variant.src ? { itemId, ...variant } : null;
        updated = current.filter((v) => v.itemId !== itemId);
        if (selectedVariant) updated.push(selectedVariant);
      }
      console.log(`handleItemChange: After update - ${categoryName}:`, updated);
      return { ...prev, [categoryName]: updated };
    });
  };

  return (
    <div className="app-container">
      <div className="character-wrapper">
        <CharacterPreview selectedItems={selectedItems} />
      </div>
      <div className="options-panel" style={{ display: "inline-block" }}>
        <div className="tabs">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`tab-button ${
                activeCategory.name === category.name ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
        </div>
        <CategorySelector
          category={activeCategory}
          items={items[activeCategory.name] || []}
          selected={selectedItems[activeCategory.name] || []}
          onChange={handleItemChange}
          getRandomItem={getRandomItem}
        />
      </div>
    </div>
  );
}
