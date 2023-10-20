import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DonationRequestType } from "app/models/AssociationAndDonation/enumeration/donation-request-type";
import { Association } from "app/models/AssociationAndDonation/association";
import { Donation } from "app/models/AssociationAndDonation/donation";
import { Request } from "app/models/AssociationAndDonation/request";
import { AssociationService } from "app/views/association/association.service";
import { DonationService } from "app/views/donation/donation.service";
import { RequestService } from "app/views/request/request.service";
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  searchText: any;

  public editRequest?: Request;
  public deleteRequest?: Request;
  public detailsRequest?: Request;
  public assignRequest?: Request;
  public assignRequestByAdmin?: Request;
  public donationbyadmin?: Donation;
  requests: Request[];
  requestsInProgress: any;
  requestsAccepted: Request[];
  requestsRefused: Request[];
  r: DonationRequestType[];
  selectedTypeRequest: DonationRequestType;
  typeOption: any = [];

  associationList: Association[];
  donationList: Donation[];
  isDisabled: Boolean = true;
  associations: Association[];
  req: Request;

  donations: any;
  public takeDonationA?: Association;
  public takeA?: Association;
  myRequest: Request = new Request();
  idDonation: number;
  idAssociation: number;
  d: Donation;
  idD: number;
  donation1: Donation;
  r1: number;
  constructor(private requestService: RequestService, private associationService: AssociationService,
    private donationService: DonationService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getRequests();

  }


  getEnumValues(enumObj: any) {
    return Object.keys(enumObj).filter(key => !isNaN(Number(enumObj[key])));
  }



  private getRequests() {
    this.requestService.getRequestList1().subscribe(data => {
      this.requests = data;
      console.log(this.requests)

    });
  }

  public OnDetailsRequest(idRequest: number) {
    this.requestService.getRequestById(idRequest).subscribe(
      (response: Request) => {
        console.log(response);
      });
  }


  public onAddRequest(addForm: NgForm): void {
    document.getElementById('add-Request-form')!.click();
    this.requestService.createRequest(addForm.value).subscribe(
      (response: Request) => {
        console.error
        console.log(response);
        this.getRequests();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateRequest(request: Request) {
    this.requestService.updateRequest(request).subscribe(
      (response: Request) => {
        console.log(response);
        this.getRequests();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /* public assignRequestToDonation(request: Request) {
     this.requestService.assignRequestToDonation(request).subscribe(
       (response: Request) => {
         console.log(response);
         this.getRequests();
         //this.isDisabled = true;
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
   }*/

  public onDeleteRequest(idRequest: number): void {
    this.requestService.deleteRequest(idRequest).subscribe(() => { this.getRequests() }

    ),
      (error: HttpErrorResponse) => {
        alert(error.message);
      };
  }

  public onOpenModal(request: Request, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editRequest = request;
      button.setAttribute('data-target', '#updateRequestModal');
    }
    if (mode === 'delete') {
      this.deleteRequest = request;
      button.setAttribute('data-target', '#deleteRequestModal');
    }
    if (mode === 'add') {
      this.associationList;
      button.setAttribute('data-target', '#addRequestModal');
    }
    if (mode === 'detail') {

      button.setAttribute('data-target', '#detailRequestModal');
    }

    if (mode === 'takeDonation') {
      this.getDonationsByRequest(request.association.idAssociation);
      this.takeDonationA = request.association;
      this.assignRequestByAdmin = request;
      this.r1 = request.idRequest;
      // this.myRequest= request,
      button.setAttribute('data-target', '#takeDonationModal');
    }
    if (mode === 'assignDonationToRequestByAdmin') {

      this.assignDonationToRequestByAdmin(this.donation1, this.r1);
      this.assignRequestByAdmin = request;

      button.setAttribute('data-target', '#assignRequestToDonationByAdminModal');
    }
    container?.appendChild(button);
    button.click();
  }



  private getDonationsByRequest(idAssociation: number) {
    this.donationService.getDonationsByRequest(idAssociation).subscribe(data => {
      this.donations = data;

    });
  }




  ////Fonctionnalité avancé
  public assignRequestToDonation(request: Request, idDonation: number, idAssociation: number) {
    this.requestService.assignRequestToDonationByAdmin(this.myRequest, idDonation).subscribe(
      (response: Request) => {
        console.log(response);
        //this.goToAssociationsList();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }





  public assignDonationToRequestByAdmin(donation: Donation, idRequestD: number) {
    this.requestService.assignDonationToRequestByAdmin(donation, idRequestD).subscribe(
      (response: Request) => {
        console.log(response);

        this.toast.success({ detail: "SUCCESS", summary: 'Donation added successfully !', duration: 5000 });

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  goTorequestsList() {
    this.router.navigate(['/requests']);
  }




}
