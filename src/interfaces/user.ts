export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  birth_date: Date;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
