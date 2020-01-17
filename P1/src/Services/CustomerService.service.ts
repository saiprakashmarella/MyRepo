import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from 'src/Models/ICustomer';
import { catchError } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private http: HttpClient) {

    }

    getAllCustomers(): Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>("http://localhost:8080/customer/customers").pipe(catchError(this.errorHandler));

    }
    getCustomerImage(): Observable<Blob> {
        return this.http.get("http://localhost:8080/customer/getImageByCustomerID/1", { responseType: 'blob' });
    }
    uploadCustomerImage(id, image): Observable<string> {
        let body = new FormData();
        body.append('file', image);
        return this.http.post<string>("http://localhost:8080/customer/uploadImage/" + id.toString(), body, { responseType: 'text' as 'json' });
    }
    errorHandler(error: HttpErrorResponse) {
        return Observable.throw(error.message || "server error");
    }
}