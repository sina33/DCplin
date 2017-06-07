import { Action } from "./action";

export class ActionRecord {
    action: Action
    date: Date
    score: boolean | number
    goalHit: boolean
}