import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as HeroesActions from '../store/heroes.actions';
import { HeroAppState } from '../store/heroes.reducers';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  public heroes$ = this.store$.pipe(select((state) => state.heroes.collection));
  public isLoading$ = this.store$.pipe(select((state) => state.heroes.isLoading));

  constructor( private store$: Store<HeroAppState>) { }

  public ngOnInit() {
    this.store$.dispatch(new HeroesActions.Fetch());
  }

  public add(name: string): void {

    name = name.trim();
    if (!name) { return; }

    this.store$.dispatch(new HeroesActions.Add({name}));

  }

  public delete(id: number): void {
   // this.heroes = this.heroes.filter(h => h !== hero);
   // this.heroService.deleteHero(hero).subscribe();
    this.store$.dispatch(new HeroesActions.Delete({id}));
  }
}
