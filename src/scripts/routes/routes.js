import Home from '../views/pages/home';
import Detail from '../views/pages/detail';
import FavoriteRestaurant from '../views/pages/favorite-restaurant';

const routes = {
  '/': Home,
  '/favorite-restaurant': FavoriteRestaurant,
  '/detail/:id': Detail,
};

export default routes;
