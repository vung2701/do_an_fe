import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getArticleDetails } from '../../../services';
import { TypeArticle } from '../../../types';
import styles from './details.module.css';
import ContentDetails from './ContentDetails';
import LimitDetails from './LimitDetails';

export default function Details() {
  let { id } = useParams();
  const [details, setDetails] = useState<TypeArticle>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const article = await getArticleDetails(id);
        setDetails(article?.article);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Box className={`${styles.details} container`}>
      {details && (
        <>
          <ContentDetails
            key={details.article_id || uuidv4()}
            author_username={details?.author_username}
            author_major={details.author_major}
            author_school={details.author_school}
            content={details?.content}
            title={details?.title}
            created_on={details?.created_on}
            image={details?.author_img}
            published_on={details?.published_on}
            reference_link={details?.reference_link}
            comments={details?.comment_list?.length}
            shares={details?.shares}
            id={id}
            likes={details?.likes}
            like_auth={details?.like_auth}
            language={details?.language}
            author_description={details?.author_description}
            limit={details?.limit}
          />
          {details?.limit && <LimitDetails />}
        </>
      )}
    </Box>
  );
}
