import { Icon } from '@chakra-ui/react';
import { BiCreditCard, BiUserCircle } from 'react-icons/bi';
import {
  MdAdsClick,
  MdHome,
  MdPeople,
} from 'react-icons/md';


import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Advertisers',
    layout: '/admin',
    path: '/advertisers',
    icon: <Icon as={BiUserCircle} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Campaigns',
    layout: '/admin',
    path: '/campaigns',
    icon: <Icon as={MdAdsClick} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Top Up',
    layout: '/admin',
    path: '/topup',
    icon: <Icon as={BiCreditCard} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Users',
    layout: '/admin',
    path: '/users',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
  },
  
];

export default routes;
