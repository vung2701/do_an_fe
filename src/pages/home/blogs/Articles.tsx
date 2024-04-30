import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeArticle } from '../../../types';
import { sortByDate } from '../../../types/utils';
import styles from './articlesContent.module.css';
import { ArticlesContent } from './ArticlesContent';
import { getArticles } from '../../../services';

export default function Articles() {
  const [articles, setArticles] = useState<TypeArticle[]>([]);

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
          <Link to={'/'}>Articles</Link>
        </h2>
      </div>
      <div className={styles.wrapper2}>
        {articles?.length > 0 &&
          articles.map((item) => (
            <ArticlesContent
              key={item.article_id}
              author={item?.author}
              content={item?.content}
              title={item?.title}
              created_on={item?.created_on}
              image={item?.image}
              published_on={item?.published_on}
              reference_link={item?.reference_link}
              comments={item?.comments}
              shares={item?.shares}
              article_id={item?.article_id}
              likes={item?.likes}
              like_auth={item?.like_auth}
              language={item?.language}
              comment_list={item?.comment_list}
              author_username={item?.author_username}
            />
          ))}
      </div>
      <div className={styles.viewMore}>
        <Link to="/articles">View more</Link>
      </div>
    </section>
  );
}
