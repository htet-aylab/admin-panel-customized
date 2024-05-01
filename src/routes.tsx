import { Icon } from '@chakra-ui/react';
import {
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
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
  },
  
];

export default routes;
