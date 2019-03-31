import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI{
  id:string;
  question:string[];
  answers:string[];
  errorMessage:any;
  IsFavourite:boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public storage: Storage
  ) {
    super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }

  loadQuestion(id){
    this.storage.get('UserId').then((val)=>{
      if(val!=null){
        var loading = super.showLoading(this.loadingCtrl,"加载中...");
        this.rest.getQestionWithUser(id,val)
          .subscribe(
            q =>{
              this.question = q;
              this.answers = q["Answers"];
              this.IsFavourite = q["IsFavourite"];
            },
            error=>this.errorMessage = <any>error);
      }
    });

  }

}
