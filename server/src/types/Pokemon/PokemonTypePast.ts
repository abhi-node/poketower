import { NamedAPIResource } from '../Common/NamedAPIResource';
import { PokemonType } from './PokemonType';

export interface PokemonTypePast {
    generation: NamedAPIResource;
    types: PokemonType[];
}