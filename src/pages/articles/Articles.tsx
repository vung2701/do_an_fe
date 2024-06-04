import { Avatar, Box, Container, List, Tab, Tabs, Typography } from '@mui/material';
import styles from './articles.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, getArticlesByType, getKnowledgeType } from '../../services';
import { concatLinkImage, convertDate, sortByDate } from '../../types/utils';
import { TypeArticle, TypeKnowledgeType } from '../../types';
import FunctionBar from './FunctionBar';
import { useTranslation } from 'react-i18next';

export default function Articles() {
  const [articles, setArticles] = useState<TypeArticle[]>([]);
  const [knowledgeTypes, setKnowledgeTypes] = useState<TypeKnowledgeType[]>([]);
  const [tab, setTab] = useState('');
  const { t } = useTranslation();

  // pagination
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchKey, setSearchKey] = useState('');

  if (articles.length > 0) {
    sortByDate(articles, 'created_on');
  }

  // change tab
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    setPage(1);
  };

  const fetchArticles = async () => {
    try {
      const res = await getArticles(page, pageSize, searchKey, tab);
      if (page == 1) {
        setArticles(res.article);
        setTotal(res.total);
      } else {
        setArticles([...articles, ...res.article]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchKnowledgeTypes = async () => {
    try {
      const res = await getKnowledgeType();
      setKnowledgeTypes(res.knowledge_types);
    } catch (error) {
      console.error('Error fetching knowledge_types:', error);
    }
  };

  useEffect(() => {
    fetchKnowledgeTypes();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [tab, page, pageSize, searchKey]);
  return (
    <Container className={`container-1`}>
      <Box className={styles.article}>
        <div className={styles.articleTitleBox}>
          <h2 className={styles.articleTitle}>
            <Link to={'/articles'}>{t('ARTICLES')}</Link>
          </h2>
        </div>

        <List className={styles.listArticle}>
          <FunctionBar
            seachKey={searchKey}
            setSearchKey={setSearchKey}
            setPage={setPage}
          />

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
                value=""
                label="All "
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
              {knowledgeTypes &&
                knowledgeTypes.map((item) => (
                  <Tab
                    value={item.knowledge_type_id}
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

          {articles?.length > 0 ? (
            articles.map((item) => (
              <Link
                key={item.article_id}
                to={`/articles/${item.article_id}`}
                className={styles.articleItem}
              >
                <Box className={styles.imageItem}>
                  <img
                    loading="lazy"
                    src={concatLinkImage(item.image)}
                    alt="image"
                  />
                </Box>
                <Box className={styles.articleContent}>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography variant="body1" className={styles.published}>
                    {t('PUBLISHED_ON')} {convertDate(item.published_on)}
                  </Typography>
                  <Box
                    className={`${styles.content} `}
                    dangerouslySetInnerHTML={{ __html: item.content || '' }}
                  ></Box>
                </Box>
                <Box className={styles.articleInfor}>
                  <Avatar alt={item.author} src={concatLinkImage(item.author_img)} />
                  <p className={styles.articleInforLike}>
                    {item.likes} {t('LIKES')}
                  </p>
                  <p className={styles.articleInforComment}>
                    {item?.comments} {t('COMMENTS')}
                  </p>
                </Box>
              </Link>
            ))
          ) : (
            <Box className={styles.noArticles}>
              <p>{t('NO_ARTICLES')}</p>
            </Box>
          )}
        </List>
        {page * pageSize < total && (
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
