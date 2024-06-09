import { Box, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { concatLinkImage, convertDate, getObjFromLocal } from '../../../types/utils';
import { TypePost, TypeSrcCode } from '../../../types';
import styles from './postDetails.module.css';
import CreateIcon from '@mui/icons-material/Create';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getSrcCodeId, getSrcCodePost } from '../../../services';

const ContenPostDetails = ({
  post_id,
  title,
  content,
  designation_created_by,
  first_name_created_by,
  last_name_created_by,
  company_created_by,
  created_on,
  created_by,
  created_by_image
}: TypePost) => {
  const user = getObjFromLocal('user');
  const { t } = useTranslation();
  const { id } = useParams();
  const [srcCode, setSrcCode] = useState<TypeSrcCode>();
  useEffect(() => {
    const fetchSrcCode = async () => {
      try {
        const data = await getSrcCodePost(id);
        setSrcCode(data.src_code);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchSrcCode();
  }, []);
  return (
    <>
      <Box className={styles.titleDetails}>
        <Typography variant="h2">{title}</Typography>
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
          {t('AUTHOR')}: {`${first_name_created_by} ${last_name_created_by}`}
        </Typography>
        <Typography variant="body1" className={styles.published}>
          {t('PUBLISHED_ON')}: {convertDate(created_on)}
        </Typography>
      </Box>
      <p
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content || '' }}
      />

      <Box className={styles.btnLinkBox}>
        {srcCode && (
          <Link className={styles.btnLink} to={`/codes/${srcCode.src_code_id}`}>
            {t('VIEW_CODE')}
          </Link>
        )}
      </Box>

      <Box>
        <h2 className={styles.titleAuthor}>{t('ABOUT_AUTHOR')}</h2>
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
    </>
  );
};
export default ContenPostDetails;
