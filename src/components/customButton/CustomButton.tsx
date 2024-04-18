import styles from './customBotton.module.css';

interface TypeButton {
  name?: string;
  classNameAdd?: string;
  handleClick?: () => void;
}

export default function CustomButton({
  name,
  classNameAdd,
  handleClick
}: TypeButton) {
  const combinedClass = `${styles.btn} ${classNameAdd || ''}`;

  return (
    <button type="submit" className={combinedClass.trim()} onClick={handleClick}>
      {name}
    </button>
  );
}
