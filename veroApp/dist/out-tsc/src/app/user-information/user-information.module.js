import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserInformationPage } from './user-information.page';
var routes = [
    {
        path: '',
        component: UserInformationPage
    }
];
var UserInformationPageModule = /** @class */ (function () {
    function UserInformationPageModule() {
    }
    UserInformationPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UserInformationPage]
        })
    ], UserInformationPageModule);
    return UserInformationPageModule;
}());
export { UserInformationPageModule };
//# sourceMappingURL=user-information.module.js.map