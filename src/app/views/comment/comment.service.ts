import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Comment } from "app/models/ArticleComment/comment"; 
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class CommentService {

    /* readonly API_URL = 'http://localhost:8082/PharmaLife';*/
   API_URL : string = 'http://localhost:8082/PharmaLife/Comment';
  
   constructor(private httpClient: HttpClient) { }
   token = localStorage.getItem('token');
   options = {
     headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
   };
   /* getArticles() {
     return this.httpClient.get(`${this.API_URL}/all-comments`);
   } */

   getCommentList(): Observable<Comment[]>{
     return this.httpClient.get<Comment[]>(`${this.API_URL}`+"/allcomments",this.options);
   }
 
 /*  getCommentById(idComment: number) {
     return this.httpClient.get(`${this.API_URL}`+"/articles/${idArticle}");
   } */
 
   createComment(comment: Comment) : Observable<any>{
     return this.httpClient.post(`${this.API_URL}`+"/add-comment", comment,this.options);
   }
 
   //getArticleById(idArticle: number): Observable<Article>{
    // return this.httpClient.get<Article>(`${this.API_URL}/retrieveArticle/${idArticle}`);
  // }

   
   /* updateArticle(article: Article) : Observable<Article>{
     return this.httpClient.put(`${this.API_URL}`+"/edit-article/${article.idArticle}", article);
   } 

   updateArticle1(idArticle:number, article: Article):Observable<Object>{
     return this.httpClient.put(`${this.API_URL}/edit-article/${idArticle}`, article);
   } 
 
   public updateArticle(article: Article): Observable<Article> {
     return this.httpClient.put<Article>(`${this.API_URL+"/edit-article"}`, article);
   }*/
   
  
 
  deleteComment(idComment: any): Observable<Object> {
     return this.httpClient.delete(`${this.API_URL}/delete-comment/${idComment}`,this.options);
   }


   
  /* statisticsDonationStatus(): Observable<Map<String,number>>{
     return this.httpClient.get<Map<String,number>>(`${this.url}`+"/statisticsDonationStatus/");
   }
   statisticsCommentsByName(): Observable<Map<String,number>>{
     return this.httpClient.get<Map<String,number>>(`${this.API_URL}`+"/statisticsArticleByUser/");
   } 
 */

  
}
