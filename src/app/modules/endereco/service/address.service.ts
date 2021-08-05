import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, ISetOptions } from 'src/app/shared/service/base.service';
import { isNullOrWhitespace } from 'src/app/util/functions';
import { AddressFormModel } from '../form/model/address.form.model';
import { AddressModel } from '../model/address.model';

@Injectable()
export class AddressService extends BaseService {
	private collection = 'Address';
	private setOptions: ISetOptions = { useAlert: 'status', objName: 'Endereço' }
	constructor(private _http: HttpClient) {
		super();
	}

	fetchCep(cep: string): Promise<AddressFormModel> {
		if (isNullOrWhitespace(cep))
			return;

		return this._http
			.get<AddressFormModel>(`http://viacep.com.br/ws/${cep}/json`)
			.toPromise();
	}

	fetchData = () =>
		this.getData<AddressFormModel>(this.collection, { idField: 'cep'});

	fetchAddressById = (cep: string) =>
		this.getById<AddressFormModel>(cep, this.collection, { idField: 'cep' })

	insertAddress = (obj: AddressFormModel) =>
		this.create(obj, AddressModel, this.collection, this.setOptions, obj.cep);

	deleteAddress = (cep: string) => this.delete(cep, this.collection, this.setOptions);
}
