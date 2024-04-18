import { Link } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from './backBtn.module.css';

export default function BackBtn({ link }: { link: string }) {
    return (
        <Link to={link} className={styles.backBtn}>
            <ChevronLeftIcon />
            Back
        </Link>
    )
}