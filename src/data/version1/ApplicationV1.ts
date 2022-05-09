import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

export class ApplicationV1 implements IStringIdentifiable {
    public id: string;
    public name: MultiString;
    public description?: MultiString;
    public product: string;
    public group?: string;
    public copyrights?: string;
    public url?: string;
    public icon?: string;
    public min_ver?: number;
    public max_ver?: number;
    public access_rights?: string[];
}