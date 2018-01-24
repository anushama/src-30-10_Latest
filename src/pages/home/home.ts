import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {ApiService} from '../../providers/api-service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


	public resultJson: any;
	public serviceCallEndPoint: any="https://mobile-qa.penfed.org/webapp/rest/private/accounts";
  public memberID: string;

  constructor(public navCtrl: NavController, public http: Http, public api:ApiService) {
    this.resultJson = this.api.resultJson;
    this.memberID = this.api.user;
  }

  // callSvc(){
  //
  //   this.api.firstRequest().subscribe(
  //     res=>{
  //       console.log(res);
  //       //var payload = res.json();
  //       var headers = res.headers;
  //       var setCookieHeader = headers.get('Set-Cookie');
  //       console.log(setCookieHeader);
  //     },
  //     err=>console.log(err),
  //     ()=>{
  //
  //       console.log("completed first req.. starting second");
  //
  //       this.api.secondRequest().subscribe(
  //         data=>{
  //           let dat=JSON.stringify(data);
  //           console.log(dat);
  //           this.resultJson = data.json();
  //
  //         },
  //         err=>{
  //           let body = JSON.parse(err)._body;
  //           this.resultJson = body;
  //         }
  //         );
  //     });
  // }

}
