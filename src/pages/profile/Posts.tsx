import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPosts } from '../../services';
import { TypePost } from '../../types';
import { concatLinkImage, getObjFromLocal } from '../../types/utils';
import TitleProfile from './TitleProfile';
import styles from './profile.module.css';
import CreateIcon from '@mui/icons-material/Create';

import { Link, useParams } from 'react-router-dom';

const PostsItems = ({
  post_id,
  title,
  created_by_image,
  content,
  created_by
}: TypePost) => {
  const user = getObjFromLocal('user');

  return (
    <Box className={styles.contentProject}>
      <Link to={`/posts/${post_id}`} className={styles.contentLink}>
        <img
          src={
            created_by_image
              ? concatLinkImage(created_by_image)
              : '/public/images/user.png'
          }
          alt="post user"
        />
        <div className={styles.content}>
          <h6>{title}</h6>
          <span dangerouslySetInnerHTML={{ __html: content || '' }}></span>
        </div>
      </Link>
      <div className={styles.icon}>
        {created_by === user.user_id ? (
          <>
            <Link to={`/posts/update/${post_id}`}>
              <CreateIcon />
            </Link>
          </>
        ) : (
          ''
        )}
      </div>
    </Box>
  );
};

export default function Posts() {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const data = await getPosts();
          const filteredData = data.post.filter(
            (i: TypePost) => i.created_by === id
          );
          setPosts(filteredData);
        } catch (error) {
          console.error('Error fetching or filtering post:', error);
        }
      };
      fetchPost();
    } else {
      console.error('User data not found in localStorage');
    }
  }, [id]);

  return (
    <Box className={styles.article} sx={{ marginBottom: '30px' }}>
      <TitleProfile title="Posts" />
      <div className={styles.articleContent}>
        {posts.length <= 0 ? (
          <p className={styles.noProject}>'No Posts.'</p>
        ) : (
          <>
            {posts.length > 0 &&
              posts.map((item: TypePost) => (
                <PostsItems
                  key={item?.post_id}
                  post_id={item?.post_id}
                  created_by_image={item?.created_by_image}
                  title={item?.title}
                  content={item?.content}
                  created_by={item?.created_by}
                />
              ))}
          </>
        )}
      </div>
    </Box>
  );
}
