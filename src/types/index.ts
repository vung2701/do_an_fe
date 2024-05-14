

export type TypeLogin = {
  username?: string,
  password?: string,
} 

export type TypeArticle = {
  title?: string;
  author?: string | undefined;
  published_on?: string | undefined;
  image?: string | undefined;
  content?: string | undefined;
  reference_link?: string | undefined;
  spotlight?: boolean;
  spotlight_image?: string | undefined;
  created_on?: string | undefined;
  created_by?: string | undefined;
  like_auth?: string[] | undefined;
  last_modified?: string | undefined;
  language?: string | undefined;
  author_description?: string | undefined;
  likes?: number | undefined;
  comments?: number | undefined;
  shares?: number | undefined;
  author_user_id?: string | undefined;
  knowledge?: string[]
  like_list?: like_list[];
  comment_list?: comment_list[];
  share_list?: share_list[];
  article_id?: string | undefined;
  author_img?: string | undefined;
  author_username?: string | undefined;
  author_major?: string | undefined;
  author_school?: string | undefined;
  limit?: boolean;
};

type like_list = {
  like_list?: like_list[];
};

type comment_list = {
  comment_list?: comment_list[];
};

type share_list = {
  share_list?: share_list[];
};

export interface TypeAuthor {
  user_id_profile?: string;
  first_name?: string;
  last_name?: string;
}

export type TypeKnowledgeType = {
  knowledge_type_id?: string;
  name?: string
}

export type TypeLanguage = {
  id?: string;
  name?: string
}

export type TypeKnowledge = {
  knowledge_id?: string;
  name?: string
}

export interface TypeComments {
  attachment?: string | undefined;
  comment_list?: string[] | undefined;
  comments?: string | undefined;
  created_by?: string | undefined;
  created_on?: string | undefined;
  description?: string | undefined;
  id?: number | undefined;
  likes?: string | undefined;
  parent_article?: string | undefined;
  parent_comment?: number | undefined;
  shares?: number | undefined;
  title?: string | undefined;
}

export interface TypeContentPosts {
  title?: string | undefined;
  author?: string | undefined;
  author_username?: string | undefined;
  author_major?: string | undefined;
  author_school?: string | undefined;
  author_img?: string | undefined;
  published_on?: string | undefined;
  image?: string | undefined;
  viewMore?: boolean;
  islanguage?: boolean;
  content?: string | undefined;
  language?: string | undefined;
  author_description?: string | undefined;
  author_user_id?: string | undefined;
  created_on?: string | undefined;
  reference_link?: string | undefined;
  like_auth?: string[] | undefined;
  comments?: number | undefined;
  shares?: number | undefined;
  likes?: number | undefined;
  id?: string | undefined;
  knowledge?: string[] | undefined;
  limit?: boolean;
  handleLanguage?: () => void;
  handleViewMore?: () => void;
}

export interface TypeNewLike {
  title?: string | undefined;
  author?: string | undefined;
  published_on?: string | undefined;
  article_id?: string | undefined;
  like_list?: string | undefined;
  share_list?: string | undefined;
  like_auth?: string | undefined;
  share_auth?: string | undefined;
}


export interface ExtendProps {
  handleLike?: () => void;
  liked?: boolean | undefined;
  likes?: number | undefined;
  likess?: number | undefined;
  likeAuth?: string[] | undefined
  handleComments?: () => void;
  comments?: number | undefined;
  commentd?: number | undefined;
  handleShare?: () => void;
  shares?: number | undefined;
  handleShowMoreComments?: () => void;
  commentsRef?: React.RefObject<HTMLTextAreaElement>;
  comment?: string | undefined;
  setComment?: React.Dispatch<React.SetStateAction<string>>;
  showButton?: boolean | undefined;
  open?: boolean | undefined;
  isLiked?: boolean | undefined;
  baseUrl?: string | undefined;
  handleSubmit?: () => void;
  showMore?: () => void;
  moreComment?: any;
}


export interface TypeProfile {
  DOB?: string | undefined;
  user_id?: string | undefined;
  school?: string | undefined;
  major?: string | undefined;
  email?: string | undefined;
  first_name?: string | undefined;
  id?: number | undefined;
  image?: string | undefined;
  last_name?: string | undefined;
  location?: string | undefined;
  modified_on?: string | undefined;
  phone?: string | undefined;
}

export interface TypeButton {
  clasNames?: string | undefined;
  text?: string | undefined;
  htmlFor?: string | undefined;
  errors?: any | undefined;
  id?: string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditorChange?: (a: string, b: any) => void;
  value?: string | undefined;
  name?: string | undefined;
  required?: string | undefined;
  type?: string | undefined;
  placeholder?: string | undefined;
  autoComplete?: string | undefined;
}

export type TypePost = {
  post_id?: string | undefined;
  title?: string | undefined;
  content?: string | undefined;
  created_by?: string | undefined;
  created_on?: string | undefined;
  likes?: number | undefined;
  comments?: number | undefined;
  like_auth?: string[] | undefined;
  comment_auth?: number[] | undefined;
  comment_list?: number[] | undefined;
  created_by_image?: string | undefined;
  first_name_created_by?: string | undefined;
  last_name_created_by?: string | undefined;
  email_created_by?: string | undefined;
  company_created_by?: string | undefined;
  designation_created_by?: string | undefined;
  fetchPosts?: () => void;
};

export type TypeSrcCode = {
  src_code_id?: string | undefined;
  name?: string | undefined;
  content?: string | undefined;
  created_by?: string | undefined;
  created_on?: string | undefined;
  created_by_image?: string;
  created_by_name?: string;
  created_by_school?: string;
  languages?: string[]; 
  language_ids?: string[]; 
  post_id?: string; 
  fetchSrcCodes?: () => void;
};


export interface TypePagination {
  page?: number | undefined;
  perPage?: number | undefined;
}

export interface TypeNewLike {
  title?: string | undefined;
  author?: string | undefined;
  published_on?: string | undefined;
  article_id?: string | undefined;
  like_list?: string | undefined;
  share_list?: string | undefined;
  like_auth?: string | undefined;
  share_auth?: string | undefined;
}

export interface TypeLikePost {
  post_id?: string | undefined;
  like_auth?: string | undefined;
}

export interface TypePostComment {
  title?: string | undefined | null;
  parent_comment?: string | undefined;
  description?: string | undefined;
  created_by?: string | undefined;
}

export interface TypeNewComment {
  title?: string | undefined | null;
  parent_article?: string | undefined;
  parent_post?: string | undefined;
  parent_comment?: string | undefined;
  description?: string | undefined;
  created_by?: string | undefined;
}

export interface TypeNewParamsComments {
  id?: string | undefined;
  page?: number | undefined;
  perPage?: number | undefined;
}

export interface TypeSpotlight {
  category?: string | undefined;
  item_id?: number | undefined;
  spotlight_image?: string | undefined;
  spotlight_from?: string | undefined;
  spotlight_to?: string | undefined;
  spotlight_title?: string | undefined;
  spotlight_des?: string | undefined;
}
