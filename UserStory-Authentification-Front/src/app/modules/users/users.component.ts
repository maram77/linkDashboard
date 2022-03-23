import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/_services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'username','action'];
  users:User[]=[];
  dataSource: MatTableDataSource<User>;
  userDetail:FormGroup;
  private deleteId:number;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  httpClient: any;


  constructor( private userService: UserService, 
    private formBuilder:FormBuilder, httpClient:HttpClient,private modalService:NgbModal ) { 
   userService.getAllUsers().subscribe((users) => {
    
     for (const user of users) {
      const newUser = new User(user.id, user.email, user.username);
       this.users.push(newUser);
      
     }
    
     //console.log(this.users);
     this.dataSource = new MatTableDataSource<User>(this.users);
     this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort; 
   });
 }

 ngOnInit() {
  this.getAllUsers();
  this.userDetail=this.formBuilder.group({
   username:['',Validators.required],
   email:['',Validators.required],
   password:['',Validators.required]
 })
 
  
 }

 getAllUsers(){
  this.userService.getAllUsers()
  .subscribe({
    next:(res)=>{
      this.users=res;
      //console.log(res);
      console.log(this.users);
       this.dataSource=new MatTableDataSource(res);
       // this.dataSource = res;
          this.dataSource.paginator = this.paginator;
     
    }, error:(err)=>{
      alert("error while fetching records");
    }
  })
}

refresh() {
  this.getAllUsers();
  this.dataSource.data = [...this.dataSource.data];
  this.dataSource.paginator = this.paginator;
}

deleteUser( id:number){
  this.userService.deleteUser(id)
  .subscribe({
     next:(res)=>{
       //alert("utilisateur supprimé avec succée!");
       this.refresh();
     },
     error:()=>{
       alert("erreur lors de la suppression");
     }
  }); 
  

 }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

addUser(){
  //console.log(this.userDetail.value);
  if(this.userDetail.valid){
    this.userService.addUser(this.userDetail.value)
    .subscribe({
      next:(res)=>{
        alert("Admin ajouté avec succée!")
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.userDetail.reset();
        this.refresh();
        //this.dialogRef.close('save');
        this.modalService.dismissAll();
      }, error:(err)=>{
        //alert("erreur lors de l'ajout!")
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }
}



openDelete(targetModal, id:number) {
this.deleteId = id;
this.modalService.open(targetModal, {
  backdrop: 'static',
  size: 'lg'
});
}

delete() {
  this.userService.deleteUser(this.deleteId);
}

open(content, id:number) {  

this.modalService.open(content , { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  

  if (result === 'yes') {  
    this.deleteUser(id);  
  }  

}, (reason)=>{

});  

}  


openn(content) {
  this.modalService.open(content, {
   
  });
}


form: any = {
  username: null,
  email: null,
  password: null
};

 

  

  

 

}
