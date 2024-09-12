window.addEventListener("load", () => {
    const images = [
        {
            name: "Valentina Briggs",
            class: "Paladin - Ancient",
            race: "Half Wood Elf - Half Human",
            attributes: "Loyal and Brave",
            url: "players/briggs-f01.jpg",
            gender: "female"
        },
        {
            name: "Truman Briggs",
            class: "Paladin - Ancient",
            race: "Half Wood Elf - Half Human",
            attributes: "Loyal and Brave",
            url: "players/briggs-m01.jpg",
            gender: "male"
        },
        {
            name: "Sunny Bringlebang-Crosby",
            class: "Wizard - School of Evocation",
            race: "Forest Gnome",
            attributes: "Courteous and Obedient",
            url: "players/bringlebang-crosby-f01.jpg",
            gender: "female"
        },
        {
            name: "Curtis Bringlebang-Crosby",
            class: "Wizard - School of Evocation",
            race: "Forest Gnome",
            attributes: "Courteous and Obedient",
            url: "players/bringlebang-crosby-m01.jpg",
            gender: "male"
        },
        {
            name: "Prudence Gwynn",
            class: "Ranger",
            race: "High Elf",
            attributes: "Helpful and Thrifty",
            url: "players/gwynn-f02.jpg",
            gender: "female"
        },
        {
            name: "Cody Gwynn",
            class: "Ranger",
            race: "High Elf",
            attributes: "Helpful and Thrifty",
            url: "players/gwynn-m02.jpg",
            gender: "male"
        },
        {
            name: "Sherah Landis",
            class: "Cleric - Life",
            race: "Hill Dwarf",
            attributes: "Cheerful and Reverent",
            url: "players/landis-f02.jpg",
            gender: "female"
        },
        {
            name: "Mordecai Landis",
            class: "Cleric - Life",
            race: "Hill Dwarf",
            attributes: "Cheerful and Reverent",
            url: "players/landis-m02.jpg",
            gender: "male"
        },
        {
            name: "Dakotah Swanson",
            class: "Rogue - Scout",
            race: "Halfling",
            attributes: "Trustworthy and Friendly",
            url: "players/swanson-f01.jpg",
            gender: "female"
        },
        {
            name: "Eli Swanson",
            class: "Rogue - Scout",
            race: "Halfling",
            attributes: "Trustworthy and Friendly",
            url: "players/swanson-m01.jpg",
            gender: "male"
        },
        {
            name: "Sigrid Thurston",
            class: "Fighter - Champion",
            race: "Human",
            attributes: "Kind and Clean",
            url: "players/thurston-f02.jpg",
            gender: "female"
        },
        {
            name: "Umberto Thurston",
            class: "Fighter - Champion",
            race: "Human",
            attributes: "Kind and Clean",
            url: "players/thurston-m02.jpg",
            gender: "male"
        }
    ];

    function shuffle(array) {
        const copy = [...array];
        const randomImages = [];

        while (copy.length) {
            const index = Math.floor(Math.random() * copy.length);
            randomImages.push(copy[index]);
            copy.splice(index, 1);
        }

        return randomImages;
    }

    function score(array) {
        let score = 0;

        for (let i = 0; i < array.length; i += 1) {
            const a = array[i ? i - 1 : array.length - 1];
            const b = array[i];

            if (a.class === b.class) {
                score += 1;
            }

            if (a.gender === b.gender) {
                score += 0.25;
            }
        }

        return score;
    }

    let bestScore = images.length * 2;
    let bestImages = [...images];

    for (let i = 0; i < 20; i += 1) {
        const randomImages = shuffle(images);
        const randomScore = score(randomImages);

        if (randomScore < bestScore) {
            bestScore = randomScore;
            bestImages = randomImages;
        }
    }

    const carousel = document.createElement("wc-carousel-lite");
    // Setting the transistionDuration property does not work
    carousel.setAttribute("transition-duration", "1000");
    // When setting transitionDuration via an attribute, the interval needs to
    // set the same way.
    carousel.setAttribute("interval", 6000);
    carousel.infinite = true;
    carousel.autoplay = true;
    carousel.innerHTML = bestImages
        .map((image) => {
            return `<div class="item W(300px) D(f) Fxd(c) Jc(c) Ai(c)">
<img src="${image.url}" width="200" />
<div class="kalam Fz(0.8em)">${image.name}</div>
<div class="Fz(0.6em)">${image.class}</div>
<div class="Fz(0.6em)">${image.race}</div>
<div class="Fz(0.6em)">${image.attributes}</div>
</div>`;
        })
        .join("");
    document.getElementById("carousel").appendChild(carousel);
});
