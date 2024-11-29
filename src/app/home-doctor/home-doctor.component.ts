import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrl: './home-doctor.component.css'
})
export class HomeDoctorComponent implements OnInit {
  patients: any;
  doctorId: string = "";

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.doctorId = this.apiService.getCurrentUser();
    this.apiService.getUserById(this.doctorId).subscribe(
      (response) => {
        this.apiService.getUsersByMedicalCenter(response.medical_center).subscribe(
          (response) => {
            this.patients = response;
          }
        );
      }
    );
  }
}
