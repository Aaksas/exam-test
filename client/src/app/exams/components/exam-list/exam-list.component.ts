import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../exam.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
})
export class ExamListComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit(): void {
    this.fetchExams();
  }

  fetchExams(): void {
    this.examService.getExams().subscribe((data: Exam[]) => {
      this.exams = data.map((exam) => ({
        ...exam,
        date: this.extractDate(exam.date),
        time: this.extractTime(exam.date),
      }));
    });
  }

  extractDate(dateTime: string | undefined): string | undefined {
    // Check if dateTime is a valid ISO date string
    if (dateTime && !isNaN(Date.parse(dateTime))) {
      return new Date(dateTime).toISOString().split('T')[0]; // Return 'yyyy-MM-dd' part
    }
    return undefined; // Return null if invalid
  }

  extractTime(dateTime: string | undefined): string | undefined {
    // Check if dateTime is a valid ISO date string
    if (dateTime && dateTime.includes('T')) {
      // Split the string by 'T' to separate date and time, then take the time part
      const timePart = dateTime.split('T')[1];

      // Return only the 'HH:mm' portion
      return timePart.substring(0, 5); // Extracts "10:35" from "10:35:00"
    }

    return 'En attente'; // Return 'En attente' if invalid
  }

  navigateToAddExam() {
    this.router.navigate(['/exams/add']);
  }
}
