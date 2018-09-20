import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HeroService} from '../hero.service';
import {Add, Delete, Fetch, HeroesActionTypes, Save, SuccessfullyFetch} from './heroes.actions';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {Hero} from '../hero';

@Injectable()
export class HeroesEffects {
  constructor(private heroService: HeroService, private actions$: Actions) {
  }

  @Effect()
  public fetch$ = this.actions$.pipe(
    ofType<Fetch>(HeroesActionTypes.FETCH),
    switchMap(() => this.heroService.getHeroes().pipe(
      map((data) => new SuccessfullyFetch(data))
      )
    )
  );

  @Effect()
  public delete$ = this.actions$.pipe(
    ofType<Delete>(HeroesActionTypes.DELETE),
    mergeMap(({payload}) => this.heroService.deleteHero(payload.id).pipe(
      map(() => new Fetch()),
      )
    )
  );

  @Effect()
  public add$ = this.actions$.pipe(
    ofType<Add>(HeroesActionTypes.ADD),
    mergeMap(({payload}) => this.heroService.addHero(payload as Hero).pipe(
      map(() => new Fetch()),
      )
    )
  );

  @Effect()
  public save$ = this.actions$.pipe(
    ofType<Save>(HeroesActionTypes.SAVE),
    mergeMap(({payload}) => this.heroService.updateHero({id: payload.id, name: payload.newName}).pipe(
      map(() => new Fetch()),
      )
    )
  );
}

