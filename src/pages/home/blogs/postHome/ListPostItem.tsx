import { Box, List } from '@mui/material';
import { Link } from 'react-router-dom';
import { concatLinkImage } from '../../../../types/utils';
import styles from './postHome.module.css';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { TypePost } from '../../../../types';

const ListPostItem = ({
  content,
  post_id,
  created_by_image,
  title,
  likes,
  comments
}: TypePost) => {
  return (
    <List className={`${styles.listItems} ${styles.listPostItems}`}>
      <Link to={`/posts/${post_id}`}>
        <Box className={styles.imageItems}>
          <img
            loading="lazy"
            src={
              created_by_image
                ? concatLinkImage(created_by_image)
                : '/public/images/user.png'
            }
            alt="cetification"
          />
        </Box>
        <Box className={styles.content}>
          <h2>{title}</h2>
          <p dangerouslySetInnerHTML={{ __html: content || '' }}></p>
        </Box>
        <Box className={styles.social}>
          <span>
            {likes}
            <FavoriteBorderIcon />
          </span>
          <span>
            {comments}
            <ChatBubbleOutlineIcon />
          </span>
        </Box>
      </Link>
    </List>
  );
};

export default ListPostItem;
