import {
  Complain,
  ComplaintView,
  Donate,
  Donations,
  Events,
  Landing,
  Login,
  Notices,
  Subscriber,
  Welcome,
} from '../pages';

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
  {
    to: '/complain',
    title: 'Complain',
    component: <Complain />,
    exact: false,
  },
];
export const routingItemsPrivate = [
  {
    to: '/user/welcome',
    title: 'Welcome',
    component: <Welcome />,
    exact: false,
  },
  {
    to: '/user/notices',
    title: 'Notices',
    component: <Notices />,
    exact: false,
  },
  {
    to: '/user/donations',
    title: 'Donations',
    component: <Donations />,
    exact: false,
  },
  {
    to: '/user/complaints',
    title: 'ComplaintView',
    component: <ComplaintView />,
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
  {
    label: 'Complain',
    href: '/complain',
  },
];
