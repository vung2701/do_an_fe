import { Box, Container, List, Typography } from '@mui/material';
import styles from './posts.module.css';
import { Link, useNavigate } from 'react-router-dom';
import FunctionPostBar from './FunctionPostBar';
import { TypePost } from '../../types';
import { useEffect, useState } from 'react';
import { getPosts } from '../../services';
import { concatLinkImage, convertDate } from '../../types/utils';
import { useTranslation } from 'react-i18next';
import { isLogin } from '../../middlewares/Authorization';

export default function Posts() {
  const [posts, setPosts] = useState<TypePost[]>([]);
  const [filterPosts, setFilterPosts] = useState<TypePost[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const { t } = useTranslation();
  // pagination
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin()) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(page, pageSize, searchKey);
        if (page == 1) {
          setPosts(data.post);
          setTotal(data.total);
          setFilterPosts(data.post);
        } else {
          setPosts([...posts, ...data.post]);
          setTotal(data.total);
          setFilterPosts([...posts, ...data.post]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPosts();
  }, [pageSize, page, searchKey]);

  return (
    <Container className="container-1">
      <Box className={styles.article}>
        <div className={styles.articleTitleBox}>
          <h2 className={styles.articleTitle}>
            <Link to={'/posts'}>{t('POSTS')}</Link>
          </h2>
        </div>

        <FunctionPostBar
          seachKey={searchKey}
          setSearchKey={setSearchKey}
          setPage={setPage}
        />

        <List className={styles.listArticle}>
          <Box className={styles.boxDivider}>
            <h3>{t('LIST_OF_POST')}</h3>
            <Box className={styles.divider}></Box>
          </Box>

          {filterPosts?.length > 0 ? (
            filterPosts.map((item, index) => (
              <Link
                key={index}
                to={`/posts/${item.post_id}`}
                className={styles.articleItem}
              >
                <Box className={styles.imageItem}>
                  <img
                    loading="lazy"
                    src={
                      item?.created_by_image
                        ? concatLinkImage(item?.created_by_image)
                        : '/public/images/user.png'
                    }
                    alt="image"
                  />
                </Box>
                <Box className={styles.articleContent}>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography variant="body1" className={styles.published}>
                    {t('PUBLISHED_ON')} {convertDate(item.created_on)}
                  </Typography>
                  <Box className={`${styles.content} `}>
                    <p dangerouslySetInnerHTML={{ __html: item.content || '' }}></p>
                  </Box>
                </Box>
                <Box className={styles.articleInfor}>
                  <p className={styles.articleInforLike}>
                    {item.likes} {t('LIKES')}
                  </p>
                  <p className={styles.articleInforComment}>
                    {item.comments} {t('COMMENTS')}
                  </p>
                </Box>
              </Link>
            ))
          ) : (
            <Box className={styles.noArticles}>{t('NO_POSTS')} </Box>
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
