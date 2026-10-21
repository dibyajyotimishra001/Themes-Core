const hamburger = document.querySelector(".hamburger");
const nav = document.getElementById("navigation");
const navList = document.querySelector(".navLists");

const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");

hamburger.addEventListener("click", ()=>{
    nav.classList.toggle("active");
    navList.classList.toggle("active");
    hamburger.classList.toggle("active");

    line1.classList.toggle("active");
    line2.classList.toggle("active");
    line3.classList.toggle("active");
});

// Sidebar
const sideBarIcon = document.querySelector(".bi-layout-sidebar-inset");
const sidebar = document.querySelector(".sidebar");

sideBarIcon.addEventListener("click", ()=>{
    sidebar.classList.toggle("active");
});

// Dark mode
const moon = document.querySelector(".darkMode");

let currentTheme = localStorage.getItem("theme");
if(currentTheme == "enabled"){
    document.body.classList.add("dark");
}
moon.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "enabled");
    }
    else{
        localStorage.setItem("theme", "disabled");        
    }
});

// Navebar behavour
const navbar = document.querySelector('.smart-navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // 1. If scrolling down and passed the initial header boundary, hide it
    if (currentScrollY > lastScrollY && currentScrollY > 70) {
        navbar.classList.add('nav-hidden');
        sidebar.classList.add("top");
    } 
    // 2. If scrolling up, immediately show it again
    else {
        navbar.classList.remove('nav-hidden');
        sidebar.classList.remove("top");
    }

    // Update the baseline position for the next movement check
    lastScrollY = currentScrollY;
});

// Click detection outside navbar and sidebar
document.addEventListener("click", (e)=>{
    const isSideBarOpen = sidebar.classList.contains("active");
    const isNavBarOpen = navList.classList.contains("active");

    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedInsideNavbar = nav.contains(e.target);

    if(isSideBarOpen && !clickedInsideNavbar && !clickedInsideSidebar){
        sidebar.classList.remove("active")
    }
    if(isNavBarOpen && !clickedInsideNavbar && !clickedInsideNavbar){
        navList.classList.remove("active");

        line1.classList.toggle("active");
        line2.classList.toggle("active");
        line3.classList.toggle("active");
        hamburger.classList.toggle("active");
    }
});


// top scroll

const toUpBtn = document.querySelector(".toUP");

if(toUpBtn){

    window.addEventListener('scroll', () => {
        // Jab page 300px se zyada niche scroll ho jaye tabhi dikhega
        if (window.scrollY > 300) {
            toUpBtn.classList.add('show-btn');
        } else {
            toUpBtn.classList.remove('show-btn'); // Top par gayab
        }
    });
    
    toUpBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Ekdum smooth scrolling effect ke liye
        });
    });
}