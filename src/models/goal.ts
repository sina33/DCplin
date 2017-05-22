import { Action } from "./action";


export class Goal {
    action: Action
    startDate: string
    duration: number    // how many days
    score: boolean | number
    endDate: string

}

   // dateToString(date: Date): string {
    //     let dd: any = date.getDate()
    //     let mm: any = date.getMonth()    // January is 0!
    //     let yyyy: any = date.getFullYear()

    //     if(dd<10) {
    //         dd = '0' + dd
    //     }

    //     if(mm<10) {
    //         mm = '0' + mm
    //     }

    //     return mm + '-' + dd + '-' + yyyy
    // }