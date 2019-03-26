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
  getWeather() {
    this.weatherService.getTemp(this.txtCityName)
      .then(temp => {
        console.log(temp);
        this.cityName = this.txtCityName;
        try {
          this.temp = temp['main'].temp;
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
    console.log(this.weather);
  }
  returnString() {
    return this.cityName === '' ? 'Weather in your city. Wacth now!' : `${this.cityName + ', ' + this.country} temporary is now ${this.temp} °C <br/> 
    Humidity: ${this.humidity} % <br/> Weather: ${this.weather}`;
  }
}
