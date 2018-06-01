/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AttributeComponent } from './Attribute/Attribute.component';

import { APComponent } from './AP/AP.component';
import { RBComponent } from './RB/RB.component';
import { SPComponent } from './SP/SP.component';
import { UserComponent } from './User/User.component';

import { GrantAccessComponent } from './GrantAccess/GrantAccess.component';
import { RevokeAccessComponent } from './RevokeAccess/RevokeAccess.component';
import { RevokeAttrComponent } from './RevokeAttr/RevokeAttr.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Attribute', component: AttributeComponent },
  { path: 'AP', component: APComponent },
  { path: 'RB', component: RBComponent },
  { path: 'SP', component: SPComponent },
  { path: 'User', component: UserComponent },
  { path: 'GrantAccess', component: GrantAccessComponent },
  { path: 'RevokeAccess', component: RevokeAccessComponent },
  { path: 'RevokeAttr', component: RevokeAttrComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
