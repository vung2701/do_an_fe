import { Box, Container, List, Typography } from '@mui/material';
import styles from './posts.module.css';
import { Link } from 'react-router-dom';
import FunctionPostBar from './FunctionPostBar';
import { TypePost } from '../../types';
import { useEffect, useState } from 'react';
import { getPosts } from '../../services';
import { concatLinkImage, convertDate } from '../../types/utils';

export default function Posts() {
  const [posts, setPosts] = useState<TypePost[]>([]);
  const [filterPosts, setFilterPosts] = useState<TypePost[]>([]);
  const [searchKey, setSearchKey] = useState('');
  // pagination
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(page, pageSize, searchKey);
        setPosts([...posts, ...data.post]);
        setTotal(data.total);
        setFilterPosts([...posts, ...data.post]);
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
            <Link to={'/posts'}>Posts</Link>
          </h2>
        </div>

        <FunctionPostBar
          seachKey={searchKey}
          setSearchKey={setSearchKey}
          setPage={setPage}
        />

        <List className={styles.listArticle}>
          <Box className={styles.boxDivider}>
            <h3>List of Post</h3>
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
                    Published on: {convertDate(item.created_on)}
                  </Typography>
                  <Box className={`${styles.content} `}>
                    <p dangerouslySetInnerHTML={{ __html: item.content || '' }}></p>
                  </Box>
                </Box>
                <Box className={styles.articleInfor}>
                  <p className={styles.articleInforLike}>{item.likes} Likes</p>
                  <p className={styles.articleInforComment}>
                    {item.comments} Comments
                  </p>
                </Box>
              </Link>
            ))
          ) : (
            <Box className={styles.noArticles}>No Post.</Box>
          )}
        </List>
        {page * pageSize <= total && (
          <button
            className={styles.viewMore}
            onClick={() => {
              if (page * pageSize <= total) setPage(page + 1);
            }}
          >
            View more
          </button>
        )}
      </Box>
    </Container>
  );
}
