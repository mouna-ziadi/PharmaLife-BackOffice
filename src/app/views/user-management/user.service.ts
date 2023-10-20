import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'app/models/User/user';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'any'
})
export class UserService {

 private baseURL = environment.apiBaseUrl;


  constructor(private httpClient: HttpClient) {}
  token = localStorage.getItem('token');
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  



  getUsersList() : Observable<User[]>{
    console.log(this.options);
     return this.httpClient.get<User[]>(`${this.baseURL+"/User/all-Users"}`, this.options);

  }

  createUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL+"/User/add-User"}`, user, this.options);
  }

  uploadFile( file: File , idUser : number ) : Observable<any>{  
    let url = this.httpClient + "/User/uploadImage/" + idUser ;  
    const formdata: FormData = new FormData();  
    formdata.append('file', file);  
    return this.httpClient.post(url , formdata);  
  }  


  getUserById(idUser: number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL+"/User/retrieve-User"}/${idUser}`, this.options);
  }


  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseURL+"/User/update-User"}`, user, this.options);
  }


  deleteUser(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL+"/User/delete-User"}/${id}`, this.options);  
  }



  statisticsUserRoles(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}`+"/User/role-statistics",this.options);

  }
  statisticsUserGender(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}`+"/User/gender-statistics",this.options);
  }

  statisticsUserActivationStauts(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}`+"/User/activationStatus-statistics",this.options);
  }

  
  getUsersByRole(role: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/User/find-ByRole/${role}`);
  }

  getRoles(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseURL}/User/roles`);
  }


  getCreatedAtStatisticsByDate(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}`+"/User/statisticsCreatedAtUser",this.options);
  }
}
