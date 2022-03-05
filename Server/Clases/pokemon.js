class Pokemon{

  constructor(id, name, url){
    this.id = id
    this.name = name
    this.url = url
    this.votos = 0;
  }

  toObject(){

    return {
      id:this.id,
      name:this.name,
      url:this.url,
      votos: this.votos
    }

  }

}


module.exports = { Pokemon }

