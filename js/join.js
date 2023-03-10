/**
* Template Name: Logis - v1.3.0
* Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
    "use strict";
  
    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  
    
    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      const togglescrollTop = function() {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
      window.addEventListener('load', togglescrollTop);
      document.addEventListener('scroll', togglescrollTop);
      scrollTop.addEventListener('click', window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }));
    }
  
    /**
     * Mobile nav toggle
     */
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');
  
    document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
      el.addEventListener('click', function(event) {
        event.preventDefault();
        mobileNavToogle();
      })
    });
  
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavShow.classList.toggle('d-none');
      mobileNavHide.classList.toggle('d-none');
    }
  
    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navbar a').forEach(navbarlink => {
  
      if (!navbarlink.hash) return;
  
      let section = document.querySelector(navbarlink.hash);
      if (!section) return;
  
      navbarlink.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
  
    });
  
    /**
     * Toggle mobile nav dropdowns
     */
    const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
  
    navDropdowns.forEach(el => {
      el.addEventListener('click', function(event) {
        if (document.querySelector('.mobile-nav-active')) {
          event.preventDefault();
          this.classList.toggle('active');
          this.nextElementSibling.classList.toggle('dropdown-active');
  
          let dropDownIndicator = this.querySelector('.dropdown-indicator');
          dropDownIndicator.classList.toggle('bi-chevron-up');
          dropDownIndicator.classList.toggle('bi-chevron-down');
        }
      })
    });
  
    /**
     * Initiate pURE cOUNTER
     */
    new PureCounter();
  
    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  
    /**
     * Init swiper slider with 1 slide at once in desktop view
     */
    new Swiper('.slides-1', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  
    /**
     * Animation on scroll function and init
     */
    function aos_init() {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', () => {
      aos_init();
    });
  
  });



  document.getElementById('realresetPW_btn').style.display="none";








  function autoHypenPhone(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 11){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }
    return str;
}

var cellPhone_find_id = document.getElementById('sign_ph_find_id'); // ??????????????????????????? ?????????
var cellPhone_reset_pw=document.getElementById('sign_ph_reset_pw'); // ????????????????????????????????? ?????????
cellPhone_find_id.onkeyup = function(event){
event = event || window.event;
var _val = this.value.trim();
this.value = autoHypenPhone(_val);
}
cellPhone_reset_pw.onkeyup = function(event){
  event = event || window.event;
  var _val = this.value.trim();
  this.value = autoHypenPhone(_val);
}









// ???????????????
$('#findUserId_btn').click(function(){
  const name=$('.findIdName').val();// ????????????
  const userPhoneType=$('.findIdType').val(); // ?????????
  const userPhone=$('.findIdPhone').val(); // ?????????
  $.ajax({
    type:'post',
    url:`findid.meow`,
    data:{
      userName:name,
      phoneType:userPhoneType,
      phoneNumber:userPhone
    },
    success:function(data){
      if(data==='none'){
        $('#findUserId').html('?????? ???????????? ????????? ????????????????????????.');
      }else if(data==='mismatch'){
        $('#findUserId').html('????????? ????????????????????????..');
      }else{
        $('#findUserId').html(data);
      }
    }
  })
})


// ???????????? ?????????
$('#mail-Check-Btn').click(function(){
  const useremail=$('#resetPW_id').val();
  const checkInput=$('.mail-check-input');
  $.ajax({
    type:'get',
    url:`emailConfirm.meow/${useremail}`,
    success:function(data){
      checkInput.attr('disabled',false);
      code=data;
      alert('???????????? ??????!')
    }
  })
})

// ?????? ??????
$('.mail-check-input').blur(function () {
  const inputCode = $(this).val();
  const $resultMsg = $('#mail-check-warn');
  
  if(inputCode === code){
    $resultMsg.html('??????????????? ???????????????.');
    $resultMsg.css('color','green');
    $('#mail-Check-Btn').attr('disabled',true);
    $('#sign_id').attr('value',$('#resetPW_id').val());
    $('.resetPWId').attr('readonly',true);
    $('.mail-check-input').attr('disabled',true);
    $('#resetPW_btn').attr('disabled',false);
    $('#resetPW_id').attr('readonly',true);
  }else{
    $resultMsg.html('??????????????? ????????? ?????????. ?????? ??????????????????!.');
    $resultMsg.css('color','red');
  }
});

//???????????? ?????????
$('#resetPW_btn').click(function(){
  const resetid=$('.resetid').val();
  const resetName=$('.resetPWName').val();
  const resettype=$('.resetPWType').val();
  const resetphone=$('.resetPWPhone').val();
  const finalBTN=$('#realresetPW_btn');
  $.ajax({
    type:'post',
    url:`resettingpw.meow`,
    data:{
      userId:resetid,
      userName:resetName,
      phoneType:resettype,
      phoneNumber:resetphone
    },
    success:function(data){
      console.log(resetid);
      if(data==='none'){
        $('#checkinfo').html('???????????? ????????????????????????.')
      }else if(data==='mismatch'){
        $('#checkinfo').html('????????? ????????????????????????.')
      }else{
        //location.href=`resetting_pw.meow/${resetid}`;
        $.ajax({
          type:'post',
          url:`resetting_pw.meow`,
          data:{
            userId:resetid
          },
          success:function(data){
            $('#resetPW_btn').attr('disabled',true);
            document.getElementById('realresetPW_btn').style.display="block";
            $('#finalUserId').attr('value',resetid);
          }
        })
      }
    } // end success:function(data)
  })
})