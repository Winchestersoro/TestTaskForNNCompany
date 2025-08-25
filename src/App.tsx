import React, { useEffect, useRef } from "react";
import Loader from "./components/Loader";
import UserFilter from "./components/UserFilter";
import UserTable from "./components/UserTable";
import type { User } from "./components/UserTable";
import "./App.css";

function App() {
  const [filtered, setFiltered] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  const allUsers = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=15")
      .then((res) => res.json())
      .then((data) => {
        allUsers.current = data.results;
        setFiltered(data.results);
      })
      .catch(() => setFiltered([]))
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (value: string) => {
    const v = value.trim().toLowerCase();
    if (!v) {
      setFiltered(allUsers.current);
      return;
    }
    setFiltered(
      allUsers.current.filter((u: User) =>
        `${u.name.first} ${u.name.last}`.toLowerCase().includes(v)
      )
    );
  };

  const handleReset = () => {
    setFiltered(allUsers.current);
  };

  return (
    <div className="app-container">
      <h1>Таблица пользователей</h1>
      <UserFilter onFilter={handleFilter} onReset={handleReset} />
      <div className="table-wrapper">
        {loading ? <Loader /> : <UserTable users={filtered} />}
      </div>
    </div>
  );
}

export default App;
