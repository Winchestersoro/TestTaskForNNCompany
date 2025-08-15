import React from "react";
import Tooltip from "./Tooltip";
import styles from "./UserTable.module.css";

export interface User {
  name: { first: string; last: string };
  picture: { thumbnail: string; large: string };
  location: { state: string; city: string };
  email: string;
  phone: string;
  registered: { date: string };
}

interface UserTableProps {
  users: User[];
}
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
const UserTable: React.FC<UserTableProps> = ({ users }) => {
  if (users.length === 0) {
    return <div className={styles.notFound}>Пользователи не найдены</div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Имя</th>
          <th className={styles.th}>Фото</th>
          <th className={styles.th}>Местоположение</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}>Телефон</th>
          <th className={styles.th}>Дата регистрации</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr className={styles.tr} key={idx}>
            <td className={styles.td}>
              {user.name.first} {user.name.last}
            </td>
            <td className={styles.td}>
              <Tooltip image={user.picture.large}>
                <img
                  src={user.picture.thumbnail}
                  alt="thumb"
                  className={styles.imgThumb}
                />
              </Tooltip>
            </td>
            <td className={styles.td}>
              {user.location.state}, {user.location.city}
            </td>
            <td className={styles.td}>{user.email}</td>
            <td className={styles.td}>{user.phone}</td>
            <td className={styles.td}>{formatDate(user.registered.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
