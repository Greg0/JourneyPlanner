export class SearchService {

    $position;

    constructor() {
        'ngInject';
        return this.$position;
    }

    public setPosition(position) {
        console.log('set_pos'+position);
        this.$position = position;
    }

}
