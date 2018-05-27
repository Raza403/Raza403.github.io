//Opens modal when image is clicked
function handleLink() {
    const id = this.id;
    const subHeading = ["Data is fetched using ES6 from API, then matched, filtered and shown to the screen", "Made using jQuery, Gives live out put of HTML,CSS and javaScript typed in the tabs. Tabs can be Toggeled", "Made using JavaScript and styled using Bootstrap, time fetched from API.", "CSS variables varied using JavaScript", "Location based weather updates are fetched from weather API, Using jQuery. Weather can be toggeled in centigrades and fahrenheit. Background image changes according to temperature.", "Made using javaScript and Bootstrap. Keys animate and related sound is produced. Main functionality is done using JavaScript.", "Konami code is always watching keys pressed for certain pre program keys, Like cheats in the game.", "By pressing shift key and clicking all check boxes between two points are checked, Implemented using JavaScript", "Random quote fetched from API, then checked for tweet length, if passed renders on the screen. Can also be tweeted instantly using twitter API.", "Flexbox used to style columns, Columns grow and shrink, Words animate in and out by changing CSS using javaScript", "Used HTML5 canvas, color and font size varied using javaScript.", "Wiki pedia articles are fetched using API, and then displayed. Random article can also be fetched. Bootstrap is used for styling.", "Customized HTML5 video player using javaScript, Implemented click to toggle video play, Speed changing, Volume, Full screen etc.", "Channels data fetched from twitch.tv API, shown status. Can be sorted by online, offline & all", "News can be fetched using API based on location, state, city, zip etc. Implemented in python and flask.", "Click on random image appears randomly on the screen, and time taken will be shown. Made using jQuery.", "Clone of stripe.com Navbar is made using Vanilla JavaScript.", "Attribute Page is the first project for Free Code Camp, made it using HTML only."];
    const gitLinks = ["https://github.com/Raza403/JavaScript/tree/master/AJAX%20Type%20Ahead", "https://github.com/Raza403/HTML-CSS-javaScript/tree/master/live-code-player", "https://github.com/Raza403/JavaScript/tree/master/JS%20and%20BS%20Clock", "https://github.com/Raza403/JavaScript/tree/master/CSS%20Variables", "https://github.com/Raza403/Front-end-Work/tree/master/weather-app", "https://github.com/Raza403/JavaScript/tree/master/JS-drum-kit", "https://github.com/Raza403/JavaScript/tree/master/Key%20Sequence%20Detection", "https://github.com/Raza403/JavaScript/tree/master/Hold%20Shift%20and%20Check%20Checkboxes", "https://github.com/Raza403/Front-end-Work/tree/master/random-quote-generator", "https://github.com/Raza403/JavaScript/tree/master/Flexbox-JS-image-gallery", "https://github.com/Raza403/JavaScript/tree/master/Fun%20with%20HTML5%20Canvas", "https://github.com/Raza403/Front-end-Work/tree/master/wikipedia-viewer", "https://github.com/Raza403/JavaScript/tree/master/Custom%20Video%20Player", "https://github.com/Raza403/Front-end-Work/tree/master/twitchAPI", "https://github.com/Raza403/Work-with-APIs/tree/master/google-maps-api-app", "https://github.com/Raza403/HTML-CSS-javaScript/tree/master/reactiontime-game", "https://github.com/Raza403/JavaScript/tree/master/Stripe%20Follow%20Along%20Nav", "https://github.com/Raza403/FCC-1st-project/tree/master/attribute-page"];

    const body = document.querySelector(".modal-body");
    body.innerHTML = `<h2>${captionH4[id]}</h2>
    <p class="item-intro">${subHeading[id]}<strong> Have a look at the <a href="${gitLinks[id]}" target="_blank" rel="noopener noreferrer"> Code
    <i class="fa fa-github"></i>
</a></strong></p>
    <img alt="${imgAlt[id]}" class="img-responsive" src="${imgSrc[id]}">
        <p><button class="btn btn-primary" type=button data-dismiss=modal> Close </button></p>`;
}
const imgSrc = ['./img/portfolio/ajax-typeAhead.png', './img/portfolio/CodePlayer.png', './img/portfolio/jsBSClock.png', './img/portfolio/CSSVariables.png', './img/portfolio/weather-app.png', './img/portfolio/JSdrumKit.png', './img/portfolio/konamiCode.png', './img/portfolio/holdShiftCheckboxes.png', './img/portfolio/randomQouteGenerator.png', './img/portfolio/flexJSImageGalerry.png', './img/portfolio/html5Canvas.png', './img/portfolio/Wikipedia-viewer.png', './img/portfolio/html5Video.png', './img/portfolio/twitchAPI.png', 'img/portfolio/gapi.png', './img/portfolio/reactionTimeGame.png', './img/portfolio/follow.png', './img/portfolio/AttributePage.png'];
const imgAlt = ['Image of type ahead project made by JS mainly', 'Image of live code player', 'Image of JavaScript and Bootstrap clock', 'Pic of CSS variable', 'Pic of local weather app', 'Image of JS drum kit', 'Pic of Konami code', 'Pic of hold shift checkBoxes', 'Pic of random quote generator', 'Image of JS flex image gallery', 'Pic of using HTML5 canvas', 'Pic of wikipedei viewer', 'Pic of custom HTML5 video player', 'Usage of twitch API', 'This image contains image of my website which uses…lopment, an example of full stack web development', 'Pic of reaction time game', 'Clone of follow along Navbar of stripe.com', 'Pic of attribute page to Abdul Sattar Edhi'];
const captionH4 = ['AJAX Type Ahead', 'Live Code Player', 'Bootstrap & JS Clock', 'JS & CSS Variables', 'Local Weather App', 'JavaScript & Bootstrap DrumKit', 'Konami Code using JavaScript', 'CheckBox selection by pressing shift key', 'Random Quote Generator and tweeting', 'JavaScript and Flex box image gallery', 'JavaScript & HTML5 Canvas', 'Search Wikipedia articles', 'Custom HTML5 Video player', 'Fetching Date from Twitch.tv API', 'Loation Based News Web', 'Reaction Time Game', 'Clone of follow along Navbar of stripe.com', 'FCC Attribute Page Project'];
// Adding Portfolio Item using JS
function addPortfolio() {
    const jsPortfolio = document.querySelector('.portfolio-add');
    const captionP = ['Fetch and show data in real time, Type ahead using JS', 'Live output of HTML,CSS and JS. Made using jQuery', 'Clock made by using JavaScript and Bootstrap', 'CSS variables varried using JavaScript', 'Local weather data fetched from API using jQuery', 'Drum kit plays sounds and CSS animation when keys pressed', 'Always looking for certain keys to be pressed in certain order, & then does certain task', 'Selecting all checkboxes between two points, using JavaScript', 'Random quotes are fetched from API and can be tweeted. Implemented in jQuery', 'JavaScript is used to handle click events and response accordingly', 'Used JavaScript to draw, change color & font-size in HTML5 Canvas', 'Search wikipedia articles from Wikipedia API using jQuery', 'Customize HTML5 Video player using JavaScript', 'Data Fetched from twitch API using twitch API, Bootstrap used for styling', 'Made using Google Maps API, implemented using Python,flask and SQLite etc', 'Reaction time game made using jQuery', 'Made follow along Navbar like stripe.com using JavaScript.', "Free Code Camp's first project, an attribute page to Abdul Sattar Edhi"];
    const html = [];
    for (let i = 0; i < captionH4.length; i++) {
        html.push(`<div class="col-md-4 portfolio-item">
                    <a id="${i}" href="#modal" class=portfolio-link data-toggle=modal>
                        <div class=portfolio-hover>
                            <div class=portfolio-hover-content>
                                <i class="fa fa-3x fa-plus"></i>
                            </div>
                        </div>
                        <img class="img-responsive" alt="${imgAlt[i]}" src="${imgSrc[i]}">
                    </a>
                    <div class="portfolio-caption scroll">
                        <h4>${captionH4[i]}</h4>
                        <p class="text-muted">${captionP[i]}</div>
                </div>`);
    }
    jsPortfolio.innerHTML = html.join('');
    const links = Array.from(document.querySelectorAll(".portfolio-link"));
    links.forEach((link) => link.addEventListener("click", handleLink));
}
window.addEventListener('load', addPortfolio);