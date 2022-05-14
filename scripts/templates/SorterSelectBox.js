class SorterSelectbox {
    /**
     * @param {array} medias
     */
    constructor(Medias) {
        this._Medias = Medias

        this.$mediaSection = document.querySelector('.media-section')
        this.$sorterContainer = document.querySelector('.sorter-container')
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

    onChangeEventSorter() {
        this.$sorterContainer
            .querySelector('.sorter-form')
            .addEventListener('change', event => {
                const sorter = event.target.value
                console.log(sorter)
                this.sorterMedias(sorter)
            })

        this.$sorterContainer
            .querySelector('.sorter-form')
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

    rotateArrow() {
        const $sorterSelect = document.getElementById('sorter-select');
        const $arrowSelect = document.querySelector('.sorter-arrow');
        
        $sorterSelect
        .addEventListener('click', function() {
            if ($arrowSelect.classList.contains('rotate')) {
                $arrowSelect.classList.remove('rotate')
            } else {
                $arrowSelect.classList.add('rotate')
            }
        })
    }

    renderSelect() {
        const sorterForm = `
            <form class="sorter-form" action="#" method="POST">
                <label class="sorter-label" for="sorter-select">Trier par</label>
                <span class="sorter-arrow"></span>
                <select class="sorter-reset sorter-style" name="sorter-select" id="sorter-select">
                    <option value="date DESC">Date</option>
                    <option value="likes DESC">Popularité</option>
                    <option value="title ASC">Titre</option>
                </select>
            </form>
        `

        this.$sorterContainer.innerHTML = sorterForm
        this.onChangeEventSorter()
        this.rotateArrow()
    }
}