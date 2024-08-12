import { NamedAPIResource } from '../Common/NamedAPIResource';
import { PokemonAbility } from './PokemonAbility';
import { VersionGameIndex } from '../Common/VersionGameIndex';
import { PokemonHeldItem } from './PokemonHeldItem';
import { PokemonMove } from './PokemonMove';
import { PokemonTypePast } from './PokemonTypePast';
import { PokemonType } from './PokemonType';
import { PokemonSprites } from './PokemonSprites';
import { PokemonStat } from './PokemonStat';
import { PokemonCries } from './PokemonCries';
import { PokemonAbilityPast } from './PokemonAbilityPast';


export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    ability: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    past_types: PokemonTypePast[];
    past_abilties: PokemonAbilityPast[];
    sprites: PokemonSprites;
    cries: PokemonCries;
    species: NamedAPIResource;
    stats: PokemonStat[];
    types: PokemonType[];
}