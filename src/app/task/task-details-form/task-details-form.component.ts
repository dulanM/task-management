import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../task.service';
import { Task } from '../../models/task.model';
import {MatIconModule} from '@angular/material/icon';

import { catchError, of } from 'rxjs';
export interface TaskDetailsFormDialogData {
  actionType: string;
  task?: Task;
}

@Component({
  selector: 'app-task-details-form',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, RouterModule, MatInputModule, MatButtonModule, CommonModule, MatSelectModule, MatIconModule],
  templateUrl: './task-details-form.component.html',
  styleUrl: './task-details-form.component.scss'
})
export class TaskDetailsFormComponent implements OnInit {
  taskForm: FormGroup;
  taskDetails: Task | undefined;
  actionType = 'CREATE';
  errorMessage = '';
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TaskDetailsFormComponent>, private taskService: TaskService, @Inject(MAT_DIALOG_DATA) data: TaskDetailsFormDialogData) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['LOW', Validators.required],
      status: ['PENDING', Validators.required],
    });
    this.actionType = data.actionType;
    this.taskDetails = data.task;
  }

  ngOnInit(): void {
    if (this.taskDetails) {
      const { title, description, priority, status } = this.taskDetails;
      this.taskForm.setValue({
        title,
        description,
        priority,
        status
      });
    }

    this.taskForm.valueChanges.subscribe(() => {
      this.taskDetails = {
        ...this.taskDetails,
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        status: this.taskForm.get('status')?.value,
        priority: this.taskForm.get('priority')?.value
      };
    })
  }
  createTask() {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.dialogRef.close();
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }

  updateTask() {
    if (this.taskForm.valid) {
      if (this.taskDetails?._id) {
        this.taskService.updateTask(this.taskDetails._id, this.taskDetails).subscribe({
          next: (res) => {
            console.log(res);
            this.dialogRef.close();
          },
          error: (err) => {
            this.errorMessage = err.message;
          }
        });
      }
    }
  }

  deleteTask() {
    if (this.taskDetails?._id) {
      this.taskService.deleteTask(this.taskDetails._id).subscribe({
        next: (res) => {
          console.log(res);
          this.dialogRef.close();
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
