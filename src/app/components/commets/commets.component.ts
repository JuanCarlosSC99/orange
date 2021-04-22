import { Store } from '@ngrx/store';
import { storeTrack } from 'src/app/store/store.structure';
import { TrackComment } from '../../model/interface/tracks';
import { Component, Input, OnInit } from '@angular/core';
import { TracksService } from 'src/app/services/tracks.service';

@Component({
  selector: 'app-commets',
  templateUrl: './commets.component.html',
  styleUrls: ['./commets.component.scss']
})
export class CommetsComponent implements OnInit {
  public arrayComment:TrackComment[] = [];

  constructor(public track: TracksService,private store: Store<{ track: storeTrack }>  ) {
    this.store.select('track').subscribe((x)=>{
      this.getCommet(x.trackData.id)
    })
  }

  ngOnInit(): void {}

  getCommet(id){
    this.track.getComment(id,15).subscribe((x:TrackComment[])=>{this.arrayComment = x})
  }
}

