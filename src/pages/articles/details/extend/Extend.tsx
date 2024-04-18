import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { ExtendProps, TypeMemberId } from '../../../../types';
import { concatLinkImage } from '../../../../types/untils';
import DialogLike from './DialogLike';
import ListComments from './ListComments';
import styles from './extend.module.css';
import { getProfileUser } from '../../../../services';
import { isLogin } from '../../../../middlewares/Authorization';
import { Link } from 'react-router-dom';

export default function Extend({
  handleLike,
  likess,
  likeAuth,
  handleComments,
  commentd,
  handleShare,
  commentsRef,
  comment,
  setComment,
  showButton,
  handleSubmit,
  moreComment,
  open,
  baseUrl,
  isLiked,
  user,
  showMore
}: ExtendProps) {
  const [showLike, setShowLike] = useState(false);
  const [profile, setProfile] = useState<TypeMemberId>();

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user) {
        const data = await getProfileUser(user.user_id);
        const userProfile = data?.profile;
        setProfile(userProfile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleShowListLike = () => {
    setShowLike(!showLike);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setComment && setComment(e.target.value);
  };

  return (
    <Box>
      <Grid container sx={{ padding: '10px 0' }} className={styles.contentlike}>
        <button onClick={handleShowListLike}>
          {likess} {''}
          <span>Likes</span>
        </button>

        <button>
          {commentd}
          {''} <span>Comments</span>
        </button>
        <DialogLike
          likeAuth={likeAuth}
          likess={likess}
          open={showLike}
          handleClose={handleShowListLike}
        />
      </Grid>
      <Box className={styles.extend}>
        <button onClick={handleLike}>
          {isLiked ? (
            <FavoriteOutlinedIcon className={styles.iconLikes} />
          ) : (
            <FavoriteBorderIcon />
          )}
          <span>Like</span>
        </button>
        <button onClick={handleComments}>
          <ChatBubbleOutlineIcon />
          <span>Comment</span>
        </button>
        <button onClick={handleShare}>
          <ShareIcon />
          <span>Share</span>
        </button>
        {open && <Shares baseUrl={baseUrl} />}
      </Box>
      <Box className={styles.comments}>
        {isLogin() ? (
          <ul className={styles.listMoreComments}>
            {commentd > 5 && (
              <button className={styles.moreComments} onClick={showMore}>
                See previous comments
              </button>
            )}
            {moreComment
              ?.slice()
              .reverse()
              ?.map((comment, index) => {
                return (
                  <ListComments
                    key={index}
                    created_by_first_name={comment?.created_by_first_name}
                    created_by_last_name={comment?.created_by_last_name}
                    created_by_image={comment?.created_by_image}
                    description={comment?.description}
                  />
                );
              })}
          </ul>
        ) : (
          <div className={styles.notLoginComment}>
            <Link to="/login">{`Please login to see comments!`}</Link>
          </div>
        )}
        <Box className={styles.containerComment}>
          <div className={styles.Image}>
            {profile?.image ? (
              <img
                loading="lazy"
                src={concatLinkImage(profile?.image)}
                alt="image"
              />
            ) : (
              <img loading="lazy" src="/public/images/6596121.png" alt="user" />
            )}
          </div>
          <div className={styles.textarea}>
            <textarea
              ref={commentsRef}
              className={styles.commentsPost}
              placeholder="Post your comment"
              value={comment}
              onChange={handleChange}
              onClick={handleComments}
              onKeyDown={handleKeyPress}
              rows={3}
            />
            {showButton && (
              <button className={styles.sendBtn} onClick={handleSubmit}>
                <SendIcon />
              </button>
            )}
          </div>
        </Box>
      </Box>
    </Box>
  );
}
