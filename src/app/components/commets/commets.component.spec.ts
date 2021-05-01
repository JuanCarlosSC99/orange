import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { initialState } from './../../store/track.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TracksService } from './../../services/tracks.service';
import { TrackComment, Tracks } from './../../model/interface/tracks';
import { CommetsComponent } from './commets.component';
import { TestBed } from '@angular/core/testing';

describe('CommetsComponent', () => {

    let service: TracksService;
    let component: CommetsComponent;
    let store: MockStore;
    let firstState = initialState;

    let comment: TrackComment = {
        id: 1,
        body: 'string' ,
        created_at: 'string',
        timestamp: 2,
        track_id: 3,
        user_id: 4,
        user: {
            id: 5,
            username: 'string',
            avatar_url:'string'
        }
    }

    let trackData: Tracks = {
        artwork_url: 'artwork_url',
        id: 1,
        purchase_url: 'purchase_url',
        genre:'genre',
        title: 'title',
        user_id: 2,
        user: {
          id: 3,
              username: 'username',
              avatar_url: 'avatar_url'
        },
        favoritings_count: 4
    }
    
    beforeEach( () => {

        TestBed.configureTestingModule({
            declarations: [
              CommetsComponent
            ],
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
              provideMockStore({ initialState: firstState }),
            ],
          });
 
        store = TestBed.inject(MockStore);
        component = TestBed.createComponent(CommetsComponent).componentInstance;
        service = TestBed.inject(TracksService);
        
    })
    
    it('Debe asignar los comentarios del track en la propiedad arrayComment del componente', () => {
        spyOn( store, 'select').and.callFake(() => {
            let track = firstState;
            track.trackData = trackData;
            return of(track);
        })
        spyOn( service, 'getComment').and.callFake( () => {
            return of([comment]);
        });

        component.ngOnInit();
        expect(component.arrayComment.indexOf(comment)).toBeGreaterThanOrEqual(0)
    })
    
})
