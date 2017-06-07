import { Category } from "./category";

export class Action {
    name: string
    categories: number | Array<number>
    do_score: number
    state: number   // 'fail' = -1, 'success' = 1, 'ignore' = 0

    constructor(name, score) {
        this.name = name
        this.do_score = score
        this.categories = 0
    }
    
}