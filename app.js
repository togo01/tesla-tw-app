$(function(){

    function isTeslaBrowser() {
      var userAgent = navigator.userAgent;
      if (/Tesla/i.test(userAgent)) {
        return true;
      }

      var match = userAgent.match(
        /^Mozilla\/5\.0 \(X11; Linux x86_64\) AppleWebKit\/(\d+)\.(\d+) \(KHTML, like Gecko\) Chrome\/(\d+)\.\d+\.\d+\.\d+ Safari\/\d+\.\d+$/
      );
      if (!match) {
        return false;
      }

      var webkitMajor = Number(match[1]);
      var webkitMinor = Number(match[2]);
      var chromeMajor = Number(match[3]);
      var webkitSupported = webkitMajor > 537 ||
        (webkitMajor === 537 && webkitMinor >= 36);

      return webkitSupported && chromeMajor >= 113;
    }

    if (isTeslaBrowser() || window.location.hostname === "localhost") {

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

