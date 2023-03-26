import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-react-forms',
  templateUrl: './react-forms.component.html',
  styleUrls: ['./react-forms.component.css']
})
export class ReactFormsComponent implements OnInit {

  title = 'mdf';
  contactForm!: FormGroup;

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
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.email]],
      gender: [''],
      isMarried: [''],
      country: [''],
      address: this.formBuilder.group({
        city: [''],
        street: [''],
        zipCode: [''],
      })
    });

    this.contactForm.get("firstName")?.statusChanges.subscribe(newStatus=> {
      console.log('firstName status changed')
      console.log('first name new status: ' + newStatus)
      console.log('first name status: ' + this.contactForm.get("firstName")?.status)
      console.log('form group status: ' + this.contactForm.status)

    })

    this.contactForm.get("address")?.statusChanges.subscribe(newStatus=> {
      console.log('address status: ' + 'address status changed')
      console.log(newStatus)
    })

    this.contactForm.statusChanges.subscribe(newStatus=> {
      console.log('form status changed')
      console.log('form group new status: ' + newStatus)
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
    this.contactForm.get("firstName")?.setValue("Tony")
  }

  withoutOnlySelf() {
    this.contactForm.get("firstName")?.setValue("");
  }
  withOnlySelf() {
    this.contactForm.get("firstName")?.setValue("", { onlySelf: true });
  }

  withEmitEvent() {
    this.contactForm.get("firstName")?.setValue("Hal");
  }
  withoutEmitEvent() {
    this.contactForm.get("firstName")?.setValue("", { emitEvent: false });
  }
  reset() {
    this.contactForm.reset();
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
