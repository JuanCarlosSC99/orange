import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/interface/user';
import { Tracks } from '../model/interface/tracks';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  public baseUrl = "https://api.soundcloud.com/";
  public clientId = "8f72068177ceff3543fb2d7b05f50b5f";
  public options = {
    params: new HttpParams,
    Headers: new HttpHeaders
  }
  private tracks_next_href = '';
  private tracks_last_search = '';

  constructor(private http: HttpClient) {

    this.options.params = this.options.params.set('client_id', this.clientId)
    // this.options.params = this.options.params.set('client_id', this.clientId)
  }
  getTrack(search: string = '', customLimit: number | string = 30) {
    this.options.params = this.options.params.appendAll({ q: search, limit: customLimit.toString(), linked_partitioning: 'true' });
    this.tracks_last_search = search;

    if (this.tracks_next_href && (search == this.tracks_last_search)) {
      return this.http.get(this.tracks_next_href).pipe(
        map((resp: { collection: Tracks[], next_href: string }) => {
          this.tracks_next_href = resp.next_href;
          return resp.collection;
        })
      )
    } else {
      return this.http.get(this.baseUrl + 'tracks', this.options).pipe(
        map((resp: { collection: Tracks[], next_href: string }) => {
          this.tracks_next_href = resp.next_href;
          return resp.collection;
        })
      )
    }
  }
  getSong(id) {
    return this.http.get(this.baseUrl + `tracks/${id}/streams`, this.options)
  }
  getComment(id: number, limit?: number) {
    if (limit) {
      this.options.params = this.options.params.set('limit', limit + '');
    }
    return this.http.get(this.baseUrl + `tracks/${id}/comments`, this.options)
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id, this.options)
  }

  getTrackForUser(id): Observable<Tracks[]> {
    return this.http.get<Tracks[]>(this.baseUrl + `users/${id}/tracks`, this.options)
  }
  getDataUser(id): Observable<[User, Tracks[]]> {
    return combineLatest([
      this.getUser(id),
      this.getTrackForUser(id)
    ])
  }

}
