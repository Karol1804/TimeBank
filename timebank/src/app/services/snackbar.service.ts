
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarRef
} from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

  snackBarConfig: MatSnackBarConfig;
  snackBarRef: MatSnackBarRef<any>;

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(
     message: string,
     horizon: MatSnackBarHorizontalPosition ='center',
     vertical: MatSnackBarVerticalPosition ='bottom',
     autoHide: number = 5000,
     panelclass: string='snack-css',)
   { this.snackBarConfig = new MatSnackBarConfig();
     this.snackBarConfig.horizontalPosition = horizon;
     this.snackBarConfig.verticalPosition = vertical;
     this.snackBarConfig.duration = autoHide;
     this.snackBarConfig.panelClass = panelclass;
     this.snackBarRef = this.snackBar.open(message, '', this.snackBarConfig);
   }

}