import "./styles.css";
import { useState } from "react";
import { items } from "./data.js";

export function CharacterPreview({ selectedItems }) {
  const allSelected = [
    ...selectedItems.background,
    ...selectedItems.baccessory,
    ...selectedItems.hair,
...selectedItems.ear,
    ...selectedItems.body,
    ...selectedItems.eye,
    ...selectedItems.eyebrow,
    ...selectedItems.mouth,
    ...selectedItems.nose,
    ...selectedItems.bang,
    ...selectedItems.sock,
    ...selectedItems.glove,
    ...selectedItems.shoes,
    ...selectedItems.bottom,
    ...selectedItems.top,
    ...selectedItems.accessory,
  ];

  return (
    <div className="character-preview">
      {allSelected.map((variant) => (
        <img
          key={`${variant.itemId}-${variant.style}`}
          src={variant.src}
          alt={`${variant.style} ${variant.itemId}`}
          style={{ position: "absolute" }}
        />
      ))}
    </div>
  );
}

export function CategorySelector({ category, items, selected, onChange }) {
  if (!items?.length) return <p>No items available.</p>;

  return (
    <div className={`${category}-tab`}>
      <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
      <div className="items-list">
        {items.map((item) => {
          const selectedVariant = selected.find((v) => v.itemId === item.id);
          return (
            <div key={item.id} className="item-option">
              <img
                src={item.variants[0].src} // Default to first variant (usually line art)
                alt="Coming Soon"
                className="item-preview"
                onError={(e) =>
                  (e.target.parentElement.style.display = "inline-block")
                } // Hide if missing
              />
              <div className="style-buttons">
                <button
                  className={`style-button none ${
                    !selectedVariant ? "selected" : ""
                  }`}
                  onClick={() => onChange(category, item.id, null)}
                ></button>
                <button
                  className={`style-button line-art ${
                    selectedVariant?.style === "Line Art" ? "selected" : ""
                  }`}
                  onClick={() =>
                    onChange(
                      category,
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
                      category,
                      item.id,
                      item.variants.find((v) => v.style === "White Fill") ||
                        item.variants[1]
                    )
                  }
                ></button>
                <button
                  className={`style-button grey-fill ${
                    selectedVariant?.style === "grey Fill" ? "selected" : ""
                  }`}
                  onClick={() =>
                    onChange(
                      category,
                      item.id,
                      item.variants.find((v) => v.style === "grey Fill") ||
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
  const [selectedItems, setSelectedItems] = useState({
    background: [],
    baccessory: [],
    hair: [],
ear: [],
    body: [],
    eye: [],
    eyebrow: [],
    mouth: [],
    nose: [],
    bang: [],
    sock: [],
    glove: [],
    shoes: [],
    bottom: [],
    top: [],
    accessory: [],
  });
  const categories = [
    "background",
    "baccessory",
    "hair",
"ear",
    "body",
    "eye",
    "eyebrow",
    "mouth",
    "nose",
    "bang",
    "sock",
    "glove",
    "shoes",
    "bottom",
    "top",
    "accessory",
  ];
  const [activeCategory, setActiveCategory] = useState("body");
  const handleItemChange = (category, itemId, variant) => {
    setSelectedItems((prev) => {
      const current = prev[category];
      const selectedVariant = variant ? { itemId, ...variant } : null;
      const updated = current.filter((v) => v.itemId !== itemId);
      if (selectedVariant) updated.push(selectedVariant);
      return { ...prev, [category]: updated };
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
              key={category}
              className={`tab-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <CategorySelector
          category={activeCategory}
          items={items[activeCategory]}
          selected={selectedItems[activeCategory]}
          onChange={handleItemChange}
        />
      </div>
    </div>
  );
}
