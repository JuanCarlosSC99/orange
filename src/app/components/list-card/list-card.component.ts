import { TrackStream, TrackInformation } from './../../model/interface/tracks';


import { LoadAction } from './../../store/track.action';
import { StoreTrack } from './../../store/store.structure';
import { Tracks } from '../../model/interface/tracks';
import { TracksService } from './../../services/tracks.service';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})

export class ListCardComponent implements OnInit {
  @Input() arrayTrackForUser?: Tracks[];
  public data: Tracks[] = [];
  public on: boolean = false;
  public loadding = false;
  public find: string;
  public limit = 25;
  constructor(
    private store: Store<{ track: StoreTrack }>,
    private route: ActivatedRoute,
    private track: TracksService) {
    if (this.route.snapshot.params.find) {
      // console.log(this.route.snapshot.params.find)
      this.find = this.route.snapshot.params.find
    }
  }

  ngOnInit(): void {
    this.getTrack()
  }
  getTrack() {

    if (this.arrayTrackForUser) {
      this.data = this.arrayTrackForUser;
    } else {
      this.loadding = true;
      if (this.find) {
        this.track.getTrack(this.limit, this.find).subscribe((tracks: Tracks[]) => { this.data = tracks; this.loadding = false })
      } else {
        this.track.getTrack(this.limit).subscribe((tracks: Tracks[]) => {
          this.data = tracks; this.loadding = false
        })
      }
    }
  }

  loadTrack(e: TrackInformation) {
    this.track.getSong(e.id).subscribe((track: TrackStream) => {
      this.store.dispatch(new LoadAction({ trackData: e.data, urlSong: track.http_mp3_128_url, trackCard: { on: e.status, status: true } }))
    }, (err) => {
      // console.log({err});
      // this.store.dispatch(new LoadAction({trackData:e.data,urlSong:err.url, trackCard:{on:e.status, status:true}}))
    })
  }

  onScrollDown(state: number, max: number) {
    if ((max - 100) < state) {
      this.limit = this.limit + 15;
      this.getTrack()
    }
  }
}

