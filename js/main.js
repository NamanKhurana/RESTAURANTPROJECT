//HIDE PRELOADER WHEN THE PAGE has FINISHED LOADING

//WINDOW EVENT LISTENER

$(window).scroll(function() {
    if ($(this).scrollTop() > 50 ) {
        $('.scrolltop:hidden').stop(true, true).fadeIn();
    } else {
        $('.scrolltop').stop(true, true).fadeOut();
    }
});
$(function(){$(".scroll").click(function(){$("html,body").animate({scrollTop:$(".thetop").offset().top},"2000");return false})})


eventListeners();

function eventListeners()
{
const ui = new UI()
window.addEventListener('load',()=>{
ui.hidePreloader();    
})

//TYPED.js
var typed = new Typed(".banner_title", {
    strings: ["Impresso Espresso!"],
   typeSpeed: 100,
   backSpeed: 100,
   loop:true
  });

//nav btn
document.querySelector(".navBtn").addEventListener("click",()=>{
    document.querySelector(".nav").classList.toggle("nav_show")
})

//CONTROl THE VIDEO
document.querySelector(".video_switch").addEventListener("click",()=>{
    ui.videoControls()
})

//SUBMIT THE FORM
document.querySelector(".drink-form").addEventListener("submit",(event)=>{
    event.preventDefault();
    const name = document.querySelector(".input-name").value;
    const lastName = document.querySelector(".input-lastname").value;
    const email = document.querySelector(".input-email").value;
    
    let value = ui.checkEmpty(name,lastName,email)
    
    if(value)
    {   
        let customer = new Customer(name,lastName,email)
        console.log(customer)
        ui.addCustomer(customer)
        ui.showFeedback("CUSTOMER ADDED SUCCESSFULLY","success")
        ui.clearFields()
    }
    else
    {
        ui.showFeedback("SOME OF THE FORM VALUES ARE EMPTY","error")
    }

    })

    const links = document.querySelectorAll(".work-item__icon")
    links.forEach(function(item){
    item.addEventListener("click",function(event){
        ui.showModal(event)
    })
})

document.querySelector(".work-modal__close").addEventListener("click",()=>[
    ui.closeModal()
])

}

//CONSTRUCTOR FUNCTION
function UI()
{

}

UI.prototype.hidePreloader = function(){
    document.querySelector(".preloader").style.display="none";
}

UI.prototype.videoControls = function(){
    let btn = document.querySelector(".video_switch-btn");
    if(!btn.classList.contains("btnSlide"))
    {
        btn.classList.add("btnSlide")
        document.querySelector(".video_item").pause()
    }
    else
    {
        btn.classList.remove("btnSlide")
        document.querySelector(".video_item").play()
    }
}

//CHECK FOR EMPTY VALUES
UI.prototype.checkEmpty = function(name,lastName,email){
    let result;
    if(name === "" || lastName === "" || email === "")
    {
        result = false;
    }
    else
    {
        result = true;
    }
    return result;
}

UI.prototype.showFeedback = function(text,type){
    const feedback = document.querySelector(".drink-form_feedback")
    if(type === "success")
    {
        feedback.classList.add("success")
        feedback.innerText = text;
        this.removeAlert("success")
    }
    else if(type === "error")
    {
        feedback.classList.add("error")
        feedback.innerText = text;
        this.removeAlert("error")
    }
}

//REMOVE ALERT
UI.prototype.removeAlert = function(type)
{
    setTimeout(function(){
        document.querySelector(".drink-form_feedback").classList.remove(type)
    },2000)
}

//add customer
UI.prototype.addCustomer = function(customer){
const images = [1,2,3,4,5];
let random = Math.floor(Math.random()*images.length);
const div = document.createElement("div");
div.classList.add("person")
div.innerHTML = `<img src = "img/img/person-${random}.jpeg" class = "person_thumbnail">
<h4 class = "person_name">${customer.name}</h4>
<h4 class = "person_lastname">${customer.lastName}</h4>`
document.querySelector(".drink-card_list").appendChild(div)
}

//clear fields
UI.prototype.clearFields = function(){
    document.querySelector(".input-name").value = "";
    document.querySelector(".input-lastname").value = "";
    document.querySelector(".input-email").value = "";
}

//SHOW MODAL
UI.prototype.showModal = function (event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains('work-item__icon')) {
  
  
      let id = event.target.parentElement.dataset.id
  
      const modal = document.querySelector('.work-modal');
      const modalItem = document.querySelector('.work-modal__item');
  
      modal.classList.add('work-modal--show');
      modalItem.style.backgroundImage = `url(img/img/work-${id}.jpeg)`
    }
  }
  // HIDE MODAL
  
  UI.prototype.closeModal = function () {
    document.querySelector('.work-modal').classList.remove('work-modal--show')
  }

function Customer(name,lastName,email)
{
    this.name = name;
    this.lastName = lastName;
    this.email = email;
}