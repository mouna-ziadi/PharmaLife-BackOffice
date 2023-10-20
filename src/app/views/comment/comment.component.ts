import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { CommentService } from './comment.service';
import { Comment } from 'app/models/ArticleComment/comment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  
 
  public editComment?: Comment;
  public deleteComment?: Comment;
  public detailsComment?: Comment;
  comment: Comment[];
  totalComment: number;
  searchText: any;



  constructor(private commentService: CommentService,private router: Router) { }

  ngOnInit(): void {
    this.getComments();
   /* this.statisticsCommentStatus(); */
  }

  /*private statisticsCommentStatus(){
    this.CommentService.statisticsCommentStatus().subscribe(data=>{
      this.hashMapCommentStatus=data;
      console.log("dataaaa"+data);
    
      console.log(this.hashMapCommentStatus);
    })
  }*/

  private getComments(){
    this.commentService.getCommentList().subscribe(data => {
       this.comment = data;
       this.totalComment= this.comment.length;

  
    });
  }
  
  /*public OnDetailsComment(idComment: number){
    this.commentService.getCommentById(idComment).subscribe(
      (response: Comment) => {
        console.log(response);
      });
  }*/

  
  public onAddComment(addForm: NgForm): void {
    document.getElementById('add-Comment-form')!.click();
    this.commentService.createComment(addForm.value).subscribe(
      (response: Comment) => {
        console.error
        console.log(response);
        this.getComments();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  /*public onUpdateComment(comment: Comment) {
    this.commentService.updateComment(comment).subscribe(
      (response: Comment) => {
        console.log(response);
        this.getComments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/
  
 /* public onUpdateComment(comment: Comment) {
    this.commentService.updateComment(comment).subscribe(
      (response: Comment) => {
        console.log(response);
        this.getComments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/


  public onDeleteComment(idComment: number): void {

    this.commentService.deleteComment(idComment).subscribe(() => { this.getComments() }
    
    ),
    (error: HttpErrorResponse) => {
      alert(error.message);
    };
  }
  
  public onOpenModal(comment: Comment, mode: string): void {
    console.log("test")
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
   
    if (mode === 'delete') {
      this.deleteComment = comment;
      button.setAttribute('data-target', '#deleteCommentModal');
    }
    if (mode === 'add') {
  
      button.setAttribute('data-target', '#addCommentModal');
    }
   
    container?.appendChild(button);
    button.click();
  }
  
  
  playSound4(){
    let audio = new Audio();
    audio.src = "../../../assets/img/article/V4.mp3"
    audio.load();
    audio.play();
  }

}
