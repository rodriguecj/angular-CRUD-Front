import { Component, OnInit } from '@angular/core';
import { Project } from '../../modelo/projects';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css'],
  providers: [ ProjectService ]
})
export class ProjetsComponent implements OnInit {
  public projects: any;
  public url:string
  constructor(
    private _projectService: ProjectService
  ) { 
    this.url = Global.url
   }

  ngOnInit() {
    this.getProjects()
  }
  getProjects(){
    this._projectService.getProjects().subscribe(
      response=>{
          this.projects = response['projects']
        console.log(response['projects'])
        // console.log(this.projects)
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
}
