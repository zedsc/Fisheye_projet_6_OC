class Lightbox {
    /**
     * Lightbox management
     * @param {array} listElement
    */
    constructor(listElement) {
        this._currentElement = null;
        this._listElement = listElement;
        this.manageEvent();
    }

    // Displays lightbox : sets attributes and HTML content
    display() {
        const $lightboxWrapper = document.querySelector('.lightbox__wrapper');
        const $lightboxContainer = document.querySelector('.lightbox');
        const $main = document.getElementById('main');

        $lightboxWrapper.classList.remove('display-hidden');
        $lightboxWrapper.setAttribute('aria-hidden', false);
        $main.setAttribute('aria-hidden', true);
        $main.className = 'display-hidden';
        
        console.log(this._currentElement.title);

        if (this._currentElement.video) {
            const mediaLightbox = `
                <div class="container-media-lbx">
                    <video
                        class="lightbox__img"
                        src="${this._currentElement.video}"
                        alt="${this._currentElement.title}"
                        title="${this._currentElement.title}"
                        controls
                        >
                    </video>
                </div>
                <figcaption class="lightbox__legend">
                    <h2 class="lightbox__title">${this._currentElement.title}</h2>
                </figcaption>
            `
        
        $lightboxContainer.innerHTML = mediaLightbox
        return mediaLightbox

        } else {
            const mediaLightbox = `
                <div class="container-media-lbx">
                    <img
                        class="lightbox__img"
                        src="${this._currentElement.image}"
                        alt="${this._currentElement.title}"
                        title="${this._currentElement.title}"
                        />
                </div>
                <figcaption class="lightbox__legend">
                    <h2 class="lightbox__title">${this._currentElement.title}</h2>
                </figcaption>
            `
        
        $lightboxContainer.innerHTML = mediaLightbox
        return mediaLightbox
        }
    }

    // Function called by lightbox trigger to get id
    show(id) {
        this._currentElement = this.getElementId(id);
        this.display();
    }

    previous() {
        let indexElement = this._listElement.findIndex(element => element.id == this._currentElement.id)
        if (indexElement == 0) {
            this._currentElement = this._listElement[this._listElement.length - 1]

        } else {
            this._currentElement = this._listElement[indexElement - 1];
        }
        this.display();
    }

    next() {
        let indexElement = this._listElement.findIndex(element => element.id == this._currentElement.id)
        if (indexElement == this._listElement.length - 1) {
            this._currentElement = this._listElement[0]

        } else {
            this._currentElement = this._listElement[indexElement + 1];
        }
        this.display();
    }

    close() {
        let indexElement = this._listElement.findIndex(element => element.id == this._currentElement.id)
        const $lightboxWrapper = document.querySelector('.lightbox__wrapper');
        const $main = document.getElementById('main');
        const $focusCurrentCard = document.querySelectorAll('.media-card__img')[indexElement];
        
        $main.className = 'main';
        $lightboxWrapper.className += ' display-hidden';
        $lightboxWrapper.setAttribute('aria-hidden', true);
        $main.setAttribute('aria-hidden', false);
        $focusCurrentCard.focus()
    }

    manageEvent() {
        document.querySelector('.lightbox__prev').addEventListener('click', () => {
            this.previous();
        })
        document.querySelector('.lightbox__next').addEventListener('click', () => {
            this.next();
        })
        document.querySelector('.lightbox__close').addEventListener('click', () => {
            this.close();
        })
        document.querySelector('.lightbox__wrapper').addEventListener('keydown', (event) => {
            switch(event.key){
                case 'ArrowRight':
                    this.next();
                    break;
                case 'ArrowLeft':
                    this.previous();
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        })
    }

    // Finds element corresponding to id
    getElementId(id) {
       return this._listElement.find(element => element.id == id);
    }
}

