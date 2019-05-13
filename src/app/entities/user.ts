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
  ratings: Rating[];
}

export class Rating {
  date: Date;
  user: UserRating;
  description: string;
  grade: number; // 1-5 'stars'
}

export class UserRating {
  _id: string;
  username: string;
  profileImage: string;
}

export enum Gender {
  Male, Female, Other
}