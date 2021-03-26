import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  public endpoint = "https://api.soundcloud.com/";
  // "https://api.soundcloud.com/tracks/185676792/favorites?client_id=8f72068177ceff3543fb2d7b05f50b5f&limit=60&linked_partitioning=1"
  public clientId ="8f72068177ceff3543fb2d7b05f50b5f";
  public options= {
    params: new HttpParams,
    Headers: new HttpHeaders
  }
  constructor(private http: HttpClient ) {

    this.options.params = this.options.params.set('client_id', this.clientId)
  }


  getTrack(){
    return this.http.get(this.endpoint+ 'tracks' ,this.options)
  }
  getSong(id){
    // /tracks/347288994/stream
    return this.http.get(this.endpoint+ `tracks/${id}/stream`  ,this.options)
  }
}
