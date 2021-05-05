import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DialogData{
    action:string
    element:any
} 
@Component({
    templateUrl:'./delete-ticker.component.html',
    styleUrls:['./delete-ticker.component.html']
})

export class DeleteTickerComponent {

    constructor(private dialogRef:MatDialogRef<DeleteTickerComponent>, @Inject(MAT_DIALOG_DATA) public data:DialogData){}

    onDelete(){
        this.dialogRef.close({action: this.data.action, element: this.data.element})
    }
}