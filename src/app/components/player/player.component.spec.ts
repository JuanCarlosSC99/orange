import { PAUSE, PLAY } from 'src/app/store/track.action';
import { StoreTrack } from 'src/app/store/store.structure';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerComponent } from './player.component';
import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/store/track.reducer';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('PlayerComponent', () => {

    let component: PlayerComponent;
    let store: MockStore;
    let state: StoreTrack;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PlayerComponent
            ],
            imports: [
                RouterTestingModule
            ],
            providers: [
                provideMockStore({ initialState: initialState }),
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();


        store = TestBed.inject(MockStore);
        component = TestBed.createComponent(PlayerComponent).componentInstance;

        store.subscribe((stateTemp: StoreTrack) => {
            state = stateTemp;
            spyOn(store, 'select').and.callFake(() => of(stateTemp));
        }).unsubscribe();

    });

    it('Debe llamar a la función start() en el ngOnInit()', () => {
        let startFunction = spyOn(component, 'start').and.callFake(() => { });
        component.ngOnInit();
        expect(startFunction).toHaveBeenCalled();
    });

    it('Debe asignar el valor "{hasData:false,isPause:true}" a la propiedad "status" al ejecutar la función start()', () => {
        // spyOn(component, 'start').and.callThrough();
        let status = { hasData: false, isPause: true };
        component.ngOnInit();
        expect(component.status).toEqual(status);
    });

    it('Debe asignar el valor de "state.trackData, state.urlSong y { hasData: state.trackCard.on, isPause: !state.trackCard.status }" a las propiedades "data, url y status" respectivamente al ejecutar la función start()', () => {

        // spyOn(component, 'start').and.callThrough();
        let status: { hasData: boolean, isPause: boolean };
        store.setState({
            trackData: {
                artwork_url: 'artwork_url',
                id: 1,
                purchase_url: 'purchase_url',
                genre: 'genre',
                title: 'title',
                user_id: 2,
                user: {
                    id: 3,
                    username: 'username',
                    avatar_url: 'avatar_url'
                },
                favoritings_count: 4
            },
            trackCard: { on: true, status: true },
            urlSong: 'url.com'
        });

        store.subscribe((stateTemp: StoreTrack) => {
            state = stateTemp;
            store.select = jasmine.createSpy().and.callFake(() => of(stateTemp));
            status = { hasData: state.trackCard.on, isPause: !state.trackCard.status };
        }).unsubscribe();

        component.start();

        expect(component.data).toEqual(state.trackData);
        expect(component.url).toEqual(state.urlSong);
        expect(component.status).toEqual(status);

    });

    it('Debe ejecutar la función "playSong()" si status.hasData y status.isPause al ejecutar la función "play()"', () => {
        let playSongFunction = spyOn(component, 'playSong').and.callFake(() => { });
        component.status = { hasData: true, isPause: true };
        component.play();
        expect(playSongFunction).toHaveBeenCalled();
    });

    it('Debe ejecutar la función "pause()" si status.hasData y !status.isPause al ejecutar la función "play()"', () => {
        let pauseFunction = spyOn(component, 'pause').and.callThrough();
        component.audio = { nativeElement: document.getElementsByTagName('audio')[0] };
        component.status = { hasData: true, isPause: false };
        component.play();
        expect(pauseFunction).toHaveBeenCalled();
    });

    it('Debe ejecutar la función "pause()" del audio.nativeElemenet y hacer dispatch de PauseAction() al ejecutar la función "pause()" del componente', () => {
        component.audio = { nativeElement: document.getElementsByTagName('audio')[0] };
        let audioPauseFunction = spyOn(component.audio.nativeElement, 'pause');
        component.pause();
        store.scannedActions$.subscribe(action => {
            expect(action.type).toEqual(PAUSE);
        });
        expect(audioPauseFunction).toHaveBeenCalled();
    });

    it('Debe ejecutar la función "play()" del audio.nativeElemenet y hacer dispatch de PlayAction() al ejecutar la función "playSong()" del componente', () => {
        component.audio = { nativeElement: document.getElementsByTagName('audio')[0] };
        let audioPlayFunction = spyOn(component.audio.nativeElement, 'play');
        component.playSong();
        store.scannedActions$.subscribe(action => {
            expect(action.type).toEqual(PLAY);
        });
        expect(audioPlayFunction).toHaveBeenCalled();
    });

});