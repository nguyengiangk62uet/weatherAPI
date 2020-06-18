import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../weather.service';
import { HumidityService } from '../humidity.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService, HumidityService]
})
export class WeatherComponent implements OnInit {

  constructor(private weatherService: WeatherService,
    private hunididyService: HumidityService) { }

  ngOnInit() {

  }
  txtCityName = '';
  cityName = '';
  temp = null;
  humidity = null;
  country = '';
  weather = '';
  feel_like = null;
  temp_max = null;
  temp_min = null;
  getWeather() {
    this.weatherService.getTemp(this.txtCityName)
      .then(temp => {
        console.log(temp);
        this.cityName = this.txtCityName;
        try {
          this.temp = temp['main'].temp;
          this.feel_like = temp['main'].feels_like;
          this.temp_min = temp['main'].temp_min;
          this.temp_max = temp['main'].temp_max;
          this.humidity = temp['main'].humidity;
          this.cityName = temp['name'];
          this.country = temp['sys'].country;
          this.weather = temp['weather'][0].main + ' - ' + temp['weather'][0].description ;
          
        } catch (error) {
          alert("Enter again");
        }
      })
      .catch(err => console.log(err));
    this.txtCityName = '';
  }
  returnString() {
    return this.cityName === '' ? 'Weather in your city. Wacth now!' : `${this.cityName + ', ' + this.country} temporary is now ${this.temp} °C <br/>
    Temporary min: ${this.temp_min} °C - Temporary max: ${this.temp_max} °C </br>
    Feels like: ${this.feel_like} °C </br>
    Humidity: ${this.humidity} % <br/> Weather: ${this.weather}`;
  }
}
