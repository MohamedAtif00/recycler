// user model
export interface IUser {
    email: string;
    id: string;
  }
  // auth model
  export interface IAuthInfo {
    displayName: string;
    email: string;
    token: string;
    role:string;
    //expiresAt?: number
  }