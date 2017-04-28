import {Injectable} from "@angular/core";
import { Headers, Http } from '@angular/http';
import {Hero} from "./hero";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService{

    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(private http: Http){}

    getHeroes():Promise<Hero[]>{
        return this.http.get(this.heroesUrl)
                .toPromise()
                .then(response => response.json().data as Hero[])
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any>{
        console.error("An error ocurred", error);
        return Promise.reject(error.message || error);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // simulate latency
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }

    getHero(id: number): Promise<Hero> {
      return this.getHeroes()
                 .then(heroes => heroes.find(hero => hero.id === id));
    }
}
