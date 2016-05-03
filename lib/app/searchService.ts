export class SearchService {

    $position;
    placeId = null;

    constructor() {
        'ngInject';
        return this.$position;
    }

    /**
     * @param position
     */
    public setPosition(position) {
        console.log('set_pos'+position);
        this.$position = position;
    }

    /**
     * @param placeId
     */
    public setPlaceId(placeId)
    {
        this.placeId = placeId;
    }

    /**
     * @returns string
     */
    public getPlaceId() {
       return (this.placeId === null || this.placeId === undefined) ? null : this.placeId;
    }

}
