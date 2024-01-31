import React from 'react';
import { NavLink } from 'react-router-dom';
import { Route } from '../../../interfaces';

interface SideBarMenuItemProps {
  route: Route;
}

export const SideBarMenuItem = ({ route }: SideBarMenuItemProps) => {
  return (
    <NavLink
      to={route.to}
      className={({ isActive }) =>
        isActive
          ? 'flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors'
          : 'flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors'
      }
    >
      <i className={`fas ${route.icon} text-xl mr-2 text-indigo-400`} />
      <div className='flex flex-col flex-grow'>
        <span className='text-white text-lg font-semibold'>{route.title}</span>
        <span className='text-gray-400 text-sm'>{route.description}</span>
      </div>
    </NavLink>
  );
};
