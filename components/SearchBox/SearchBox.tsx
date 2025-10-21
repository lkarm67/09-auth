import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useDebounce } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;  
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedValue] = useDebounce(inputValue, 1000);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  
  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />
  );
};