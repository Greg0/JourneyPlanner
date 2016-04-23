export class SearchService {

    $position;

    setPosition: (position) => void;

    constructor() {
        'ngInject';
        return this.$position;
    }

    public setPosition(position) {
        console.log('set_pos'+position);
        this.$position = position;
    }

}
