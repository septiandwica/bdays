document.addEventListener('click', function() {
    const audio = document.querySelector('audio');
    audio.play();
  });

  let queryData = getSearchData()
  let animateHeartCanvas = new AnimateHeartCanvas(
      Number(queryData.hMin),
      Number(queryData.hMax),
      Number(queryData.countHeart),
      Number(queryData.sizeMin),
      Number(queryData.sizeMax),
      queryData.bgColor,
  )

  function getSearchData(){
      let searchString = location.search;
      if (searchString){
          let obj = {};
          searchString = searchString.substring(1, searchString.length);
          let tempArray = searchString.split('&');
          tempArray.forEach(item => {
              obj[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
          });
          return obj;
      } else {
          return false;
      }
  }
let love = setInterval(function() {
    let r_num = Math.floor(Math.random() * 40) + 1;
    let r_size = Math.floor(Math.random() * 65) + 10;
    let r_left = Math.floor(Math.random() * 100) + 1;
    let r_bg = Math.floor(Math.random() * 25) + 100;
    let r_time = Math.floor(Math.random() * 5) + 5;

    // Menambahkan beberapa hati
    for (let i = 0; i < 5; i++) { // Menambahkan loop untuk 5 hati
        $('.bg_heart').append("<div class='heart' style='width:" + (r_size - i * 5) + "px;height:" + (r_size - i * 5) + "px;left:" + (r_left + i * r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + i * 5) + ",1);-webkit-animation:love " + (r_time + i) + "s ease;-moz-animation:love " + (r_time + i) + "s ease;-ms-animation:love " + (r_time + i) + "s ease;animation:love " + (r_time + i) + "s ease'></div>");
    }

    $('.heart').each(function() {
        let top = $(this).css("top").replace(/[^-\d\.]/g, '');
        let width = $(this).css("width").replace(/[^-\d\.]/g, '');
        if (top <= -100 || width >= 150) {
            $(this).detach();
        }
    });
}, 500);
