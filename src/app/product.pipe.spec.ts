import { ProductPipe } from './product.pipe';
import { Product } from './entities/product';
import { Gender } from './entities/user';

describe('ProductPipe', () => {
  let productsBefore: Product[];

  beforeEach(() => {
    productsBefore = [{
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
    },
    {
      _id: '2', user:
      {
        _id: '2', username: 'def', email: 'def@kea.dk',
        firstname: 'Benny', lastname: 'Larsen', phone: '12121212',
        gender: Gender.Male, birthDate: new Date(1985, 2, 2),
        profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
      },
      name: 'Logitech G518', description: 'Gaming mouse',
      startingPrice: 300, minimumBid: 10,
      images: ['https://cdn.shopify.com/s/files/1/0066/0052/files/Hair_brush_guide_6.jpg'], dateCreated: new Date(2019, 2, 18),
      endDate: new Date(2019, 3, 18), bids: [], location: 'Copenhagen'
    }]
  });

  it('create an instance', () => {
    const pipe = new ProductPipe();
    expect(pipe).toBeTruthy();
  });

  it('filters based on maximum price', () => {
    const pipe = new ProductPipe();

    const pipeResult = pipe.transform(productsBefore, '', 200);

    const productsAfter: Product[] = [{
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
    }];

    expect(pipeResult).toEqual(productsAfter);
  });

  it('filters based on product name', () => {
    const pipe = new ProductPipe();

    const pipeResult = pipe.transform(productsBefore, 'Hair Brush', 0);

    const productsAfter: Product[] = [{
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
    }];

    expect(pipeResult).toEqual(productsAfter);
  });

  it('filters based on product description', () => {
    const pipe = new ProductPipe();

    const pipeResult = pipe.transform(productsBefore, 'Gaming mouse', 0);

    const productsAfter: Product[] = [{
      _id: '2', user:
      {
        _id: '2', username: 'def', email: 'def@kea.dk',
        firstname: 'Benny', lastname: 'Larsen', phone: '12121212',
        gender: Gender.Male, birthDate: new Date(1985, 2, 2),
        profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
      },
      name: 'Logitech G518', description: 'Gaming mouse',
      startingPrice: 300, minimumBid: 10,
      images: ['https://cdn.shopify.com/s/files/1/0066/0052/files/Hair_brush_guide_6.jpg'], dateCreated: new Date(2019, 2, 18),
      endDate: new Date(2019, 3, 18), bids: [], location: 'Copenhagen'
    }];

    expect(pipeResult).toEqual(productsAfter);
  });

  it('returns an empty array in case of no match', () => {
    const pipe = new ProductPipe();

    const pipeResult = pipe.transform(productsBefore, 'This should return an empty array', 0);

    const productsAfter: Product[] = [];

    expect(pipeResult).toEqual(productsAfter);
  });
});
