const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

// Slider
const slider = document.querySelector('.slider');
M.Slider.init(slider, {
  indicators: false,
  height: 500,
  transition: 500,
  interval: 6000
});

// Scrollspy
const ss = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(ss, {});

// Material Boxed
const mb = document.querySelectorAll('.materialboxed');
M.Materialbox.init(mb, {});

// Auto Complete
const ac = document.querySelector('.autocomplete');
M.Autocomplete.init(ac, {
  data: {
    "Seattle": null,
    "Texas": null,
    "Hawaii": null,
    "Florida": null,
    "California": null,
    "New York": null,
    "Chicago": null,
    "Philadelphia": null,
  }

});

searchTextEl = $('#autocomplete-input')
searchBtnEl = $('#searchBtn')
formBtnEl = $('#formBtn')
var popularEl = $('#test')

function locationLoad() {

  popularEl.empty()
  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + searchTextEl.val() + '&utf8=&format=json&origin=*'


  console.log("buttonwork")

  fetch(wikiUrl, {

  }).then(function (response) {
    return response.json()

  })
    .then(function (data) {
      console.log(data)
      var wikiKey = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro=true&explaintext=true&titles=' + data.query.search[0].title

      fetch(wikiKey, {

      })
        .then(function (wikiResponse) {
          return wikiResponse.json()

        })
        .then(function (wikiData) {
          var pageKey = data.query.search[0].pageid
          console.log(wikiData.query.pages[pageKey].extract)
          popularEl.append('<h2>' + searchTextEl.val() + '</h2>')
          popularEl.append('<p class ="text-size" >' + wikiData.query.pages[pageKey].extract + '</p>')
          // descriptionEl.text(wikiData.query.pages[pageKey].extract)
        })
    })
  var apikey = '563492ad6f91700001000001762d088d5ead45459359fd5c62d83861'
  fetch(`https://api.pexels.com/videos/search?query=` + searchTextEl.val(),
    {
      method: "GET",
      headers: {

        Accept: "application/json",
        Authorization: apikey,     //use the apikey you have generated
      },

    }).then(function (pexelResponse) {
      return pexelResponse.json()
    })

    .then(function (pexelVidData) {
      console.log(pexelVidData)
      var pexelURL = pexelVidData.videos[0].video_files[0].link
      popularEl.append('<iframe width="800" height="500" class="flex" src="' + pexelURL + '"frameborder="0" allowfullscreen></iframe>')
    })
  var apikey = '563492ad6f91700001000001762d088d5ead45459359fd5c62d83861'
  fetch("https://api.pexels.com/v1/search?query=" + searchTextEl.val(),
    {
      method: "GET",
      headers: {

        Accept: "application/json",
        Authorization: apikey,     //use the apikey you have generated
      },

    }).then(function (pexelResponse) {
      return pexelResponse.json()
    })

    .then(function (pexelData) {
      console.log(pexelData)
      imgOneEl.attr("src", pexelData.photos[0].src.original)
      imgOneEl.attr("alt", pexelData.photos[0].alt)

      imgTwoEl.attr("src", pexelData.photos[1].src.original)
      imgTwoEl.attr("alt", pexelData.photos[1].alt)

      imgThreeEl.attr("src", pexelData.photos[2].src.original)
      imgThreeEl.attr("alt", pexelData.photos[2].alt)

      imgFourEl.attr("src", pexelData.photos[3].src.original)
      imgFourEl.attr("alt", pexelData.photos[3].alt)

      imgFiveEl.attr("src", pexelData.photos[4].src.original)
      imgFiveEl.attr("alt", pexelData.photos[4].alt)

      imgSixEl.attr("src", pexelData.photos[5].src.original)
      imgSixEl.attr("alt", pexelData.photos[5].alt)

      imgSevenEl.attr("src", pexelData.photos[6].src.original)
      imgSevenEl.attr("alt", pexelData.photos[6].alt)

      imgEightEl.attr("src", pexelData.photos[7].src.original)
      imgEightEl.attr("alt", pexelData.photos[7].alt)
    })
}

function saveForm() {
  console.log("working")

  var name = $('#name')
  var landmark = $('#place')
  var date = $('#Date')
  var blog = $('#message')

  console.log(date.val())
  console.log(name.val())
  console.log(landmark.val())
  console.log(blog.val())

  localStorage.setItem('name', name.val())
  localStorage.setItem('landmark', landmark.val())
  localStorage.setItem('date', date.val())
  localStorage.setItem('blog', blog.val())

  renderBlog()

}

function renderBlog() {

  var savednameEl = $('#saved-name')
  var savedlandmarkEl = $('#saved-landmark')
  var saveddateEl = $('#saved-Date')
  var savedmessageEl = $('#saved-message')

  if (localStorage.getItem('name') !== null) {
    savednameEl.text(localStorage.getItem('name'))
  }
  if (localStorage.getItem('landmark') !== null) {
    savedlandmarkEl.text(localStorage.getItem('landmark'))
  }
  if (localStorage.getItem('date') !== null) {
    saveddateEl.text(localStorage.getItem('date'))
  }
  if (localStorage.getItem('blog') !== null) {
    savedmessageEl.text(localStorage.getItem('blog'))
  }

}

var imgOneEl = $("#imgOne")
var imgTwoEl = $("#imgTwo")
var imgThreeEl = $("#imgThree")
var imgFourEl = $("#imgFour")
var imgFiveEl = $("#imgFive")
var imgSixEl = $("#imgSix")
var imgSevenEl = $("#imgSeven")
var imgEightEl = $("#imgEight")

renderBlog()
formBtnEl.click(saveForm)
searchBtnEl.click(locationLoad)
