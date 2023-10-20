import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastComponent } from 'ng-angular-popup';
import { CategoryService } from './category.service';
import { Category } from '../../models/Category/category';
import { NgToastService } from 'ng-angular-popup';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  constructor(private cs: CategoryService, router: Router, private toast: NgToastService) { }
  categories: Category[];
  categoriesArchived: Category[];
  searchText: any;
  ngOnInit(): void {
    this.getAllCategories();

  }
  getAllCategories() {
    this.cs.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }
  getAllCategoriesArchived() {
    this.cs.getAllCategoriesArchived().subscribe(data => {
      this.categoriesArchived = data;
    });
  }
  public onUpdateCategory(c: Category) {
    this.cs.updateCategory(c).subscribe(
      (response: Category) => {
        console.log(response);
        this.toast.success({ detail: 'Success', summary: 'Successfully updated !', position: 'tr', duration: 2000 })
        this.getAllCategories();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.toast.error({ detail: 'Error', summary: 'Something wrong !', position: 'tr', duration: 2000 })
      }
    );
  }


  public onUpdateArchive(c: Category) {
    this.cs.setArchive(c).subscribe(
      (response: Category) => {
        if (c.archived) {
          console.log(response);
          this.toast.success({ detail: 'Success', summary: 'Catgeory successfully archived !', position: 'tr', duration: 1000 })
        }
        else {
          console.log(response);
          this.toast.error({ detail: 'Error', summary: 'Category disarchived !', position: 'tr', duration: 1000 })
        }
        this.getAllCategories();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.toast.error({ detail: 'Error', summary: 'Something wrong !', position: 'tr', duration: 1000 })
      }
    );
  }

  public onAddCategory(addForm: NgForm): void {
    const categoryName = addForm.value.nameCategory;

    // Check if the category name already exists
    this.cs.checkCategoryExists(categoryName).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.toast.error({ detail: 'Error', summary: 'Category name already exists!', position: 'tr', duration: 2000 });
        } else {
          // Create the category if it doesn't already exist
          this.cs.createCategory(addForm.value).subscribe(
            (response: Category) => {
              console.log(response);
              this.toast.success({ detail: 'Success', summary: 'Successfully added !', position: 'tr', duration: 2000 });
              this.getAllCategories();
              addForm.reset();
            },
            (error: HttpErrorResponse) => {
              this.toast.error({ detail: 'Error', summary: 'Check fields !', position: 'tr', duration: 2000 });
              alert(error.message);
            }
          );
        }
      },
      (error: HttpErrorResponse) => {
        this.toast.error({ detail: 'Error', summary: 'An error occurred while checking for category name!', position: 'tr', duration: 2000 });
        alert(error.message);
      }
    );
  }

  public onOpenModal(c: Category, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {

      button.setAttribute('data-target', '#addCategoryModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
