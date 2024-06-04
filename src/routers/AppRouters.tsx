import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/notfound/NotFound';
import Details from '../pages/articles/details/Details';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import Register from '../pages/register/Register';
import Articles from '../pages/articles/Articles';
import PostCreate from '../pages/post/create/PostCreate';
import PostUpdate from '../pages/post/update/PostUpdate';
import PostDetails from '../pages/post/details/PostDetails';
import Posts from '../pages/post/Posts';
import HomePage from '../pages/home/HomePage';
import SrcCode from '../pages/srccode/SrcCode';
import CodeDetails from '../pages/srccode/details/CodeDetails';
import SrcCodeCreate from '../pages/srccode/create/SrcCodeCreate';
import AuthCallback from '../components/Oauth/AuthCallback';
import SrcCodeUpdate from '../pages/srccode/update/SrcCodeUpdate';

export default function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="articles/:id" element={<Details />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/posts/create" element={<PostCreate />} />
      <Route path="/posts/update/:id" element={<PostUpdate />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/codes/create" element={<SrcCodeCreate />} />
      <Route path="/codes/update/:id" element={<SrcCodeUpdate />} />
      <Route path="/codes/:id" element={<CodeDetails />} />
      <Route path="/codes" element={<SrcCode />} />
      <Route path="/callback" element={<AuthCallback />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
