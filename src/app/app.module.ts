import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserComponent } from './views/user-management/user.component'; 
import { DeliveryPersonComponent } from './views/deliveryP-management/delivery-person.component';
import { LoginComponent } from './views/login/login.component';
import {NgToastModule} from 'ng-angular-popup';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { JwtModule } from "@auth0/angular-jwt";
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SearchPipe } from './search.pipe';
import { ProductManagementComponent } from './views/product-management/product-management.component';
import { CategoryManagementComponent } from './views/category-management/category-management.component';
import { GiftManagementComponent } from './views/gift-management/gift-management.component';
import { ReclamationManagementComponent } from './views/reclamation-management/reclamation-management.component';
import { StatComponent } from './views/purchase-commands/stat/stat.component';
import { AssociationComponent } from './views/association/association.component';
import { DonationAssociationComponent } from './views/donation-association/donation-association.component';
import { DonationComponent } from './views/donation/donation.component';
import { RequestComponent } from './views/request/request.component';
import { ReservationComponent } from './views/reservation/reservation.component';
import { EventComponent } from './views/event/event.component';
import { EventReservationComponent } from './views/event-reservation/event-reservation.component';
import { CommentComponent } from './views/comment/comment.component';
import { ArticleComponent } from './views/article/article.component';

import { PurchaseCommandsComponent } from './views/purchase-commands/purchase-commands.component';
import { CommandsComponent } from './views/purchase-commands/commands/commands.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgToastModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatRadioModule,
    MatTooltipModule,
    MatSelectModule,
    NgChartsModule,
    NgChartsModule,
    NgApexchartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:  (s) => localStorage.getItem('token')
      }
    }) ,


  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserComponent,
    DeliveryPersonComponent,
    LoginComponent,
    SearchPipe,
    ProductManagementComponent,
    CategoryManagementComponent,
    GiftManagementComponent,
    ReclamationManagementComponent,
    StatComponent,
    AssociationComponent,
    DonationAssociationComponent,
    DonationComponent,
    RequestComponent,
    ReservationComponent,
    EventComponent,
    EventReservationComponent,
    CommentComponent,
    ArticleComponent,
    PurchaseCommandsComponent,
    CommandsComponent,
    StatComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
