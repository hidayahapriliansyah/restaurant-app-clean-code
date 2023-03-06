import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { IDB_NAME, IDB_VERSION, OBJECT_STRORE_NAME } = CONFIG;

const dbPromise = openDB(IDB_NAME, IDB_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STRORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    return (await dbPromise).get(OBJECT_STRORE_NAME, id);
  },

  async getAllRestaurant() {
    return (await dbPromise).getAll(OBJECT_STRORE_NAME);
  },

  async putRestaurant(restaurant) {
    return (await dbPromise).put(OBJECT_STRORE_NAME, restaurant);
  },

  async deleteRestaurant(id) {
    console.log('deleteRestaurant', id);
    return (await dbPromise).delete(OBJECT_STRORE_NAME, id);
  },
};

export default FavoriteRestaurantIdb;
