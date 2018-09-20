import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {select, Store} from '@ngrx/store';
import {HeroAppState} from '../store/heroes.reducers';
import {map, withLatestFrom} from 'rxjs/operators';
import {Fetch, Save} from '../store/heroes.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store$: Store<HeroAppState>,
  ) {}

  public hero$ = this.store$.pipe(
    select(state => state.heroes.collection),
    withLatestFrom(this.route.params),
    map(([collection, params]) => collection.find(hero => hero.id === +params.id))
  );

  public isLoading$ = this.store$.pipe(
    select((state => state.heroes.isLoading))
  );

  public ngOnInit(): void {
    this.store$.dispatch(new Fetch() );
  }

  public goBack(): void {
    this.location.back();
  }

  public save( id: number, newName: string): void {
    this.store$.dispatch( new Save({id, newName}) );
  }

}
