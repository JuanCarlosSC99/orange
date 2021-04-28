import { Store } from '@ngrx/store';
import { StoreTrack } from 'src/app/store/store.structure';
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

  constructor(public track: TracksService,private store: Store<{ track: StoreTrack }>  ) {
  }
  
  ngOnInit(): void {
    this.store.select('track').subscribe((track)=>{
      this.getCommet(track.trackData.id)
    })
  }

  getCommet(id: number){
    this.track.getComment(id,15).subscribe((comments:TrackComment[])=>{this.arrayComment = comments})
  }
}

