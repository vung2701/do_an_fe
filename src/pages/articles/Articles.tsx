import { Avatar, Box, Container, List, Typography } from '@mui/material';
import styles from './articles.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  getArticle,
  getArticleReaded,
  getArticleWithParams,
  getAuthorName
} from '../../services';
import {
  concatLinkImage,
  convertDate,
  convertDateReverse,
  sortByDate
} from '../../types/untils';
import { TypeArticle, TypeAuthor } from '../../types';
import FunctionBar from './FunctionBar';
import { isLogin } from '../../middlewares/Authorization';

export default function Articles() {
  const location = useLocation();
  const [articles, setArticles] = useState<TypeArticle[]>([]);
  const [authors, setAuthors] = useState<TypeAuthor[]>([]);
  const [author, setAuthor] = useState('none');
  const [state, setState] = useState(location.state);
  const [publishedFrom, setPublishedFrom] = useState('');
  const [publishedTo, setPublishedTo] = useState('');

  const [isLanguage, setIsLanguage] = useState<boolean>(
    location.state === 'true' ? true : false
  );

  const filteredArticles = articles.filter((item) =>
    isLanguage ? item.language === '2' : item.language === '1'
  );

  const handleLanguage = () => {
    setIsLanguage(!isLanguage);
  };

  if (articles.length > 0) {
    sortByDate(filteredArticles, 'created_on');
  }

  const handleChangeAuthor = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleChangePublishedFrom = (event: ChangeEvent<HTMLInputElement>) => {
    setPublishedFrom(event?.target.value);
  };

  const handleChangePublishedTo = (event: ChangeEvent<HTMLInputElement>) => {
    setPublishedTo(event?.target.value);
  };
  const fetchArticles = async () => {
    try {
      if (state === 'readed') {
        const articleData = await getArticleReaded(
          localStorage.getItem('public_user')
        );
        setArticles(articleData);
      } else {
        const articleData = await getArticle();
        setArticles(articleData);
      }
      const authorNames = await getAuthorName();
      setAuthors(authorNames);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = async () => {
    try {
      let params = '';
      if (author && author != 'none') {
        params = `?author=${author}`;
        if (publishedFrom) {
          params += `&published_from=${convertDateReverse(publishedFrom)}`;
          if (publishedTo) {
            params += `&published_to=${convertDateReverse(publishedTo)}`;
          } else {
            const today = new Date();
            params += `&published_to=${convertDateReverse(today)}`;
          }
        } else {
          if (publishedTo) {
            params += `&published_to=${convertDateReverse(publishedTo)}`;
          }
        }
      } else {
        if (publishedFrom) {
          params += `?published_from=${convertDateReverse(publishedFrom)}`;
          if (publishedTo) {
            params += `&published_to=${convertDateReverse(publishedTo)}`;
          } else {
            const today = new Date();
            params += `&published_to=${convertDateReverse(today)}`;
          }
        } else {
          if (publishedTo) {
            params += `?published_to=${convertDateReverse(publishedTo)}`;
          } else {
            params = '';
          }
        }
      }
      const articleData = await getArticleWithParams(params);
      setArticles(articleData);
    } catch (error) {
      console.error('Error filter data:', error);
    }
  };

  const handleReset = async () => {
    setAuthor('none');
    setPublishedFrom('');
    setPublishedTo('');
    await fetchArticles();
  };

  useEffect(() => {
    fetchArticles();
  }, [state]);
  return (
    <Container className={`container-1`}>
      <Box className={styles.article}>
        <div className={styles.articleTitleBox}>
          <h2 className={styles.articleTitle}>
            <Link to={'/articles'}>Articles</Link>
          </h2>
        </div>

        <FunctionBar
          author={author}
          handleChangeAuthor={handleChangeAuthor}
          authors={authors}
          publishedFrom={publishedFrom}
          handleChangePublishedFrom={handleChangePublishedFrom}
          publishedTo={publishedTo}
          handleChangePublishedTo={handleChangePublishedTo}
          handleFilter={handleFilter}
          isLanguage={isLanguage}
          handleLanguage={handleLanguage}
          handleReset={handleReset}
        />

        <List className={styles.listArticle}>
          <Box className={styles.boxDivider}>
            <h3>{state === 'readed' ? 'My Reading List' : 'List of Articles'}</h3>
            <Box className={styles.divider}></Box>
          </Box>
          {!isLogin() &&
            (state === 'readed' ? (
              <div className={styles.backReaded}>
                <button
                  onClick={() => {
                    setState('');
                  }}
                >
                  View all articles
                </button>
              </div>
            ) : (
              <div className={styles.backReaded}>
                <button
                  onClick={() => {
                    setState('readed');
                  }}
                >
                  View my reading list
                </button>
              </div>
            ))}

          {filteredArticles?.length > 0 ? (
            filteredArticles.map((item) => (
              <Link
                key={item.article_id}
                to={`/articles/${item.article_id}`}
                className={styles.articleItem}
              >
                <Box className={styles.imageItem}>
                  <img
                    loading="lazy"
                    src={concatLinkImage(item.image)}
                    alt="image"
                  />
                </Box>
                <Box className={styles.articleContent}>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography variant="body1" className={styles.published}>
                    Published on {convertDate(item.published_on)}
                  </Typography>
                  <Box
                    className={`${styles.content} `}
                    dangerouslySetInnerHTML={{ __html: item.content || '' }}
                  ></Box>
                </Box>
                <Box className={styles.articleInfor}>
                  <Avatar alt={item.author} src={concatLinkImage(item.author_img)} />
                  <p className={styles.articleInforLike}>{item.likes} likes</p>
                  <p className={styles.articleInforComment}>
                    {item.comment_list?.length} comments
                  </p>
                </Box>
              </Link>
            ))
          ) : (
            <Box className={styles.noArticles}>No article.</Box>
          )}
        </List>
      </Box>
    </Container>
  );
}
