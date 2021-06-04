function openMenu(){
        menuIcon.src = "./dist/img/menu-opened-icon.png";
        menuBackground.style.display = "block";
}
function closeMenu(){
        menuIcon.src = "./dist/img/menu-closed-icon.png";
        menu.classList.remove("menu--active");
        menuBackground.style.display = "none";
}

function setActiveMenuItem(event){
    if(event.target.tagName === "A"){
        for (let menuItem of menuItems) {
            menuItem.classList.remove("menu__menu-item--active");
        }
        event.target.parentNode.classList.add("menu__menu-item--active");
    }
}

const menu = document.querySelector(".menu");
const menuIcon = document.querySelector(".menu-btn__image");
const menuButton = document.querySelector(".menu-btn");
const menuItems = document.querySelectorAll(".menu__menu-item");
const menuBackground = document.querySelector(".menu-close-background");
menuButton.addEventListener("click", () => {
    menu.classList.toggle("menu--active");
    if(menu.classList.contains("menu--active")){
        openMenu();
    }
    else{
        closeMenu();
    }
});

menu.addEventListener("click", event => setActiveMenuItem(event));
menuBackground.addEventListener("click", closeMenu);

