import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteLikes,
  getComments,
  postComments,
  postLikes
} from '../../../services';
import { TypeComments, TypeContentPosts, TypeNewLike } from '../../../types';
import { getObjFromLocal } from '../../../types/untils';
import styles from './details.module.css';
import ContentPostDetails from './ContentPostDetails';
import Extend from './extend/Extend';
import BackBtn from '../../../components/backBtn/BackBtn';

const ContentDetails = ({
  shares,
  comments,
  published_on,
  title,
  content,
  author,
  likes,
  id,
  like_auth,
  user,
  tag,
  author_description,
  author_user_id,
  image,
  profileId,
  limit
}: TypeContentPosts) => {
  const navigate = useNavigate();
  const baseUrl = window.location.origin;
  const [comment, setComment] = useState('');
  const [newcomment, setNewComment] = useState({});
  const [open, setOpen] = useState<boolean>(false);
  const commentsRef = useRef<HTMLTextAreaElement>(null);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [moreComment, setMoreComment] = useState<TypeComments[]>([]);
  const [commentd, setCommentd] = useState(comments);
  const [likess, setLikess] = useState(likes);
  const [likeAuth, setLikeAuth] = useState(like_auth);
  const [isLiked, setIsLiked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLike = async () => {
    const user = getObjFromLocal('user');
    if (user) {
      setIsLiked((prevIsLiked) => !prevIsLiked);
      try {
        const newLike: TypeNewLike = {
          title: 'like',
          author: '',
          published_on: '',
          article_id: id || undefined,
          share_list: '',
          like_auth: user?.user_id,
          share_auth: ''
        };
        if (isLiked) {
          const unlike = await deleteLikes(newLike);
          setLikess(unlike.data.article.likes);
          setLikeAuth(unlike.data.article.like_auth);
        } else {
          const like = await postLikes(newLike);
          setLikess(like.data.article.likes);
          setLikeAuth(like.data.article.like_auth);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.user_id && likeAuth?.includes(user.user_id)) {
        setIsLiked(true);
      }
    }
  }, [likeAuth]);

  const handleComments = () => {
    if (commentsRef.current) {
      commentsRef.current.focus();
      setShowButton(true);
    }
  };

  const handleSubmit = async () => {
    const user = getObjFromLocal('user');
    if (user) {
      if (comment) {
        try {
          const newComment = {
            title: 'comment',
            description: comment,
            parent_article: id || null,
            parent_comment: '',
            attachment: '',
            created_by: user.user_id,
            comment_id: '',
            like_list: '',
            share_list: '',
            like_auth: user.user_id,
            share_auth: user.user_id
          };

          const res = await postComments(newComment);
          setNewComment(res?.data?.comment);
          setComment('');
        } catch (error) {
          console.error('Error sending data:', error);
        }
      }
    } else {
      navigate('/login');
    }
  };

  const fetchComments = async () => {
    try {
      const paramsComments = { id: id, page: 1, per_page: 5 };
      const moreComment = await getComments(paramsComments);
      if (moreComment?.total) {
        setCommentd(moreComment?.total);
      }
      setMoreComment(moreComment?.comment || []);
    } catch (error) {
      console.log(error);
    }
  };

  const showMoreComments = async () => {
    const nextPage = currentPage + 1;
    const paramsComments = { id: id, page: nextPage, perPage: 5 };
    try {
      const moreComments = await getComments(paramsComments);
      const oldComments = moreComments?.comment;
      if (
        oldComments &&
        commentd &&
        nextPage * paramsComments.perPage < commentd + paramsComments.perPage
      ) {
        setMoreComment([...moreComment, ...oldComments]);
      }
      setCurrentPage(nextPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [newcomment]);

  const handleShare = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box className={styles.blogLeft}>
        <BackBtn link="/articles" />
        <ContentPostDetails
          title={title}
          content={content}
          published_on={published_on}
          author={author}
          tag={tag}
          author_description={author_description}
          author_user_id={author_user_id}
          image={image}
          profileId={profileId}
          limit={limit}
        />
        <Extend
          handleLike={handleLike}
          likess={likess}
          handleComments={handleComments}
          commentd={commentd}
          handleShare={handleShare}
          shares={shares}
          commentsRef={commentsRef}
          comment={comment}
          setComment={setComment}
          handleSubmit={handleSubmit}
          showButton={showButton}
          moreComment={moreComment}
          open={open}
          baseUrl={baseUrl}
          isLiked={isLiked}
          likeAuth={likeAuth}
          user={user}
          showMore={showMoreComments}
        />
      </Box>
    </>
  );
};

export default ContentDetails;
