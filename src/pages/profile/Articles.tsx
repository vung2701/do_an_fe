import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getArticle } from '../../services';
import { TypeArticle } from '../../types';
import { concatLinkImage } from '../../types/utils';
import TitleProfile from './TitleProfile';
import styles from './profile.module.css';
import { Link, useParams } from 'react-router-dom';

const ArticlesItems = ({ article_id, title, image, content }: TypeArticle) => {
  return (
    <Link to={`/articles/${article_id}`} className={styles.contentProject}>
      <img
        src={image ? concatLinkImage(image) : '/public/images/6596121.png'}
        alt="article"
      />
      <div className={styles.content}>
        <h6>{title}</h6>
        <span dangerouslySetInnerHTML={{ __html: content || '' }}></span>
      </div>
    </Link>
  );
};

export default function Articles() {
  let { id } = useParams();
  const [aticles, setArticles] = useState([]);
  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const data = await getArticle();
          const filteredData = data.filter(
            (i: TypeArticle) => i.author_user_id === id
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
      <TitleProfile title="Articles" />
      <div className={styles.articleContent}>
        {aticles.length <= 0 ? (
          <p className={styles.noProject}>You haven't published any article yet.</p>
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
