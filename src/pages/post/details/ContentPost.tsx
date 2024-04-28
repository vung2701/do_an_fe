import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPostComment,
  likePost,
  postPostComment,
  unlikePost
} from '../../../services';
import { TypeComments, TypeLikePost, TypePost } from '../../../types';
import { getObjFromLocal } from '../../../types/utils';
import styles from './postDetails.module.css';
import Extend from '../../articles/details/extend/Extend';
import BackBtn from '../../../components/backBtn/BackBtn';
import ContenPostDetails from './ContentPostDetails';

const ContentPost = ({
  post_id,
  title,
  description,
  designation_created_by,
  first_name_created_by,
  last_name_created_by,
  company_created_by,
  created_on,
  created_by,
  comments,
  likes,
  like_auth,
  created_by_image
}: TypePost) => {
  const navigate = useNavigate();
  const baseUrl = window.location.href;
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
        const newLike: TypeLikePost = {
          post_id: post_id,
          like_auth: user?.user_id
        };
        if (isLiked) {
          const unlike = await unlikePost(newLike);
          setLikess(unlike.data.article.likes);
          setLikeAuth(unlike.data.article.like_auth);
        } else {
          const like = await likePost(newLike);
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
            parent_post: post_id || null,
            parent_comment: '',
            created_by: user.user_id,
            comment_id: '',
            like_list: '',
            like_auth: user.user_id
          };

          const res = await postPostComment(newComment);
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
      const paramsComments = { id: post_id, page: 1, per_page: 5 };
      const moreComment = await getPostComment(paramsComments);
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
    const paramsComments = { id: post_id, page: nextPage, perPage: 5 };
    try {
      const moreComments = await getPostComment(paramsComments);
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
        <BackBtn link="/posts" />
        <ContenPostDetails
          post_id={post_id}
          title={title}
          description={description}
          designation_created_by={designation_created_by}
          first_name_created_by={first_name_created_by}
          last_name_created_by={last_name_created_by}
          company_created_by={company_created_by}
          created_on={created_on}
          created_by={created_by}
          created_by_image={created_by_image}
        />
        <Extend
          handleLike={handleLike}
          likess={likess}
          handleComments={handleComments}
          commentd={commentd}
          handleShare={handleShare}
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
          showMore={showMoreComments}
        />
      </Box>
    </>
  );
};

export default ContentPost;
