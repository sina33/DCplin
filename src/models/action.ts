import { Category } from "./category";

export class Action {
    name: string
    categories: number | Array<number>
    do_score: number

    constructor(name, score) {
        this.name = name
        this.do_score = score
        this.categories = 0
    }
    
}