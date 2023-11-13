$(function(){

    var knowsUserAgents = {
      "2023.26.8": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.126 Safari/537.36",
      "2023.38.6": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.198 Safari/537.36",
    };

    function getTeslaVersion() {
      var userAgent = navigator.userAgent;
      for (var version in knowsUserAgents) {
        if (userAgent.includes(knowsUserAgents[version])) {
          return version;
        }
      }
      return "Unknown";
    }

    if (getTeslaVersion() != "Unknown" || navigator.userAgent.includes("Tesla") || window.location.hostname == "localhost") {

      $(".pc").remove();

      $.getJSON("app.json?t=" + Date.now(), function(data){
        $.each(data.apps, function(i, v) {
          app = $("<div class=\"app\"></div>" ).appendTo($(".app-container"))
          icon = $("<img class=\"app-icon\">").appendTo(app)
          icon.attr("src", v.icon_url)
          app_name = $("<span class=\"app-name\"></span>").appendTo(app)
          app_name.text(v.name)

          app.click(function() {
            if (v.jump) {
              window.open("https://www.youtube.com/redirect?q=" + v.link)  
            } else {
              window.open(v.link)
            }
          })
        })
      })

    } else {

      $(".app-container").remove();

    }

    UpdateClock()
    setInterval(UpdateClock, 1000)

    function UpdateClock () {
        $("#clock-hour").text(moment().utc().utcOffset(8).format("h"))
        $("#clock-minute").text(moment().utc().utcOffset(8).format("mm"))
    }

})


