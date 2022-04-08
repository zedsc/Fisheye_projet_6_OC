class MediaFactory {
    constructor(data) {
        if (data.video) { 
            return new VideoData(data);
        } else {
            return new ImageData(data);
        }
    }
}