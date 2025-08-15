import React from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  image: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ image, children }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <span
      className={styles.tooltipWrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={styles.tooltip}>
          <img src={image} alt="full" className={styles.tooltipImg} />
        </div>
      )}
    </span>
  );
};

export default Tooltip;
