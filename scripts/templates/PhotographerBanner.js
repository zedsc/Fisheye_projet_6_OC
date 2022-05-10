class PhotographerBanner {
     /**
     * @param {object} photographer 
     */
    constructor(photographer) {
        this._photographer = photographer
    }

    createPhotographerBanner() {
        const divBanner = document.querySelector('.photograph-header')
        const btnModalDesktop = document.querySelector('.contact-btn--desktop')

        const photographerBanner = `
            <div class="photograph-header-txt">
                <h1 class="photograph-header__name">${this._photographer.name}</h1>
                <p class="photograph-header__location">${this._photographer.city}, ${this._photographer.country}</p>
                <p class="photograph-header__tagline">${this._photographer.tagline}</p>
            </div>
            <div class="container-contact-btn">
            </div>
            <div class="wrapper-banner-img">
                <div class="container-banner-img">
                    <img 
                        class="photograph-header__img" 
                        src="${this._photographer.portrait}"
                        alt=""
                    />
                </div>
                <div class="container-banner-img--border">
                    <img 
                        class="photograph-header__img--border" 
                        src="${this._photographer.portrait}"
                        alt=""
                    />
                </div>
            </div>
        `

        divBanner.innerHTML = photographerBanner
        const containerBtnModal = document.querySelector('.container-contact-btn')
        containerBtnModal.appendChild(btnModalDesktop)
        return divBanner
    }

    addPhotographerPrice() {
        const divPrice = document.querySelector('.price-likes-btn__price')

        divPrice.textContent = this._photographer.price + "€ / jour";
    }

    addPhotographerName() {
        const formTitle = document.getElementById("contactform__title")

        formTitle.textContent = "Contactez-moi " + this._photographer.name;
    }
}


