import React, { useRef } from "react";
import styles from "./UserFilter.module.css";

interface UserFilterProps {
  onFilter: (value: string) => void;
  onReset: () => void;
}

const DEBOUNCE_DELAY = 400; 

function debounce(fn: (value: string) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (value: string) => {
    if (timer) clearTimeout(timer);
    if (value.trim() === "") {
      fn(""); 

      return;
    }
    timer = setTimeout(() => fn(value), delay);
  };
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilter, onReset }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedFilter = useRef(debounce(onFilter, DEBOUNCE_DELAY));

  React.useEffect(() => {
    debouncedFilter.current = debounce(onFilter, DEBOUNCE_DELAY);
  }, [onFilter]);

  return (
    <div className={styles.filter}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Фильтр по имени..."
        onChange={(e) => debouncedFilter.current(e.target.value)}
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
