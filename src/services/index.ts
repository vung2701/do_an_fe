
import axios from 'axios';
import { isLogin } from '../middlewares/Authorization';
import { createAxios, uploadAxios } from './axios';
import { TypeLikePost, TypeLogin, TypeNewComment, TypeNewParamsComments, TypePost, TypeSrcCode } from '../types';

let axiosInstance = createAxios();

const registerUser = async (values: any) => {
  try {
    const response = await axiosInstance.post('user/register', values);
    return response;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
};

const loginUser = async (values: TypeLogin) => {
  try {
    const response = await axiosInstance.post('user/login', values);
    if (response?.data?.token) {
      const { token } = response.data;
      axiosInstance = createAxios(token);
    }
    return response;
  } catch (error) {
    console.error('Error get login:', error);
    throw error;
  }
};


const loginGetUser = async (token: string | null | undefined) => {
  try {
    const axiosInstance = createAxios(token);
    const response = await axiosInstance.get('user/get');
    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    const response = await axiosInstance.post('user/logout');
    return response;
  } catch (error) {
    console.error('Error logout:', error);
    throw error;
  }
};
const getArticles = async ( page = 1, per_page= 10) => {
  try {
    const response = await axiosInstance.get(`article/get_all?page=${page}&per_page=${per_page}&sort=-created_on`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

const getArticlesByType = async ( knowledge_type_id?: string, page = 1, per_page= 10) => {
  try {
    const response = await axiosInstance.get(`article/by_knowledge_type?knowledge_type_id=${knowledge_type_id}&page=${page}&per_page=${per_page}&sort=-created_on`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};


const getArticleReaded = async (webBrowser: string | null) => {
  try {
    const response = await axiosInstance.get(`/unreg_user/get?web_browser=${webBrowser}`);
    return response.data.public_user.read_articles;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
};


// const getArticleWithParams = async (params: string) => {
//   try {
//     const response = await axiosInstance.get('news/article' + params);
//     return response.data.article;
//   } catch (error) {
//     console.error('Error fetching careers:', error);
//     throw error;
//   }
// };

const getArticleDetails = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`article/get?article_id=${id}`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching articles detail:', error);
    throw error;
  }
};

const getKnowledgeType = async () => {
  try {
    
    const response = await axiosInstance.get(`knowledge/get_all_type`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching knowledge type:', error);
    throw error;
  }
};

const getArticleKnowledge = async (ids?: string[]) => {
  try {
    const response = await axiosInstance.get('article/knowledge', {
      params: {
        knowledge_ids: ids,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching knowledge type:', error);
    throw error;
  }
};


// const getArticlePublic = async ( id: string | undefined, webBrowser: string | null) => { 
//   try {
//     const axiosInstance = createAxios();
//     const response = await axiosInstance.get(`/article_details?article_id=${id}&web_browser=${webBrowser}`);
//     return response?.data;
//   } catch (error) {
//     console.error('Error fetching articles public:', error);
//     throw error;
//   }
// }


const postComments = async (newComment: any) => {
  try {
      const response = await axiosInstance.post('article/comment', newComment);
      return response;
  } catch (error) {
    console.error('Error coment article:', error);
    throw error;
  }
};

const getComments = async (paramsComments: any) => {
  const id = paramsComments?.id || '';
  const page = paramsComments?.page || 1;
  const per_page = paramsComments?.perPage || 5;
  try {
    if(isLogin()){
      const response = await axiosInstance.get(
        `article/comment?parent_article=${id}&page=${page}&per_page=${per_page}&sort=-created_on`
      );
      return response?.data;
    }
    return;
  } catch (error) {
    console.error('Error get comment article:', error);
    throw error;
  }
};

const postLikes = async (liked: any) => {
  try {
      const response = await axiosInstance.post('article/like', liked);
      return response;
  } catch (error) {
    console.error('Error like article:', error);
    throw error;
  }
};

const deleteLikes = async (newLike: any) => {
  try {
    const response = await axiosInstance.post('article/unlike', newLike);
    return response;
  } catch (error) {
    console.error('Error unlike article:', error);
    throw error;
  }
};


const getProfileUser = async (id: string) => {
  try {
      const response = await axiosInstance.get(`user/profile/get?user_id=${id}`);
      return response.data;
  } catch (error) {
    console.error('Error get profile', error);
    throw error;
  }
};

const updateProfileUser = async (values : any) => {
  try {
    const response = axiosInstance.post(`user/profile/update`, values)
    return response;
  } catch (error) {
    console.error('Error uploading profile:', error);
    throw error;
  }
}

const uploadAvatar = async (file: File) => {
  try {
    if(isLogin()){
      const formData = new FormData();
      formData.append('file', file);
      const axiosInstance = uploadAxios();
      const response = await axiosInstance.post(`/user/upload_image`, formData);
      return response.data.user_image;
    }
    return;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const profileUser = async (profile: { profile_id: string |undefined; image: string }) => {
  try {
    const formData = new FormData();
    formData.append('image', profile.image);
    formData.append('user_id', profile.profile_id);

    const axiosInstance = uploadAxios();
    const response = await axiosInstance.post(`/user/profile/get`, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};


const getAuthorName = async () => {
  try {
    const response = await axiosInstance.get(`news/author_articles`);
    return response?.data.article_author;
  } catch (error) {
    console.error('Error get infomation:', error);
    throw error;
  }
};

const getNewMember = async () => {
  try {
    const axiosInstance = createAxios();
    const response = await axiosInstance.get(`user/new_members`);
    return response.data;
  } catch (error) {
    console.error('get new member:', error);
    throw error;
  }
};




const LoginFacebook = async (token: string ) => {
  try {
    const response = await axiosInstance.get(`/user/facebook_login?access_token=${token}`);
    if (response?.data?.token) {
      const { token } = response.data;
      axiosInstance = createAxios(token);
    }
    return response;
  } catch (error) {
    console.error('Error login facebook:', error);
    throw error;
  }
}

const LoginGoogle = async (token: string ) => {
  try {
    const response = await axiosInstance.get(`/user/google_login?access_token=${token}`);
    if (response?.data?.token) {
      const { token } = response.data;
      axiosInstance = createAxios(token);
    }
    return response;
  } catch (error) {
    console.error('Error login google:', error);
    throw error;
  }
}

const LoginLinkedIn = async (token: string ) => {
  try {
    const response = await axiosInstance.get(`/user/linkedin_login?access_token=${token}`);
    if (response?.data?.token) {
      const { token } = response.data;
      axiosInstance = createAxios(token);
    }
    return response;
  } catch (error) {
    console.error('Error login linkedin:', error);
    throw error;
  }
}

const getIpInfor = async () => {
      try {
        const response = await axios.get('https://ipinfo.io/json/?token=4a59f667078628');
        return response.data
      } catch (error) {
        throw error;
      }
    };

const getPosts = async (page = 1, per_page = 10) => {
  try {
    const response = await axiosInstance.get(`post/get?page=${page}&per_page=${per_page}&sort=-created_on`);
    return response?.data;
  } catch (error) {
    console.error('Error get posts:', error);
    throw error;
  }
};

const getPost = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`post/get?post_id=${id}`);
    return response?.data;
  } catch (error) {
    console.error('Error get posts:', error);
    throw error;
  }
};


const postPost = async (values: TypePost) => {
  try {
    const response = await axiosInstance.post('post/add', values)
    return response?.data;
  } catch (error) {
    console.error('create post error:', error);
    throw error;
  }
};

const updatePost = async (values: TypePost) => {
  try {
    const response = await axiosInstance.post('post/update', values)
    return response?.data;
  } catch (error) {
    console.error('create post error:', error);
    throw error;
  }
};


const likePost = async (liked: TypeLikePost) => {
  try {
    const response = await axiosInstance.post('post/like', liked);
    return response;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
};

const unlikePost = async (liked: TypeLikePost) => {
  try {
    const response = await axiosInstance.post('post/unlike', liked);
    return response;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
};

const getPostComment = async (paramsComments: TypeNewParamsComments) => {
  const id = paramsComments?.id || '';
  const page = paramsComments?.page || 1;
  const per_page = paramsComments?.perPage || 5;
  try {
    if (isLogin()) {
      const response = await axiosInstance.get(
        `post/comment?parent_post=${id}&page=${page}&per_page=${per_page}&sort=-created_on`
      );
      return response?.data;
    }
    return;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

const postPostComment = async (newComment: TypeNewComment) => {
  try {
    const response = await axiosInstance.post('post/comment', newComment);
    return response;
  } catch (error) {
    console.error('Error add postcomment:', error);
    throw error;
  }
};

const getSpotlight = async () => {
  try {
    const response = await axiosInstance.get(`/article/spotlight`);
    return [...response?.data?.spotlight_article, ...response?.data?.spotlight_post];
  } catch (error) {
    console.error('Error get spotlight:', error);
    throw error;
  }
};

const getAllLanguage = async () => {
  try {
    const response = await axiosInstance.get(`src_code/get_all_language`);
    return response.data
  } catch (error) {
    console.error('Error get all language:', error);
    throw error;
  }
};

const getSrcCode = async (page = 1, per_page = 5, language_id = '') => {
  try {
    const response = await axiosInstance.get(`src_code/get_src_code?page=${page}&per_page=${per_page}&sort=-created_on&language_ids=${language_id}`);
    return response.data
  } catch (error) {
    console.error('Error get src code:', error);
    throw error;
  }
};

const getSrcCodeDetail = async (srcCodeId?: string) => {
  try {
    const response = await axiosInstance.get(`src_code/get_src_code?src_code_id=${srcCodeId}`);
    return response.data
  } catch (error) {
    console.error('Error get src code detail:', error);
    throw error;
  }
};

const createOrUpdateSrcCode = async (values?: TypeSrcCode) => {
  try {
    const response = await axiosInstance.post(`src_code/create_update`, values);
    return response.data
  } catch (error) {
    console.error('Error create or update src code detail:', error);
    throw error;
  }
};


export {
  registerUser,
  loginUser,
  loginGetUser,
  logoutUser,
  deleteLikes,
  getArticles,
  getArticlesByType,
  getArticleReaded,
  // getArticleWithParams,
  getArticleDetails,
  // getArticlePublic,
  getKnowledgeType,
  getPost,
  getPosts,
  postPost,
  updatePost,
  getPostComment,
  postPostComment,
  unlikePost,
  likePost,
  getComments,
  getNewMember,
  getProfileUser,
  postComments,
  postLikes,
  profileUser,
  updateProfileUser,
  uploadAvatar,
  getAuthorName,
  LoginFacebook,
  LoginGoogle,
  LoginLinkedIn,
  getIpInfor,
  getSpotlight,
  getArticleKnowledge,
  getSrcCode,
  getAllLanguage,
  getSrcCodeDetail,
  createOrUpdateSrcCode
};
