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


function wikiPull() {

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
          // descriptionEl.text(wikiData.query.pages[pageKey].extract)
        })
    })
}

function saveForm() {
  console.log("working")

  var name = $('#name')
  var landmark = $('#place')
  //var date = $('#date')
  var blog = $('#message')


  console.log(name.val())
  console.log(landmark.val())
  console.log(blog.val())

  localStorage.setItem('name', name.val())
  localStorage.setItem('landmark', landmark.val())
  localStorage.setItem('blog', blog.val())
}

function renderBlog() {

  var savednameEl = $('#saved-name')
  var savedlandmarkEl = $('#saved-landmark')
  var savedmessageEl = $('#saved-message')

  if (localStorage.getItem('name') !== null) {
    savednameEl.text(localStorage.getItem('name'))
  }
  if (localStorage.getItem('landmark') !== null) {
    savedlandmarkEl.text(localStorage.getItem('landmark'))
  }
  if (localStorage.getItem('blog') !== null) {
    savedmessageEl.text(localStorage.getItem('blog'))
  }

}

renderBlog()
formBtnEl.click(saveForm)
searchBtnEl.click(wikiPull)
