import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import styles from './details.module.css';

export default function LimitDetails() {
    return (
        <Box className={styles.limitDetails}>
            <div>
                <span>You can only view 2 articles per month.</span>
                <Link to='/login'> Login for unlimited reading.</Link>
                <div className={styles.readed}> Alternatively, you could access your eligible reading list
                 <Link to='/articles' state="readed" >here.</Link>
                 </div>
            </div>
        </Box>
    )
}