export default interface IUser {
  _id?: string;
  name: string;
  email: string;
  photo?: string;
  role: string;
  completedLessons: Array<number>;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  photo: string;
}

export interface ILogin {
  email: string;
  password: string;
}
