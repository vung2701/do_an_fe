import { Box, FormControl, TextField } from '@mui/material';
import styles from './articles.module.css';
import { ChangeEvent, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export default function FunctionBar({
  seachKey,
  setPage,
  setSearchKey
}: {
  seachKey?: string;
  setPage?: any;
  setSearchKey?: any;
}) {
  const [searchValue, setSearchValue] = useState(seachKey);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchKey(searchValue);
      setPage(1);
    } else if (e.key === 'Delete') {
      setSearchValue(''); // Clear input on Delete key press
    }
  };

  return (
    <Box className={styles.functionPostBar}>
      <Box className={styles.searchBox}>
        <FormControl className={styles.searchItem}>
          <TextField
            className={styles.searchInput}
            margin="dense"
            type="text"
            value={searchValue}
            onChange={handleChange}
            variant="outlined"
            onKeyDown={handleEnterKeyPress}
          />
        </FormControl>
        <button
          className={`${styles.btn} ${styles.btnSearch}`}
          onClick={() => {
            setSearchKey(searchValue);
            setPage(1);
          }}
        >
          <SearchIcon />
        </button>
        {searchValue && (
          <button
            className={styles.clearBtn}
            onClick={() => {
              setSearchValue('');
              setSearchKey('');
              setPage(1);
            }}
          >
            <CloseIcon />
          </button>
        )}
      </Box>
    </Box>
  );
}
