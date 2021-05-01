import { LOAD } from 'src/app/store/track.action';
import { StoreTrack } from 'src/app/store/store.structure';
import { Tracks, TrackStream, TrackInformation } from './../../model/interface/tracks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from 'src/app/services/tracks.service';
import { initialState } from './../../store/track.reducer';
import { ListCardComponent } from './list-card.component';
import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('ListCardComponent', () => {

    let component: ListCardComponent;
    let service: TracksService;
    let store: MockStore;
    let find = 'text to search';
    let tracks: Tracks[] = [{
        artwork_url: 'string',
        id: 1,
        purchase_url: 'string',
        genre: 'string',
        title: 'string',
        user_id: 1,
        user: {
            id: 1,
            username: 'string',
            avatar_url: 'string'
        },
        favoritings_count: 1,
    }];
    let trackStream: TrackStream = {
        hls_mp3_128_url: 'url-1',
        hls_opus_64_url: 'url-2',
        http_mp3_128_url: 'url-3',
        preview_mp3_128_url: 'url-4'
    }
    let trackInf: TrackInformation = {
        status: true,
        id: '001',
        data: null
    }

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                ListCardComponent
            ],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: { find: find } }
                    }
                },
                provideMockStore({ initialState: initialState }),
            ],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        component = TestBed.createComponent(ListCardComponent).componentInstance;
        service = TestBed.inject(TracksService);

        spyOn(service, 'getTrack').and.callFake(() => {
            return of(tracks);
        });

    });

    it('Debe obtener el parámetro de búsqueda desde la url', () => {
        expect(component.find).toEqual(find);
    });

    it('Debe asignar el valor de "@Input() arrayTrackForUser" a la propiedad "data" (si viene con datos)', () => {
        component.arrayTrackForUser = tracks;
        component.ngOnInit();
        expect(component.data).toEqual(tracks);
        expect(component.data.length).toEqual(1);
    });

    it('Debe asignar el valor a la propiedad "data" desde un request si "arrayTrackForUser" no viene con datos y la propiedad "find" sí tiene datos', () => {
        component.find = find;
        component.ngOnInit();
        expect(component.data).toEqual(tracks);
        expect(component.data.length).toEqual(1);
    });

    it('Debe asignar el valor a la propiedad "data" desde un request si "arrayTrackForUser" y "find" no vienen con datos', () => {
        component.find = '';
        component.ngOnInit();
        expect(component.data).toEqual(tracks);
        expect(component.data.length).toEqual(1);
    });

    it('Debe hacer dispatch de un LoadAction al reproducir un track', () => {

        let trackInformation: StoreTrack = {
            trackCard: { on: trackInf.status, status: true },
            trackData: trackInf.data,
            urlSong: trackStream.http_mp3_128_url
        }

        spyOn(service, 'getSong').and.callFake(() => {
            return of(trackStream);
        });

        component.loadTrack(trackInf);
        store.scannedActions$.subscribe(action => {
            expect(action.type).toEqual(LOAD);
            expect(action['payload']).toEqual(trackInformation);
        })
    });

});