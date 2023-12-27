function loaderAnimation() {
  var tl = gsap.timeline();

  tl.from("#loader h3", {
    x: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.3,
  });
  tl.to("#loader h3", {
    opacity: 0,
    x: -50,
    duration: 0.6,
    stagger: 0.2,
  });
  tl.to("#loader", {
    opacity: 0,
  });
  tl.from("#page1-content h1 span", {
    y: 100,
    opacity: 0,
    stagger: 0.15,
    duration: 0.5,
  });
  tl.to("#loader", {
    display: "none",
  });
}
loaderAnimation();

function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locoScroll();

function cursorEffect() {
  var page1Content = document.querySelector("#page1-content");
  // var page4-5 = document.querySelector("#page4-5");
  var cursor = document.querySelector("#cursor");

  // page1Content.addEventListener("mousemove", function (val) {
  //   cursor.style.left = val.x + "px";
  //   cursor.style.top = val.y + "px";
  // });
  page1Content.addEventListener("mousemove", function (val) {
    gsap.to(cursor, {
      x: val.x,
      y: val.y,
    });
  });

  page1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  page1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorEffect();

function page2Animation() {
  gsap.from(".elem h1 span", {
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 47%",
      end: "top 36%",
      // markers: true,
      scrub: 2,
    },
  });
}
page2Animation();

function page4Animation() {
  gsap.from(".elem-2 h1 span", {
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page4",
      scroller: "#main",
      start: "top 47%",
      end: "top 36%",
      // markers: true,
      scrub: 2,
    },
  });
}
page4Animation();

function sliderAnimation() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 6000,
    autoplay: {
      delay: -12000,
      disableOnInteraction: false,
    },
  });
}
sliderAnimation();
