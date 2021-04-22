import { Tracks } from '../../model/interface/tracks';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreTrack } from 'src/app/store/store.structure';
import { PauseAction, PlayAction } from 'src/app/store/track.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @ViewChild("audioPlayer") audio:ElementRef<HTMLAudioElement>
  public url:string
  public data:Tracks
  public status :{hasData:boolean , isPause:boolean}


  constructor(private store: Store<{ track: StoreTrack }>,private router: Router,) {}

  ngOnInit(): void {
    this.start()
  }
  ngAfterViewInit(){
    this.audio.nativeElement.play();
  }

  start(){
    this.store.select('track').subscribe((track) => {
      this.status = {hasData:false,isPause:true}
      if (track.trackData) {
        this.data = track.trackData;
        this.url =  track.urlSong;
        if (track.trackData.id == this.data.id) {
          this.status = {hasData:track.trackCard.on,isPause:!track.trackCard.status}
          if (this.audio !=  undefined){
            this.status.isPause ? this.audio.nativeElement.pause(): this.audio.nativeElement.play();
          }
        }
      }
    })
  }


  play() {
    if(this.status.hasData){
      !this.status.isPause ? this.pause() : this.playSong()
    }
  }
  pause() {
    this.audio.nativeElement.pause();
    this.store.dispatch(new PauseAction());
  }

  playSong() {
    this.audio.nativeElement.play();
    this.store.dispatch(new PlayAction())
  }

  goArtist(id) {
    this.router.navigate(['artista', id])
  }

}
