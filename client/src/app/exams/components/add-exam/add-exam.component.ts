import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../exam.model';

@Component({
  selector: 'app-add-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss'],
})
export class AddExamComponent {
  exam: Exam = {
    id: 0, // Ideally, the ID should be generated by the backend or a unique identifier
    student: {
      first_name: '',
      last_name: '',
    },
    meeting_point: '',
    date: '',
    time: '',
    status: 'À organiser',
  };

  constructor(private examService: ExamService, private router: Router) {}

  addExam(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    // Set default values if fields are empty
    this.exam.meeting_point = this.exam.meeting_point || 'En attente';

    if (this.exam.date && this.exam.time) {
      // Concatenate `date` and `time` strings in `YYYY-MM-DDTHH:mm:ss` format
      this.exam.date = `${this.exam.date}T${this.exam.time}:00`; // Add seconds as `:00`
    } else {
      this.exam.date = 'En attente';
    }

    // Call the ExamService to add the new exam
    this.examService.addExam(this.exam).subscribe(
      (response) => {
        console.log('Examen ajouté avec succès', response);
        this.router.navigate(['/exams']); // Navigate back to the exam list after adding
      },
      (error) => {
        console.error('Erreur lors de l’ajout de l’examen', error);
      }
    );
  }
}
