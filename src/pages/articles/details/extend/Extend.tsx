import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { ExtendProps, TypeProfile } from '../../../../types';
import { concatLinkImage, getObjFromLocal } from '../../../../types/utils';
import DialogLike from './DialogLike';
import ListComments from './ListComments';
import styles from './extend.module.css';
import { getProfileUser } from '../../../../services';
import { isLogin } from '../../../../middlewares/Authorization';
import { Link } from 'react-router-dom';
import Shares from './Shares';
import { useTranslation } from 'react-i18next';

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
  showMore
}: ExtendProps) {
  const [showLike, setShowLike] = useState(false);
  const [profile, setProfile] = useState<TypeProfile>();
  const { t } = useTranslation();

  const fetchProfile = async () => {
    try {
      const user = getObjFromLocal('user');
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

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e: any) => {
    setComment && setComment(e.target.value);
  };

  return (
    <Box>
      <Grid container sx={{ padding: '10px 0' }} className={styles.contentlike}>
        <button onClick={handleShowListLike}>
          {likess}
          <span> {t('LIKES')}</span>
        </button>

        <button>
          {commentd}
          <span> {t('COMMENTS')}</span>
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
          <span> {t('LIKE')}</span>
        </button>
        <button onClick={handleComments}>
          <ChatBubbleOutlineIcon />
          <span> {t('COMMENT')}</span>
        </button>
        <button onClick={handleShare}>
          <ShareIcon />
          <span> {t('SHARE')}</span>
        </button>
        {open && <Shares baseUrl={baseUrl} />}
      </Box>
      <Box className={styles.comments}>
        {isLogin() ? (
          <ul className={styles.listMoreComments}>
            {Boolean(commentd && commentd > 4 && commentd > moreComment.length) && (
              <button className={styles.moreComments} onClick={showMore}>
                {t('SEE_COMMENT')}
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
            <Link to="/login">Please login to view more content</Link>
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
              <img loading="lazy" src="/public/images/user.png" alt="user" />
            )}
          </div>
          <div className={styles.textarea}>
            <textarea
              ref={commentsRef}
              className={styles.commentsPost}
              placeholder={t('POST_COMMENT')}
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
