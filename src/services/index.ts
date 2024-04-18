
import axios from 'axios';
import { isLogin } from '../middlewares/Authorization';
import { createAxios, uploadAxios } from './axios';
import { TypeLogin } from '../types';

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
const getArticle = async () => {
  try {
    const response = await axiosInstance.get('news/article');
    return response.data.article;
  } catch (error) {
    console.error('Error fetching careers:', error);
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


const getArticleWithParams = async (params: string) => {
  try {
    const axiosInstance = createAxios()
    const response = await axiosInstance.get('news/article' + params);
    return response.data.article;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
};

const getArticleDetails = async (id: string | undefined, webBrowser: string | null) => {
  try {
     const axiosInstance = createAxios();
    const response = await axiosInstance.get(`news/article_details?article_id=${id}&web_browser=${webBrowser}`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching articles detail:', error);
    throw error;
  }
};



const getArticlePublic = async ( id: string | undefined, webBrowser: string | null) => { 
  try {
    const axiosInstance = createAxios();
    const response = await axiosInstance.get(`news/article_details?article_id=${id}&web_browser=${webBrowser}`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching articles public:', error);
    throw error;
  }
}


const postComments = async (newComment: any) => {
  try {
      const response = await axiosInstance.post('news/comment', newComment);
      return response;
  } catch (error) {
    console.error('Error fetching careers:', error);
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
        `news/comment?parent_article=${id}&page=${page}&per_page=${per_page}&sort=-created_on`
      );
      return response?.data;
    }
    return;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
};

const postLikes = async (liked: any) => {
  try {
      const response = await axiosInstance.post('news/article/like_share', liked);
      return response;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
};

const deleteLikes = async (newLike: any) => {
  try {
    const response = await axiosInstance.post('news/article/unlike', newLike);
    return response;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
};


const getProfileUser = async (id: string) => {
  try {
    if(isLogin()){
      const response = await axiosInstance.get(`user/profile/get?user_id=${id}`);
      return response.data;
    }
    return;
  } catch (error) {
    console.error('Error uploading file:', error);
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


const getProfile = async () => {
  try {
    const response = await axiosInstance.get(`user/profile/get`);
    return response.data;
  } catch (error) {
    console.error('Error get infomation:', error);
    throw error;
  }
};

const getAuthorById = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`news/article_author?article_id=${id}`);
    return response?.data.profile;
  } catch (error) {
    console.error('Error get infomation:', error);
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

const getMember = async () => {
  try {
    const axiosInstance = createAxios();
    const response = await axiosInstance.get(`user/new_members`);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const getMemberId = async (id: string) => {
  try {
    if(isLogin()){
      const response = await axiosInstance.get(`user/profile/get?user_id=${id}`);
      return response?.data?.profile;
    }
    return;
  } catch (error) {
    console.error('Error uploading file:', error);
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


export {
  registerUser,
  loginUser,
  loginGetUser,
  logoutUser,
  deleteLikes,
  getArticle,
  getArticleReaded,
  getArticleWithParams,
  getArticleDetails,
  getArticlePublic,
  getComments,
  getProfile,
  getMember,
  getMemberId,
  getProfileUser,
  postComments,
  postLikes,
  profileUser,
  updateProfileUser,
  uploadAvatar,
  getAuthorById,
  getAuthorName,
  LoginFacebook,
  LoginGoogle,
  LoginLinkedIn,
  getIpInfor,
};
