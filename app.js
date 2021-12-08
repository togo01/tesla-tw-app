$(function(){
    if (navigator.userAgent.includes("Tesla")) {

      $(".pc").remove();

      $.getJSON("app.json", function(data){
        $.each(data.apps, function(i, v) {
          app = $("<div class=\"app\"></div>" ).appendTo($(".app-container"))
          icon = $("<img class=\"app-icon\">").appendTo(app)
          icon.attr("src", v.icon_url)
          app_name = $("<span class=\"app-name\"></span>").appendTo(app)
          app_name.text(v.name)

          app.click(function() {
            window.open("https://www.youtube.com/redirect?q=" + v.link)  
          })
        })
      })

    } else {

      $(".app-container").remove();

    }

    UpdateClock()
    setInterval(UpdateClock, 1000)

    function UpdateClock () {
        var now = new Date()
        $("#clock-hour").text(now.getHours())
        $("#clock-minute").text(now.getMinutes().toString().padStart(2, "0"))
    }

})


