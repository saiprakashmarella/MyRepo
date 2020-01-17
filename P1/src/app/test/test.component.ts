import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/Services/CustomerService.service';
import { Image } from 'ol';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  imageToShow: any;
  ngOnInit() {
    this.customerService.getCustomerImage().subscribe(data => {
      this.createImageFromBlob(data);
    });
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
