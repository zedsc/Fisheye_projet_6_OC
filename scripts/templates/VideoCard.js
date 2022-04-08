class VideoCard {
    constructor(media) {
        this._media = media
    }

    createVideoCard() {
        const articleCard = document.createElement('article')
        articleCard.classList.add('media-card')
    
        const mediaCard = `
            <figure class="media-fig">
                    <div class="container-media-img">
                        <video
                            class="media-card__img"
                            src="${this._media.video}"
                            alt="${this._media.title}"
                            controls
                            >
                        </video>
                        </div>
                    <figcaption class="media-legend">
                        <h2 class="media-legend__title">${this._media.title}</h2>
                        <p class="media-legend__likes">${this._media.likes} 
                        <i class="fa-solid fa-heart" aria-label="likes"></i>
                        </p>
                    </figcaption>
            </figure>
        `
        
        articleCard.innerHTML = mediaCard
        return articleCard
    }
}
