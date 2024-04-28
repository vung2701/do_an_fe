import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../../services';
import { TypePost } from '../../../types';
import styles from './postDetails.module.css';
import { Box } from '@mui/material';
import ContentPost from './ContentPost';

export default function PostDetails() {
  let { id } = useParams();
  const [details, setDetails] = useState<TypePost>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPost(id);
        setDetails(data.post);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Box className={`${styles.details} container`}>
      {details && (
        <ContentPost
          post_id={id}
          title={details?.title}
          description={details?.description}
          designation_created_by={details?.designation_created_by}
          first_name_created_by={details?.first_name_created_by}
          last_name_created_by={details?.last_name_created_by}
          company_created_by={details?.company_created_by}
          email_created_by={details?.email_created_by}
          comment_auth={details?.comment_auth}
          comment_list={details?.comment_list}
          created_on={details?.created_on}
          created_by={details?.created_by}
          comments={details?.comments}
          likes={details?.likes}
          like_auth={details?.like_auth}
          created_by_image={details?.created_by_image}
        />
      )}
    </Box>
  );
}
