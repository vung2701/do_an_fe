import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { TypeArticle } from '../../types';
import { concatLinkImage } from '../../types/utils';
import TitleProfile from './TitleProfile';
import styles from './profile.module.css';
import { Link, useParams } from 'react-router-dom';
import { getArticles } from '../../services';
import { useTranslation } from 'react-i18next';

const ArticlesItems = ({ article_id, title, image, content }: TypeArticle) => {
  return (
    <Link to={`/articles/${article_id}`} className={styles.contentProject}>
      <img
        src={image ? concatLinkImage(image) : '/public/images/user.png'}
        alt="article"
      />
      <div className={styles.content}>
        <h6>{title}</h6>
        <p dangerouslySetInnerHTML={{ __html: content || '' }}></p>
      </div>
    </Link>
  );
};

export default function Articles() {
  let { id } = useParams();
  const [aticles, setArticles] = useState<TypeArticle[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const data = await getArticles();
          const filteredData = data.article.filter(
            (i: TypeArticle) => i.author_user_id == id
          );
          setArticles(filteredData);
        } catch (error) {
          console.error('Error fetching or filtering articles:', error);
        }
      };
      fetchArticle();
    } else {
      console.error('User data not found in localStorage');
    }
  }, [id]);

  return (
    <Box className={styles.article} sx={{ marginBottom: '30px' }}>
      <TitleProfile title={t('ARTICLES')} />
      <div className={styles.articleContent}>
        {aticles.length <= 0 ? (
          <p className={styles.noProject}>{t('NO_ARTICLES')}</p>
        ) : (
          <>
            {aticles.length > 0 &&
              aticles.map((item: TypeArticle) => (
                <ArticlesItems
                  key={item?.article_id}
                  article_id={item?.article_id}
                  image={item?.image}
                  title={item?.title}
                  content={item?.content}
                />
              ))}
          </>
        )}
      </div>
    </Box>
  );
}
