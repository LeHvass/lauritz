export class User {
  _id: string;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  gender: Gender; // Male, Female
  birthDate: Date;
  profileImage: string;
  ratings: Rating[];
}

export class UserVm {
  _id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  gender: Gender; // Male, Female
  birthDate: Date;
  profileImage: string;
}

export class Rating {
  user: UserVm;
  rating: number;
  date: Date;
  description: string;
}

export enum Gender {
  Male, Female, Other
}