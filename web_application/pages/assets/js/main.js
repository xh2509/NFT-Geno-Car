  // ================================
  // NTF User profile menu
  // ================================
  function userMenuWrapperActive() {
    var element = document.querySelector(".nft-user-menu-wrapper");
    element.classList.toggle("active");
  }

  
  // ================================
  // Single item menu
  // ================================
  function singleItemClick(id) {
    var element = document.getElementById(`${id}`);
    element.classList.toggle("active");
  }

  // ================================
  // Filter Item Dropdown List
  // ================================
  function filterItemClick(id) {
    var element = document.getElementById(`${id}`);
    element.classList.toggle("active");
  }


  // ================================
  // Single item Love click
  // ================================
  function singleItemLoveClick(id) {
    var element = document.getElementById(`${id}`);
    element.classList.toggle("active");
  }

  
  // ================================
  // Explore product tab
  // ================================
  function openTabContent(evt, itemList) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(itemList).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // ================================
  //  Product Details Page: Image tab
  // ================================
  function openImgTabContent(evt, itemList) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(itemList).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // ================================
  //  Dashboard Setting TAB
  // ================================
  function dashboardTabContent(evt,itemList) {
    console.log(itemList);
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.querySelector(`${itemList}`).style.display = "block";
    evt.currentTarget.className += " active";
  }
  // ================================
  //  active tab url
  // ================================
  function activeTabForUrl(evt,itemList) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
      if (`#${tablinks[i].classList[1]}` === itemList) {
        tablinks[i].classList.add("active");
      }
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    for (i = 0; i < tabcontent.length; i++) {
       if (`#${tabcontent[i].id}` === itemList) {
         document.querySelector(`${itemList}`).style.display = "block";
       }
    }
  }
