import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getArticleDetails, getArticlePublic, getAuthorById } from '../../../services';
import { TypeArticle } from '../../../types';
import styles from './details.module.css';
import ContentDetails from './ContentDetails';
import { isLogin } from '../../../middlewares/Authorization';
import LimitDetails from './LimitDetails';

export default function Details() {
  let { id } = useParams();
  const [details, setDetails] = useState<TypeArticle>();
  const [profileId, setProfileId] = useState<TypeArticle>();

  useEffect(() => {
    const fetchInforData = async () => {
      try {
        // const response = await getIpInfor();
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchInforData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLogin()) {
          const article = await getArticleDetails(id, localStorage.getItem(('public_user')));
          setDetails(article?.article);
        } else {
          const article = await getArticlePublic(id, localStorage.getItem('public_user'));
          setDetails(article.article);
        }
        const data = await getAuthorById(id);
        setProfileId(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Box className={`${styles.details} container`}>
      {details &&
        <>
          <ContentDetails
            key={details.article_id || uuidv4()}
            author={details?.author}
            content={details?.content}
            title={details?.title}
            created_on={details?.created_on}
            image={details?.image}
            published_on={details?.published_on}
            reference_link={details?.reference_link}
            comments={details?.comment_list?.length}
            shares={details?.shares}
            id={id}
            likes={details?.likes}
            like_auth={details?.like_auth}
            language={details?.language}
            tag={details?.tag}
            author_description={details?.author_description}
            author_user_id={details?.author_user_id}
            user={profileId}
            profileId={profileId}
            limit={details?.limit}
          />
          {details?.limit &&
            <LimitDetails />
          }
        </>
      }
    </Box>
  );
}
