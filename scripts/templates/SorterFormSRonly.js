class SorterFormSRonly {
     /**
     * @param {array} medias
     */
    constructor(Medias) {
        this._Medias = Medias

        this.$mediaSection = document.querySelector('.media-section')
        this.$sorterContainer = document.querySelector('.filter-container-sr' + '.sr-only')
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
            this.Medias.forEach(media => {
                const modele = new MediaCard(media)

                this.$mediaSection.appendChild(
                    modele.createMediaCard())
            })
        }
        
    }

    // Gets the sorter value in order to sort the array
    onChangeEventSorter() {
        this.$sorterContainer
            .querySelector('.select')
            .addEventListener('change', event => {
                const sorter = event.target.value
                console.log(sorter)
                this.sorterMedias(sorter)
            })
    }

    clearMediaSection() {
        this.$mediaSection.innerHTML = ""
    }

    // Creates dropdown box only for screen readers
   render() {
        const sorterForm = `  
            <form class="sorter-form sr-only">
                <label class="sorter-label-sr" for="sorter-form sr-only">Trier par</label>
                <div class="select" role="button" aria-haspopup="listbox" aria-expanded="false">
                    <svg class="sorter-arrow" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.33447L8.00465 8.13311L14.5973 1.33447" stroke="#E9E9E9" stroke-width="2"/>
                    </svg>
        
                    <input aria-checked="true" value="date DESC" class="selectopt" name="opt1" type="radio" id="opt1" checked>
                    <label for="opt1" class="option">
                        <span class="border-top-sr"></span>
                    Date</label>
                    <input aria-checked="false" value="likes DESC" class="selectopt" name="opt2" type="radio" id="opt2">
                    <label for="opt2" class="option">
                        <span class="border-top-sr"></span>
                    Popularité</label>
                    <input aria-checked="false" value="title ASC" class="selectopt" name="opt3" type="radio" id="opt3">
                    <label for="opt3" class="option">
                        <span class="border-top-sr"></span>
                    Titre</label>
                </div>
            </form>
        `

        this.$sorterContainer.innerHTML = sorterForm
        this.onChangeEventSorter()
    }
}
