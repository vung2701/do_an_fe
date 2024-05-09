import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSrcCodeDetail } from '../../../services';
import { TypeSrcCode } from '../../../types';
import styles from './codeDetails.module.css';
import { Box, Typography } from '@mui/material';
import BackBtn from '../../../components/backBtn/BackBtn';
import { concatLinkImage, getObjFromLocal } from '../../../types/utils';
import CreateIcon from '@mui/icons-material/Create';

export default function CodeDetails() {
  let { id } = useParams();
  const [details, setDetails] = useState<TypeSrcCode>();
  const user = getObjFromLocal('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSrcCodeDetail(id);
        setDetails(data.srcCode);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Box className={`${styles.details} container`}>
      {details && (
        <Box className={styles.blogLeft}>
          <BackBtn />
          <Box className={styles.titleDetails}>
            <Typography variant="h2">{details.name}</Typography>
            <div className={styles.icon}>
              {user && user.user_id === details.created_by && (
                <Link to={`/posts/update/${details.src_code_id}`}>
                  <CreateIcon />
                </Link>
              )}
            </div>
          </Box>

          <p
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: details.content || '' }}
          />

          <Box>
            <h2 className={styles.titleAuthor}>About The Author</h2>
            <Link
              to={`/profile/${details.created_by}`}
              className={styles.authorAbout}
            >
              <>
                <div className={styles.imageAuthor}>
                  {details.created_by_image ? (
                    <img
                      loading="lazy"
                      src={concatLinkImage(details.created_by_image)}
                      alt="avatar"
                    />
                  ) : (
                    <img loading="lazy" src="/images/user.png" alt="avatar" />
                  )}
                </div>
                <div className={styles.content}>
                  <h2>
                    <span>{details.created_by_name || ''}</span>
                  </h2>
                  <p className={styles.contentDesctiption}>
                    {details.created_by_school && (
                      <span>{details.created_by_school}</span>
                    )}
                  </p>
                </div>
              </>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
}
