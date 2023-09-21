const loading = document.getElementById("js-loading");
const menu = document.querySelector(".menu");
const menuIcon = document.getElementById("icon");
const selectedChannel = document.getElementById('js-title');
const program = document.getElementById("js-schedule");

let visibleMenu = false;

function toggleMenu() {

    if (!visibleMenu) {
        menu.className = 'menu menu--show';
        menuIcon.className = 'fas fa-times';
        menu.style.transition = '0.5s ease-in-out';
        visibleMenu = true;
    }
    else {
        menu.className = 'menu';
        menuIcon.className = 'fas fa-bars';
        visibleMenu = false;
    }

    console.log(menu);
    console.log(menuIcon);
}

function setChannel(channel) {

    selectedChannel.innerHTML = "";

    switch (channel) {
        case 'SVT 1':
            selectedChannel.innerHTML = "SVT 1";
            getChannelSchedule(channel);
            break;
        case 'SVT 2':
            selectedChannel.innerHTML = "SVT 2";
            getChannelSchedule(channel);
            break;
        case 'SVT Barn':
            selectedChannel.innerHTML = "SVT Barn";
            getChannelSchedule(channel);
            break;
        case 'Kunskapskanalen':
            selectedChannel.innerHTML = "Kunskapskanalen";
            getChannelSchedule(channel);
            break;
        case 'SVT 24':
            selectedChannel.innerHTML = "SVT 24";
            getChannelSchedule(channel);
            break;
    }
}

function getChannelSchedule(channel) {
    showLoading();
    fetch(`data/${channel}.json`)
        .then(response => {
            console.log(response)
            hideLoading();
            if (!response.ok) {
                console.log("Not successful")
            } else {
                return response.json();
            }
        })
        .then(data => renderData(data))
        .catch(error => console.log("Error " + error));
}

function renderData(data) {
    const timeNow = new Date();

    let sortedShows = data.sort((showA, showB) => new Date(showA.start) - new Date(showB.start));
    allShowsSorted = sortedShows;

    console.log(allShowsSorted)

    const filteredShows = sortedShows.filter(show => {
        const showTime = new Date(show.start);
        showTime.setFullYear(timeNow.getFullYear());
        showTime.setMonth(timeNow.getMonth());
        showTime.setDate(timeNow.getDate());

        return showTime > timeNow;
    });

    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }

    let htmlToRender = filteredShows.map((show) => {
        const time = new Date(show.start);
        const hours = addZero(time.getHours());
        const minutes = addZero(time.getMinutes());
        const showStart = `${hours}:${minutes}`;
        show.showStart = showStart;

        return `<li class="list-group-item">${show.showStart}<div>${show.name}</div></li>`;
    })
        .join("");

    program.innerHTML = '<ul class="list-group list-group-flush"><li class="list-group-item show-previous">Visa tidigare program</li>' + htmlToRender + '</ul>';

    const showPrevious = document.querySelector(".show-previous");
    showPrevious.addEventListener("click", showPreviousShows);
}

// Inte klar
function showPreviousShows() {
    console.log("clicked");
}


function showLoading() {
    loading.classList.remove("hidden");
    console.log(loading);
}

function hideLoading() {
    loading.classList.add("hidden");
    console.log(loading);
}

