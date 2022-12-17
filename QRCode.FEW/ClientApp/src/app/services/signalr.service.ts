import { Inject, Injectable } from '@angular/core';

import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChatMessage } from '../models/chatMessage.model';
import { MessageObj } from '../models/message';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  foodchanged$ = new Subject();
  messageReceived$ = new Subject<ChatMessage>();
  newCpuValue$ = new Subject<number>();
  MesagearrReceived$ = new Subject<MessageObj[]>();
  arr_obj: MessageObj[] = [];
  arr_notify: string[] = [];
  connectionEstablished$ = new BehaviorSubject<boolean>(false);

  private hubConnection!: HubConnection;
  count_user = new Subject<number>();
  url_str!: string;
  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.url_str = baseUrl + 'messageHub';
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();

  }

  sendChatMessage(message: ChatMessage) {
    this.hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.url_str)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
  }

  private startConnection() {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection.start().then(
      () => {
        console.log('Hub connection started!');
        this.connectionEstablished$.next(true);
        this.get_countuser();
        this.hubConnection.invoke("GetAllActiveConnections").then((t: []) => {
          this.count_user.next(t.length);

        });
      },
      error => console.error(error)
    );
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('FoodAdded', (data: any) => {
      this.foodchanged$.next(data);
    });

    this.hubConnection.on('FoodDeleted', (data: any) => {
      this.foodchanged$.next('this could be data');
    });

    this.hubConnection.on('FoodUpdated', (data: any) => {
      this.foodchanged$.next('this could be data');
    });

    this.hubConnection.on('Send', (data: any) => {
      console.log('data', data);
      this.messageReceived$.next(data);
    });
    this.hubConnection.on('SendMessage', (data: any) => {
      console.log('data', data);
      this.arr_obj.push(data);
      this.MesagearrReceived$.next(this.arr_obj);
      //this.get_countuser();
    });
    this.hubConnection.on("ReceiveMessage", (message, message2) => {
      // console.log(message);
      if (message !== '') {
        this.arr_notify.push(message + ' - ' + message2);
      }
      // console.log("Thông báo: " + message2);
      this.get_countuser();
    });
    this.hubConnection.on("User_send", (message) => {
      console.log('Người gửi: ' + message);
    });

  }
  private get_countuser() {
    this.hubConnection.invoke("GetAllActiveConnections").then((t: []) => {
      this.count_user.next(t.length);
    });
  }
  send_allmess(message1: string, message2: string) {
    this.hubConnection.invoke("SendMessageToAll", message1, message2).then();
  }
  send_mesuser(name: string, user_nhan: string, value: string) {
    this.hubConnection.invoke("SendMessage", name, user_nhan, value).then();
  }
  update_user(name: string) {
    this.hubConnection.invoke("UpdateUser", this.hubConnection.connectionId, name).then();
  }
}