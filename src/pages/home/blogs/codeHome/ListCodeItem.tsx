import { Box, List } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './codeHome.module.css';
import { TypeSrcCode } from '../../../../types';

const ListCodeItem = ({ content, name, src_code_id }: TypeSrcCode) => {
  return (
    <List className={`${styles.listItems} ${styles.listPostItems}`}>
      <Link to={`/codes/${src_code_id}`}>
        <Box className={styles.imageItems}>
          <img loading="lazy" src={'/public/images/code.png'} alt="code" />
        </Box>
        <Box className={styles.content}>
          <h2>{name}</h2>
          <p dangerouslySetInnerHTML={{ __html: content || '' }}></p>
        </Box>
      </Link>
    </List>
  );
};

export default ListCodeItem;
