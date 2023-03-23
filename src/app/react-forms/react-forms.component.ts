import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-react-forms',
  templateUrl: './react-forms.component.html',
  styleUrls: ['./react-forms.component.css']
})
export class ReactFormsComponent implements OnInit {

  title = 'mdf';
  contactForm!: FormGroup;
  middleName!: FormControl

  countryList: country[] = [
    new country("1", "India"),
    new country('2', 'USA'),
    new country('3', 'England')
  ];

  get firstName() {
    return this.contactForm.get('firstName');
  }

  get lastName() {
    return this.contactForm.get('lastName');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get gender() {
    return this.contactForm.get('gender');
  }

  get isMarried() {
    return this.contactForm.get('isMarried');
  }

  get country() {
    return this.contactForm.get('country');
  }

  get city() {
    return this.contactForm.get("address")?.get('city');
  }

  get street() {
    return this.contactForm.get("address")?.get('street');
  }

  get zipCode() {
    return this.contactForm.get("address")?.get('zipCode');
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email]],
      gender: [''],
      isMarried: [''],
      country: [''],
      address: this.formBuilder.group({
        city: [''],
        street: [''],
        zipCode: [''],
      },
      {
        validators: this.addressValidator
      }
      )
    });

    this.contactForm.get("firstName")?.valueChanges.subscribe(selectedValue=> {
      console.log('firstName changed')
      console.log(selectedValue)
      console.log(this.contactForm.get("firstName")?.status)
      console.log(this.contactForm)

      setTimeout(() => {
        console.log(this.contactForm.status)
      })

    })

    this.contactForm.get("address")?.statusChanges.subscribe(selectedValue=> {
      console.log('address changed')
      console.log(selectedValue)
    })

    this.contactForm.statusChanges.subscribe(selectedValue=> {
      console.log('form value changed')
      console.log(selectedValue)
      console.log(this.contactForm)
    })
  }


  setDefault() {

    let contact = {
      firstName: "Van",
      lastName: "Van Lowe",
      email: "lvanlowe@nuttin-but.net",
      gender: "male",
      isMarried: true,
      country: "2",
      address: {
        city: "Dale City",
        street: "Dale Blvd",
        zipCode: "22191"
      }
    };

    this.contactForm.setValue(contact);
  }
  onSubmit() {
    console.log(this.contactForm.value);
  }

  setValue() {

    let contact = {
      firstName: "Peter",
      lastName: "Parker",
      email: "peter@gmail.com",
      gender: "male",
      isMarried: true,
      country: "1",
      address: {
        city: "Bangalore",
        street: "Brigade Road",
        zipCode: "600070"
      }
    };

    this.contactForm.setValue(contact);
  }

  setAddress() {

    let address= {
      city: "Bangalore",
      street: "Brigade Road",
      zipCode: "600070",
    };

    this.contactForm.get("address")?.setValue(address);

  };

  setCountry() {

    this.contactForm.get("country")?.setValue("1");

  };


  patchAddress() {

    let address= {
      city: "Bangalore",
      street: "Brigade Road",
      zipCode: "600070",
      firstName:'Steve'
    };

    this.contactForm.get("address")?.patchValue(address);

  }

  patchName() {
    let contact = {
      firstName: "Peter",
      lastName: "Parker",
    }

    this.contactForm.patchValue(contact);

  }

  setFirstName() {
    this.contactForm.get("middleName")?.setValue("Tony")
  }

  disabled() {
    this.contactForm.disable()
  }

  enabled() {
    this.contactForm.enable()
  }

  markAsTouched() {
    this.contactForm.get("firstName")?.markAsTouched()
  }

  markAllAsTouched() {
    this.contactForm.get("address")?.markAllAsTouched()
  }

  markAsUntouched() {
    this.contactForm.get("firstName")?.markAsUntouched()
  }

  markAsDirty() {
    this.contactForm.markAsDirty()
  }

  markAsPristine() {
    this.contactForm.markAsPristine()
  }

  withEmitEvent() {
    this.contactForm.get("firstName")?.setValue("Hal");
  }
  withoutEmitEvent() {
    this.contactForm.get("firstName")?.setValue("", { emitEvent: false });
  }

  addControl() {
    this.middleName = new FormControl('', [Validators.required]);
    this.contactForm.addControl("middleName",this.middleName);
  }

  registerControl() {
    this.middleName = new FormControl('', [Validators.required]);
    this.contactForm.addControl("middleName",this.middleName);
  }

  removeControl() {
    this.contactForm.removeControl("middleName");
  }

  containsControl() {
    console.log(this.contactForm.contains("middleName"));
  }

  setValidator() {
    this.contactForm.get("firstName")?.setValidators([Validators.required]);
    this.contactForm.get("firstName")?.updateValueAndValidity();
  }

  clearValidation() {
    this.contactForm.get("firstName")?.clearValidators();
    this.contactForm.get("firstName")?.updateValueAndValidity();
 }

  setErrors() {
    this.contactForm.setErrors( {customError:'custom error'});
  }

  reset() {
    this.contactForm.reset();
  }

  addressValidator(control: AbstractControl): ValidationErrors | null {
    const city = control.get('city')?.value;
    const street = control.get('street')?.value;
    console.log(control);
    if (city=="" && street=="") {
      return { missing_address:true };
    }
    return null ;
  }
}

export class country {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

