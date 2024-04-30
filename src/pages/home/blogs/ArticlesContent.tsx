import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './articlesContent.module.css';
import { concatLinkImage, convertDate } from '../../../types/utils';
import { TypeArticle } from '../../../types';

interface TypeContentPosts {
  title?: string | undefined;
  author?: string | undefined;
  author_user_name?: string | undefined;
  published_on?: string | undefined;
  image?: string | undefined;
  viewMore?: boolean;
  islanguage?: boolean;
  content?: string | undefined;
  language?: string | undefined;
  id?: string | undefined;
  handleViewMore?: () => void;
}

const ContentPosts = ({
  title,
  author_user_name,
  author,
  published_on,
  content,
  image,
  id
}: TypeContentPosts) => {
  return (
    <>
      <Box className={styles.contentImage}>
        <Link to={`/articles/${id}`}>
          <img loading="lazy" src={concatLinkImage(image)} alt="image" />
          <Typography variant="h3">{title}</Typography>
        </Link>
      </Box>
      <Box className={styles.contentauthor}>
        <Typography variant="body1" className={styles.published}>
          By {author_user_name ? author_user_name : author}
        </Typography>
        <Typography variant="body1" className={styles.published}>
          on {convertDate(published_on)}
        </Typography>
      </Box>
      <Link
        to={`/articles/${id}`}
        className={`${styles.content} `}
        dangerouslySetInnerHTML={{ __html: content || '' }}
      />
    </>
  );
};

export const ArticlesContent = ({
  published_on,
  title,
  content,
  author,
  author_username,
  article_id,
  image
}: TypeArticle) => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.contentPosts}>
          <ContentPosts
            title={title}
            content={content}
            published_on={published_on}
            author={author}
            author_user_name={author_username}
            image={image}
            id={article_id}
          />
        </div>
      </div>
    </>
  );
};
