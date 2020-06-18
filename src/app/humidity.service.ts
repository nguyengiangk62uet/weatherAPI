import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class HumidityService {
    constructor(private http: HttpClient) {}

    getHumidity(cityName: string) {
        const url = 'https://api.openweathermap.org/data/2.5/weather?appid=6cae573e8b24a072b5c12dd4b5030f4c&units=metric&q=' + cityName;
        return this.http.get(url).toPromise()
        .then(resJson => resJson['main']['humidity']);
    }

}