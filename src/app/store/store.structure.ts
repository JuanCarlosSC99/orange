import { CardSongComponent } from '../components/card-song/card-song.component';
import { TrackCard, Tracks } from '../model/interface/tracks';


export interface StoreTrack{
  trackData:Tracks | null
  urlSong: string
  trackCard: {on: boolean , status : boolean }
}
