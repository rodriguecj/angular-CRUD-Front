import { Component, OnInit } from '@angular/core';
import { Project } from '../../modelo/projects';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url:string
  public project: Project
  public projectName: any
  public projectCategory:any
  public projectDescription:any
  public projectLangs:any
  public projectImage:any
  public projectID:any
  public confirBorrado:boolean
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.url = Global.url;
    this.confirBorrado = false
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
  deleteProject(id){
    this._projectService.deleteProjet(id).subscribe(
      response=>{
        this._router.navigate(['/proyectos']);
          console.log(id)
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  setConfirm(value){
    this.confirBorrado = value
  }

}
