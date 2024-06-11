import { Box, Container, List, Tab, Tabs, Typography } from '@mui/material';
import styles from './srcCode.module.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllLanguage, getSrcCode } from '../../services';
import { convertDate } from '../../types/utils';
import { TypeLanguage, TypeSrcCode } from '../../types';
import FunctionSrcCodeBar from './FunctionSrcCodeBar';
import { useTranslation } from 'react-i18next';
import { isLogin } from '../../middlewares/Authorization';

export default function Articles() {
  const [srcCodes, setSrcCodes] = useState<TypeSrcCode[]>([]);
  const [languages, setLanguage] = useState<TypeLanguage[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [tab, setTab] = useState('all');
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin()) {
      navigate('/login');
    }
  }, []);

  // pagination
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // change tab
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    setPage(1);
  };

  const fetchSrcCodes = async () => {
    try {
      if (tab == 'all') {
        const res = await getSrcCode(page, pageSize, '', searchKey);
        if (page == 1) {
          setSrcCodes(res.src_code);
          setTotal(res.total);
        } else {
          setSrcCodes([...srcCodes, ...res.src_code]);
        }
      } else {
        const res = await getSrcCode(page, pageSize, tab);
        if (page == 1) {
          setSrcCodes(res.src_code);
          setTotal(res.total);
        } else {
          setSrcCodes([...srcCodes, ...res.src_code]);
        }
      }
    } catch (error) {
      console.error('Error fetching src codes:', error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const res = await getAllLanguage();
      setLanguage(res.languages);
    } catch (error) {
      console.error('Error fetching knowledge_types:', error);
    }
  };

  useEffect(() => {
    fetchLanguages();
    if (tab == 'all') {
      fetchSrcCodes();
    }
  }, [tab, page, pageSize, searchKey]);

  useEffect(() => {
    fetchSrcCodes();
  }, [tab]);
  return (
    <Container className={`container-1`}>
      <Box className={styles.article}>
        <div className={styles.articleTitleBox}>
          <h2 className={styles.articleTitle}>
            <Link to={'/codes'}>Codes</Link>
          </h2>
        </div>

        <FunctionSrcCodeBar
          setPage={setPage}
          setSearchKey={setSearchKey}
          seachKey={searchKey}
        />

        <List className={styles.listArticle}>
          {/* tab in top list */}
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#0b6623',
                  height: '3px'
                }
              }}
              sx={{ borderBottom: '1px solid #ccc' }}
            >
              <Tab
                value="all"
                label={t('ALL')}
                sx={{
                  color: '#666',
                  '&.Mui-selected': {
                    color: '#0b6623',
                    fontWeight: '600'
                  },
                  textTransform: 'none',
                  fontSize: '20px',
                  fontFamily: `'Inter', sans-serif`
                }}
              />
              {languages &&
                languages.map((item) => (
                  <Tab
                    value={item.id}
                    label={item.name}
                    sx={{
                      color: '#666',
                      '&.Mui-selected': {
                        color: '#0b6623',
                        fontWeight: '600'
                      },
                      textTransform: 'none',
                      fontSize: '20px',
                      fontFamily: `'Inter', sans-serif`
                    }}
                  />
                ))}
            </Tabs>
          </Box>

          {srcCodes?.length > 0 ? (
            srcCodes.map((item) => (
              <Link
                key={item.src_code_id}
                to={`/codes/${item.src_code_id}`}
                className={styles.articleItem}
              >
                <Box className={styles.imageItem}>
                  <img loading="lazy" src="/images/code.png" alt="image" />
                </Box>
                <Box className={styles.articleContent}>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography variant="body1" className={styles.published}>
                    {t('PUBLISHED_ON')} {convertDate(item.created_on)}
                  </Typography>
                  <Box className={`${styles.content} `}>
                    <p dangerouslySetInnerHTML={{ __html: item.content || '' }}></p>
                  </Box>
                </Box>
              </Link>
            ))
          ) : (
            <Box className={styles.noArticles}>{t('NO_CODES')}</Box>
          )}
        </List>
        {page * pageSize <= total && (
          <button
            className={styles.viewMore}
            onClick={() => {
              if (page * pageSize <= total) setPage(page + 1);
            }}
          >
            {t('VIEW_MORE')}
          </button>
        )}
      </Box>
    </Container>
  );
}
