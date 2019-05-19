import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { UtilitiesService } from '../utilities.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userData: any = {
    'wallet': {},
    'user_information': {
      'basic': { 'validated': 0 },
      'residencial': { 'validated': 0 },
      'phone': { 'validated': 0 }
    }
  }

  constructor(private storage: Storage, public alertController: AlertController, private utilities: UtilitiesService) {
    storage.get('userData').then(data => {
      this.userData = data
    })

    setInterval(() => {
      this.check()
    }, 5000)
  }

  check() {
    this.utilities.checkNotifications(this.userData.public_key).then((data) => {
      if (data && data['_body'] != null && data['_body'] != '' && data['_body'] != 'null') {
        let json = JSON.stringify(data['_body'])
        json = JSON.parse(json)
        json = JSON.parse(json)
        console.log(json)
        this.showAlert(json)
      }
    })
  }

  async showAlert(data: any) {
    let alert = await this.alertController.create({
      header: 'Requisição de Dados',
      subHeader: data.StoreName,
      message: 'Acesso aos seguintes dados:' + data.Fields,
      buttons: [
        {
        text: 'Conceder',
        handler: () => { this.utilities.consent(data, this.userData).then(() => {
          this.userData.lojas.push(data.StoreName)
          this.userData.dados.push(['rg', 'cpf', 'logradouro', 'nro', 'cep', 'bairro'])
          this.userData.wallet.current_balance = this.userData.wallet.current_balance - data.Value 
          this.storage.set('userData', this.userData)
        }) }
        },
        {
        text: 'Não Conceder'
        }
      ]
    });

    alert.present();
  }
}
