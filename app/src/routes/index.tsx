import { Route, Routes } from 'react-router';
import paths from './paths';
import Home from '@/pages/home';

const GlobalRoute = () => (
  <Routes>
    <Route path={paths.home} element={<Home />} />
    <Route path="*" element={<h1>Hello world !</h1>} />
  </Routes>
);

export default GlobalRoute;
