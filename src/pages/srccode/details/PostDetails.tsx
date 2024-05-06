import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSrcCodeDetail } from '../../../services';
import { TypeSrcCode } from '../../../types';
import styles from './postDetails.module.css';
import { Box, Typography } from '@mui/material';
import BackBtn from '../../../components/backBtn/BackBtn';
import { getObjFromLocal } from '../../../types/utils';

export default function PostDetails() {
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
          <BackBtn link="/codes" />
          <Box className={styles.titleDetails}>
            <Typography variant="h2">{details.na}</Typography>
            <div className={styles.icon}>
              {user && user.user_id === created_by && (
                <Link to={`/posts/update/${post_id}`}>
                  <CreateIcon />
                </Link>
              )}
            </div>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1" className={styles.published}>
              By: {`${first_name_created_by} ${last_name_created_by}`}
            </Typography>
            <Typography variant="body1" className={styles.published}>
              On: {convertDate(created_on)}
            </Typography>
          </Box>
          <p
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content || '' }}
          />

          <Box>
            <h2 className={styles.titleAuthor}>About The User</h2>
            <Link to={`/profile/${created_by}`} className={styles.authorAbout}>
              <>
                <div className={styles.imageAuthor}>
                  {created_by_image ? (
                    <img
                      loading="lazy"
                      src={concatLinkImage(created_by_image)}
                      alt="avatar"
                    />
                  ) : (
                    <img loading="lazy" src="/images/user.png" alt="avatar" />
                  )}
                </div>
                <div className={styles.content}>
                  <h2>
                    <span>{first_name_created_by || ''}</span>
                    {` `}
                    <span>{last_name_created_by || ''}</span>
                  </h2>
                  <p className={styles.contentDesctiption}>
                    {designation_created_by && (
                      <span>
                        {designation_created_by}
                        {', '}
                      </span>
                    )}
                    {designation_created_by && (
                      <span>
                        <span className={styles.contentCompany}>
                          {company_created_by}
                        </span>
                      </span>
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
