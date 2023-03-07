import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantData {
  static async listAll() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      if (responseJson.message === 'Restaurant not found') {
        throw new Error('ID restoran tidak valid');
      }
      return responseJson.restaurant;
    } catch (error) {
      return error;
    }
  }
}

export default RestaurantData;
