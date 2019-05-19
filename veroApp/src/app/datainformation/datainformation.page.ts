import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-datainformation',
  templateUrl: './datainformation.page.html',
  styleUrls: ['./datainformation.page.scss'],
})
export class DatainformationPage implements OnInit {

  info: any = {}

  constructor(private activateRoute: ActivatedRoute, private storage: Storage) {
    storage.get('userData').then(data => {
      this.info = data.user_information

      let page = this.activateRoute.snapshot.paramMap.get('page')

      if (page == 'basic') {
        this.info.title = 'Informações Básicas'
        this.info.images =  this.info.basic.images
        this.info.validated = this.info.basic.validated
        this.info.data = this.info.basic.data
      } else if (page == 'residencial') {
        this.info.title = 'Residencial'
        this.info.images =  this.info.residencial.images
        this.info.validated = this.info.residencial.validated
        this.info.data = this.info.residencial.data
      } else if (page == 'phone') {
        this.info.title = 'Telefônico'
        this.info.images =  this.info.phone.images
        this.info.validated = this.info.phone.validated
        this.info.data = this.info.phone.data
      }
    })
  }

  ngOnInit() {
  }
}
