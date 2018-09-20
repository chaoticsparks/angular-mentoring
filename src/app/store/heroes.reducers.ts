import {Hero} from '../hero';
import {HeroesActionTypes, HeroesActionUnion} from './heroes.actions';

export interface HeroAppState {
  heroes: HeroState;
}

interface HeroState {
  isLoading: boolean;
  collection: Hero[];
}

const initialState: HeroState = {isLoading: false, collection: []};

export function heroesReducer(state: HeroState = initialState, action: HeroesActionUnion) {
  switch (action.type) {
    case HeroesActionTypes.FETCH:
      return {...state, isLoading: true};
    case HeroesActionTypes.SUCCESS_FETCH:
      return {isLoading: false, collection: [...action.payload]};
    case HeroesActionTypes.DELETE:
      return {
        ...state,
        isLoading: true,
        collection: state.collection.filter(hero => hero.id !== action.payload.id),
      };
    case HeroesActionTypes.ADD:
      return {
        ...state,
        isLoading: true,
      };

    case HeroesActionTypes.SAVE:
      return {
        ...state,
        isLoading: true,
        collection: state.collection.map(
          (hero) => {
            if (hero.id !== action.payload.id) {
              return hero;
            }
            return {...hero, name: action.payload.newName};
          }
        )
      };
    default:
      return state;
  }
}
