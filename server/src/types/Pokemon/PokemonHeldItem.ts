import { NamedAPIResource } from '../Common/NamedAPIResource';
import { PokemonHeldItemVersion } from './PokemonHeldItemVersion';

export interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: PokemonHeldItemVersion[];
}