import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {lastValueFrom} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrl: './home-doctor.component.css'
})
export class HomeDoctorComponent implements OnInit {
  patients: any;
  patientEmail: string = "";
  doctorId: string = "";
  medicalCenterId: string = "";
  patientsSize: number = 0;
  pageIndex: number = 0;
  searchingMode: boolean = false;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar,
              private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.doctorId = this.apiService.getCurrentUser();

    const getUserByIdResponse = this.apiService.getUserById(this.doctorId);
    let getUserById = await lastValueFrom(getUserByIdResponse);
    this.medicalCenterId = getUserById.medical_center;
    this.refreshPatients(0, true);
  }

  refreshPatients(page: number, firstRequest: boolean): void {
    if (firstRequest) {
      this.apiService.getCountUsersByMedicalCenter(this.medicalCenterId).subscribe(
        (response) => {
          this.patientsSize = response.count;
        }
      );
    }
    this.apiService.getUsersByMedicalCenterPaginated(this.medicalCenterId, page).subscribe(
      (response) => {
        this.patients = response;
      }
    );
  }

  searchPatients(page: number, firstRequest: boolean) {
    if (firstRequest) {
      this.apiService.getCountUsersByMedicalCenterSearch(this.medicalCenterId, this.patientEmail).subscribe(
        (response) => {
          this.patientsSize = response.count;
        }
      );
    }
    this.apiService.getUsersByMedicalCenterPaginatedSearch(this.medicalCenterId, page, this.patientEmail).subscribe(
      (response) => {
        this.patients = response;
      }
    );
  }

  searchPatient() {
    if (this.patientEmail != "") {
      this.pageIndex = 0;
      this.searchingMode = true;
      this.searchPatients(0, true);
    } else {
      this.snackBar.open("Escribe un email", "Entendido", { duration: 2000});
    }
  }

  reloadSearch() {
    if (this.searchingMode) {
      this.pageIndex = 0;
      this.searchingMode = false;
      this.patientEmail = "";
      this.refreshPatients(0, true);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    if (this.searchingMode) {
      this.searchPatients(e.pageIndex, false);
    } else {
      this.refreshPatients(e.pageIndex, false);
    }
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['login']).then();
  }
}
