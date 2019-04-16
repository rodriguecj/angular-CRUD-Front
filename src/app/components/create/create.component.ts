import { Component, OnInit } from '@angular/core';
import { Project } from '../../modelo/projects';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public save_project:any;
  public status: string;
  public filesToLoad: Array<File>
  constructor(
     public _projectService: ProjectService,
     public _uploadService: UploadService
  ) { 
    this.title= 'Crear proyecto';
    this.project = new Project('','','','','',2019,'');
    this.status
  }

  ngOnInit() {
  }
  /*El form submit*/
  onSubmit(form){
    //console.log(projectForm)
    //console.log(this.project);
    /*Metodo para permitir recoger lo que devuelve el API rest y subscribirse al observable*/

    this._projectService.saveProject(this.project).subscribe(
        response =>{
          /*Mensaje de datos cargados a la base de datos*/
          if(response.project){
              this.status = 'success'
              //Subir la imagen
              this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToLoad, 'image')
                this.save_project = response.project
              /*Metodo para resetear el formulario*/
              form.reset()
          } else{
              this.status = 'failed'
          }
          //console.log(response.project);
          console.log(response);
        },
        error => {
          console.log(<any>error)
        }
    );
  }
  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToLoad = <Array<File>>fileInput.target.files;
    console.log(this.filesToLoad)
  }
}
