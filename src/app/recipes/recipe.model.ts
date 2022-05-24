import { Ingrident } from "../shared/ingridents.model";

export class recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingridents:Ingrident[];

    constructor(name:string,desc:string,imagePath:string,ingridents:Ingrident[]){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingridents=ingridents;
    }
}