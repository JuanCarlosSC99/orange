
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tracks } from 'src/app/model/interface/tracks';
import { User } from 'src/app/model/interface/user';
import { TracksService } from 'src/app/services/tracks.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  public id:number
  public userData:{user:User , userTracks:Tracks[]}
  public loadding = false;

  constructor(private track: TracksService, private route: ActivatedRoute ) {
   this.id =  this.route.snapshot.params.id
  }

  ngOnInit(): void {
    this.getDataUser(this.id);
  }


  getDataUser(id: number | string){
    this.loadding = true;
    this.track.getDataUser(id).subscribe(
      ([user, userTracks])=>{
        this.userData = { user, userTracks }
        this.loadding = false;
      }
    )
  }

}
