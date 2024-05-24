let timerInterval
let startTime

function startTimer() {
  startTime = Date.now()
  timerInterval = setInterval(updateTimer, 100)
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime
  const totalSeconds = Math.floor(elapsedTime / 1000)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const formattedTime =
    padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds)
  const timerElement = document.getElementById("timer")
  if (timerElement) {
    timerElement.innerText = formattedTime
  }
}

function padZero(num) {
  return (num < 10 ? "0" : "") + num
}
async function initMapWithDelay() {
  const mapContainer = document.getElementById("map")
  await ymaps3.ready

  setTimeout(function () {
    // Очищаем контейнер карты
    mapContainer.innerHTML = ""

    const { YMap, YMapDefaultSchemeLayer } = ymaps3

    const map = new YMap(mapContainer, {
      location: {
        center: [39.267048, 51.71401],
        zoom: 16,
      },
    })

    let loader = document.getElementById("loader")
    map.addChild(new YMapDefaultSchemeLayer())
    if (loader) {
      loader.style.display = "none"
    }
    if (mapContainer) {
      mapContainer.style.display = "block"
    }
  }, 1000) // Задержка в 1 cекунды
}
function hideElement() {
  const hideButton = document.getElementById("close-btn")
  const elementToHide = document.getElementById("item")
  if (!hideButton) {
    return
  }
  hideButton.addEventListener("click", function () {
    elementToHide.style.display = "none"
  })
}

function reloadMap() {
  const map = document.getElementById("map")
  const btn = document.getElementById("reloadMapBtn")
  if (!map) {
    return
  }
  btn.addEventListener("click", function () {
    if (map.firstChild) {
      map.removeChild(map.firstChild)
    }
    map.style.display = "none"
    document.getElementById("loader").style.display = "block"
    initMapWithDelay()
  })
}

function resetTimer() {
  const btn = document.getElementById("btnn")
  const timer = document.getElementById("timer")
  if (!timer) {
    return
  }
  btn.addEventListener("click", function () {
    clearInterval(timerInterval)
    timer.innerText = "00:00:00"
    startTimer()
  })
}

function doActiveLink() {
  // активная ссылка
  const items = document.querySelectorAll(".nav__item")
  const links = document.querySelectorAll(".nav__link")

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      items.forEach(function (item) {
        item.classList.remove("nav__item--active")
      })

      link.parentNode.classList.add("nav__item--active")
    })
  })
}

function swup() {
  const swupDiv = document.querySelector(".swup")
  const navLinks = document.querySelectorAll(".nav__link")

  // =================== Обработчики =================
  const loadScripts = (href) => {
    if (href.includes("map")) {
      initMapWithDelay()
      hideElement()
      reloadMap()
    }
    if (href.includes("timer")) {
      resetTimer()
      hideElement()
    }
  }

  const loadPage = (fileName) => {
    fetch(fileName)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, "text/html")
        const newContent = doc.querySelector(".swup").innerHTML

        swupDiv.innerHTML = newContent

        loadScripts(fileName)

        // Обновляем URL с параметром
        const newUrl = `${window.location.pathname}?content=${fileName}`
        history.pushState(null, null, newUrl)
      })
  }

  navLinks.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault()

      let href = e.currentTarget.getAttribute("href")
      loadPage(href)
    })
  })

  // Обрабатываем переходы назад/вперед
  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(window.location.search)
    const content = params.get("content")
    if (content) {
      loadPage(content)
    } else {
      // Если параметр content отсутствует, загружаем начальную страницу
      loadPage("index.html")
    }
  })

  // При загрузке страницы проверяем параметр content
  const initialParams = new URLSearchParams(window.location.search)
  const initialContent = initialParams.get("content")
  if (initialContent) {
    loadPage(initialContent)
  }
}

// =================== Обработчики =================
document.addEventListener("DOMContentLoaded", () => {
  startTimer()
  doActiveLink()
  swup()
})
