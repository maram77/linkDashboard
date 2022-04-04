import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/_services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Role } from 'src/app/models/role/role';

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
  editForm:FormGroup;
  private deleteId:number;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn;
  username;
  hidden=true;
   /*************** */
   user:any={};
   role:Role[] ;
   roles:any=[{"name":"ROLE_ADMIN"},{"name":"ROLE_COLLABORATEUR"}]


  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  httpClient: any;


  constructor( private userService: UserService, private tokenStorageService: TokenStorageService,
    private formBuilder:FormBuilder, httpClient:HttpClient,private modalService:NgbModal ) { 
   userService.getAllUsers().subscribe((users) => {
     
    
     for (const user of users) {
      const newUser = new User();
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
  this.getAllRoles();
  this.userDetail=this.formBuilder.group({
    id:[''],
   username:['',Validators.required],
   email:['',Validators.required],
   password:['',Validators.required],
   role:{}
 })

 this.isLoggedIn = !!this.tokenStorageService.getToken();

 if (this.isLoggedIn) {
  const user = this.tokenStorageService.getUser();
  this.username = user.username;
 }
 this.editForm=this.formBuilder.group({
  id:[''],
  username:['',Validators.required],
  email:['',Validators.required],
  password:['',Validators.required],
  roles:{}
 })
 
  
 }

 getAllUsers(){
  this.userService.getAllUsers()
  .subscribe({
    next:(res)=>{
      this.users=res;
      //console.log(res);
      //console.log(this.users);
       this.dataSource=new MatTableDataSource(res);
       // this.dataSource = res;
          this.dataSource.paginator = this.paginator;
     
    }, error:(err)=>{
      alert("error while fetching records");
    }
  })
}

getAllRoles(){
  this.userService.getAllRoles()
  .subscribe(
      response => {
       
        this.role = response;
        console.log(response);
      }
    );
}

refresh() {
  this.getAllUsers();
  this.getAllRoles();
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
  console.log(this.userDetail.value);
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


onSubmit(f: NgForm) {
  
  const url = 'http://localhost:8080/api/auth/addUser';
  if(this.user==undefined){return;}
  this.httpClient.post(url,this.user)
    .subscribe((result) => {
      this.refresh(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
}
 
getRoles(roles:any[]):string{
  let str:string='';
 roles.forEach(element => {
   str=str+''+element.name;

 });
 return str;
}

openDetails(targetModal, user: User) {
  this.user = user;
  this.modalService.open(targetModal, {
  
 });

}

openEdit(targetModal, row:User) {
 
  
  this.modalService.open(targetModal, {
  
  });
 this.editForm.setValue( {
   
    id: row.id, 
    username: row.username,
    email: row.email,
    password:row.password,
    roles :row.roles
    
  });
  
}

update() {
  console.log(this.editForm.value);
  this.userService.updateUser(this.editForm.value,this.editForm.value.id)
  .subscribe({
    next:(res)=>{
      alert("utilisateur modifié avec succée!")
      this.userDetail.reset();
      this.refresh();
      //this.dialogRef.close('save');
      this.modalService.dismissAll();
    }, error:(err)=>{
      alert("erreur lors de la modif!")
      
    
    }
  })
}
 

  

 

}
