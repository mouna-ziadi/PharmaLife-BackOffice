import { DonationRequestType } from "app/models/AssociationAndDonation/enumeration/donation-request-type";
import { Association } from "./association";
import { RequestDonationStatus } from "app/models/AssociationAndDonation/enumeration/request-donation-status";

export class Request {
    idRequest: number;
    nameRequest: string;
    descriptionRequest: string;
    requestType: DonationRequestType;
    dateRequest: Date;
    statusRequest: RequestDonationStatus; 
    association: Association;
    idDonation: number[];
}
