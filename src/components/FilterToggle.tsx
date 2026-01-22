export type AlcoholFilter =
  | "All"
  | "Alcoholic"
  | "Non alcoholic";

export interface FilterToggleProps {
  value: AlcoholFilter;
  onChange: (value: AlcoholFilter) => void;
  disabled?: boolean;
}

const FILTERS: AlcoholFilter[] = [
  "All",
  "Alcoholic",
  "Non alcoholic",
];

export default function FilterToggle({
  value,
  onChange,
  disabled,
}: FilterToggleProps) {
  return (
    <div className="flex gap-2 mb-6">
      {FILTERS.map((filter) => {
        const isActive = value === filter;

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            disabled={disabled}
            className={`px-3 py-1 rounded-full text-sm border transition
              ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
