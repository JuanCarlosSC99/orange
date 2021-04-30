
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subscriber } from 'rxjs';
import { User } from '../model/interface/user';
import { Tracks } from '../model/interface/tracks';
type NewType = User;

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  public baseUrl = "https://api.soundcloud.com/";
  public clientId ="8f72068177ceff3543fb2d7b05f50b5f";
  public options= {
    params: new HttpParams,
    Headers: new HttpHeaders
  }
  constructor(private http: HttpClient ) {

    this.options.params = this.options.params.set('client_id', this.clientId)
    // this.options.params = this.options.params.set('client_id', this.clientId)
  }
  getTrack(limit?:number,find?:string){

    this.options.params = find ? this.options.params.set('q', find) : this.options.params.set('q', '');
    this.options.params = limit ? this.options.params.set('limit', limit+'') : this.options.params.set('limit', "25");
    return this.http.get(this.baseUrl+ 'tracks' ,this.options)
  }
  getSong(id){
    return this.http.get(this.baseUrl+ `tracks/${id}/streams`  ,this.options)
  }
  getComment(id:number, limit?:number){
    if(limit){
      this.options.params = this.options.params.set('limit',limit +'');
    }
    return this.http.get(this.baseUrl+ `tracks/${id}/comments`,this.options)
  }
  getUser(id):Observable<User>{
    return this.http.get<User>(this.baseUrl+ 'users/' + id  ,this.options)
  }

  getTrackForUser(id):Observable<Tracks[]>{
    return this.http.get<Tracks[]>(this.baseUrl+ `users/${id}/tracks` ,this.options)
  }
  getDataUser(id):Observable<[User,Tracks[]]>{
    return combineLatest([
       this.getUser(id),
       this.getTrackForUser(id)
     ])
  }

}
