import { APIResource } from "../Common/APIResource";
import { GenerationGameIndex } from "../Common/GenerationGameIndex";
import { Name } from "../Common/Name";
import { NamedAPIResource } from "../Common/NamedAPIResource";
import { VerboseEffect } from "../Common/VerboseEffect";
import { VersionGroupFlavorText } from "../Common/VersionGroupFlavorText";
import { MachineVersionDetail } from "../Machines/MachineVersionDetail";
import { ItemHolderPokemon } from "./ItemHolderPokemon";
import { ItemSprites } from "./ItemSprites";

export interface Item {
    id: number;
    name: string;
    cost: number;
    fling_power: number;
    fling_effect: NamedAPIResource;
    attributes: NamedAPIResource[];
    category: NamedAPIResource;
    effect_entries: VerboseEffect[];
    flavor_text_entries: VersionGroupFlavorText[];
    game_indices: GenerationGameIndex[];
    names: Name[];
    sprites: ItemSprites;
    held_by_pokemon: ItemHolderPokemon[];
    baby_trigger_for: APIResource;
    machines: MachineVersionDetail[];
}