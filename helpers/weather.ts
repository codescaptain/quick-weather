export const  getWeatherDescription = (weather_code: string | number): string => {
  switch (weather_code) {
    case 0:
      return 'clearSky';
    case 1:
    case 2:
      return 'mainlyClearSky';
    case 3:
      return 'partlyCloudy';
    case 45:
    case 48:
      return 'fog';
    case 51:
    case 53:
    case 55:
      return 'drizzle';
    case 56:
    case 57:
      return 'freezingDrizzle';
    case 61:
    case 63:
    case 65:
      return 'rain';
    case 66:
    case 67:
      return 'freezingRain';
    case 71:
    case 73:
    case 75:
      return 'snow';
    case 77:
      return 'snowGrains';
    case 80:
    case 81:
    case 82:
      return 'rainShowers';
    case 85:
    case 86:
      return 'snowShowers';
    case 95:
      return 'thunderstorm';
    case 96:
    case 99:
      return 'thunderstormWithHail';
    default:
      return 'partlyCloudy';
  }
};


export const getWeatherState = (weather_code: string | number): string => {
  switch (weather_code) {
    case 0:
      return '01d'; // clear-sky
    case 1:
    case 2:
      return '02d'; // mainly-clear-sky
    case 3:
      return '03d'; // partly-cloudy
    case 45:
    case 48:
      return '50d'; // fog
    case 51:
    case 53:
    case 55:
      return '09d'; // drizzle
    case 56:
    case 57:
      return '13d'; // freezing-Drizzle
    case 61:
    case 63:
    case 65:
      return '10d'; // rain
    case 66:
    case 67:
      return '13d'; // freezing-Rain
    case 71:
    case 73:
    case 75:
      return '13d'; // snow
    case 77:
      return '13d'; // snow-grains
    case 80:
    case 81:
    case 82:
      return '09d'; // rain-showers
    case 85:
    case 86:
      return '13d'; // snow-showers
    case 95:
      return '11d'; // thunderstorm
    case 96:
    case 99:
      return '11d'; // thunderstorm-with-hail
    default:
      return '03d'; // default-to-partly-cloudy
  }
};
