import { initialState } from './../../store/track.reducer';
import { of } from 'rxjs';
import { StoreTrack } from 'src/app/store/store.structure';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let store: MockStore;
    let state: StoreTrack;

    const firstState: StoreTrack = initialState

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          HomeComponent,
          provideMockStore({ initialState: firstState }),
        ],
      });
      
      store = TestBed.inject(MockStore);
      component = TestBed.inject(HomeComponent);

      store.setState({
        trackData: {
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
        },
        trackCard:{on:true ,status:true},
        urlSong: 'url.com'
      });

      store.subscribe( (stateTemp: StoreTrack) => {
        spyOn( store, 'select').and.callFake( () => of(stateTemp) );
        state = stateTemp;
      }).unsubscribe();
      
      component.ngOnInit();
    });
    
    it("Debe asignar el estado actual del store (trackCars.on) en las propiedad 'on' del componente", () => {
      expect( component.on ).toBe(state.trackCard.on);
    })
    it("Debe asignar el estado actual del store (trackData) en las propiedad 'data' del componente", () => {
      expect( component.data ).toBe(state.trackData);
    })
    it("Debe asignar el estado actual del store (urlSong) en las propiedad 'url' del componente", () => {
      expect( component.url ).toBe(state.urlSong);
    })

})




















// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ HomeComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
