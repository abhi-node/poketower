import {NamedAPIResource} from '../Common/NamedAPIResource';

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}