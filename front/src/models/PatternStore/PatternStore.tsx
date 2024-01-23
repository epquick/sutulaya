import {makeObservable, observable} from "mobx";
import axios from "axios";

export default class PatternStore {
    pattern = {width: 100, height: 100, crossTypes: {}, crosses: {}}

    constructor() {
        makeObservable(this, {pattern: observable})
    }

    loadLastPattern() {
        axios
            .get('http://localhost:8000/api/latest_pattern')
            .then(response => {
                this.pattern = response.data
            })
    }
}