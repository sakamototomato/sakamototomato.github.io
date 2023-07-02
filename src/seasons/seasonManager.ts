import { EventEmitter } from 'events'
import { Seasons } from '.'
import { EEvent } from './types/events'
import { ESeason } from './types/seasons'

export class SeasonManager extends EventEmitter {
    seasons: Seasons
    private currentSeason: ESeason
    constructor() {
        super()
        this.seasons = new Seasons()
        this.currentSeason = ESeason.spring
    }

    switchSeason() {
        let next: ESeason = this.currentSeason
        switch (this.currentSeason) {
            case ESeason.spring:
                next = ESeason.summer
                break
            case ESeason.summer:
                next = ESeason.autum
                break
            case ESeason.autum:
                next = ESeason.winter
                break
            case ESeason.winter:
                next = ESeason.spring
                break
            default:
                break
        }

        this.emit(EEvent.switch_season, next)
    }
}
