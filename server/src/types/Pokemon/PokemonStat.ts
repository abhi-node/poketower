import { NamedAPIResource } from '../Common/NamedAPIResource';

export interface PokemonStat {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
}