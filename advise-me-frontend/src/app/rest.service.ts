import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

const endpoint = "http://localhost:3000/";

@Injectable({
  providedIn: "root"
})
export class RestService {
  constructor(private http: HttpClient) {}

  async post(url, body) {
    try {
      const data = await this.http.post(url, body).toPromise();
      return data;
    } catch (err) {
      console.log({ err });
      if (err.status === 401) {
        throw { error: "UNAUTHORIZED" };
      }
      throw { ERROR: "ERROR" };
    }
  }

  async put(url, body) {
    try {
      const data = await this.http.put(url, body).toPromise();
      return data;
    } catch (err) {
      console.log({ err });
      if (err.status === 401) {
        throw { error: "UNAUTHORIZED" };
      }
      throw { ERROR: "ERROR" };
    }
  }

  async get(url) {
    try {
      const data = await this.http.get(url).toPromise();
      return data;
    } catch (err) {
      console.log({ err });
      if (err.status === 401) {
        throw { error: "UNAUTHORIZED" };
      }
      throw { ERROR: "ERROR" };
    }
  }

  async getUsers() {
    const data = await this.get(`${endpoint}users`);
    return data;
  }

  async getUser(userId) {
    const data = await this.get(`${endpoint}users/${userId}`);
    return data;
  }

  async login(user) {
    const data = await this.post(`${endpoint}login`, user);
    console.log({ data });
    return data;
  }

  async register(user) {
    const data = await this.post(`${endpoint}register`, user);
    console.log({ data });
    return data;
  }

  async updateUser(userId, user) {
    const data = await this.put(`${endpoint}users/${userId}`, user);
    console.log({ data });
    return data;
  }
}
