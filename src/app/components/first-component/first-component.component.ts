import { Component, Input, OnInit } from '@angular/core';
import { TestServiceService } from 'src/app/services/test-service.service';
import {Student } from 'src/app/models/student';
import { FormsModule  } from '@angular/forms';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


// IMPORTE FORM GROUP, FORM CONTROL, VALIDATORS.

@Component({
  selector: 'componente-tabla',
  templateUrl: './first-component.component.html', 
  styleUrls: ['./first-component.component.css']
})

export class FirstComponentComponent implements OnInit  {
  
  
  student = new Student(); //INSTANCIA DE UN OBJETO.
  studentForm:FormGroup;
  studentsList = new Array <Student>()
  
  id2 : number
  dni2 : number
  nombre2 : string
  apellido2 : string
  email2 : string

  constructor(private studentService: TestServiceService, private modalService: NgbModal){} 

  ngOnInit() { 
    this.studentForm= new FormGroup({ 
      "dni": new FormControl(this.student.dni,Validators.required), //VALIDATORS.
      "firstName":new FormControl(this.student.firstName, Validators.required),
      "lastName":new FormControl(this.student.lastName, Validators.required),
      "email":new FormControl(this.student.email, Validators.required)
    });
    this.getAll()
  }

  // GETTER.
  get dni() {return this.studentForm.get("dni") } 
  get lastName() {return this.studentForm.get("lastName")}
  get firstName() {return this.studentForm.get("firstName")}
  get email() {return this.studentForm.get("email")}

  //CAN'T GET, VER ERROR.

  getAll(){
    this.studentService.getAll().subscribe(response => {
      this.studentsList = response;
    }, error => {
      console.log(error);     
    })
  }

  saveStudent(){

    this.student.dni = this.dni?.value 
    this.student.lastName = this.lastName?.value
    this.student.firstName = this.firstName?.value
    this.student.email = this.email?.value
    this.student.cohort = 0
    this.student.status = ''
    this.student.gender = ''
    this.student.address = ''
    this.student.phone = ''

    this.studentService.add(this.student).subscribe(() => { 
      location.reload()
      }, error => {
        console.error(error);
        alert('Error: ' + error.error.message)
        document.getElementsByTagName('input')[0].focus()
    })
  }

  delete(dni: number){

    this.studentService.delete(dni).subscribe(() => { 
      location.reload()
      }, error => {
        console.error(error);
        alert('Error: ' + error.error.message)
        document.getElementsByTagName('input')[0].focus()
    })

  }
  
  edit(s: Student, ver: any){

      this.id2 = s.id
      this.dni2 = s.dni
      this.nombre2 = s.firstName
      this.apellido2 = s.lastName
      this.email2 = s.email
      
      this.modalService.open(ver).result.then(() => {
      
      this.student.id = this.id2
      this.student.dni = this.dni2
      this.student.firstName = this.nombre2
      this.student.lastName = this.apellido2
      this.student.email = this.email2
      this.student.cohort = 0
      this.student.status = ''
      this.student.gender = ''
      this.student.address = ''
      this.student.phone = ''

      this.studentService.update(this.student).subscribe(() => {
        location.reload()
      }, error => {
        console.error(error)
        alert('Error: ' + error.error.message)
      })
    })
  }
}




