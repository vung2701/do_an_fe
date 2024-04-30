import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { TypeContentPosts, TypeKnowledge, TypeKnowledgeType } from '../../../types';
import { concatLinkImage, convertDate } from '../../../types/utils';
import styles from './details.module.css';
import { useEffect, useState } from 'react';
import { getArticleKnowledge } from '../../../services';

const ContenArticleDetails = ({
  title,
  author,
  published_on,
  content,
  author_description,
  author_user_id,
  author_username,
  author_major,
  author_school,
  image,
  limit,
  knowledge
}: TypeContentPosts) => {
  const [knowledges, setKnowledges] = useState<TypeKnowledge[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArticleKnowledge(knowledge);
        console.log(data);
        setKnowledges(data.knowledges.map((item: TypeKnowledge) => item.name));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Box className={styles.titleDetailsBox}>
        <Box className={styles.titleDetails}>
          <Box className={styles.titleLeft}>
            <Typography variant="h2">{title}</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="body1" className={styles.published}>
          Author: {author}
        </Typography>
        <Typography variant="body1" className={styles.published}>
          Published on: {convertDate(published_on)}
        </Typography>
      </Box>
      <Box
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content || '' }}
      />
      {limit && (
        <div className={styles.loginToview}>
          Please login to view more content
          <Link className={styles.clickHere} to={'/login'}>
            Click here
          </Link>
        </div>
      )}
      {knowledges && knowledges.length > 0 && (
        <Box className={styles.tagDetails}>
          <Typography variant="h2">Knowledge: {knowledges.join(', ')}</Typography>
        </Box>
      )}
      <Box>
        <h2 className={styles.titleAuthor}>About The Author</h2>
        <Link to={`/profile/${author_user_id}`} className={styles.authorAbout}>
          <div className={styles.imageAuthor}>
            <img loading="lazy" src={concatLinkImage(image)} alt="author" />
          </div>
          <div className={styles.content}>
            <h2>
              <span>{author_username || ''}</span>
            </h2>
            <p className={styles.contentDesctiption}>
              {author_major && (
                <span>
                  {author_major}
                  {', '}
                </span>
              )}
              {author_school && (
                <span className={styles.contentCompany}>{author_school}</span>
              )}
            </p>
          </div>
        </Link>
      </Box>
      <Box className={styles.authorDesctiption}>
        <p>{author_description || ''}</p>
      </Box>
    </>
  );
};

export default ContenArticleDetails;
