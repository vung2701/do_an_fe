import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/notfound/NotFound';
import Details from '../pages/articles/details/Details';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import Register from '../pages/register/Register';
import Articles from '../pages/articles/Articles';
import Home from '../pages/home/Home';
import PostCreate from '../pages/post/create/PostCreate';
import PostUpdate from '../pages/post/update/PostUpdate';
import PostDetails from '../pages/post/details/PostDetails';

export default function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/profile/:id" element={<Profile />} /> */}
      <Route path="articles/:id" element={<Details />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/posts/create" element={<PostCreate />} />
      <Route path="/posts/update/:id" element={<PostUpdate />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
