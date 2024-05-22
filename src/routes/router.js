import {
  Dashboard,
  Products,
  ProductsAdd,
  ProductsEdit,
  Promotions,
  PromotionsAdd,
  PromotionsEdit,
  Settings,
} from '../pages';

export const router = [
  { path: '/', element: <Dashboard /> },
  { path: '/product', element: <Products /> },
  { path: '/product/add', element: <ProductsAdd /> },
  { path: '/product/edit/:id', element: <ProductsEdit /> },
  { path: '/promotion', element: <Promotions /> },
  { path: '/promotion/add', element: <PromotionsAdd /> },
  { path: '/promotion/edit/:id', element: <PromotionsEdit /> },
  { path: '/settings', element: <Settings /> },
];
