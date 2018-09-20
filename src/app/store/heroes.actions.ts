import {Action} from '@ngrx/store';
import {Hero} from '../hero';

export enum HeroesActionTypes {
  FETCH = '[Heroes] Fetching heroes',
  SUCCESS_FETCH = '[Heroes] Successfully fetching heroes',
  DELETE = '[Heroes] Deleting hero',
  SUCCESS_DELETE = '[Heroes] Successfully deleting of hero',
  ADD = '[Heroes] Adding hero',
  SAVE = '[Heroes] Saving the hero'
}

export class Fetch implements Action {
  public readonly type = HeroesActionTypes.FETCH;
}

export class SuccessfullyFetch implements Action {
  public readonly type = HeroesActionTypes.SUCCESS_FETCH;
  constructor (public payload: Hero[]) {}
}

export class Delete implements Action {
  public readonly type = HeroesActionTypes.DELETE;

  constructor (public payload: {id: number}) {}
}

export class SuccessfullyDelete implements Action {
  public readonly type = HeroesActionTypes.SUCCESS_DELETE;
}

export class Add implements Action {
  public readonly type = HeroesActionTypes.ADD;

  constructor (public payload: {name: string}) {}
}

export class Save implements Action {
  public readonly type = HeroesActionTypes.SAVE;

  constructor (public payload: {id: number, newName: string}) {}
}


export type HeroesActionUnion = Fetch | SuccessfullyFetch | Delete | SuccessfullyDelete | Add | Save;
