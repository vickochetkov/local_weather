$(document).ready(function() {

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var woeidQuery = `SELECT woeid FROM geo.places(1) WHERE text="(${position.coords.latitude},${position.coords.longitude})"`;
            var weathQuery = `https://query.yahooapis.com/v1/public/yql?q=SELECT location, item.condition FROM weather.forecast WHERE woeid IN (${woeidQuery})&format=json`;
              $.getJSON(weathQuery, function(data) {
                var location = data['query']['results']['channel']['location']; 
                var curPlace = location['city'] + ',' + location['region'] + ', ' + location['country'];
                var condition = data['query']['results']['channel']['item']['condition'];
                var weatherGif = '<img src="https://s.yimg.com/zz/combo?a/i/us/we/52/' + condition['code'] + '.gif"  alt="weather condition gif">';
              
                $(".place").html('<h4><i>' + curPlace + '</i></h4>');
                $(".currWeather").html(weatherGif + '<h5> ' + condition['text'] + '</i></h5>');
                $(".lastUpd").html('<p>Last Update: ' + condition['date'] + '</p>');

                var scale = 'F';
                $(".currTemp").html(condition['temp'] + '&deg;' + scale);
                
                $(".btn1").on("click", function(){
                  if (scale === 'F') {
                    var toCelsius = Math.round((5/9) * (condition['temp']-32));
                    $(".btn1").html('To &deg;' + scale);
                    scale = 'C';
                    $(".currTemp").html(toCelsius + '&deg;' + scale);
                  } else {
                    $(".btn1").html('To &deg;' + scale);
                    scale = 'F';
                    $(".currTemp").html(condition['temp'] + '&deg;' + scale);
                  }
                });

                var imgId = bckgrImg(condition['code']);
                $(".bg-img").attr("src", "https://source.unsplash.com/" + imgId);
            });
          });
        };

    function bckgrImg(codeCond) {
      var rslt;           
      switch (Number(codeCond)) {
        case 0: //'tornado'
        case 1: //tropical storm
        case 2: //hurricane
          rslt = 'LYq7W1lRal4';
          break;
        case 3: //severe thunderstorms
        case 4: // thunderstorms
          rslt = 'NcTQ602gKLI';
          break;
        case 5: //  mixed rain and snow
        case 6: //  mixed rain and sleet
        case 7: //  mixed snow and sleet
        case 8: //  freezing drizzle
        case 10: // freezing rain
        case 18: // sleet
          rslt = 'qnNV1XorvWE';
          break;         
        case 9: //  drizzle
        case 11: // showers
        case 12: // showers
        case 39: // scattered thunderstorms
        case 40: // scattered showers
          rslt = 'MykFFC5zolE';
          break;
        case 17: // hail
        case 35: // mixed rain and hail
          rslt = 'WWb4gn130JI';
          break;
        case 19: // dust
          rslt = 'wdMWMHXUpsc';
          break;
        case 20: // foggy
          rslt = 'IOJE_IE1h-A';
          break;
        case 21: // haze
        case 22: // smoky
          rslt = 'jYChcwbXqnI';
          break;
        case 15: //blowing snow
        case 23: // blustery
        case 24: // windy
          rslt = 'XHZhI_Zy6TM';
          break;
        case 25: // cold
          rslt = 'Gw31jigR9j4';
          break;
        case 26: // cloudy
        case 27: // mostly cloudy (night)
          rslt = 'V4qjYCac7y8';
          break;
        case 28: // mostly cloudy (day)          
          rslt = '8BIU7YUZutY';
          break;
        case 29: // partly cloudy (night)
          rslt = 'g3QBQto9Jt0';
          break;
        case 30: // partly cloudy (day)
        case 44: // partly cloudy
          rslt = 'kobWVUmOnm8';
          break;
        case 31: // clear (night)
          rslt = 'tqzqzH8hb5A';
          break;
        case 32: // sunny
        case 34: // fair (day)
          rslt = 'l4AbB_9qFug';
          break;
        case 33: // fair (night)
          rslt = '2uEqc-9P3oQ';
          break;
        case 36: // hot
          rslt = 'qQfb5WBDB5o';
          break;
        case 37: // isolated thunderstorms
        case 38: // scattered thunderstorms
        case 45: // thundershowers
        case 47: // isolated thundershowers
          rslt = 'uxwKpUvwGuY';
          break;
        case 13: // snow flurries
        case 14: // light snow showers
        case 16: // snow
        case 41: // heavy snow
        case 42: // scattered snow showers
        case 43: // heavy snow
        case 46: // snow showers
          rslt = '-iK6ZxQC6EU';
          break;        
        default:
          rslt = 'aDw0e215X_o';          
        }
      console.log(rslt);  
      return rslt;      
    };
  });