import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, TextField } from "@mui/material";
import styles from './articles.module.css';
import { FunctionBarProps } from "../../types";


export default function FunctionBar({
    author,
    handleChangeAuthor,
    authors,
    publishedFrom,
    handleChangePublishedFrom,
    publishedTo,
    handleChangePublishedTo,
    handleFilter,
    handleReset,
    isLanguage,
    handleLanguage,
}: FunctionBarProps) {

    return (
        <Box className={styles.btnGroup}>
            <Box className={styles.filterBox}>
                <div className={styles.nation}>
                    <InputLabel className={styles.nationLabel}>Language</InputLabel>
                    <button onClick={handleLanguage}>
                        {isLanguage ? (
                            <img loading='lazy' src="public/images/vm-flag.gif" alt="langue" />
                        ) : (
                            <img loading='lazy' src="public/images/uk-flag.gif" alt="langue" />
                        )}
                    </button>
                </div>
                <FormControl className={styles.selectAuthor} sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                        id='author-text-field'
                        name='author'
                        label="Author"
                        select
                        value={author}
                        onChange={handleChangeAuthor}
                        variant="standard"
                    >
                        <MenuItem value='none' disabled>-- Select --</MenuItem>
                        {authors.map((item) =>
                            <MenuItem key={item.user_id_profile} value={item.user_id_profile}>{`${item.first_name} ${item.last_name}`}</MenuItem>
                        )}
                    </TextField>
                </FormControl>
                <FormControl className={styles.dateInput} sx={{ m: 1, minWidth: 100 }} >
                    <TextField
                        id='published-from'
                        label='Published from'
                        variant='standard'
                        type="date"
                        name='publish_from'
                        value={publishedFrom}
                        onChange={handleChangePublishedFrom}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ max: publishedTo }}
                    />
                </FormControl>
                <FormControl className={styles.dateInput} sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                        id='published-to'
                        label="Published to"
                        variant='standard'
                        name='published_to'
                        type='date'
                        value={publishedTo}
                        onChange={handleChangePublishedTo}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ min: publishedFrom }}
                    />
                </FormControl>
            </Box>
            <Box className={styles.filterBtn}>
                <button className={`${styles.btn} ${styles.btnBorrow}`} onClick={handleFilter}>Filter</button>
                <button className={`${styles.btn} ${styles.btnLend}`} onClick={handleReset}>Reset</button>
            </Box>
        </Box>
    )
}