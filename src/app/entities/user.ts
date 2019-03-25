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

export enum Gender {
  Male, Female, Other
}