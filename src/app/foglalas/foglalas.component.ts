import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '../base.service';
import { Foglalas } from '../foglalas';

@Component({
  selector: 'app-foglalas',
  templateUrl: './foglalas.component.html',
  styleUrls: ['./foglalas.component.css']
})
export class FoglalasComponent implements OnInit {
 foglalasok: any;
formValue!: FormGroup;
foglalasObj: Foglalas = new Foglalas();
edit!:boolean;
post!: boolean;

constructor(
  private base: BaseService,
  private fb: FormBuilder
){}
  ngOnInit(): void {
    this.getFoglalasok();

    this.formValue = this.fb.group({
      id: [''],
      erkezes: ['', Validators.required],
      tavozas:['',  Validators.required],
      vendeg_neve: ['',  Validators.required],
      szoba_szama: ['',  Validators.required],
    });

  }
openModal(){
  const modelDiv =  document.getElementById('myModal)');
 if(modelDiv != null){
  modelDiv.style.display = 'block';
 }
 this.edit = false;
 this.post=true;
}

closeModal(){
  const modelDiv =  document.getElementById('myModal)');
 if(modelDiv != null){
  modelDiv.style.display = 'none';
 }
 this.formValue.reset();
 let ref = document.getElementById('close');
 ref?.click();

}

getFoglalasok(){
  this.base.getAllFoglalas().subscribe({
    next: (res)=>{
      this.foglalasok = res;
      console.log(res);
  
    }
  })
 
}

deleteFoglalas(id: number){
  this.base.deleteFoglalas(id).subscribe(()=>{
    this.getFoglalasok();
  })
}

postFoglalas(){

  this.base.postFoglalas(this.formValue.value).subscribe(res=>{
    this.formValue.reset();
    let ref = document.getElementById('close');
    ref?.click();
    this.getFoglalasok();

  })
}

updateFoglalas(){
  this.foglalasObj.erkezes = this.formValue.value.erkezes;
  this.foglalasObj.tavozas = this.formValue.value.tavozas;
  this.foglalasObj.vendeg_neve = this.formValue.value.vendeg_neve;
  this.foglalasObj.szoba_szama = this.formValue.value.szoba_szama;

  this.base.updateFoglalas(this.formValue.value, this.foglalasObj.id).subscribe(()=>{
    this.formValue.reset();
    let ref = document.getElementById('close');
    ref?.click();
    this.getFoglalasok();
    alert('Foglalás frissítve!');

  })
}

szerkesztes(foglalas:any){
this.foglalasObj.id = foglalas.id;
this.formValue.controls["erkezes"].setValue(foglalas.erkezes);
this.formValue.controls["tavozas"].setValue(foglalas.tavozas);
this.formValue.controls["vendeg_neve"].setValue(foglalas.vendeg_neve);
this.formValue.controls["szoba_szama"].setValue(foglalas.szoba_szama);
this.edit=true;
this.post= false;
}




}




