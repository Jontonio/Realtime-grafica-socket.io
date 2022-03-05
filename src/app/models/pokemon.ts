export class Pokemon{

    id:string
    name:string
    url:string
    votos:number

    constructor(id:string, url:string, name:string, votos:number){
        this.id = id,
        this.url = url,
        this.name = name,
        this.votos = votos;
    }
}
