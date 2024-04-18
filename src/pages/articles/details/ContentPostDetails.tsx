import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getTags } from '../../../services';
import { TypeContentPosts, tag } from '../../../types';
import {
  concatLinkImage,
  concatLinkImageNoMedia,
  convertDate
} from '../../../types/untils';
import styles from './details.module.css';

const ContentPostDetails = ({
  title,
  author,
  published_on,
  content,
  tag,
  author_description,
  author_user_id,
  image,
  profileId,
  limit
}: TypeContentPosts) => {
  const [tags, setTags] = useState<tag[]>();
  const fetchTags = async () => {
    try {
      const data = await getTags(tag);
      setTags(data.tag);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <>
      <Box className={styles.titleDetails}>
        <Typography variant="h2">{title}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="body1" className={styles.published}>
          Author:{' '}
          {author_user_id === null
            ? author
            : `${profileId?.first_name} ${profileId?.last_name}`}
        </Typography>
        <Typography variant="body1" className={styles.published}>
          Published: {convertDate(published_on)}
        </Typography>
      </Box>
      <Box
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content || '' }}
      />
      {limit && (
        <div className={styles.loginToview}>
          Please login to view more content!
          <Link className={styles.clickHere} to={'/login'}>
            Click here.
          </Link>
        </div>
      )}
      <Box className={styles.tagDetails}>
        <Typography variant="h2">
          Tag:{' '}
          {tags &&
            tags.length > 0 &&
            tags.map((tag) => <span key={uuidv4()}>{tag.name}</span>)}
        </Typography>
      </Box>
      <Box>
        <h2 className={styles.titleAuthor}>About the Author </h2>
        <Link to={`/profile/${author_user_id}`} className={styles.authorAbout}>
          {author_user_id === null ? (
            <>
              <div className={styles.imageAuthor}>
                <img
                  loading="lazy"
                  src={concatLinkImageNoMedia(image)}
                  alt="author"
                />
              </div>
              <div className={styles.content}>
                <h2>
                  <span>{author || ''}</span>
                </h2>
              </div>
            </>
          ) : (
            <>
              <div className={styles.imageAuthor}>
                {profileId?.image ? (
                  <img
                    loading="lazy"
                    src={concatLinkImage(profileId?.image)}
                    alt="avatar"
                  />
                ) : (
                  <img loading="lazy" src="public/images/vm-flag.gif" alt="avatar" />
                )}
              </div>
              <div className={styles.content}>
                <h2>
                  <span>{profileId?.first_name || ''}</span>{' '}
                  <span>{profileId?.last_name || ''}</span>
                </h2>
                <p className={styles.contentDesctiption}>
                  {profileId?.designation && (
                    <span>
                      {profileId?.designation} {', '}
                    </span>
                  )}
                  <span className={styles.contentCompany}>{profileId?.company}</span>
                </p>
              </div>
            </>
          )}
        </Link>
      </Box>
      <Box className={styles.authorDesctiption}>
        <p>{author_description || ''}</p>
      </Box>
    </>
  );
};

export default ContentPostDetails;
