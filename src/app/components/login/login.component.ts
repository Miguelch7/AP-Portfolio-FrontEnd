import { Component, OnInit } from '@angular/core';
import { faAt, faKey, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faAt: IconDefinition = faAt;
  faKey: IconDefinition = faKey;

  constructor() { }

  ngOnInit(): void {
  }

}
