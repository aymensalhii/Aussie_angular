import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from "swiper";

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../../node_modules/swiper/swiper.scss']
})
export class HomeComponent implements OnInit {

  swiperConfig: SwiperOptions = {
    breakpoints: {
      850: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 10
      }

    }
  }

  transaction_id: any = '';
  submitting: boolean = true;
  step: string = 'first';

  /*public mainform = {
    fname: '',
    lname: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    transaction_id: ''
  }*/

  mainform = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    transaction_id: ['']
  });

  organizationPart = this.fb.group({
    org_id: ['']
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  Save() {
    this.submitting = false;
    //const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const chars = "0123456789";
    const l = 22;
    let randomstring = '';
    for(let i=0; i<l; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring = randomstring + chars.substring(rnum, rnum+1);
    }
    this.mainform.value.transaction_id = randomstring;

    //console.log(this.transaction_id);
    console.log(this.mainform);
    let email = this.mainform.value.email;

    localStorage.setItem('username', this.mainform.value.fname+' '+this.mainform.value.lname);

    this.http.get('https://start.yougov.com/refer/vZVFDKdn88yzl4?email='+email+'&rlid=qmediax&rlid2='+this.mainform.value.transaction_id).subscribe(res => {
      console.log(res);
    })

    setTimeout(() => {
      this.submitting = true;
      this.router.navigateByUrl('/thank-you')
    }, 5000);
  }

  test() {
    console.log(this.mainform.value);
  }

  Next() {
    this.step = 'second';
  }
  Back() {
    this.step = 'first';
  }

}
