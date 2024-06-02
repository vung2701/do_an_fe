import { Box } from '@mui/material';
import styles from './codeHome.module.css';
import Titles from '../../../../components/titles/Titles';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { TypeSrcCode } from '../../../../types';
import { getSrcCode } from '../../../../services';
import ListCodeItem from './ListCodeItem';
import { useTranslation } from 'react-i18next';

export default function CodeHome() {
  const [codes, setCodes] = useState<TypeSrcCode[]>([]);
  const { t } = useTranslation();

  const fetchCodes = async () => {
    try {
      const data = await getSrcCode();
      console.log(data);
      setCodes(data.src_code.slice(0, 6));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <>
      {/*Posts  */}
      {codes && (
        <Box className={`${styles.contents}`}>
          <Box className={styles.rowsTitle}>
            <Titles classNameAdd="title" name="Codes" />
          </Box>
          <div className={styles.content2}>
            {codes?.length > 0 &&
              codes?.map((row) => (
                <ListCodeItem
                  key={row?.src_code_id}
                  name={row?.name}
                  content={row?.content}
                  src_code_id={row?.src_code_id}
                />
              ))}
          </div>
          <Box className={styles.viewmore}>
            <Link to="/codes">{t('VIEW_MORE')}</Link>
          </Box>
          <Link to="/codes/create" className={styles.createBtn}>
            <AddCircleOutlineIcon />
          </Link>
        </Box>
      )}
    </>
  );
}
