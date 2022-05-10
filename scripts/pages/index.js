// Index page architecture
// Creates et puts elements together
class AppIndex {
    constructor() {
        this.$photographerSection = document.querySelector('.photographer-section')
        this.$photographersApi = new Api('/data/photographers.json')
    }

    
    async main() {
        const autorsData = await this.$photographersApi.getPhotographers()
        
        autorsData
            .map(photographer => new PhotographerData(photographer))
            .forEach(photographer => {
                const Template = new PhotographerCard(photographer)
                this.$photographerSection.appendChild(
                    Template.createPhotographerCard()
                )
            })
    }
}
const appIndex = new AppIndex()
appIndex.main();
