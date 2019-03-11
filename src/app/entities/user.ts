export class User {
  _id: string;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  gender: Gender;
  birthdate: Date;
  address: string;
  postcode: string;
  country: string;
}

export enum Gender {
  Male, Female, Other
}