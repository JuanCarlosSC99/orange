
import { LOAD, PAUSE, PLAY } from 'src/app/store/track.action';
import { ActionsTrack } from './track.action';
import { StoreTrack } from './store.structure';

export const initialState:StoreTrack = {
  trackData: null,
  trackCard:{on:false ,status:false},
  urlSong: ''
}

export function trackReducer(state:StoreTrack = initialState, action: ActionsTrack  ){
  console.log('10')
  switch (action.type) {

    case LOAD:
      return  {
        trackData:action.payload.trackData,
        trackCard:action.payload.trackCard,
        urlSong:action.payload.urlSong
      }
  ////////////////////
    case PAUSE:
      return {
        trackData: state.trackData,
        trackCard:{on: state.trackCard.on , status:false} ,
        urlSong: state.urlSong
      }
  // /////////////////////////
    case PLAY:
      return {
        trackData: state.trackData,
        trackCard:{on: state.trackCard.on , status:true} ,
        urlSong: state.urlSong
      }

    default:
      return state
  }

}
