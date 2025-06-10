import type { SortKey, SortOrder } from "../types";

interface SortButtonsProps {
  sortKey: SortKey;
  sortOrder: SortOrder
  onSort: (key: SortKey) => void;
}

export function SortButtons({ sortKey, sortOrder, onSort}: SortButtonsProps) {
  const options: { label: "Name" | "Price" | "Quantity"; key: SortKey }[] = [
    { label: "Name", key: "title" },
    { label: "Price", key: "price" },
    { label: "Quantity", key: "quantity" },
  ];

    const getArrow = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="product-sorting-buttons">
      {options.map(({ label, key }) => (
        <button
          key={key}
          className={sortKey === key ? "active" : ""}
          onClick={() => onSort(key)}
        >
          {label}
          {getArrow(key)}
        </button>
      ))}
      <button className={!sortKey ? "active" : ""} onClick={() => onSort(null)}>
        Reset
      </button>
    </div>
  );
}
