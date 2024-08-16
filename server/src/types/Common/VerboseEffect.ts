import { NamedAPIResource } from "./NamedAPIResource";

export interface VerboseEffect {
    effect: string;
    short_effect: string;
    language: NamedAPIResource;
}