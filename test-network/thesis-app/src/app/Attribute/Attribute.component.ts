/*
* Licensed under the Apache License, Version 2.0 (the 'License');
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an 'AS IS' BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AttributeService } from './Attribute.service';
import { GrantAccessService } from '../GrantAccess/GrantAccess.service';
import { RevokeAccessService } from '../RevokeAccess/RevokeAccess.service';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-attribute',
  templateUrl: './Attribute.component.html',
  styleUrls: ['./Attribute.component.css'],
  providers: [
    AttributeService,
    GrantAccessService,
		RevokeAccessService
  ]
})
export class AttributeComponent implements OnInit {
  myForm2: FormGroup;
  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private Transaction;
	private allSP;

  attrID = new FormControl('', Validators.required);
  blob = new FormControl('', Validators.required);
  issuer = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  revokeStatus = new FormControl('', Validators.required);
  revokers = new FormControl('', Validators.required);
	memberID = new FormControl('', Validators.required);
	public children = {};

  constructor(
    private serviceAttribute: AttributeService,
    private serviceGrantAccess: GrantAccessService,
		private serviceRevokeAccess: RevokeAccessService,
		private http: Http,
    fb: FormBuilder
  ) {
    this.myForm = fb.group({
      attrID: this.attrID,
      blob: this.blob,
      issuer: this.issuer,
      owner: this.owner,
      type: this.type,
      revokeStatus: this.revokeStatus,
      revokers: this.revokers
    });
    this.myForm2 = fb.group({
      attrID: this.attrID,
      memberID: this.memberID
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAttribute
      .getAll()
      .toPromise()
      .then(result => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      })
      .catch(error => {
        if (error === 'Server error') {
          this.errorMessage =
            'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage =
            '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  /**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

  /**
   * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'pt.ua.attr.Attribute',
      attrID: this.attrID.value,
      blob: this.blob.value,
      issuer: this.issuer.value,
      owner: this.owner.value,
      type: this.type.value,
      revokeStatus: this.revokeStatus.value,
      revokers: this.revokers.value
    };

    this.myForm.setValue({
      attrID: null,
      blob: null,
      issuer: null,
      owner: null,
      type: null,
      revokeStatus: null,
      revokers: null
    });

    return this.serviceAttribute
      .addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({
          attrID: null,
          blob: null,
          issuer: null,
          owner: null,
          type: null,
          revokeStatus: null,
          revokers: null
        });
      })
      .catch(error => {
        if (error === 'Server error') {
          this.errorMessage =
            'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }

  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'pt.ua.attr.Attribute',
      blob: this.blob.value,
      issuer: this.issuer.value,
      owner: this.owner.value,
      type: this.type.value,
      revokeStatus: this.revokeStatus.value,
      revokers: this.revokers.value
    };

    return this.serviceAttribute
      .updateAsset(form.get('attrID').value, this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch(error => {
        if (error === 'Server error') {
          this.errorMessage =
            'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage =
            '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  deleteAsset(): Promise<any> {
    return this.serviceAttribute
      .deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch(error => {
        if (error === 'Server error') {
          this.errorMessage =
            'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage =
            '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {
    return this.serviceAttribute
      .getAsset(id)
      .toPromise()
      .then(result => {
        this.errorMessage = null;
        const formObject = {
          attrID: null,
          blob: null,
          issuer: null,
          owner: null,
          type: null,
          revokeStatus: null,
          revokers: null
        };

        if (result.attrID) {
          formObject.attrID = result.attrID;
        } else {
          formObject.attrID = null;
        }

        if (result.blob) {
          formObject.blob = result.blob;
        } else {
          formObject.blob = null;
        }

        if (result.issuer) {
          formObject.issuer = result.issuer;
        } else {
          formObject.issuer = null;
        }

        if (result.owner) {
          formObject.owner = result.owner;
        } else {
          formObject.owner = null;
        }

        if (result.type) {
          formObject.type = result.type;
        } else {
          formObject.type = null;
        }

        if (result.revokeStatus) {
          formObject.revokeStatus = result.revokeStatus;
        } else {
          formObject.revokeStatus = null;
        }

        if (result.revokers) {
          formObject.revokers = result.revokers;
        } else {
          formObject.revokers = null;
        }

        this.myForm.setValue(formObject);
      })
      .catch(error => {
        if (error === 'Server error') {
          this.errorMessage =
            'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage =
            '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  getForm2(id: any): Promise<any> {
    return this.serviceAttribute
      .getAsset(id)
      .toPromise()
      .then(result => {
        this.errorMessage = null;
        const formObject = {
          attrID: null,
          memberID: null
        };

        if (result.attrID) {
          formObject.attrID = result.attrID;
        } else {
          formObject.attrID = null;
        }
      })
      .catch(error => {
        if (error === 'Server error') {
          this.errorMessage =
            'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage =
            '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  resetForm(): void {
    this.myForm.setValue({
      attrID: null,
      blob: null,
      issuer: null,
      owner: null,
      type: null,
      revokeStatus: null,
      revokers: null
    });
  }

  grantAccessTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'pt.ua.attr.GrantAccess',
      attrID: this.attrID.value,
      memberID: this.memberID.value
    };

    this.myForm2.setValue({
      attrID: null,
      memberID: null
    });

    return this.serviceGrantAccess
      .addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm2.setValue({
          attrID: null,
          memberID: null
        });
      })
      .catch(error => {
        if (error === 'Server error') {
          this.errorMessage =
            'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }

  revokeAccessTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'pt.ua.attr.RevokeAccess',
      attrID: this.attrID.value,
      memberID: this.memberID.value
    };

    this.myForm2.setValue({
      attrID: null,
      memberID: null
    });

    return this.serviceRevokeAccess
      .addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm2.setValue({
          attrID: null,
          memberID: null
        });
      })
      .catch(error => {
        if (error === 'Server error') {
          this.errorMessage =
            'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }

  drawchildren(id: any): Promise<any> {
    const tempList = [];
    return this.http
      .get('http://localhost:3000/api/queries/getGrantedSP?attrID=' + id)
      .toPromise()
      .then((data: any) => {
				this.errorMessage = null;
				console.log(data);
				this.children[id] = JSON.parse(data._body);
      })
      .catch(error => {
        if (error === 'Server error') {
          this.errorMessage =
            'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage =
            '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }
}
