class PhotographerCard {
    /**
     * @param {object} photographer 
     */
    constructor(photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const articleCard = document.createElement('article')
        articleCard.classList.add('photographer-card')

        const photographerCard = `
            <figure>
                <a class="photographer-card__link" href="photographer.html?id=${this._photographer.id}" title="Vers la page personnelle du photographe">
                    <div class="container-photographer-img">
                        <img
                            class="photographer-card__img"
                            src="${this._photographer.portrait}"
                            alt=""
                            />
                        </div>
                    <div class="container-photographer-img--border">
                        <img
                            class="photographer-card__img--border"
                            src="${this._photographer.portrait}"
                            alt=""
                        />
                    </div>
                    <figcaption>
                        <h2 class="photographer-card__name">${this._photographer.name}</h2>
                        <p class="photographer-card__location">${this._photographer.city}, ${this._photographer.country}</p>
                        <p class="photographer-card__tagline">${this._photographer.tagline}</p>
                        <p class="photographer-card__price">${this._photographer.price}€/jour</p>
                    </figcaption>
                </a>
            </figure>
        `
        
        articleCard.innerHTML = photographerCard
        return articleCard
    }
}