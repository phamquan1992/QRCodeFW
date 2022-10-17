import { Component } from '@angular/core';
import { optioncs } from './models/optioncs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  shownav: boolean = false;
  status = '';
  drawer_click() {
    this.shownav = !this.shownav;
  }
  op_tion: optioncs = {
    data: "Nam Từ Liêm Hà Nội",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/50px-Bitcoin.svg.png',
    witdth: 300,
    height: 300,
    margin: 0,
    dotstyle: "square",
    cornersDot_type: 'None',
    cornerSquareType: 'None',
    dotcolor: '#000000',
    background_color: '#ffffff',
    shape: 'square'
  };
  taiqr() {
    this.status = 'download';
  }

}
