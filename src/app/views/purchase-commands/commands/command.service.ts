import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Command } from 'app/models/CommandPurchase/command';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  url=environment.apiBaseUrl+"/commands";

  constructor(private httpClient: HttpClient) { }
  token = localStorage.getItem('token');
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
 

  getCommandsList(): Observable<Command[]>{
   return this.httpClient.get<Command[]>(this.url + '/retrieveAllCommand',this.options);
  }
  
  createCommand(command: Command): Observable<any>{
    return this.httpClient.post(this.url + '/add-command', command,this.options);
  }

  deleteCommand(idCommand: number): Observable<Object>{
    return this.httpClient.delete(`${this.url}/delete-command/${idCommand}`,this.options);
  }

  updateCommand1(idCommand:number, command: Command):Observable<Object>{
    return this.httpClient.put(`${this.url}/editCommand/${idCommand}`, command,this.options);
  } 

  updateCommand(command: Command): Observable<Command> {
    return this.httpClient.put<Command>(`${this.url+"/editCommand"}`, command,this.options);
  }


  statisticsCommandStatus(): Observable<Map<String,number>>{
    return this.httpClient.get<Map<String,number>>(`${this.url}`+"/statisticsCommandStatus/",this.options);
  } 

}
