//Get ID from URL
const queryUrl = window.location.search;
const urlSearchParams = new URLSearchParams(queryUrl);
const getId = urlSearchParams.get('id');

console.log(getId);

// Photographer page architecture
// Creates et puts elements together
class AppAutorPage {
    constructor() {
        this.$mediaSection = document.querySelector('.media-section')

        this.photographerApi = new Api('/data/photographers.json')
    }

    async main() {
        const $totalOfLikes = document.querySelector('.price-likes-btn__likes');

        const photographData = await this.photographerApi.getPhotograph()
        const mediaData = await this.photographerApi.getMedias()

        const Medias = mediaData.map(media => new MediaFactory(media))

        const SorterMedias = new SorterForm(Medias)
        SorterMedias.onChangeEventSorter()

        const SorterMediasSRonly = new SorterFormSRonly(Medias)
        SorterMediasSRonly.render()
        
        photographData
            .map(photographer => new PhotographerData(photographer))
            .forEach(photographer => {
                const Template = new PhotographerBanner(photographer)
                Template.createPhotographerBanner();
                Template.addPhotographerPrice();
                Template.addPhotographerName();
            })

        Medias
            .forEach(media => {
                const modele = new MediaCard(media)

                this.$mediaSection.appendChild(
                    modele.createMediaCard())
            })

        $totalOfLikes.textContent = mediaData.reduce((acc, mediaLike) => acc + mediaLike.likes, 0);
        
        const lightbox = new Lightbox(Medias);
        const triggeredLightbox = new TriggerLightbox(lightbox)
        triggeredLightbox.triggerLightbox();
    }
}

const appAutorPage = new AppAutorPage()
appAutorPage.main();