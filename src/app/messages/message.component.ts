import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from '../models/message.model';
import { MessageService } from '../services/message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})
export class MessageComponent {
    @Input() message: Message;

    constructor(private messageService: MessageService) {}

    onEdit() {
      this.messageService.editMessage(this.message);
    }

    onDelete() {
      this.messageService.deleteMessage(this.message).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    }

    belongToUser() {
      return localStorage.getItem('user_id') === this.message.userId;
    }

}
