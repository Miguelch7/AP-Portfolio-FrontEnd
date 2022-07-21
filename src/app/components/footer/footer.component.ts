import { Component, OnInit } from '@angular/core';
import { faAt, faUser, faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faFacebookSquare, faInstagram, faGithub, IconDefinition as IconDefinitionBrands } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number = new Date().getFullYear();

  faAt: IconDefinition = faAt;
  faUser: IconDefinition = faUser;
  faLinkedinIn: IconDefinitionBrands = faLinkedinIn;
  faFacebookSquare: IconDefinitionBrands = faFacebookSquare;
  faInstagram: IconDefinitionBrands = faInstagram;
  faGithub: IconDefinitionBrands = faGithub;
  faEnvelope: IconDefinition = faEnvelope;

  constructor() { }

  ngOnInit(): void {
  }

}
