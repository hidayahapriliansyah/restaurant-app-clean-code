import Home from '../views/pages/home';
import Detail from '../views/pages/detail';
import Reviews from '../views/pages/reviews';
import FavoriteRestaurant from '../views/pages/favorite-restaurant';

const routes = {
  '/': Home,
  '/favorite-restaurant': FavoriteRestaurant,
  '/detail/:id': Detail,
  '/reviews/:id': Reviews,
};

export default routes;
