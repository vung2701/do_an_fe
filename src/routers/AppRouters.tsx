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
      {/* <Route path="/posts/create" element={<PostCreate />} /> */}
      {/* <Route path="/posts/update/:id" element={<PostUpdate />} /> */}
      <Route path="/codes" element={<SrcCode />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
