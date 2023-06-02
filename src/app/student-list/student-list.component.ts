import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  paginatedStudents: any[] = [];
  currentPage: number = 1;
  selectedPageLength: number = 5;
  numberOfEntries: number = 5;
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http
      .get<any[]>('http://localhost/user-management/getStudents.php')
      .subscribe((data: any[]) => {
        this.students = data;
        this.updatePage();
      });
  }

  sort(key: string) {
    this.students.sort((a, b) => a[key].localeCompare(b[key]));
    this.updatePage();
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.selectedPageLength;
    const endIndex = startIndex + this.selectedPageLength;
    this.paginatedStudents = this.students
      .filter((student) =>
        student.Name.toString()
          .toLowerCase()
          .includes(this.searchText.toString().toLowerCase())
      )
      .slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    const maxPage = Math.ceil(this.students.length / this.selectedPageLength);
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.updatePage();
    }
  }
}
