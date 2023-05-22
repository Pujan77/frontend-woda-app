import { Donate, Events, Landing, Login, Subscriber } from '../pages';

export const routingItems = [
  {
    to: '/',
    title: 'Landing',
    component: <Landing />,
    exact: true,
  },
  {
    to: '/get-connected',
    title: 'Get Connected',
    component: <Subscriber />,
    exact: false,
  },
  {
    to: '/login',
    title: 'Login',
    component: <Login />,
    exact: false,
  },
  {
    to: '/donate',
    title: 'Donate',
    component: <Donate />,
    exact: false,
  },
  {
    to: '/events',
    title: 'Events',
    component: <Events />,
    exact: false,
  },
];

export const NAV_ITEMS = [
  {
    label: 'Get Connected',
    children: [
      {
        label: 'For notification',
        subLabel: 'Get notified of various services',
        href: '/get-connected',
      },
      {
        label: 'Woda Staffs',
        subLabel: 'For the staffs only',
        href: '/login',
      },
    ],
  },

  {
    label: 'Donate',
    href: '/donate',
  },
  {
    label: 'Events',
    href: '/events',
  },
];
