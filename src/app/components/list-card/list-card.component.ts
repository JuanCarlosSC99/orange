import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { LoadAction } from './../../store/track.action';
import { StoreTrack } from './../../store/store.structure';

import { TracksService } from './../../services/tracks.service';
import { TrackStream, TrackInformation } from './../../model/interface/tracks';
import { Tracks } from '../../model/interface/tracks';
@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})

export class ListCardComponent implements OnInit {
  @Input() arrayTrackForUser?: Tracks[];
  public data: Tracks[] = [];
  public on: boolean = false;
  public loading = false;
  public search = '';
  // public limit = 25;

  constructor(
    private store: Store<{ track: StoreTrack }>,
    private route: ActivatedRoute,
    private track: TracksService) {
    if (this.route.snapshot.params.find) {
      // console.log(this.route.snapshot.params.find)
      this.search = this.route.snapshot.params.find
      
    }
  }

  ngOnInit(): void {
    if (this.arrayTrackForUser) {
      this.data = this.arrayTrackForUser;
    }
    this.getTrack()
  }
  getTrack() {
    this.loading = true;
    this.track.getTrack(this.search).subscribe((tracks: Tracks[]) => {
      this.data.push(...tracks);
      this.loading = false
    });
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
      // this.limit = this.limit + 15;
      this.getTrack()
    }
    console.log(`state: ${state}, max: ${max}`);

  }

  onScroll() {
    // let scrollState = element.scrollTop;
    // let scrollMax = element.scrollHeight - element.scrollWidth;
    // console.log(`state: ${scrollState}, max: ${scrollMax}`);
    this.getTrack();
    console.log('Hizo scroll');
  }


}

