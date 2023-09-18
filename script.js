const loading = document.getElementById("js-loading");

function menuAnimation() {

}

function toggleMenu() {
    const menu = document.getElementById("menu");
    const menuIcon = document.getElementById("icon");

    if (menu.className === 'menu') {
        menu.className = 'menu menu--show';
        menuIcon.className = 'fas fa-times';
    } else {
        menu.className = 'menu';
        menuIcon.className = 'fas fa-bars';
    }

    console.log(menu);
    console.log(menuIcon);
}

function setChannel(channel) {

    const selectedChannel = document.getElementById('js-title');

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

    let htmlToRender = data.map((item) => {

        let options = {
            hour: "numeric",
            minute: "numeric",
        };

        const time = new Date(item.start);
        const formated = new Intl.DateTimeFormat("sv-SE", options).format(time);
        item.formated = formated;

        return `<li class="list-group-item">${item.formated}<div>${item.name}</div></li>`;
    })
        .join("");



    const program = document.getElementById("js-schedule");

    program.innerHTML = '<ul class="list-group list-group-flush"><li class="list-group-item show-previous">Visa tidigare program</li>' + htmlToRender + '</ul>';
}

function showLoading() {
    loading.classList.remove("hidden");
    console.log(loading);
}

function hideLoading() {
    loading.classList.add("hidden");
    console.log(loading);
}

