import { NamedAPIResource } from '../Common/NamedAPIResource';
import { PokemonAbility } from './PokemonAbility';

export interface PokemonAbilityPast {
    generation: NamedAPIResource;
    types: PokemonAbility[];
}