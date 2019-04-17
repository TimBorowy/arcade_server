firstMenu = document.querySelector('.first-menu');
playerTypes = firstMenu.children;

secondMenu = document.querySelector('.second-menu');
gameTypes = secondMenu.children;

thirthMenu = document.querySelector('.thirth-menu');
games = thirthMenu.children;

// Used for changing the position of the selector between menu's and in-menu.
var menuCounter = 0;
var menuIndex = [playerTypes, gameTypes, games];

// Generate for each menu a cache.
var menuCache = menuIndex.map(x => {
    return 0;
})

// set activeMenu as first menu of menuIndex.
var activeMenu = menuIndex[0];
var counter = 0;
var downCounterCache = 0;
var upCounterCache = 0;

function initSelector() {
    activeMenu[counter].style.backgroundColor = 'cyan';
}

function cacheDownCounter() {
    menuCache[menuCounter] = counter;

    if (counterCached('up')) {
        swapCounter('up');
    } else {
        resetCounter();
    }
}

function cacheUpCounter() {
    menuCache[menuCounter] = counter;

    if (counterCached('down')) {
        swapCounter('down');
    } else {
        resetCounter();
    }
}

function swapCounter(direction) {
    if (direction == 'up') {
        counter = menuCache[menuCounter - 1];
    }
    if (direction == 'down') {
        counter = menuCache[menuCounter + 1];
    }
}

function counterCached(direction) {

    if (direction == 'up' && upCounterCache < 0) {
        return false;
    }

    if (direction == 'down' && downCounterCache < 0) {
        return false;
    }

    return true
}

function resetCounter() {
    counter = 0;
}

initSelector(playerTypes);

function unselectElement() {
    activeMenu[counter].style.backgroundColor = '';
}

function selectPreviousElement() {
    if (counter - 1 >= 0) {
        unselectElement();
        counter--;
        activeMenu[counter].style.backgroundColor = 'cyan';
    }
}

function selectNextElement() {
    if (counter + 1 < activeMenu.length) {
        unselectElement();
        counter++
        activeMenu[counter].style.backgroundColor = 'cyan';
    }
}

function setActiveMenu() {
    activeMenu = menuIndex[menuCounter]
}

function selectPreviousMenu() {
    menuCounter--;
    setActiveMenu();
    initSelector();
}

function selectNextMenu() {
    menuCounter++;
    setActiveMenu();
    initSelector();
}

function getSelectedGame() {
    selectedGameIndex = menuCache[menuCache.length - 1]

    if (menuCounter != 2) {
        return thirthMenu.children[selectedGameIndex]
    }

    return thirthMenu.children[counter]
}

// Listening to the browser which key is pressed.
document.onkeypress = function (evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);

    if (charStr == 'd') {
        selectNextElement();
    }

    if (charStr == 'a') {
        selectPreviousElement();
    }

    if (charStr == 's') {
        if (menuCounter + 1 < menuIndex.length) {
            cacheUpCounter();
            selectNextMenu();
        }
    }

    if (charStr == 'w') {
        if (menuCounter - 1 >= 0) {
            cacheDownCounter();
            selectPreviousMenu();
        }
    }

    if (charStr == 'q') {
        if (menuCounter - 1 >= 0) {
            url = getSelectedGame().href
            window.location.href = url;
        }
    }

    // console.log('CachedCounters: ' + menuCache);
    // console.log('Current menuCounter: ' + menuCounter);
    // console.log('Current counter: ' + counter);
};