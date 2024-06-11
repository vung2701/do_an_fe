import { Box, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TypeContentPosts, TypeKnowledge, TypeSrcCode } from '../../../types';
import { concatLinkImage, convertDate } from '../../../types/utils';
import styles from './details.module.css';
import { useEffect, useState } from 'react';
import { getArticleKnowledge, getSrcCodeArticle } from '../../../services';
import { useTranslation } from 'react-i18next';
import { isLogin } from '../../../middlewares/Authorization';

const ContenArticleDetails = ({
  title,
  published_on,
  content,
  author_description,
  author_user_id,
  author_username,
  author_major,
  author_school,
  image,
  knowledge
}: TypeContentPosts) => {
  const { id } = useParams();
  const [knowledges, setKnowledges] = useState<TypeKnowledge[]>([]);
  const [srcCode, setSrcCode] = useState<TypeSrcCode>();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArticleKnowledge(knowledge);
        setKnowledges(data.knowledges.map((item: TypeKnowledge) => item.name));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const fetchSrcCode = async () => {
      try {
        const data = await getSrcCodeArticle(id);
        setSrcCode(data.src_code);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchSrcCode();
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
          {t('AUTHOR')}: {author_username}
        </Typography>
        <Typography variant="body1" className={styles.published}>
          {t('PUBLISHED_ON')}: {convertDate(published_on)}
        </Typography>
      </Box>
      <Box
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content || '' }}
      />

      {knowledges && knowledges.length > 0 && (
        <Box className={styles.tagDetails}>
          <Typography variant="h2">
            {t('KNOWLEDGE')}: {knowledges.join(', ')}
          </Typography>
        </Box>
      )}

      <Box className={styles.btnLinkBox}>
        {srcCode && (
          <Link className={styles.btnLink} to={`/codes/${srcCode.src_code_id}`}>
            {t('VIEW_CODE')}
          </Link>
        )}
      </Box>

      <Box>
        <h2 className={styles.titleAuthor}>{t('ABOUT_AUTHOR')}</h2>
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
