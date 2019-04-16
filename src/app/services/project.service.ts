import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../modelo/projects';
import { Global } from './global';

@Injectable()
export class ProjectService {
    public url: string;
    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }
    testService() {
        return 'Probando el servicio de angular';
    }
    saveProject(project: Project): Observable<any>{
        let params = JSON.stringify(project);

        let headers = new HttpHeaders().set('Content-type','application/json');
        //application/x-www-form-urlencoded   aplication/json


        //console.log(project);
        //console.log(params);
        //let hgol= this._http.post(this.url+'save-project', params, {headers: headers});
        
        return this._http.post(this.url+'save-project', params, {headers: headers});
        //console.log(hgol)
        //return hgol; 
    }
    getProjects(){
        let headers = new HttpHeaders().set('Content-type','application/json');
        


        return this._http.get(this.url+'projects', {headers: headers})
    };
    getProjet(id){
        let headers = new HttpHeaders().set('Content-type','application/json');
        return this._http.get(this.url+'project/'+id, {headers:headers})
    };
    deleteProjet(id){
        let headers = new HttpHeaders().set('Content-type','application/json');
        return this._http.delete(this.url+'project/'+id, {headers:headers})
    };
    updateProject(project):Observable<any>{
        let params = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-type','application/json');
        
        return this._http.put(this.url+'project/'+project._id, params, {headers:headers})
    }
}
