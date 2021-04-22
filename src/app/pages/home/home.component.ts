
import { Tracks } from '../../model/interface/tracks';
import { StoreTrack } from './../../store/store.structure';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public on: boolean = false;
  public data:Tracks;
  public url: string;
  public find: string;

  constructor(private store: Store<{ track:StoreTrack }>){ }

  ngOnInit(): void {
    this.store.select('track').subscribe((track) =>{
      if(track.trackCard){
        this.on = track.trackCard.on
        this.data = track.trackData
        this.url = track.urlSong
      }else{
        this.on = track.trackCard.on
      }
     });
  }
}
