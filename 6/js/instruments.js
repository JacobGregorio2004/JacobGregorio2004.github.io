//function that changes the page title and subheading
function changePageHeadings(title, subheading) {
    document.querySelector("#pageTitle").textContent = title;
    document.querySelector("#pageSubheading").textContent = subheading;

    document.querySelector("#pageSubheading").classList.remove("pronunciation");
}

//function that handles image elements so other functions can use it
function createInstrumentImage(imagePath, imageClass, altText) {
    const IMAGE = document.createElement("img");
    IMAGE.src = imagePath;
    IMAGE.className = imageClass;
    IMAGE.alt = altText;
    return IMAGE;
}

//function in order to display the instrument description data
function displayInstrumentDescription(instrument, INSTRUMENT_CHOICES) {
    const DESCRIPTION_HEADING = document.createElement("h2");
    DESCRIPTION_HEADING.textContent = "Description:";
    DESCRIPTION_HEADING.className = "subheading-format";
    INSTRUMENT_CHOICES.appendChild(DESCRIPTION_HEADING);

    const DESCRIPTION = document.createElement("p");
    DESCRIPTION.textContent = instrument.description;
    DESCRIPTION.className = "paragraph-box";
    INSTRUMENT_CHOICES.appendChild(DESCRIPTION);
}

//function in order to display the instrument "how to play" information
function displayInstrumentHowToPlay(instrument, INSTRUMENT_CHOICES){
    const HOWTOPLAY_HEADING = document.createElement("h2");
    HOWTOPLAY_HEADING.textContent = "How to play the " + instrument.howToPlayHeader + ":";
    HOWTOPLAY_HEADING.className = "subheading-format";
    INSTRUMENT_CHOICES.appendChild(HOWTOPLAY_HEADING);

    const HOWTOPLAY = document.createElement("p");
    HOWTOPLAY.textContent = instrument.howToPlay;
    HOWTOPLAY.className = "paragraph-box";
    INSTRUMENT_CHOICES.appendChild(HOWTOPLAY);
}

//function that displays the actual instrument details
function displayInstrumentDetails(instrument) {
    const INSTRUMENT_CHOICES = document.querySelector("#instrumentChoices");
    INSTRUMENT_CHOICES.innerHTML = "";
    INSTRUMENT_CHOICES.classList.add("instrument-details");

    changePageHeadings(instrument.title, instrument.pronunciation);
    document.querySelector("#pageSubheading").classList.add("pronunciation");

    displayInstrumentDescription(instrument, INSTRUMENT_CHOICES);

    const DESCRIPTION_IMAGE = createInstrumentImage(instrument.descriptionImage, "img-instrument-pages", instrument.title);
    INSTRUMENT_CHOICES.appendChild(DESCRIPTION_IMAGE);

    displayInstrumentHowToPlay(instrument, INSTRUMENT_CHOICES);

    const HOWTOPLAY_IMAGE = createInstrumentImage(instrument.howToPlayImage, "img-instrument-pages", instrument.title);
    INSTRUMENT_CHOICES.appendChild(HOWTOPLAY_IMAGE);

    const BACK_BUTTON = document.querySelector("#backButton");
    BACK_BUTTON.dataset.level = "instrument";
}

//function that displays the instruments belonging to the type selected.
function displayInstruments(selectedType) {
    const INSTRUMENT_CHOICES = document.querySelector("#instrumentChoices");
    INSTRUMENT_CHOICES.innerHTML = "";
    INSTRUMENT_CHOICES.classList.remove("instrument-details");
    const INSTRUMENTS = selectedType.instruments;
    for (const INSTRUMENT_NAME in INSTRUMENTS){
        const INSTRUMENT = INSTRUMENTS[INSTRUMENT_NAME];

        const BUTTON = document.createElement("button");
        BUTTON.type = "button";
        BUTTON.className = "instrument-option";

        const IMAGE = document.createElement("img");
        IMAGE.src = INSTRUMENT.cardImage;
        IMAGE.className = "img-standard";
        IMAGE.alt = INSTRUMENT.title;

        const HEADING = document.createElement("h2");
        HEADING.textContent = INSTRUMENT.title;
        HEADING.className = "text-link-format";

        BUTTON.appendChild(IMAGE);
        BUTTON.appendChild(HEADING);

        BUTTON.addEventListener("click", function() {
            displayInstrumentDetails(INSTRUMENT);
        });

        INSTRUMENT_CHOICES.appendChild(BUTTON);
    }
}

//function that handles selecting an instrument type
function selectInstrumentType(typeName, data) {
    const SELECTED_TYPE = data.types[typeName];
    changePageHeadings(SELECTED_TYPE.title, SELECTED_TYPE.subheading);

    displayInstruments(SELECTED_TYPE);

    const BACK_BUTTON = document.querySelector("#backButton");
    BACK_BUTTON.hidden = false;
    BACK_BUTTON.dataset.level = "family";
    BACK_BUTTON.dataset.family = typeName;
}

//function in order to go back
function backButton(data){
    const BACK_BUTTON = document.querySelector("#backButton");

    BACK_BUTTON.addEventListener("click", function() {
        if(BACK_BUTTON.dataset.level === "instrument") {
            selectInstrumentType(BACK_BUTTON.dataset.family, data);
        }
        else if(BACK_BUTTON.dataset.level === "family") {
            location.reload();
        }
    });
}

fetch("js/instruments.json")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Failed to load instrument data.");
        }

        return response.json();
    })
    .then(function(data) {
        changePageHeadings(data.title, data.subheading);

        backButton(data);

        const TYPE_BUTTONS = document.querySelectorAll('[data-family]');
        TYPE_BUTTONS.forEach(function(button) {
            button.addEventListener("click", function() {
                const TYPE_NAME = button.dataset.family;
                selectInstrumentType(TYPE_NAME, data);
            });
        });
        
        document.querySelector("#loadingMessage").hidden = true;
    })
    .catch(function(err){
        const ERROR_MESSAGE = document.createElement("p");
        ERROR_MESSAGE.textContent = "Unable to load instrument information. Please refresh the page.";

        document.querySelector("#instrumentChoices").replaceChildren(ERROR_MESSAGE);
        document.querySelector("#loadingMessage").hidden = true;
    });
