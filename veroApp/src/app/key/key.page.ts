import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Storage } from '@ionic/storage';
import { UtilitiesService } from '../utilities.service'

@Component({
  selector: 'app-key',
  templateUrl: './key.page.html',
  styleUrls: ['./key.page.scss'],
})
export class KeyPage implements OnInit {

  BASE64_MARKER = ';base64,';

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 100,
    targetHeight: 100,
    correctOrientation: false
  }

  sources: any = []
  public_key: any = ''

  constructor(private camera: Camera, private toast: Toast, private storage: Storage,
    private utilities: UtilitiesService) {
    storage.get('userData').then(data => {
      this.sources = data.sources
      this.public_key = data.public_key
    })
  }

  ngOnInit() {
  }

  scan2() {
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = imageData;

      this.utilities.decodeQrCode(base64Image).then(data => {
        let json = JSON.parse(data['_body'])
        json = JSON.parse(json)
        console.log(json['ComputerName'])
        if (data['_body'] != "" && !this.sources.find(x => x.name == json.ComputerName)) {
          this.utilities.validateSource(json.Id, this.public_key)
          this.sources.push({ 'name': json.ComputerName })
          this.toast.show(`Pareamento realizado com sucesso.`, '5000', 'top').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
      }, err => {
        console.log(err)
      }).catch(err => {
        console.log(err)
        this.toast.show(`Não conseguimos detectar um QR Code. :(`, '5000', 'top').subscribe(
          toast => {
            console.log(toast);
          }
        );
      })
    });

  }

}
