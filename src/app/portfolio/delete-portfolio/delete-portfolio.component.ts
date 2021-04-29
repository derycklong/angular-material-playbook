import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DialogData{
    action:string
    element:any
} 
@Component({
    templateUrl:'./delete-portfolio.component.html',
    styleUrls:['./delete-portfolio.component.html']
})

export class DeletePortfolioComponent {

    constructor(private dialogRef:MatDialogRef<DeletePortfolioComponent>, @Inject(MAT_DIALOG_DATA) public data:DialogData){}

    onDelete(){
        this.dialogRef.close({action: this.data.action, element: this.data.element})
    }
}