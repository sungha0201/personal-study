let url = './assets/data.json';

let jsonData = [
    {
      "title": "Work",
      "timeframes": {
        "daily": {
          "current": 5,
          "previous": 7
        },
        "weekly": {
          "current": 32,
          "previous": 36
        },
        "monthly": {
          "current": 103,
          "previous": 128
        }
      }
    },
    {
      "title": "Play",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 2
        },
        "weekly": {
          "current": 10,
          "previous": 8
        },
        "monthly": {
          "current": 23,
          "previous": 29
        }
      }
    },
    {
      "title": "Study",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 7
        },
        "monthly": {
          "current": 13,
          "previous": 19
        }
      }
    },
    {
      "title": "Exercise",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 5
        },
        "monthly": {
          "current": 11,
          "previous": 18
        }
      }
    },
    {
      "title": "Social",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 3
        },
        "weekly": {
          "current": 5,
          "previous": 10
        },
        "monthly": {
          "current": 21,
          "previous": 23
        }
      }
    },
    {
      "title": "Self Care",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 2,
          "previous": 2
        },
        "monthly": {
          "current": 7,
          "previous": 11
        }
      }
    }
  ]
  ;

// $.getJSON(url, function(json){
//   jsonData = json;
// });


$(".monthly").on("click", function(){
  console.log("monthly was clicked");
  $(".selected").removeClass("selected");
  //$(".selected")[0].classList.remove("selected");
  //$(".monthly")[0].classList.add("selected");
  $(".monthly").addClass("selected");
  loadData("monthly");
});

$(".daily").on("click", function(){
  $(".selected")[0].classList.remove("selected");
  $(".daily")[0].classList.add("selected");
  console.log("daily was clicked");
  loadData("daily");
});

$(".weekly").on("click", function(){
  $(".selected")[0].classList.remove("selected");
  $(".weekly")[0].classList.add("selected");
  console.log("weekly was clicked");
  loadData("weekly");
});

function loadData(timeframe)
{
  const cards = document.getElementsByClassName("card");
  
  let title, data, format;
  for(let i = 0;i<cards.length; i++)
  {
    title = cards[i].getElementsByClassName("activity")[0].innerText;
    data = queryData(title, timeframe);//('work','monthly')
    //  {
    //     "current": 103,
    //     "previous": 128
    //   }
    console.log(data);

    cards[i].getElementsByClassName("curr")[0].innerText = data.current + "hrs";

    if(timeframe == "daily")
        format = "Day";
    else format = timeframe.substring(0, timeframe.length - 2);//month

    cards[i].getElementsByClassName("prev")[0].innerText = "Last " + format + " - " + data.previous;
  }
}


function queryData(title, timeframe)
{
  let payload;
  console.log("queryData called");
  jsonData.forEach((element, index)=>{
    if(title == element.title){
      if(timeframe=="monthly")
        payload = element.timeframes.monthly;
      else if(timeframe == "weekly")
        payload = element.timeframes.weekly;
      else
        payload = element.timeframes.daily;
    }
  });
  return payload;
}
