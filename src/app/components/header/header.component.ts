import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, MatDialogModule, RouterModule]
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.addTask(result).subscribe(() => {
          console.log('Tarefa adicionada com sucesso');
        });
      }
    });
  }
}