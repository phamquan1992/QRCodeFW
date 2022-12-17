import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inputbase } from '../models/input-base';

@Injectable({
    providedIn: 'root'
})
export class InputControlService {

    constructor() { }
    toFormGroup(arrInput: Inputbase<string>[]) {
        const group: any = {};

        arrInput.forEach(item => {
            if (item.required) {
                let arr_validator = [Validators.required];
                item.options.forEach(valid => {
                    if (valid.key == 'min') {
                        let gt = Number(valid.value);
                        arr_validator.push(Validators.minLength(gt));
                    }
                    if (valid.key == 'max') {
                        let gt = Number(valid.value);
                        arr_validator.push(Validators.maxLength(gt));
                    }
                    if (valid.key == 'link') {
                        let urlPattern2 = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
                        arr_validator.push(Validators.pattern(urlPattern2));
                    }
                });
                if (item.type == 'email')
                    arr_validator.push(Validators.email);
                group[item.key] = new FormControl(item.value || "", arr_validator);
            } else {
                group[item.key] = new FormControl(item.value || '');
            }
        });
        return new FormGroup(group);
    }
}
