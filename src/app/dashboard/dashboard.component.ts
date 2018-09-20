import { Component, OnInit } from '@angular/core';
import {HeroAppState} from '../store/heroes.reducers';
import {select, Store} from '@ngrx/store';
import * as HeroesActions from '../store/heroes.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public heroes$ = this.store$.pipe(
    select(state => state.heroes.collection),
    map(coll => coll.slice(1, 5)),
  );

  constructor(private store$: Store<HeroAppState> ) { }

  public ngOnInit() {
    this.store$.dispatch(new HeroesActions.Fetch());
  }
}