window.addEventListener('load', (e) => {
  const checkUrl = window.location.hash;
  if (checkUrl) {
    activeTabForUrl(e, checkUrl);
  } else {
    document.getElementsByClassName("tab-links")[0].classList.add("active");;
  }
})
 
  // ================================
  // Start dashboard Tab
  // ================================
  //Get the button:
  mybutton = document.getElementById("scrollTopBtn");

  if(mybutton){
        // When the user scrolls down 20px from the top of the document, show the button
      window.onscroll = function() {scrollFunction()};

      function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 500) {
          mybutton.style.display = "block";
        } else {
          mybutton.style.display = "none";
        }
      }

  }
 
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  

  // ================================
  // Start Header Count Down
  // ================================
  nftCountDown();

  function nftCountDown() {
    // Set the date we're counting down to
    var countDownDate = new Date("May 5, 2023 12:37:25").getTime();

    if( document.querySelector('.nft-promotion-time')) {

        // Update the count down every 1 second
        var x = setInterval(function() {

          // Get today's date and time
          var now = new Date().getTime();

          // Find the distance between now and the count down date
          var distance = countDownDate - now;

          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
          var content_loader_days = document.querySelector('.nft-promotion-time p span.days');
          var content_loader_hours = document.querySelector('.nft-promotion-time p span.hours');
          var content_loader_minutes = document.querySelector('.nft-promotion-time p span.minutes');
          var content_loader_seconds = document.querySelector('.nft-promotion-time p span.seconds');
      
          content_loader_days.innerHTML = days;
          content_loader_hours.innerHTML = hours;
          content_loader_minutes.innerHTML = minutes;
          content_loader_seconds.innerHTML = seconds;   

        }, 1000);

   }

  }

  // ================================
  // Start Product Details Page Count Down
  // ================================
  nftProductDetailsCountDown();

  function nftProductDetailsCountDown() {
    // Set the date we're counting down to
    var countDownDate = new Date("May 5, 2023 12:37:25").getTime();
    if( document.querySelector('.product-counter-timer')) {
    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var content_loader_days = document.querySelector('ul.product-counter-timer li span.days');
       var content_loader_hours = document.querySelector('ul.product-counter-timer li span.hours');
       var content_loader_minutes = document.querySelector('ul.product-counter-timer li span.min');
       var content_loader_seconds = document.querySelector('ul.product-counter-timer li span.sec');

       content_loader_days.innerHTML = days;
       content_loader_hours.innerHTML = hours;
       content_loader_minutes.innerHTML = minutes;
       content_loader_seconds.innerHTML = seconds;   

    }, 1000);
   }
  }


  // ================================
  // Start Live Bidding Count Down 1
  // ================================
  nftLiveBiddingCountDownOne();

  function nftLiveBiddingCountDownOne() {
    // Set the date we're counting down to
    var countDownDate = new Date("March 25, 2023 16:37:31").getTime();
    if( document.querySelector('.bidding-duration-box-1')) {

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

       var content_loader_days = document.querySelector('.bidding-duration-box-1 ul li span.days');
       var content_loader_hours = document.querySelector('.bidding-duration-box-1 ul li span.hours');
       var content_loader_minutes = document.querySelector('.bidding-duration-box-1 ul li span.minutes');
       var content_loader_seconds = document.querySelector('.bidding-duration-box-1 ul li span.seconds');

  
       content_loader_days.innerHTML = days;
       content_loader_hours.innerHTML = hours;
       content_loader_minutes.innerHTML = minutes;
       content_loader_seconds.innerHTML = seconds;   

    }, 1000);
   }
  }


  // ================================
  // Live Bidding Count Down 2
  // ================================
  nftLiveBiddingCountDownTwo();

  function nftLiveBiddingCountDownTwo() {
    // Set the date we're counting down to
    var countDownDate = new Date("March 25, 2023 14:46:35").getTime();
    if( document.querySelector('.bidding-duration-box-2')) {
    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var content_loader_days = document.querySelector('.bidding-duration-box-2 ul li span.days');
      var content_loader_hours = document.querySelector('.bidding-duration-box-2 ul li span.hours');
      var content_loader_minutes = document.querySelector('.bidding-duration-box-2 ul li span.minutes');
      var content_loader_seconds = document.querySelector('.bidding-duration-box-2 ul li span.seconds');

      // sss
      content_loader_days.innerHTML = days;
      content_loader_hours.innerHTML = hours;
      content_loader_minutes.innerHTML = minutes;
      content_loader_seconds.innerHTML = seconds;   

    }, 1000);
  }
  }


  // ================================
  // Live Bidding Count Down 3
  // ================================
  nftLiveBiddingCountDownThree();

  function nftLiveBiddingCountDownThree() {
    // Set the date we're counting down to
    var countDownDate = new Date("March 25, 2023 12:37:50").getTime();
    if( document.querySelector('.bidding-duration-box-3')) {
    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var content_loader_days = document.querySelector('.bidding-duration-box-3 ul li span.days');
      var content_loader_hours = document.querySelector('.bidding-duration-box-3 ul li span.hours');
      var content_loader_minutes = document.querySelector('.bidding-duration-box-3 ul li span.minutes');
      var content_loader_seconds = document.querySelector('.bidding-duration-box-3 ul li span.seconds');

  
      content_loader_days.innerHTML = days;
      content_loader_hours.innerHTML = hours;
      content_loader_minutes.innerHTML = minutes;
      content_loader_seconds.innerHTML = seconds;   

    }, 1000);
  }
  }
   

  // ================================
  // Live Bidding Count Down 4
  // ================================
  nftLiveBiddingCountDownFour();

  function nftLiveBiddingCountDownFour() {
    // Set the date we're counting down to
    var countDownDate = new Date("March 25, 2023 12:37:25").getTime();
    if( document.querySelector('.bidding-duration-box-4')) {
    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var content_loader_days = document.querySelector('.bidding-duration-box-4 ul li span.days');
      var content_loader_hours = document.querySelector('.bidding-duration-box-4 ul li span.hours');
      var content_loader_minutes = document.querySelector('.bidding-duration-box-4 ul li span.minutes');
      var content_loader_seconds = document.querySelector('.bidding-duration-box-4 ul li span.seconds');

  
      content_loader_days.innerHTML = days;
      content_loader_hours.innerHTML = hours;
      content_loader_minutes.innerHTML = minutes;
      content_loader_seconds.innerHTML = seconds;   

    }, 1000);
  }
  }
   


  
