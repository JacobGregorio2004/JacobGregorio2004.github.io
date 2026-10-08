fetch("js/boardingData.json")
    .then(function(response) {
        let dataPromise = response.json();
        return dataPromise;
    })
    .then(function(data) {
        console.log(data);
        document.querySelector("title").textContent = data.title;
        document.querySelector("#styleName").textContent = data.header;
        document.querySelector("#heroTitle").textContent = data.hero.headline;
        document.querySelector("#heroDesc").textContent = data.hero.description;
        document.querySelector(".hero").style.setProperty("--hero-img", `url("${data.hero.image}")`);
        document.querySelector("#sec1Title").textContent = data.sections.overview.title;
        document.querySelector("#sec1Subtitle").textContent = data.sections.overview.subtitle;
        let subheadings = document.querySelectorAll("h3");
        let paragraphs = document.querySelectorAll("p");
        subheadings[0].textContent = data.sections.overview.cards[0].title;
        paragraphs[2].textContent = data.sections.overview.cards[0].description;
        subheadings[1].textContent = data.sections.overview.cards[1].title;
        paragraphs[3].textContent = data.sections.overview.cards[1].description;
        subheadings[2].textContent = data.sections.overview.cards[2].title;
        paragraphs[4].textContent = data.sections.overview.cards[2].description;
        document.querySelector("#sec2Title").textContent = data.sections.equipment.title;
        document.querySelector("#sec2Subtitle").textContent = data.sections.equipment.subtitle;
        subheadings[3].textContent = data.sections.equipment.cards[0].title;
        paragraphs[6].textContent = data.sections.equipment.cards[0].description;
        subheadings[4].textContent = data.sections.equipment.cards[1].title;
        paragraphs[7].textContent = data.sections.equipment.cards[1].description;
        subheadings[5].textContent = data.sections.equipment.cards[2].title;
        paragraphs[8].textContent = data.sections.equipment.cards[2].description;
    })
    .catch(function(err){
        console.error(err);
    });
