import { Component, OnInit } from '@angular/core';
import { Project } from '../../modelo/projects';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global'
import { Router, ActivatedRoute, Params } from '@angular/router' 

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  
  public url;
  public title: string;
  public project: Project;
  public save_project:any;
  public status: string;
  public filesToLoad: Array<File>

  public projectName: any
  public projectCategory:any
  public projectDescription:any
  public projectLangs:any
  public projectImage:any
  public projectID:any

  constructor(
     public _projectService: ProjectService,
     public _uploadService: UploadService,
     public _route: ActivatedRoute,
     public _router: Router
  ) { 
    this.url = Global.url
    this.title= 'Editar proyecto';
    this.project = new Project('','','','','',2019,'');
    this.status
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      let id = params.id;
      this.projectID = id
      this.getProject(id);
      } )
  }
  getProject(id){
    this._projectService.getProjet(id).subscribe(
      response=>{
        this.project = response['project'];
        this.projectName = this.project['name'];
        this.projectCategory = this.project['category'];
        this.projectLangs = this.project['langs'];
        this.projectDescription = this.project['description'];
        this.projectImage = this.project['image']
        console.log(this.project)
        console.log(this.projectID)
        //console.log(this.project['name'])
    },
    error=>{
      console.log(<any>error)
    }

    )
  }
  onSubmit(){
    this._projectService.updateProject(this.project).subscribe(
      response=>{
        //console.log(response)
        if(response.project){
          if(this.filesToLoad){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToLoad, 'image')
            this.save_project = response.project
            //console.log(response.project)
            this.status = 'success'
          }else{
            this.save_project = response.project
            //console.log(response.project)
            this.status = 'success'
          }
        } else{
          this.status = 'failed'
          if(this.filesToLoad){
            console.log(this.filesToLoad)
          }
          
        }
      },
      error=>{
        console.log(<any>error) 
      }
    )
  }

  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToLoad = <Array<File>>fileInput.target.files;
    console.log(this.filesToLoad)
  }

}
