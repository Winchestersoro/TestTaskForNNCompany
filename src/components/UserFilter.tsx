import React, { useRef } from "react";
import styles from "./UserFilter.module.css";

interface UserFilterProps {
  onFilter: (value: string) => void;
  onReset: () => void;
}

function debounce(fn: (value: string) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (value: string) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(value), delay);
  };
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilter, onReset }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedFilter = useRef(
    debounce((value: string) => onFilter(value), 400)
  ).current;
  return (
    <div className={styles.filter}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Фильтр по имени..."
        onChange={(e) => debouncedFilter(e.target.value)}
        className={styles.input}
      />
      <button
        type="button"
        onClick={() => {
          if (inputRef.current) inputRef.current.value = "";
          onReset();
        }}
        className={styles.button}
      >
        Сброс
      </button>
    </div>
  );
};

export default UserFilter;
