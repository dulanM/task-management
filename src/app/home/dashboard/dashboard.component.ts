import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../task/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../../task/task-details/task-details.component';
import { TaskDetailsFormComponent } from '../../task/task-details-form/task-details-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, CommonModule, TaskDetailsComponent, MatDialogModule, TaskDetailsFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tasks: Task[] = [];
  errorMessage = '';
  constructor(private authService: AuthService, private taskService: TaskService, private dialog: MatDialog) {
    this.loadTasks();
  }

  logout() {
    this.authService.logout();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      {
        next: (tasks) => {
          this.tasks = tasks
        },
        error: (err) => {
          this.errorMessage = err;
        }
      }
    );
  }
  createTask() {
    this.openDialogbox('CREATE');
  }

  viewTask(task: Task) {
    this.openDialogbox('UPDATE', task);
  }

  openDialogbox(actionType: string, taskDetails?: Task) {
    const dialogRef = this.dialog.open(TaskDetailsFormComponent, {
      autoFocus: false,
      minWidth: '600px',
      minHeight: '400px',
      maxWidth: '600px',
      disableClose: true,
      data: {
        actionType,
        task: taskDetails
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTasks();
    });
  }
}
