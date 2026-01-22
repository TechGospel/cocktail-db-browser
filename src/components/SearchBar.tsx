import { useState, type FormEvent } from "react";

export interface SearchBarProps {
  onSearch: (ingredient: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = value.trim();
    if (!trimmed) return;

    onSearch(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center mb-6"
    >
      <input
        type="text"
        placeholder="Search by ingredient (e.g. vodka, lemon)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
