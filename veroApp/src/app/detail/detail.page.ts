import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public id:number = -1;
  public nome:string
  public items: Array<{ dados: Array<string>; icon: string }> = []

  dados: any = []
  lojas: any = []
  constructor(private activatedRoute: ActivatedRoute, private storage: Storage) {
    storage.get('userData').then(data => {
      this.dados = data.dados
      this.lojas = data.lojas

      this.id = Number( this.activatedRoute.snapshot.paramMap.get('id'))

      this.nome = this.lojas[this.id]

      this.items.push({
        dados: this.dados[Number(this.id)],
        icon: 'ios-remove-circle'
      })
    }).catch(err => console.log(err))
  }
  ngOnInit() {
    
  }
  apagar(i)
  {
    const index = this.dados[this.id].indexOf(i, 0);
    if (index > -1) {
      this.dados[this.id].splice(index, 1);
    }

  }

}
