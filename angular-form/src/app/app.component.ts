import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submitted = false;
  
  City: any = ['Florida', 'South Dakot', 'Tennesse', 'Michigan']

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef
  ){}

    //===============================================================
    registrationForm = this.fb.group({
      file: [null],
      fullNamw: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
        lastName: ['', Validators.required]
      }),
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNumber:['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      address: this.fb.group({
        street:['', [Validators.required]],
        city: ['', [Validators.required]],
        cityName: ['', [Validators.required]]
      }),
      gender: ['male'],
      PasswordValidation: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword:['', [Validators.required]],
      },{
        //validator: ValidatePassword.MatchPassword
      }
      ),
      addDynamicElement: this.fb.array([])
    })

    //======================================

    @ViewChild('fileInput') el: ElementRef | undefined;
    imageUrl: any = "https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg"
    editFile: boolean = true;
    removeUpload: boolean = false;

    uploadFile = (event:any) => {
      let reader = new FileReader();
      let file = event.target.files[0];
      if(event.target.files && event.target.files[0]){
        reader.readAsDataURL(file);

        reader.onload = () =>{
          this.imageUrl = reader.result;
          this.registrationForm.patchValue({
            file: reader.result,
          })
          this.editFile = false;
          this.removeUpload = true;
        };
        this.cd.markForCheck();
      }
    }

    onSubmit = () =>{

    }

    removeUploadedFile = () => {
      if(this.el != undefined){
        let newFileList = Array.from(this.el.nativeElement.files);
        this.imageUrl = "https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg";
        this.editFile = true;
        this.removeUpload = false;
        this.registrationForm.patchValue({
          file: [null],
        });}
    }

    get myForm(){
      return this.registrationForm.controls
    }

    

}
