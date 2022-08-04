import { Component, OnInit } from '@angular/core';
import { faAt, faKey, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  faAt: IconDefinition = faAt;
  faKey: IconDefinition = faKey;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    try {
      this.authService.login(this.email, this.password);
    } catch (error) {
      alert("no te podes loggear macho");
    }
  }

}
