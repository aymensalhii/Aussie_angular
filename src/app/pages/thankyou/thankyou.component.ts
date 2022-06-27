import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  username: string = '';
  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username')+'';
  }

}
