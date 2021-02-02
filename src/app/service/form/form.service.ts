import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  validate={
    required: (control: AbstractControl): { [key: string]: any } => {
      if (control.value && control.value.text) {
        if (!control.value.text.trim())
          return { 'error': true };
        else
          return null;
      }
    
      if (!control.value || !control.value.toString().trim())
        return { 'error': true };
      else
        return null;
    }
  };

  constructor(private formBuilder: FormBuilder) { 
    const PURE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const NAME_REGEXP = /[A-Za-z]$/;
    const NUMB_REGEXP = /^[1-9]\d*(\.\d+)?$/;
    this.addValidation('name', NAME_REGEXP);
    this.addValidation('email', PURE_EMAIL_REGEXP);
    this.addValidation('email', PURE_EMAIL_REGEXP);
    this.addValidation('number', NUMB_REGEXP);
    this.addValidation('confirmPassword', PASSWORD_REGEXP, 'password');
  }

  customerForm(args?){
    return this.formBuilder.group({
      name: this.setValidation(args.name || '', true, 'name'),
      phone: this.setValidation(args.phone || '', false),
      email: this.setValidation(args.email || '', false, 'email')
    });
  }

  itemForm(args?){
    return this.formBuilder.group({
      name: this.setValidation(args.name || '', true, 'name'),
      price: this.setValidation(args.price || '', true),
      quantity: this.setValidation(args.quantity || '', true),
      unit: this.setValidation(args.unit || '', true)
    });
  }

  taxForm(args?){
    return this.formBuilder.group({
      name: this.setValidation(args.name || '', true, 'name'),
      price: this.setValidation(args.price || '', true)
    });
  }

  discountForm(args?){
    return this.formBuilder.group({
      name: this.setValidation(args.name || '', true, 'name'),
      price: this.setValidation(args.price || '', true)
    });
  }

  registerForm(){
    return this.formBuilder.group({
      name: this.setValidation('', true, 'name'),
      email: this.setValidation('', true, 'email'),
      password: this.setValidation('', true, 'password'),
      reenterpassword: this.setValidation('', true, 'confirmPassword'),
    });
  }

  loginForm(): FormGroup {
    return this.formBuilder.group({
      email: this.setValidation('', true, 'email'),
      password: this.setValidation('', true, 'password'),
    });
  }

  setValidation(defaultValue = null, required: boolean = false, validation: string = null){
    var composeValidation = [];
    if (required) {
      composeValidation.push(Validators.required);
      composeValidation.push(this.validate['required']);
    }
    if (validation)
      composeValidation.push(this.validate[validation]);
    if (composeValidation.length)
      return [defaultValue, Validators.compose(composeValidation)];
  
    return [defaultValue];
  }

  addValidation(name, REGEXP, confirmField=null){
    this.validate[name] = (control: AbstractControl): { [key: string]: any } => {
      if (!control.value)
        return null;
    
      var reg = new RegExp(REGEXP);
      let isValid = reg.test(control.value);
      if (!isValid)
        return { ['validate'+name]: { isValid } }
      else if(confirmField){
        isValid = control.value == control.root.value[confirmField]
        if (!isValid) {
          return { [confirmField+'Mismatch']: { isValid } };
        }
      }
      return null;
    };
  }
}
