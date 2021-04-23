import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreTrack } from 'src/app/store/store.structure';
import { Router } from '@angular/router';
import { PauseAction, PlayAction } from 'src/app/store/track.action';
import { Tracks } from 'src/app/model/interface/tracks';


@Component({
  selector: 'app-card-song',
  templateUrl: './card-song.component.html',
  styleUrls: ['./card-song.component.scss']
})
export class CardSongComponent implements OnInit {

  @Input() data: Tracks;
  @Output() onPlay: EventEmitter<any> = new EventEmitter()
  public status: { hasData: boolean, isPause: boolean }
  public loadding =  false

  constructor
    (private store: Store<{ track: StoreTrack }>,private router: Router) {}

  ngOnInit(): void { this.start() }

  start(){
    this.store.select('track').subscribe((track) => {
        console.log(track.trackCard);

      this.status = { hasData: false, isPause: true }
      if (typeof track.trackData  != undefined &&
          typeof this.data !=  undefined   &&
          track.trackData != null
          ) {
        if (track.trackData.id == this.data.id) {
          this.status = { hasData: track.trackCard.on, isPause: !track.trackCard.status }
          this.loadding = false;
        }
      }
    })
  }

  play(id) {
    if (this.status.hasData) {
      !this.status.isPause ? this.pause() : this.playSong()
      console.log('Here'+!this.status.isPause ? this.pause() : this.playSong());
    } else {
      this.onPlay.emit({ status: !this.status.hasData, id: id, data: this.data })
      this.loadding = true;
    }
  }

  pause() {
    this.store.dispatch(new PauseAction())
  }

  playSong() {
    this.store.dispatch(new PlayAction())
  }

  goArtist(id) {
    this.router.navigate(['artista', id])
  }

}
