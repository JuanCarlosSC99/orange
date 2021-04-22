import { of } from 'rxjs';
import { StoreTrack } from 'src/app/store/store.structure';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HomeComponent } from './home.component';
import { cold } from 'jasmine-marbles';
import { Store } from '@ngrx/store';


describe('HomeComponent', () => {
    let component: HomeComponent;
    let store: MockStore;
    let state: StoreTrack;
    const initialState: StoreTrack = {
        trackData: null,
        trackCard:{on:false ,status:false},
        urlSong: ''
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          // any modules needed
        ],
        providers: [
          HomeComponent,
          provideMockStore({ initialState }),
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

      // const expected = cold('(a|)', { a: store })
      // console.log({expected});
      store.subscribe( (stateTemp: StoreTrack) => {
        // let fakeStore:  Store<{ track:StoreTrack }>;
        
        spyOn( store, 'select').and.callFake( () => of(stateTemp) );
        state = stateTemp;
        // component = new HomeComponent(prueba)
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
