
import { ObserversModule } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
 
  
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServService } from './auth-serv.service';

@Injectable({
  providedIn: 'root',
})

export default class CheckPhoneService {
  static createValidator(userService: AuthServService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => { 
      return userService
        .checkPhone( control.value )
        .pipe(
          map((result: {result :boolean}) => {
            return result.result ? { alreadyTaken: true } : null; } 
            
             )
        );
    };
  }
}



