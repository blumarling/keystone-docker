import React from 'react'
import { ItemId, AddNewItem, CreateItem,
  UpdateItems, DeleteItems } from '@keystonejs/app-admin-ui/components/'
import about from './pages/about'

export default {
  logo: () => <div>MyLogo</div>,
  itemHeaderActions: () => {
    return (<div><ItemId /><AddNewItem /><p>Questa sezione può cambiare!</p></div>)
  },
  listHeaderActions: () => (<div><p>Hello world 1</p></div>),
  listManageActions: () => (<div><p>Hello world 2</p></div>),
  pages: () => [
    // Custom pages
    {
      label: 'About',
      path: 'about',
      component: about,
    },
    // Ordering existing list pages
    {
      label: 'Blog',
      children: [
        { listKey: 'Post' },
      ],
    },
    {
      label: 'People',
      children: ['User'],
    },
  ],
};
