export interface Tracks {
      artwork_url: string;
  		id: number,
  		purchase_url: string,
  		genre:string,
  		title: string,
  		user_id: number,
  		user: {
        id: number,
  			username: string,
  			avatar_url: string
  		},
      favoritings_count: number,
}
export interface TrackCard {
  stream:boolean,
  timeSongbuffer:any
}
export interface TrackComment {
  id: number,
  body: string ,
  created_at: string,
  timestamp: number,
  track_id: number,
  user_id: number,
  user: {
    id: number,
    username: string,
    avatar_url:string
  }
}



