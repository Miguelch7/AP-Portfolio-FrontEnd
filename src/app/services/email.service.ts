import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../models/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl: string = environment.apiUrl + '/email/send';

  constructor(
    private http: HttpClient
  ) { }

  sendEmail(nombre: string, email: string, mensaje: string): Observable<boolean> {
    const emailToSend: Email = {
      email: environment.emailReceiver,
      subject: `Hola, soy ${ nombre } y me gustaría contactarte! - Responder a: <${ email }>`,
      content: mensaje
    };

    return this.http.post<boolean>(this.apiUrl, emailToSend);
  }
}
