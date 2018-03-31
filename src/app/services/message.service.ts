import { Message } from '../messages/message.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class MessageService {

  constructor(private http: HttpClient) {}

  private messages: Message[] = [];

  addMessage(message: Message) {
      this.messages.push(message);
      const body = JSON.stringify(message);
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post('http://localhost:3000/message', body, {headers: headers})
        .map((response: Response) => response)
        .catch((error: Response) => Observable.throw(error));
  }

  getMessages() {
      return this.http.get('http://localhost:3000/message')
        .map((response: Response) => {
          const receivedMessages: Message[] = response['obj'];
          this.messages = receivedMessages
          return receivedMessages;
        })
        .catch((error: Response) => Observable.throw(error));
  }

  deleteMessage(message: Message) {
      this.messages.splice(this.messages.indexOf(message), 1);
  }
}
