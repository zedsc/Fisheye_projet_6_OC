class MediaCard {
    /**
     * @param {object} media 
     */
    constructor(media) {
        this._media = media

        this.$articleWrapper = document.createElement('article')
        this.$articleWrapper.classList.add('media-card')
    }

    get media() {
        return this._media
    }

    // Likes feature by clicking on heart icon
    handleLikeBtn() {
        const $totalOfLikes = document.querySelector('.price-likes-btn__likes');
        const that = this;

        this.$articleWrapper
            .querySelector('.like-ico')
            .addEventListener('click', function() {
                if (this.classList.contains('liked')) {
                    this.classList.remove('liked')
                    that.$articleWrapper
                        .querySelector('.media-legend__likes')
                        .textContent --
                    $totalOfLikes.textContent --
                } else {
                    this.classList.add('liked')
                    that.$articleWrapper
                        .querySelector('.media-legend__likes')
                        .textContent ++
                    $totalOfLikes.textContent ++
                }
            })
    }

    // Likes feature by pressing "Enter" on heart icon
    handleLikeBtnKeybord() {
        const $totalOfLikes = document.querySelector('.price-likes-btn__likes');
        const that = this;

        this.$articleWrapper
            .querySelector('.like-ico')
            .addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    if (this.classList.contains('liked')) {
                        this.classList.remove('liked')
                        that.$articleWrapper
                            .querySelector('.media-legend__likes')
                            .textContent --
                        $totalOfLikes.textContent --
                    } else {
                        this.classList.add('liked')
                        that.$articleWrapper
                            .querySelector('.media-legend__likes')
                            .textContent ++
                        $totalOfLikes.textContent ++
                    }
                }
            })
    }

    // Creates HTML elements based on image or video model
    createMediaCard() {
        if (this._media.video) {
        const mediaCard = `
        <figure class="media-fig">
        <div class="container-media-img">
            <video
                class="media-card__img"
                src="${this._media.video}"
                alt="${this._media.title}"
                title="${this._media.title}"
                data-id="${this._media.id}"
                tabindex="0"
                >
            </video>
        </div>
        <figcaption class="media-legend">
            <h2 class="media-legend__title">${this._media.title}</h2>
            <div class="container-legend-ico-heart">
                <p class="media-legend__likes">${this._media.likes}</p>
                <span class="fa-solid fa-heart like-ico" aria-label="likes" title="heart icon" role="button" tabindex="0"></span>
            </div>
        </figcaption>
    </figure>
        `
        
        this.$articleWrapper.innerHTML = mediaCard
        this.handleLikeBtn()
        this.handleLikeBtnKeybord()

        return this.$articleWrapper
        } else {
            const mediaCard = `
            <article class="media-fig">
                <div class="container-media-img" data-id="${this._media.id}">
                    <img
                        class="media-card__img"
                        src="${this._media.image}"
                        alt="${this._media.title}"
                        title="${this._media.title}"
                        data-id="${this._media.id}"
                        tabindex="0"
                        />
                </div>
                <div class="media-legend">
                    <h2 class="media-legend__title">${this._media.title}</h2>
                    <div class="container-legend-ico-heart">
                        <p class="media-legend__likes">${this._media.likes}</p>
                        <span class="fa-solid fa-heart like-ico" aria-label="likes" title="heart icon" role="button" tabindex="0"></span>
                    </div>
                </div>
            </article>
        `
        this.$articleWrapper.innerHTML = mediaCard
        this.handleLikeBtn()
        this.handleLikeBtnKeybord() 

        return this.$articleWrapper
        }
    }
}
