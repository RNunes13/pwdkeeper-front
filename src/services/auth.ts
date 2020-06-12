
import API from './api';
import { User } from '../models';
import { USER_TOKEN } from '../models/typings';

export class Auth {
  protected api: API;

  constructor() {
    this.api = new API();
  }

  public checkUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const token = window.localStorage.getItem(USER_TOKEN);

      if (!token) return resolve(null);

      this.api.get('/auth-token', { headers: {
        'x-access-token': token,
      }})
      .then((resp) => {
        const user = resp.data.data || null;

        if (!user) window.localStorage.removeItem(USER_TOKEN);

        resolve(user);
      })
      .catch(() => {
        window.localStorage.removeItem(USER_TOKEN);
        resolve(null);
      });
    });
  }

  public signIn(username: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = {
          username,
          password,
        };
  
        const resp = await this.api.post('/sign-in', data);

        const respData = resp.data;

        if (!respData.success) throw respData.error;
  
        resolve(resp.data.data);
      } catch (e) {
        reject(e);
      }
    });
  }

  public signUp(params: {
    name: string;
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await this.api.post('/sign-up', params);

        resolve(resp.data);
      } catch (e) {
        reject(e);
      }
    });
  }

  public static signOut(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      window.localStorage.removeItem(USER_TOKEN);

      resolve(true);
    });
  }

  public checkUsernameAvailability(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.api.post('/username-availability', { username })
        .then((resp) => resolve(resp.data))
        .catch(() => resolve(true));
    });
  }

  public checkEmailAvailability(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.api.post('/email-availability', { email })
        .then((resp) => resolve(resp.data))
        .catch(() => resolve(true));
    });
  }
}
