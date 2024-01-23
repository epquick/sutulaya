import {makeObservable, observable} from "mobx";
import axios from "axios";

export default class PatternStore {
    pattern = {width: 100, height: 100, crossTypes: {}, crosses: {}}
    iteration = 0

    constructor() {
        makeObservable(this, {pattern: observable, iteration: observable})
    }

    loadLastPattern() {
        axios
            .get('http://localhost:8000/api/latest_pattern')
            .then(response => {
                this.pattern = response.data
                this.iteration++
            })
    }
}