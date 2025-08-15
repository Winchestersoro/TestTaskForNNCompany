import styles from "./Loader.module.css";

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = "Загрузка..." }) => (
  <div className={styles.loader}>
    <span className={styles.loaderText}>{text}</span>
  </div>
);

export default Loader;
