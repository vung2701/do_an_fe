import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeArticle } from '../../../types';
import { concatLinkImage, sortByDate } from '../../../types/utils';
import styles from './articlesContent.module.css';
import { getArticles } from '../../../services';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Articles() {
  const [articles, setArticles] = useState<TypeArticle[]>([]);
  const { t } = useTranslation();

  if (articles && articles.length > 0) {
    sortByDate(articles, 'published_on');
    if (articles.length > 2) {
      articles.splice(2);
    }
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getArticles();
        setArticles(res.article.filter((c: TypeArticle) => c.spotlight === false));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper1}>
        <h2 className={styles.containerNation}>
          <Link to={'/'}>{t('ARTICLES')}</Link>
        </h2>
      </div>
      <div className={styles.wrapper2}>
        {articles?.length > 0 &&
          articles.map((item) => (
            <Link
              to={`/articles/${item.article_id}`}
              className={styles.articleContent}
            >
              <Box className={styles.contentImage}>
                <img loading="lazy" src={concatLinkImage(item.image)} alt="image" />
              </Box>
              <Typography variant="h3">{item.title}</Typography>
              <Box className={styles.contentAuthor}>
                <Typography variant="body1" className={styles.published}>
                  By {item.author_username ? item.author_username : item.author}
                </Typography>
              </Box>
              <p
                className={`${styles.content} `}
                dangerouslySetInnerHTML={{ __html: item.content || '' }}
              ></p>
            </Link>
          ))}
      </div>
      <div className={styles.viewMore}>
        <Link to="/articles">{t('VIEW_MORE')}</Link>
      </div>
    </section>
  );
}
