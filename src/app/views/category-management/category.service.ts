import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../../models/Category/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = "http://localhost:8082/PharmaLife/Category";

  constructor(private httpClient: HttpClient) { }
  token = localStorage.getItem('token');
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseURL}` + "/all-categories", this.options);
  }
  getAllCategoriesArchived(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseURL}` + "/all-categoriesArchived", this.options);
  }
  getAllCategoriesCancelArchived(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseURL}` + "/all-categories",this.options);
  }


  createCategory(category: Category): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` + "/add-category", category,this.options);
  }

  getCategoryById(idCategory: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseURL}` + "/retrieve-category/" + `${idCategory}`,this.options);
  }

  updateCategory(category: Category): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}` + "/update-category/", category,this.options);
  }

  deleteCategory(idCategory: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}` + "/delete-category/" + `${idCategory}`,this.options);
  }
  setArchivedCategory(category: Category): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}` + "/archive-category/", category,this.options);

  }
  setArchivedCancelCategory(category: Category): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}` + "/cancel-archive-category/", category,this.options);

  }

  setArchive(category: Category): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}` + "/set-archive-category/", category,this.options);

  }

  checkCategoryExists(name: string): Observable<boolean> {
    const url = `${this.baseURL}/exists/${name}`;
    return this.httpClient.get<boolean>(url,this.options);
  }

}
