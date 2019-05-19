import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Meus Dados',
      url: '/home',
      icon: 'person'
    },
    {
      title: 'Aprovações Realizadas',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Minha Chave Pública',
      url: '/key',
      icon: 'key'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.storage.clear()
      this.storage.get('userData').then(data => {
        console.log(data.name)
      }).catch(() => {
        this.storage.set('userData', {
          'private_key': '1CC3X2gu58d6wXUW_SAMPLE_ADDRESS_DO_NOT_SEND_MffpuzN9JAfTUWu4Kj',
          'public_key': '5Kb8kLf9zgWQnogidDA76Mz_SAMPLE_PRIVATE_KEY_DO_NOT_IMPORT_PL6TsZZY36hWXMssSzNydYXYB9KF',
          'wallet': {
            'current_balance': 360.32
          },
          'basic_info_status': 1,
          'residencial_status': 1,
          'user_information': {
            'basic': {
              'validated': 1,
              'images': [ 'http://www.fernandosilva.pro.br/portal/media/k2/items/cache/5fa21cd9e0d2531a2f1dfdffbab46f70_XL.jpg', 'http://www.8rcpn.com.br/IMAGES/RG8CIRC-A.JPG' ],
              'data': [
                { 'id': 'nome', 'key': 'Nome', 'value': 'José da Silva' },
                { 'id': 'rg','key': 'RG', 'value': '00000000' },
                {  'id': 'cpf','key':'CPF', 'value': '99999999999' },
                {  'id': 'estado_civil','key':'Estado Civil', 'value': 'Solteiro' },
                {  'id': 'nome_mae','key':'Nome Mãe', 'value': 'Solange de Castro' },
                {  'id': 'nome_pai','key':'Nome do Pai', 'value': 'Antonio Carlos' }
                
              ]
            },
            'residencial': {
              'validated': 1,
              'images': [ 'https://assuntodinheiro.com/wp-content/uploads/2018/11/Comprovante-de-Reside%CC%82ncia-Urgente.jpg' ],
              'data': [
                  { 'id': 'logradouro', 'key': 'Logradouro', 'value': 'Rua Aquidaban' },
                  { 'id': 'nro', 'key': 'Nro', 'value': '1' },
                  { 'id': 'complemento', 'key':'Complemento', 'value': 'Apto 20' },
                  { 'id': 'bairro', 'key':'Bairro', 'value': 'Centro' },
                  { 'id': 'cep', 'key':'CEP', 'value': '13665323' }
              ]
            },
            'phone': {
              'validated': 0,
              'images': []
            }
          },
          'phone_status': 1,
          'dados': [],
          'lojas': [],
            'sources': []
        }).then(() => this.splashScreen.hide())
      })
    });
  }
}
