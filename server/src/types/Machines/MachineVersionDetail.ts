import { APIResource } from "../Common/APIResource";
import { NamedAPIResource } from "../Common/NamedAPIResource";

export interface MachineVersionDetail {
    machine: APIResource;
    version_group: NamedAPIResource;
}