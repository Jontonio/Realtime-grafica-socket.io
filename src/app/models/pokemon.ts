export class Pokemon{
    id:string
    img:string
    nombre:string
    votos:number

    constructor(id:string, img:string, nombre:string, votos:number){
        this.id = id,
        this.img = img,
        this.nombre = nombre,
        this.votos = votos;
    }
}