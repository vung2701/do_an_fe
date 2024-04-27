import { Avatar, Box, Container, List, Tab, Tabs, Typography } from '@mui/material';
import styles from './articles.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, getArticlesByType, getKnowledgeType } from '../../services';
import { concatLinkImage, convertDate, sortByDate } from '../../types/utils';
import { TypeArticle, TypeAuthor, TypeKnowledgeType } from '../../types';
import FunctionBar from './FunctionBar';
import { isLogin } from '../../middlewares/Authorization';

export default function Articles() {
  const [articles, setArticles] = useState<TypeArticle[]>([]);
  const [knowledgeTypes, setKnowledgeTypes] = useState<TypeKnowledgeType[]>([]);
  const [authors, setAuthors] = useState<TypeAuthor[]>([]);
  const [tab, setTab] = useState('all');

  // pagination
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

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
      if (tab == 'all') {
        const res = await getArticles();
        setArticles(res.article);
      } else {
        const res = await getArticlesByType(tab);
        setArticles(res.articles);
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
    if (tab == 'all') {
      fetchArticles();
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [tab]);
  return (
    <Container className={`container-1`}>
      <Box className={styles.article}>
        <div className={styles.articleTitleBox}>
          <h2 className={styles.articleTitle}>
            <Link to={'/articles'}>Articles</Link>
          </h2>
        </div>

        {/* <FunctionBar
          author={author}
          handleChangeAuthor={handleChangeAuthor}
          authors={authors}
          publishedFrom={publishedFrom}
          handleChangePublishedFrom={handleChangePublishedFrom}
          publishedTo={publishedTo}
          handleChangePublishedTo={handleChangePublishedTo}
          handleFilter={handleFilter}
          isLanguage={isLanguage}
          handleLanguage={handleLanguage}
          handleReset={handleReset}
        /> */}

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
                    Published on {convertDate(item.published_on)}
                  </Typography>
                  <Box
                    className={`${styles.content} `}
                    dangerouslySetInnerHTML={{ __html: item.content || '' }}
                  ></Box>
                </Box>
                <Box className={styles.articleInfor}>
                  <Avatar alt={item.author} src={concatLinkImage(item.author_img)} />
                  <p className={styles.articleInforLike}>{item.likes} likes</p>
                  <p className={styles.articleInforComment}>
                    {item.comment_list?.length} comments
                  </p>
                </Box>
              </Link>
            ))
          ) : (
            <Box className={styles.noArticles}>No article.</Box>
          )}
        </List>
        {page * pageSize <= total && (
          <button
            className={styles.viewMore}
            onClick={() => {
              if (page * pageSize <= total) setPage(page + 1);
            }}
          >
            {t('View_more')}
          </button>
        )}
      </Box>
    </Container>
  );
}
