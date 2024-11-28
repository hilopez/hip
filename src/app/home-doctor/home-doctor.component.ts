import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrl: './home-doctor.component.css'
})
export class HomeDoctorComponent implements OnInit {
  patients: any;
  doctor_medical_center: string = "";

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    console.log("Hello")
    this.doctor_medical_center = this.apiService.getCurrentUser().medical_center;
    this.apiService.getUsersByMedicalCenter(this.doctor_medical_center).subscribe(
      (response) => {
        this.patients = response;
        console.log(this.patients);
      },
      (error) => {
        console.error('Error en el registro', error);
      }
    );
  }

}
