function toggleMenu() {
    const menu = document.getElementById("menu");
    const menuIcon = document.getElementById("icon");

    if(menu.className == 'menu') {
        menu.className = 'menu menu--show';
        menuIcon.className = 'fas fa-times';
    } else {
        menu.className = 'menu';
        menuIcon.className = 'fas fa-bars';
    }

    console.log(menu);
    console.log(menuIcon);
}