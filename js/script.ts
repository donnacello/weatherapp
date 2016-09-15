function getLocationAndWeather(): void{
    $.get( "http://geoip.nekudo.com/api?", function( data ) {
        document.getElementById("locationName").innerHTML = data.city + ", " + data.country.code;
        var lat: string = data.location.latitude;
        var lon: string = data.location.longitude;
        var id: string = "e96d027338512bd6e82f61f56ae404c0";
        var weatherInfo = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+id;
        $.get( weatherInfo, function( data ) {
            var tempKelv: number = data.main.temp;
            var tempCel = tempKelv-273.15;
            document.getElementById("tempValue").innerHTML = String(tempCel.toFixed(0))+ "&#176";
            document.getElementById("outlook").innerHTML = data.weather[0].description;
            var img : HTMLImageElement = <HTMLImageElement>  $("#weatherIcon")[0];
            img.src = "../images/"+data.weather[0].icon+".png";
            document.body.style.background = changeBackground(data.weather[0].icon);
        });
    });
}

function changeBackground(icon){
    if (icon == "01d" || icon == "02d" || icon == "03d" || icon == "04d"){
        return "#F4E982";
    }
    else if (icon == "01n" || icon == "02n" || icon == "03n" || icon == "04n"){
        return "242E42";
    }
    else if (icon == "09d" || icon == "09n" || icon == "10d" || icon == "10n"){
        return "cadetblue";
    }
    else if (icon == "11d" || icon == "11n"){
        return "#18181E";
    }
    else if (icon == "13d" || icon == "13n"){
        return "#93A6C1";
    }
    else if (icon == "50d" || icon == "50n"){
        return "#AAAFAF";
    }
}

function updateTime(){
    var currentTime = new Date()
    var dayNum = currentTime.getDay()
    var hours = currentTime.getHours()
    var minutes:any = currentTime.getMinutes()
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    
    if(hours > 11){
        var night = hours - 12;
        var t_str = night + ":" + minutes + " " + "pm";
    } else {
        var t_str = hours + ":" + minutes + " " + "am";
    }
    var day;
    if(dayNum == 0){
        day = "sunday";
    }else if(dayNum == 1){
        day = "monday";
    }else if(dayNum == 2){
        day = "monday";
    }else if(dayNum == 3){
        day = "monday";
    }else if(dayNum == 4){
        day = "thursday";
    }
    document.getElementById("day_time").innerHTML = day + ", " + t_str;
}

setInterval(updateTime, 1000);
getLocationAndWeather();

