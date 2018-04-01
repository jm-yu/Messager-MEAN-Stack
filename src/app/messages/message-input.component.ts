import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from '../services/message.service';
import { Message } from '../models/message.model';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
  message: Message;

  ngOnInit(): void {
    this.messageService.messageIsEdit.subscribe(
      (message: Message) => this.message = message
    );
  }

  constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {
      if (this.message) {
        this.message.content = form.value.content;
        this.messageService.updateMessage(this.message).subscribe(
          data => console.log(data),
          error => console.error(error)
        );
        this.message = null;
      } else {
        const message = new Message(form.value.content, 'Max');
        this.messageService.addMessage(message)
          .subscribe(
            data => console.log(data),
            error => console.error(error)
          );
      }
      form.resetForm();
    }

  onClear(form: NgForm) {
    this.message = null;
    form.resetForm();
  }
}
