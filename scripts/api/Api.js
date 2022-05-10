class Api {
    /**
     * @param {string} url 
    */
    constructor(url) {
        this._url = url
    }

    async getPhotographers() {
        return await fetch(this._url)
            .then(result => result.json())
            .then(value => value.photographers)
            .catch(error => console.log('an error occurs', error))
    }
    
    async getPhotograph() {
        return await fetch(this._url)
            .then(result => result.json())
            .then(value => value.photographers.filter(function(photographer) {
                return photographer.id == getId;
            }))
            .catch(error => console.log('an error occurs', error))
    }

    async getMedias() {
        return await fetch(this._url)
            .then(result => result.json())
            .then(value => value.media.filter(function(media) {
                return media.photographerId == getId;
            }))
            .catch(error => console.log('an error occurs', error))
    }
}











class extendApi extends Api {

    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        return await this.getData()
    }
}