import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';
import { Role } from '../models/role/role';

const API_URL = 'http://localhost:8080/api/test/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  addUserUrl:string;
  getEmpUrl:string;
  deleteEmpUrl:string;
  getRoleUrl:string;
  updateEmpUrl:string;

  constructor(private http: HttpClient) {
    this.addUserUrl='http://localhost:8080/api/auth/addUser';
    this.getEmpUrl='http://localhost:8080/api/auth/users';
    this.deleteEmpUrl='http://localhost:8080/api/auth/deleteUserById';
    this.getRoleUrl='http://localhost:8080/api/auth/roles';
    this.updateEmpUrl='http://localhost:8080/api/auth/updateUser'
   }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

 

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.addUserUrl,user);
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.getEmpUrl);
  }
  getAllRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.getRoleUrl);
  }

  deleteUser(id:number) : Observable<User> {
    return this.http.delete<User>(this.deleteEmpUrl+'/'+id);
  }
  updateUser(data:any,id:number) {
    return this.http.put<any>(this.updateEmpUrl+'/'+id,data);
  }


}
