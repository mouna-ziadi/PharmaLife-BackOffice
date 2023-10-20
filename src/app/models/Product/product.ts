import {Category} from "../Category/category"
import {User} from "../User/user"
import { Reclamation } from "../Reclamation/reclamation";


export class Product {
    idProduct:number;
    referenceProduct:String;
    nameProduct:String;
    imageProduct:String;
    descriptionProduct:String;
    priceProduct:number;
    quantityProduct:number;
    expired:number;
    expirationDateProduct:Date;
    userProduct:User[];
    categoryProduct:Category;
    ReclamationsProduct:Reclamation[]

}
