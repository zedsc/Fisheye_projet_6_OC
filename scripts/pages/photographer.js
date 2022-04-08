const queryUrl = window.location.search;

//on extrait l'id
const urlSearchParams = new URLSearchParams(queryUrl);
const getId = urlSearchParams.get("id");

console.log(getId);

class AppAutorPage {
    constructor() {
        this.$mediaSection = document.querySelector('.media-section')

        this.photographerApi = new Api('/data/photographers.json')
    }

    
    async main() {
        const photographData = await this.photographerApi.getPhotograph()

        const mediaData = await this.photographerApi.getMedias()
        
        photographData
            .map(photographer => new PhotographerData(photographer))
            .forEach(photographer => {
                const Template = new PhotographerBanner(photographer)
                Template.createPhotographerBanner();
                Template.addPhotographerPrice();
                Template.addPhotographerName();
            })

        mediaData
            .map(media => new MediaFactory(media))
            .forEach(media => {
                const modeleVideo = new VideoCard(media)
                const modeleImage = new ImageCard(media)

                if (media.video) {
                    this.$mediaSection.appendChild(
                    modeleVideo.createVideoCard())
                } else {
                    this.$mediaSection.appendChild(
                    modeleImage.createImageCard())
                }
            })
        console.log(mediaData)
    }
}

const appAutorPage = new AppAutorPage()
appAutorPage.main();


var heroes = [
    {name: "Batman", franchise: "DC"},
    {name: "Ironman", franchise: "Marvel"},
    {name: "Thor", franchise: "Marvel"},
    {name: "Superman", franchise: "DC"}
];

var marvelHeroes =  heroes.filter(function(hero) {
    return hero.franchise == "Marvel";
});

console.log(marvelHeroes);

// [ {name: "Ironman", franchise: "Marvel"}, {name: "Thor", franchise: "Marvel"} ]