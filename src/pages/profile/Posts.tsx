import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPosts } from '../../services';
import { TypePost } from '../../types';
import { concatLinkImage, getObjFromLocal } from '../../types/utils';
import TitleProfile from './TitleProfile';
import styles from './profile.module.css';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link, useParams } from 'react-router-dom';
import DeleteDialog from './DeleteDialog';

const PostsItems = ({
  post_id,
  title,
  created_by_image,
  content,
  created_by,
  fetchPosts
}: TypePost) => {
  const user = getObjFromLocal('user');
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleClose = () => {
    setDeleteDialog(false);
  };

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
          <p dangerouslySetInnerHTML={{ __html: content || '' }}></p>
        </div>
      </Link>
      {created_by === user.user_id && (
        <div className={styles.icon}>
          <button>
            <Link to={`/posts/update/${post_id}`}>
              <CreateIcon />
            </Link>
          </button>
          <button
            onClick={() => {
              setDeleteDialog(true);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      )}

      <DeleteDialog
        isOpen={deleteDialog}
        handleClose={handleClose}
        id={post_id}
        fetchData={fetchPosts}
        type="post"
      />
    </Box>
  );
};

export default function Posts() {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await getPosts(1, 50);
      const filteredData = data.post.filter((i: TypePost) => i.created_by === id);
      setPosts(filteredData);
    } catch (error) {
      console.error('Error fetching or filtering post:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPosts();
    } else {
      console.error('User data not found in localStorage');
    }
  }, [id]);

  return (
    <Box className={styles.article} sx={{ marginBottom: '30px' }}>
      <TitleProfile title="Posts" />
      <div className={styles.articleContent}>
        {posts.length <= 0 ? (
          <p className={styles.noProject}>No Posts.</p>
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
                  fetchPosts={fetchPosts}
                />
              ))}
          </>
        )}
      </div>
    </Box>
  );
}
