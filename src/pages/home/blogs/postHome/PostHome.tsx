import { Box } from '@mui/material';
import styles from './postHome.module.css';
import Titles from '../../../../components/titles/Titles';
import ListPostItem from './ListPostItem';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { TypePost } from '../../../../types';
import { getPosts } from '../../../../services';
import { useTranslation } from 'react-i18next';

export default function PostHome() {
  const [posts, setPosts] = useState<TypePost[]>([]);
  const { t } = useTranslation();

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.post.slice(0, 4));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/*Posts  */}
      {posts && (
        <Box className={`${styles.contents}`}>
          <Box className={styles.rowsTitle}>
            <Titles classNameAdd="title" name={t('POSTS')} />
          </Box>
          <div className={styles.content2}>
            {posts?.length > 0 &&
              posts?.map((row) => (
                <ListPostItem
                  key={row?.post_id}
                  title={row?.title}
                  content={row?.content}
                  likes={row?.likes}
                  comments={row?.comments}
                  created_by_image={row?.created_by_image}
                  post_id={row?.post_id}
                />
              ))}
          </div>
          <Box className={styles.viewmore}>
            <Link to="/posts">{t('VIEW_MORE')}</Link>
          </Box>
          <Link to="/posts/create" className={styles.createBtn}>
            <AddCircleOutlineIcon />
          </Link>
        </Box>
      )}
    </>
  );
}
