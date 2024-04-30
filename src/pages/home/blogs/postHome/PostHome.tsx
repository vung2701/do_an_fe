import { Box } from '@mui/material';
import styles from './postHome.module.css';
import Titles from '../../../../components/titles/Titles';
import ListPostItem from './ListPostItem';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { TypePost } from '../../../../types';
import { getPosts } from '../../../../services';

export default function PostHome() {
  const [posts, setPosts] = useState<TypePost[]>([]);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.post.slice(0, 6));
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
            <Titles classNameAdd="title" name="Posts" />
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
            <Box className={styles.viewmore}>
              <Link to="/posts">View more</Link>
            </Box>
          </div>
          <Link to="/posts/create" className={styles.createBtn}>
            <AddCircleOutlineIcon />
          </Link>
        </Box>
      )}
    </>
  );
}
