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





// ????????? ?????? ??????
$('#id-Check-Btn').click(function(){
  const userIdemail=document.getElementById('sign_id_email').value;
  $.ajax({
    type:'get',
    url:`checkDuplication.meow/${userIdemail}`,
    success:function(data){
      if(data==='available'){
        alert('??????????????? ??????????????????.');
        $('#sign_id_email').attr('readonly',true);
        $('#mail-Check-Btn').attr('disabled',false);
        $('#id-Check-Btn').attr('disabled',true);
      }else{
        alert('?????? ???????????? ??????????????????.');
      }
    }
  })
})

// ????????? ??????
$('#mail-Check-Btn').click(function(){
  const useremail=document.getElementById('sign_id_email').value;
  const checkInput=$('.mail-check-input');

  $.ajax({
    type:'get',
    url: `emailConfirm.meow/${useremail}`,
    success:function(data){
      checkInput.attr('disabled',false);
      code=data;
      alert('??????????????? ?????????????????????.')
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
    $('#sign_id_code').attr('readonly',true);
    $('#userIdEmail').attr('value',document.getElementById('sign_id_email').value);
    console.log(document.getElementById('sign_id_email').value);
    $('.mail-check-input').attr('disabled',true);
    $('#userNickNameCheck').attr('disabled',false);
    $('#nickName-Check-Btn').attr('disabled',false);
  }else{
    $resultMsg.html('??????????????? ????????? ?????????. ?????? ??????????????????!.');
    $resultMsg.css('color','red');
  }
});

// ????????? ?????? ??????
$('#nickName-Check-Btn').click(function(){
  const userNickName=document.getElementById('userNickNameCheck').value;
  $.ajax({
    type:'get',
    url:`checkDuplicationNickName.meow/${userNickName}`,
    success:function(data){
      if(data==='available'){
        alert('??????????????? ??????????????????.');
        $('#gotojoin_btn').attr('disabled',false);
        $('#userNickNameCheck').attr('disabled',true);
        $('#nickName-Check-Btn').attr('disabled',true);
        $('#sign_nick').attr('value',userNickName);
      }else{
        alert('?????? ???????????? ??????????????????.');
      }
    }
  })
})



  

  
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

var cellPhone = document.getElementById('sign_ph');
cellPhone.onkeyup = function(event){
event = event || window.event;
var _val = this.value.trim();
this.value = autoHypenPhone(_val);
}





// ??????, ?????????, ???????????? ????????? ??????
function ValidChecked() {

  var n_RegExp = /^[???-???a-zA-Z\s]+$/;
  var p_RegExp = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
  var pw_RegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/;


  var objName = document.getElementById("sign_name");
  var objPhone = document.getElementById("sign_ph");
  var objPassword=document.getElementById("sign_pwd");
  var objPWconfirm=document.getElementById("sign_pwd2");


       //?????? ????????? ??????
     if (objName.value == "") {
       alert("????????? ???????????????.");
       objName.focus();
       return false;
     };
     if (!n_RegExp.test(objName.value)) {
       alert("????????? ?????? 2~15????????? ???????????????.");
       objName.focus();
       return false;
     };

      // ???????????? ???????????????
     if(objPassword.value==""){
      alert("??????????????? ??????????????????")
      objPassword.focus();
      return false;
     };
     if(objPassword.value!=objPWconfirm.value){
      alert("??????????????? ????????????????????????.");
      objPWconfirm.focus();
      return false;
     }
     if(!pw_RegExp.test(objPassword.value)){
      alert("??????????????? ?????? ???,???????????? ??????, ???????????? ????????? 1??? ????????? ????????? 8??? ~ 20?????? ?????????????????? ?????????.");
      objPassword.focus();
      return false;
     }

      //??????????????? ???????????????
    if (objPhone.value == "") {
      alert("?????????????????? ???????????????.");
      objPhone.focus();
      return false;
    };
    if(!p_RegExp.test(objPhone.value)){
      alert("?????????????????? ???????????? ????????????.");
      objPhone.focus();
      return false;
    };
    return true;
}

$("#file").on('change',function(){
  var fileName = $("#file").val();
  $(".upload-name").val(fileName);
});
/*
<script type="text/javascript" th:inline="javascript">
            let pass_word=document.getElementById('sign_pwd');
            let pass_word_check=document.getElementById('sign_pwd2');
            function validatePassword(){
              if(pass_word.value!=pass_word_check.value){
                pass_word_check.setCustomValidity("??????????????? ????????????????????????.");// Passwords Don't Match
              }else{pass_word_check.setCustomValidity('');}
            }
            //pass_word.onchange=validatePassword;
            pass_word.onchange=checkcheckpw;
            pass_word_check.onkeyup=validatePassword;
            function checkcheckpw(){
                if(!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/.test(pass_word.value)){
                  pass_word.setCustomValidity("??????????????????,??????,???????????? ????????? 1??? ????????? ????????????");
                }else{pass_word_check.setCustomValidity('');}
              }
            function checkMail(){
              document.getElementById('sign_id').value=/*[[${successemail}]]*/    //"";}</script>
