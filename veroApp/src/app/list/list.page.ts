import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;

  lojas: any = []

  public items: Array<{ title: string; icon: string; id: number }> = [];
  constructor(private storage: Storage) {

    storage.get('userData').then(data => {
      for (let i = 0; i < data.lojas.length; i++) {
        this.items.push({
          title: data.lojas[i],
          icon: 'ios-arrow-dropright-circle',
          id: i
        });
      }
    })
  }


  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
