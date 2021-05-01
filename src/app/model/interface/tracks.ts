export interface Tracks {
  artwork_url: string;
  id: number,
  purchase_url: string,
  genre: string,
  title: string,
  user_id: number,
  user: {
    id: number,
    username: string,
    avatar_url: string
  },
  favoritings_count: number,
}

export interface TrackStream {
  hls_mp3_128_url: string,
  hls_opus_64_url: string,
  http_mp3_128_url: string,
  preview_mp3_128_url: string
}
export interface TrackCard {
  stream: boolean,
  timeSongbuffer: any
}
export interface TrackComment {
  id: number,
  body: string,
  created_at: string,
  timestamp: number,
  track_id: number,
  user_id: number,
  user: {
    id: number,
    username: string,
    avatar_url: string
  }
}
export interface TrackInformation {
  status: boolean,
  id: string,
  data: Tracks
}



