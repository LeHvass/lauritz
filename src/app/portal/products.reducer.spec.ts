import { ProductState } from './../store';
import { TempDataService } from './../services/temp-data.service';
var deepFreeze = require('deep-freeze');
import { productsReducer } from './products.reducer';
import * as types from './product.actions';
import { Gender } from '../entities/user';

describe('products reducer', () => {

  it('should return the initial state', () => {
    expect(productsReducer(undefined, {})).toEqual(
      { isLoading: false, products: TempDataService.products });
  });

  it('should add a new product', () => {
    let stateBefore = { products: [], isLoading: false } as ProductState;
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

    let stateAfter: ProductState = { products: [product], isLoading: false };

    let response = productsReducer(stateBefore, { type: types.ProductActions.CREATE_PRODUCT_SUCCESS, payload: product });
    expect(stateAfter).toEqual(response);
  });

  it('should delete a product from the products array based on an id', () => {
    let beforeState = { products: [{ _id: '1', name: 'Hair Brush' }, { _id: '2', name: 'Nail conditioner' }, { _id: '3', name: 'Nail psykologist' }], isLoading: false } as ProductState;
    deepFreeze(beforeState);
    let afterState = { products: [{ _id: '1', name: 'Hair Brush' }, { _id: '3', name: 'Nail psykologist' }], isLoading: false } as ProductState;
    let response = productsReducer(beforeState, { type: types.ProductActions.DELETE_PRODUCT_SUCCESS, payload: '2' })

    expect(afterState).toEqual(response);
  });

  it('should update a product object', () => {
    let beforeState = {
      products: [{ _id: '1', name: 'Hair Brush' },
      { _id: '2', name: 'Nail conditioner' },
      { _id: '3', name: 'Nail psykologist' }]
    } as ProductState;
    deepFreeze(beforeState);

    let afterState = {
      products: [{ _id: '1', name: 'Hair Brush' },
      { _id: '2', name: 'Nail conditioner' },
      { _id: '3', name: 'Nail polish' }]
    } as ProductState;

    let response = productsReducer(beforeState, {
      type: types.ProductActions.UPDATE_PRODUCT,
      payload: { _id: '3', name: 'Nail polish' }
    })

    expect(afterState).toEqual(response);
  });

});
