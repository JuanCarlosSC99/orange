import { TracksObject } from 'src/app/model/interface/tracks';
import { User } from './../../model/interface/user';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from './../../services/tracks.service';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistComponent } from './artist.component';
import { of } from 'rxjs';

describe('ArtistComponent', () => {
    
    let component: ArtistComponent;
    let route: ActivatedRoute;
    let service: TracksService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ArtistComponent ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                      snapshot: {params: {id: 84}}
                    }
                }
            ]
        })
        .compileComponents();
    });


    beforeEach( () => {
        route = TestBed.inject(ActivatedRoute);
        service = new TracksService(null);
        component = new ArtistComponent( service, route);
    });

    it("Obtener el id de los params de la url y asignarlo a la propiedad 'id'", () => {
        expect( component.id ).toEqual(84);
    })

    it("Debe agregar datos a la propiedad 'userData'", () => {

        let user: User = {
            id: 0,
            username: 'userName',
            full_name: 'fullName',
            avatar_url: 'avatarUrl',
            track_count: 5,
            followers_count: 55,
        }

        let tracks:TracksObject[] = [
            {
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
        ];
        
        spyOn( service, 'getDataUser').and.returnValue( of([user, tracks]) );

        component.ngOnInit();

        expect( component.userData.userData ).toBe( user );
        expect( component.userData.userTracks ).toBe( tracks );
    })
    
});

