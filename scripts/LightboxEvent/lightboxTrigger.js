class TriggerLightbox {
    constructor(lightbox) {
        this._lightbox = lightbox
    }

    // Get id from target element 
    triggerLightbox() {
        const that = this;
        document.querySelectorAll('.media-card__img')
        .forEach(($mediaDOM) => {
            $mediaDOM.addEventListener('click', function(event) {
               console.log(event.currentTarget.dataset.id);
               that._lightbox.show(event.currentTarget.dataset.id);
            })

            $mediaDOM.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                console.log(event.currentTarget.dataset.id);
                that._lightbox.show(event.currentTarget.dataset.id);
                }
           })
        })
    }
}