let time_now = performance.now();

//GA
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-103579861-2');

//Navbar object
let navbar = {
    self: document.querySelector('nav'),
    toggler: document.querySelector('.navbar-toggler'), 
    menu: document.querySelector('.navbar-collapse'),
    collapse: function(resize){
      if (navbar.menu.classList.contains('collapsed')){
        navbar.menu.style.maxHeight = navbar.menu.firstElementChild.offsetHeight + 'px'
        navbar.menu.classList.remove('collapsed')
      }else if (userWindow.isMobile || (resize && !userWindow.isMobile)) {
        navbar.menu.style.maxHeight = '0px'
        navbar.menu.classList.add('collapsed')
      }
      //navbar.menu.classList.contains('collapse')?navbar.menu.classList.remove('collapse'): navbar.menu.classList.add('collapse'); 
    },
    responsive: function(){
      document.querySelector('.navbar-brand').firstElementChild.src = './images/J_W dark noB - fav.svg'; 
  
    },
    scroll: function(dest){
      navbar.self.querySelector(`.active`).classList.remove('active');
      navbar.self.querySelector(`.${dest}`).classList.add('active')
      window.scrollTo({
        top:  document.querySelector(`#${dest}`).offsetTop - 75,
        behavior: 'smooth'
      }); 
      navbar.collapse();
    }
  }
  
  let getInTouch = {
    self: document.querySelector('.getInTouch'), 
    move: function(){
      if (!getInTouch.self.classList.contains('collapsed')){
        getInTouch.self.style.marginRight = -1 *getInTouch.self.offsetWidth + 'px'; 
        document.querySelector('#content').removeEventListener('click', getInTouch.move); 
        getInTouch.self.classList.add('collapsed')
      }else{
        getInTouch.self.style.marginRight = '0px'
        document.querySelector('#content').addEventListener('click', getInTouch.move)
        getInTouch.self.classList.remove('collapsed')
        if(userWindow.isMobile){
          document.querySelector('#content').removeEventListener('click', getInTouch.move);
          navbar.collapse(); 
        }
      }
    },
  }
  
  //information used for responsive window
  let userWindow = {
    nowMobile: function(firstTime){
      if (!firstTime && navbar.menu.style.maxHeight != '0px'){
        navbar.collapse(true)
        userWindow.isMobile = true 
      }
  
    }, 
    notMobile: function(firstTime){
      if ((!firstTime && navbar.menu.style.maxHeight == '0px')||firstTime){
        navbar.collapse()
        document.querySelector('#content').removeEventListener('click',navbar.collapse)
        userWindow.isMobile = false
      }
    }, 
    getSize: function(){
      document.querySelector('.getInTouch').style.marginRight = getInTouch.self.style.marginRight = -1 *getInTouch.self.offsetWidth + 'px';     
      if(!userWindow.isMobile && window.innerWidth <= 768){
          userWindow.nowMobile()
      } else if (userWindow.isMobile && window.innerWidth > 768){
          userWindow.notMobile()
      }
    },
    isMobile: (function getWindowSize(){
      return (window.innerWidth <= 768)
      })(),
  }
  
  class dropDown {
    constructor(self){
      this.self = self; 
    };
    rotate = function(){
      let downDrop = this.parentElement.parentElement.querySelector('.downDrop')
      if(!this.classList.contains('rotated')){
        this.style.transform  = 'rotate(-135deg)'
        this.classList.add('rotated'); 
        downDrop.style.maxHeight = downDrop.firstElementChild.offsetHeight + 'px'; 
      }else {
        this.style.transform  = 'rotate(45deg)'
        this.classList.remove('rotated'); 
        downDrop.style.maxHeight = '0px'; 
      }
    }
  }
  
  class messageForm {
    constructor(self){
      this.self = self; 
    }
    submit = function(callback){
      if (!callback){
        callback = function(){
          let copy = document.querySelector('.getInTouch').cloneNode(true); 
          let GIT = document.querySelector('.getInTouch'); 
          GIT.innerHTML = `<h4 class='m-auto'>Message sent</h4> <p><br>Thank You!</p>`
          setTimeout(
            function(){
              getInTouch.move() 
              GIT.classList.remove('align-items-center')
              GIT.classList.remove('d-flex')
              GIT.innerHTML = copy.innerHTML
            }, 1250
          )
            
        }
      }
      console.log('tested!')
      let firstpsswrd = 'C6L8_^VYXrw-t+nb6TfLe23$'
      let psswrd = "_?%h=PQ%K#4x*^qd?Ls2?$ck";
      let url = '?'
      let response = {
        mail: CryptoJS.AES.encrypt(this.self.querySelector('#email').value, psswrd).toString(), 
        subject: CryptoJS.AES.encrypt(this.self.querySelector('#subject').value, psswrd).toString(), 
        body: CryptoJS.AES.encrypt(this.self.querySelector('#messageBody').value, psswrd).toString()
      }
      url += `md=${CryptoJS.AES.encrypt(JSON.stringify(response), firstpsswrd)}`
      let xmlhttp = new XMLHttpRequest();
      /file/.test(location.href)?xmlhttp.open('GET', `http://localhost:3000/mail/${url}`):xmlhttp.open('GET', `https://resume--form.herokuapp.com/mail/${url}`);
      xmlhttp.setRequestHeader('tag', 'resume')
      xmlhttp.onload = function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText)
          } else {
              //notice("It looks like we cannot access this site", "Some websites do not allow other pages to load them in order to add additional security. You are still able to manually find the ID or Class dor the button and use the Event on button click generator.")
          }
      };
      xmlhttp.send();
    }
  }
  let message = new messageForm(document.querySelector('#message'))

  function checkQueryString(callback){
    
    if (/(?<=co=)[^&]+/.test(location.search)){
      fadeInName(false)
      let xmlhttp = new XMLHttpRequest();
      //file/.test(location.href)?xmlhttp.open('GET', `http://localhost:3000/cv/${location.search}`):xmlhttp.open('GET', `https://resume--form.herokuapp.com/cv/${location.search}`);
      xmlhttp.open('GET', `https://resume--form.herokuapp.com/cv/${location.search}`)
      xmlhttp.setRequestHeader('cv', 'coverletter')
      xmlhttp.onload = function (){
        console.log('response received ' + (performance.now() - time_now))
        slideUpIntro()
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText)
          } else {
              console.warn('No response')//notice("It looks like we cannot access this site", "Some websites do not allow other pages to load them in order to add additional security. You are still able to manually find the ID or Class dor the button and use the Event on button click generator.")
          }
      };
      xmlhttp.send();
    }else{
      fadeInName()
    }
  }

  function dynamicCV(response){
    let psswrd = "_?%h=PQ%K#4x*^qd?Ls2?$ck";
    response = JSON.parse(response);
    if (response.company){
      document.querySelector('.bio').innerHTML = `${response.company} + Jackson`
      if (response.position){
        document.querySelectorAll('#bio > h3').forEach( h3 => (h3.innerText = `Why I'll make a great ${response.company} ${response.position}`))
      }else {
        document.querySelectorAll('#bio > h3').forEach( h3 => (h3.innerText = `Why I'm a great fit for ${response.company}`))
      }
    }
    cvBio = ''
    if (response.bio){
      response.bio.forEach(p => (cvBio += `<p>${CryptoJS.AES.decrypt(p, psswrd).toString(CryptoJS.enc.Utf8)}</p>`))
      document.querySelector('#bio > p').innerHTML = cvBio;
    } 
    if (response.exp && response.exp.length >= 4){
      let exps = document.querySelectorAll('.exp');
      for (let i = 0; i < response.exp.length; i++){
        exps[i].innerHTML = CryptoJS.AES.decrypt(response.exp[i], psswrd).toString(CryptoJS.enc.Utf8)
      }
    }
  }

  //slide up greay background
  function slideUpSecondaryIntro(){
    setTimeout(
      function(){
        document.querySelectorAll('.parallax.grey').forEach( elem => elem.style.maxHeight = 0); 
      },
      350
    )
  }

  //slide up white background
  function slideUpIntro(){
    setTimeout(
      function(){
        document.querySelectorAll('.parallax.light').forEach( elem => elem.style.maxHeight = 0);  
        slideUpSecondaryIntro()
      },
      1050
    )
  }

  //fade in name
  function fadeInName(cont = true){
    setTimeout(
      function(){
         document.querySelectorAll('.introAnim').forEach( elem => elem.style.opacity = 1); 
         if (cont) slideUpIntro()
       },
       750
    )
  }
  
  function init(){
    console.log('load resources ' + (performance.now() - time_now))
    checkQueryString(dynamicCV);

    //Set content below navbar
    document.querySelector('#content').style.paddingTop = navbar.self.offsetHeight + 'px';
  
    //make responsive on window resize
    window.addEventListener('resize', userWindow.getSize)
  
    //detect mobile
    userWindow.isMobile?userWindow.nowMobile(true):userWindow.notMobile(true);
  
    //set exact contact form height
    document.querySelector('.getInTouch').style.marginRight = getInTouch.self.style.marginRight = -1 *getInTouch.self.offsetWidth + 'px'; 
  
    //dropdown
    let dropDownEl = document.querySelectorAll('.dropDown'); 
    let dropDowns = []
    dropDownEl.forEach(drop => {dropDowns.push(new dropDown(drop))})
    dropDowns.forEach(drops => {drops.self.addEventListener('click', drops.rotate)})
  }
  
  init()