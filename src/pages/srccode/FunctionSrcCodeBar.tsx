import { Box, FormControl, TextField } from '@mui/material';
import styles from './srcCode.module.css';
import { ChangeEvent, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';

export default function FunctionPostBar({
  handleSearch
}: {
  handleSearch: (searchKey: string) => void;
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchValue);
    } else if (e.key === 'Delete') {
      setSearchValue(''); // Clear input on Delete key press
    }
  };

  return (
    <Box className={styles.functionPostBar}>
      <div className={styles.recommendBox}>
        <Link className={`${styles.btn} ${styles.btnCreate}`} to="/codes/create">
          <AddCircleOutlineIcon />
          Create
        </Link>
      </div>
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
          onClick={() => handleSearch(searchValue)}
        >
          <SearchIcon />
        </button>
        {searchValue && (
          <button
            className={styles.clearBtn}
            onClick={() => {
              setSearchValue('');
              handleSearch('');
            }}
          >
            <CloseIcon />
          </button>
        )}
      </Box>
    </Box>
  );
}
