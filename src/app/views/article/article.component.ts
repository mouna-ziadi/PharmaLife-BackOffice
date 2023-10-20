import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'app/models/ArticleComment/article';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { ArticleService } from './article.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'] 
})
export class ArticleComponent implements OnInit {

  
 
  hashMapArticleStatus:  Map<String, number> = new Map<string, number>();
  public editArticle?: Article;
  public deleteArticle?: Article;
  public detailsArticle?: Article;
  article: Article[];
  totalArticle: number;
  searchName :string ;
  articless: Article[];
  searchText:any;





  constructor(private articleService: ArticleService,private router: Router) { }

  ngOnInit(): void {
    this.getArticles();
   /* this.statisticsArticleStatus(); */
  }

  /*private statisticsArticleStatus(){
    this.articleService.statisticsArticleStatus().subscribe(data=>{
      this.hashMapArticleStatus=data;
      console.log("dataaaa"+data);
    
      console.log(this.hashMapArticleStatus);
    })
  }*/

  private getArticles(){
    this.articleService.getArticleList().subscribe(data => {
       this.article = data;
       this.totalArticle= this.article.length;

  
    });
  }
  
  public OnDetailsArticle(idArticle: number){
    this.articleService.getArticleById(idArticle).subscribe(
      (response: Article) => {
        console.log(response);
      });
  }

  
  public onAddArticle(addForm: NgForm): void {
    document.getElementById('add-Article-form')!.click();
    this.articleService.createArticle(addForm.value).subscribe(
      (response: Article) => {
        console.error
        console.log(response);
        this.getArticles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  /*public onUpdateArticle(article: Article) {
    this.articleService.updateArticle(article).subscribe(
      (response: Article) => {
        console.log(response);
        this.getArticles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/
  
  public onUpdateArticle(article: Article) {
    this.articleService.updateArticle(article).subscribe(
      (response: Article) => {
        console.log(response);
        this.getArticles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onDeleteArticle(idArticle: number): void {

    this.articleService.deleteArticle(idArticle).subscribe(() => { this.getArticles() }
    
    ),
    (error: HttpErrorResponse) => {
      alert(error.message);
    };
  }
  
  public onOpenModal(article: Article, mode: string): void {
    console.log("test")
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editArticle = article;
      button.setAttribute('data-target', '#updateArticleModal');
    }
    if (mode === 'delete') {
      this.deleteArticle = article;
      button.setAttribute('data-target', '#deleteArticleModal');
    }
    if (mode === 'add') {
  
      button.setAttribute('data-target', '#addArticleModal');
    }
    if (mode === 'detail') {
  
      button.setAttribute('data-target', '#detailArticleModal');
    }
  
    container?.appendChild(button);
    button.click();
  }

  //

  searchArticlesByName() {
    this.articleService.getArticlesByName(this.searchName).subscribe(
      articless => this.article = articless,
        error => console.log(error)
    );
}

playSound(){
  let audio = new Audio();
  audio.src = "../../../assets/img/article/V1.mp3"
  audio.load();
  audio.play();
}

playSound2(){
  let audio = new Audio();
  audio.src = "../../../assets/img/article/V2.mp3"
  audio.load();
  audio.play();
}

playSound3(){
  let audio = new Audio();
  audio.src = "../../../assets/img/article/V3.mp3"
  audio.load();
  audio.play();
}
}
