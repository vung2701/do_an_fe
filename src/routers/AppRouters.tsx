import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/notfound/NotFound';
import Details from '../pages/articles/details/Details';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import Register from '../pages/register/Register';
import Articles from '../pages/articles/Articles';
import Home from '../pages/home/Home';

export default function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/profile/:id" element={<Profile />} /> */}
      <Route path="articles/:id" element={<Details />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
