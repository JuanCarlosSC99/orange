import { Tracks } from 'src/app/model/interface/tracks';
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
          declarations: [ CardSongComponent ],
          imports: [RouterTestingModule],
          providers: [
            provideMockStore({ initialState: firstState }),
          ],
        });
        
        store = TestBed.inject(MockStore);
        // component = TestBed.inject(CardSongComponent);
        component = TestBed.createComponent(CardSongComponent).componentInstance;
  
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
    });

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
    });

    it('Debe asignarle el valor del estado actual del store (trackCard.on) en la propiedad status.hasData del componente', () => {
        expect( component.status.hasData ).toBe( state.trackCard.on );
    });

    it('Debe asignarle el valor del estado actual del store (trackCard.on) en la propiedad status.hasData del componente', () => {
        expect( component.status.hasData ).toBe( state.trackCard.on );
    });
    it('Debe asignarle el valor del estado actual del store (trackCard.on) en la propiedad status.hasData del componente', () => {
        expect( component.status.isPause ).toBe( !state.trackCard.status  );
    });
    it('Debe ejecutar la función playSong() si status.hasData tiene datos y status.isPause es true', () => {

      const spy = spyOn( component, 'playSong').and.callFake(() => null);
      
      component.status.hasData = true;
      component.status.isPause = true;
      component.play(1);
      expect( spy ).toHaveBeenCalled();
    });
    it('Debe ejecutar la función pause() si status.hasData tiene datos y status.isPause es false', () => {

      const spy = spyOn( component, 'pause').and.callFake(() => null);
      
      component.status.hasData = true;
      component.status.isPause = false;
      component.play(1);
      expect( spy ).toHaveBeenCalled();
    });
    it('La propiedad onPlay debe emitir { status: !this.status.hasData, id: id, data: this.data } si status.hasData no tiene datos', () => {

      let id = 1;
      
      component.status.hasData = false;
      component.onPlay.subscribe( (resp: { status: boolean, id: number, data: Tracks }) => {
        expect(resp.data).not.toBeUndefined();
        expect(resp.id).toEqual(id);
      })
      component.play(id);
    });

});
