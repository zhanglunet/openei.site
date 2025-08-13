import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Models from './pages/Models/Models';
import Data from './pages/Data/Data';
import Platform from './pages/Platform/Platform';
import Projects from './pages/Projects/Projects';
import Marketplace from './pages/Marketplace/Marketplace';
import Guide from './pages/Guide/Guide';
import Partners from './pages/Partners/Partners';
import Activities from './pages/Activities/Activities';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/models',
        element: <Models />,
      },
      {
        path: '/data',
        element: <Data />,
      },
      {
        path: '/platform',
        element: <Platform />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/marketplace',
        element: <Marketplace />,
      },
      {
        path: '/guide',
        element: <Guide />,
      },
      {
        path: '/partners',
        element: <Partners />,
      },
      {
        path: '/activities',
        element: <Activities />,
      },
    ],
  },
]);