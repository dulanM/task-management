import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-task-details-form',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, RouterModule, MatInputModule, MatButtonModule, CommonModule, MatSelectModule],
  templateUrl: './task-details-form.component.html',
  styleUrl: './task-details-form.component.scss'
})
export class TaskDetailsFormComponent {
  taskForm: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TaskDetailsFormComponent>) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    })
  }

  onSave() {
    
  }
}
