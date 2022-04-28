class SorterForm {
    constructor(Medias) {
        this._Medias = Medias

        this.$mediaSection = document.querySelector('.media-section')
        this.$sorterContainer = document.querySelector('.filter-container')
    }

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
        } else {
            this.Medias.forEach(media => {
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
    }

    clearMediaSection() {
        this.$mediaSection.innerHTML = ""
    }

    /*renderOld() {
        const sorterForm = `
            <form class="filter-form" action="#" method="POST">
                <label class="filter-label" for="filter-select">Trier par</label>
                <select class="filter-reset filter-style" name="filter-select" id="filter-select">
                    <option value="date DESC">Date</option>
                    <option value="likes DESC">Popularité</option>
                    <option value="title ASC">Titre</option>
                </select>
                <i class="fa-solid fa-angle-down"></i>
            </form>
        `

        this.$sorterContainer.innerHTML = sorterForm
        this.onChangeEventSorter()
    }*/

    render() {
        const sorterForm = `  
            <form class="sorter-form">
                <label class="sorter-label" for="sorter-form">Trier par</label>
                <div class="select" tabindex="0" role="button" aria-haspopup="listbox" aria-expanded="false">
                    <svg class="sorter-arrow" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.33447L8.00465 8.13311L14.5973 1.33447" stroke="#E9E9E9" stroke-width="2"/>
                    </svg>
        
                    <input role="listbox" aria-selected="true" value="date DESC" class="selectopt" name="test" type="radio" id="opt1" checked>
                    <label role="listitem" for="opt1" class="option" aria-hidden="true">
                        <span class="border-top"></span>
                    Date</label>
                    <input role="listbox" aria-selected="false" value="likes DESC" class="selectopt" name="test" type="radio" id="opt2">
                    <label role="listitem" for="opt2" class="option" aria-hidden="true">
                        <span class="border-top"></span>
                    Popularité</label>
                    <input role="listbox" aria-selected="false" value="title ASC" class="selectopt" name="test" type="radio" id="opt3" tabindex="0">
                    <label role="listitem" for="opt3" class="option">
                        <span class="border-top"></span>
                    Titre</label>
                </div>
            </form>
        `

        this.$sorterContainer.innerHTML = sorterForm
        this.onChangeEventSorter()
    }
}
