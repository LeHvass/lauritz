import { ProductState } from './../store';
import { TempDataService } from './../services/temp-data.service';
var deepFreeze = require('deep-freeze');
import { productsReducer } from './products.reducer';
import * as types from './product.actions';
import { Gender } from '../entities/user';

describe('products reducer', () => {

  it('should return the initial state', () => {
    expect(productsReducer(undefined, {})).toEqual(
      { isLoggedIn: undefined, products: TempDataService.products });
  });

  it('set isLoggedIn to true', () => {

    let state = { isLoggedIn: undefined, products: TempDataService.products };
    deepFreeze(state);

    expect(productsReducer(state, { type: types.ProductActions.LOG_IN, payload: true }))
      .toEqual({ isLoggedIn: true, products: TempDataService.products });
  });

  // Create a test to check that your create functionality works AND
  // does not make state mutations
  it('should add a new product', () => {
    let stateBefore = { products: [] } as ProductState;
    deepFreeze(stateBefore);

    let product = {
      _id: '1', user:
      {
        _id: '1', username: 'abc', email: 'abc@kea.dk',
        firstname: 'Asger', lastname: 'Poulsen', phone: '12121212',
        gender: Gender.Male, birthDate: new Date(1985, 2, 2),
        profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
      },

      name: 'Hair Brush', description: 'test bla bla',
      startingPrice: 100, minimumBid: 10,
      images: ['https://cdn.shopify.com/s/files/1/0066/0052/files/Hair_brush_guide_6.jpg'], dateCreated: new Date(2019, 2, 18),
      endDate: new Date(2019, 3, 18), bids: [], location: 'Copenhagen'
    }

    let stateAfter = { products: [product] };

    let response = productsReducer(stateBefore, { type: types.ProductActions.CREATE_PRODUCT, payload: product });
    expect(stateAfter).toEqual(response);
  });

  // Create a test to check that your create functionality works AND
  // does not make state mutations
  it('should update a product', () => {
    let stateBefore = {
      products: [
        {
          _id: '1', user:
          {
            _id: '1', username: 'abc', email: 'abc@kea.dk',
            firstname: 'Asger', lastname: 'Poulsen', phone: '12121212',
            gender: Gender.Male, birthDate: new Date(1985, 2, 2),
            profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
          },

          name: 'Hair Brush', description: 'test bla bla',
          startingPrice: 100, minimumBid: 10,
          images: ['https://cdn.shopify.com/s/files/1/0066/0052/files/Hair_brush_guide_6.jpg'], dateCreated: new Date(2019, 2, 18),
          endDate: new Date(2019, 3, 18), bids: [], location: 'Copenhagen'
        }
      ]
    } as ProductState;
    deepFreeze(stateBefore);

    let stateAfter = {
      products: [
        {
          _id: '1', user:
          {
            _id: '1', username: 'abc', email: 'abc@kea.dk',
            firstname: 'Asger', lastname: 'Poulsen', phone: '12121212',
            gender: Gender.Male, birthDate: new Date(1985, 2, 2),
            profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
          },

          name: 'Hair Brush New', description: 'test bla bla',
          startingPrice: 100, minimumBid: 10,
          images: ['https://cdn.shopify.com/s/files/1/0066/0052/files/Hair_brush_guide_6.jpg'], dateCreated: new Date(2019, 2, 18),
          endDate: new Date(2019, 3, 18), bids: [], location: 'Copenhagen'
        }
      ]
    };

    let response = productsReducer(stateBefore, {
      type: types.ProductActions.UPDATE_PRODUCT, payload: {
        _id: '1', user:
        {
          _id: '1', username: 'abc', email: 'abc@kea.dk',
          firstname: 'Asger', lastname: 'Poulsen', phone: '12121212',
          gender: Gender.Male, birthDate: new Date(1985, 2, 2),
          profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
        },

        name: 'Hair Brush New', description: 'test bla bla',
        startingPrice: 100, minimumBid: 10,
        images: ['https://cdn.shopify.com/s/files/1/0066/0052/files/Hair_brush_guide_6.jpg'], dateCreated: new Date(2019, 2, 18),
        endDate: new Date(2019, 3, 18), bids: [], location: 'Copenhagen'
      }
    });
    expect(stateAfter).toEqual(response);
  });

  it('should delete a product from the products array based on an id', () => {
    // 1: Create a start-state with some product objects (could be reduced, with fewer properties as long as you have _id)
    // 2: Deep freeze to check for immutability
    // 3: Create the after-state (this is our expectation of what the state should look like after calling the reducer)
    // 4: Call the reducer
    // 5: expect statements (assert)

    let stateBefore = {
      products: [
        {
          _id: '1', user:
          {
            _id: '1', username: 'abc', email: 'abc@kea.dk',
            firstname: 'Asger', lastname: 'Poulsen', phone: '12121212',
            gender: Gender.Male, birthDate: new Date(1985, 2, 2),
            profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
          },

          name: 'Hair Brush', description: 'test bla bla',
          startingPrice: 100, minimumBid: 10,
          images: ['https://cdn.shopify.com/s/files/1/0066/0052/files/Hair_brush_guide_6.jpg'], dateCreated: new Date(2019, 2, 18),
          endDate: new Date(2019, 3, 18), bids: [], location: 'Copenhagen'
        }
      ]
    } as ProductState;
    deepFreeze(stateBefore);

    let stateAfter = { products: [] };

    let response = productsReducer(stateBefore, { type: types.ProductActions.DELETE_PRODUCT, payload: '1' });
    expect(stateAfter).toEqual(response);

  });
});
