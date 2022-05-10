class MediaFactory {
    /**
     * Creates object based on image or video model
     * @param {string} data
    */
    constructor(data) {
        if (data.video) { 
            return new VideoData(data);
        } else {
            return new ImageData(data);
        }
    }
}