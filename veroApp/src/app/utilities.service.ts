import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  API_URL: string = 'http://10.0.1.206:8079/api/'

  constructor(private http: Http) { }

  decodeQrCode(img: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + 'values', { img }, this.getHeaders())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  validateSource(id: string, pkey: any) {
    return new Promise((resolve, reject) => {
      let res = { Id: id, PublicKey: pkey }
      this.http.post(this.API_URL + 'validate', res, this.getHeaders())
        .subscribe(data => {
          console.log(data)
          resolve(data);
        }, error => {
          console.log(error)
          reject(error);
        });
    });
  }

  checkNotifications(public_key: string) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'info/' + public_key

      this.http.get(url, this.getHeaders())
        .subscribe(data => {
          console.log(data)
          resolve(data);
        }, error => {
          console.log(error)
          reject(error);
        });
    });
  }

  consent(data: any, userData: any) {
    return new Promise((resolve, reject) => {
      console.log('teste')
      let url = this.API_URL + 'info/' + userData.public_key
      let fields = data.Fields

      let response = {}
      for (let field in fields) {
        let v = userData.user_information.basic.data.find(x => x.id == field)
        let v2 = userData.user_information.residencial.data.find(x => x.id == field)

        if (v) {
          response[field] = v
        } else if (v2) {
          response[field] = v2
        }
      }
      data.Response = response

      this.http.post(url,data, this.getHeaders())
        .subscribe(d => {
          console.log(d)
          resolve(d);
        }, error => {
          console.log(error)
          reject(error);
        });
    });
  }

  getHeaders(): RequestOptions {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions({ headers: headers });

    return requestOptions;
  }
}
