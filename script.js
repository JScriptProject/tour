// codepen code from here about Locomotive scroll

function locomotiveScroll(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();    
}

locomotiveScroll();

///////////////////////////////////////////////////////

// nav toggle 

let navBtn = document.querySelector(".menu-label");

navBtn.addEventListener("click", function(){
   document.querySelector(".nav-wrapped").classList.toggle("nav-toggle"); 
})


///////////////////////////////////////////////////////

let cursor = document.querySelector(".cursor");
let page1Content = document.querySelector("#page1");

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

let cursorEffect=()=>{
    page1Content.addEventListener("mousemove", function(e){
     
        gsap.to(cursor,{
            x:e.x,
            y:e.y
        })
    });
    
    page1Content.addEventListener("mouseenter", function(){
        gsap.to(cursor,{
            scale:1,
            opacity:1
        })
    })
    
    page1Content.addEventListener("mouseleave", function(){
        gsap.to(cursor,{
            scale:0,
            opacity:0
        })
    })
}

cursorEffect();

    // page 2 animation self tought
function page2Anim(){
    let lines = document.querySelectorAll(".anim-para");

    // Create animation for each line
    lines.forEach((line, index) => {

        gsap.fromTo( 
            line, { opacity:0, y:50, scale:0.7,rotateX:100, paddingTop: "10px" },  //start state

            {
                opacity:1,
                y:0,
                scale:1,
                rotateX:0,
                paddingTop:"0px",
                duration:1,
                scrollTrigger:{
                    trigger:line,
                    scroller:".main", //this has to use when use the locomative JS for smooth scrooling, main is the parent class in body
                    start:"top 85%",
                    end:"top 65%",
                    scrub:false,
                    // markers:true,
                },
            }
        );
    });
}

page2Anim();

// middle page animantion

function middlePageTextRover(){
    let roverTxt = document.querySelector(".rolling-text");

    gsap.fromTo(
        roverTxt,{x:"30%", opacity:0},{
            x:"-30%", opacity:1,
            duration:1,
            scrollTrigger:{
                trigger:roverTxt,
                scroller:".main",
                start:"top 95%",
                end:"top 15%",
                scrub:true,
                markers:false,
            },
        }
    );
}

middlePageTextRover();

// underline animation
const animHead1= document.querySelectorAll(".anim-head");
function underlineAnim1(){

    animHead1.forEach((head1)=>{
        gsap.fromTo(
            head1,
            { "--after-left": "0%" }, // Start state
            {
              "--after-left": "100%", // End state
              duration: 1,
              scrollTrigger: {
                trigger: head1,
                scroller:".main",
                start: "top 75%",
                end: "top 25%",
                scrub: true,
                markers: false, // Show markers for debugging
              },
            }
          );
    })
    
}

underlineAnim1();
// swiper JS

let swiper = new Swiper(".mySwiper", {
    slidesPerView:4,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    }
  });




//   Loader 
let t1 = gsap.timeline();

t1.from(".loader h3",{
    x:"40px",
    opacity:1,
    duration:1,
    stagger:0.1
})

t1.to(".loader h3",{
    opacity:0,
    x:"-10px",
    duration:1,
    stagger:0.1
})

t1.to(".loader",{
   opacity:0
})

// load the h1

t1.from(".heading-h1 span",{
    y:300,
    stagger:0.1,
    duration:0.5,
    delay:-0.5
})

t1.to(".loader",{
    display:"none"
 })


 // load the h1

t1.from(".heading-h2 span",{
    y:300,
    stagger:0.1,
    duration:0.5,
    delay:-0.5
})
