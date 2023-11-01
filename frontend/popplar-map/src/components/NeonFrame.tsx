import styles from './styles/neonFrame.module.css'

export default function NeonFrame() {
  return(
    <div className={styles.container}>
      <div className={styles["top-left"]}></div>
      <div className={styles["top-right"]}></div>
      <div className={styles["top-linear-left"]}></div>
      <div className={styles["top-linear-left-right"]}></div>
      <div className={styles["top-linear-right"]}></div>
      
      <div className={styles["left"]}></div>
      <div className={styles["right"]}></div>

      <div className={styles["bottom-left"]}></div>
      <div className={styles["bottom-right"]}></div>
      <div className={styles["bottom-center"]}></div>
      <div className={styles["bottom-linear-left"]}></div>
      <div className={styles["bottom-linear-right"]}></div>

      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}