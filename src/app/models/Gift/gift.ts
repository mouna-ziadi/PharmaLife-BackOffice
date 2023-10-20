import { Product } from "../Product/product";
import { User } from "../User/user";

export class Gift {
    idGift:number;
    beginsAtGift:Date;
    endsAtGift:Date;
    productsGift:Product[];
    userGift:User[];
    description:String;

}
