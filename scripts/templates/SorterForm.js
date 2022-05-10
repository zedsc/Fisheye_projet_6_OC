class SorterForm {
     /**
     * @param {array} medias
     */
    constructor(Medias) {
        this._Medias = Medias

        this.$mediaSection = document.querySelector('.media-section')
        this.$sorterContainer = document.querySelector('.filter-container')
    }

    // Gets new sorted array and fills the media section with sorted cards
    // Also creates new lightbox according to new sorted array
    async sorterMedias(sorter) {
        this.clearMediaSection()

        if (sorter) {
            const sortedData = await SorterApiMedias.funcSorter(this._Medias, sorter)

            const SortedMedias = sortedData.data 

            SortedMedias.forEach(media => {
                const modele = new MediaCard(media)

                this.$mediaSection.appendChild(
                    modele.createMediaCard())
            })

            const lightbox = new Lightbox(SortedMedias);
            const lightboxTriggered = new TriggerLightbox(lightbox)
            lightboxTriggered.triggerLightbox();
       
        } else {
            this._Medias.forEach(media => {
                const modele = new MediaCard(media)

                this.$mediaSection.appendChild(
                    modele.createMediaCard())
            })
        }
    }

    // Gets the sorter value in order to sort the array
    onChangeEventSorter() {
       const that = this;
        this.$sorterContainer
            .querySelector('.select')
            .addEventListener('click', event => {
                const sorter = event.target.value
                console.log(sorter)
                this.sorterMedias(sorter)
    
            })

        this.$sorterContainer
        .querySelector('.select')
        .addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                const sorter = event.target.value
                console.log(sorter)
                this.sorterMedias(sorter)
            }
        })
    }

    clearMediaSection() {
        this.$mediaSection.innerHTML = ""
    }
}
