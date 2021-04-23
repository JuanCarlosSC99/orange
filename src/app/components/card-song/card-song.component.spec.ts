import { initialState } from './../../store/track.reducer';
import { StoreTrack } from 'src/app/store/store.structure';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { CardSongComponent } from "./card-song.component";
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';


describe('CardSongComponent', () => {
    let component: CardSongComponent;
    let store: MockStore;
    let state: StoreTrack;

    const firstState = initialState;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule],
          providers: [
            CardSongComponent,
            provideMockStore({ initialState: firstState }),
          ],
        });
        
        store = TestBed.inject(MockStore);
        component = TestBed.inject(CardSongComponent);
  
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
        
        component.data = state.trackData;
        component.ngOnInit();
    });
    
    it("Debe asignar el valor a la propiedad '@Input() data' del componente", () => {
        expect( component.data ).toBeTruthy();
    })

    it("Debe asignar el valor '{ hasData: false, isPause: true }' a la propiedad 'status' del componente si data.id es diferente a state.trackData.id", () => {
        component.data = {
            artwork_url: 'artwork_url',
            id: 5,
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
          };
        component.ngOnInit();
        expect( component.status ).toEqual({ hasData: false, isPause: true });
    })

    it('Debe asignarle el valor del estado actual del store (trackCard.on) en la propiedad status.hasData del componente', () => {
        expect( component.status.hasData ).toBe( state.trackCard.on );
    })

    it('Debe asignarle el valor del estado actual del store (trackCard.on) en la propiedad status.hasData del componente', () => {
        expect( component.status.hasData ).toBe( state.trackCard.on );
    })
    it('Debe asignarle el valor del estado actual del store (trackCard.on) en la propiedad status.hasData del componente', () => {
        expect( component.status.isPause ).toBe( !state.trackCard.status  );
    })

})









// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CardSongComponent } from './card-song.component';

// describe('CardSongComponent', () => {
//   let component: CardSongComponent;
//   let fixture: ComponentFixture<CardSongComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ CardSongComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CardSongComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
