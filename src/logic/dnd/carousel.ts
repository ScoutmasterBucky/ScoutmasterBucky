import { addScript } from '../add-script';
import type { OnLoadFn } from 'iles';

interface PlayerInfo {
    name: string;
    class: string;
    race: string;
    attributes: string;
    src: string;
    gender: string;
}

export const onLoad: OnLoadFn = (el, props, slots) => {
    addScript('/dnd/wc-carousel-lite.min.js');
    const players: PlayerInfo[] = [
        {
            name: 'Valentina Briggs',
            class: 'Paladin - Ancient',
            race: 'Half Wood Elf - Half Human',
            attributes: 'Loyal and Brave',
            src: '/dnd/briggs-f01.jpg',
            gender: 'female',
        },
        {
            name: 'Truman Briggs',
            class: 'Paladin - Ancient',
            race: 'Half Wood Elf - Half Human',
            attributes: 'Loyal and Brave',
            src: '/dnd/briggs-m01.jpg',
            gender: 'male',
        },
        {
            name: 'Sunny Bringlebang-Crosby',
            class: 'Wizard - School of Evocation',
            race: 'Forest Gnome',
            attributes: 'Courteous and Obedient',
            src: '/dnd/bringlebang-crosby-f01.jpg',
            gender: 'female',
        },
        {
            name: 'Curtis Bringlebang-Crosby',
            class: 'Wizard - School of Evocation',
            race: 'Forest Gnome',
            attributes: 'Courteous and Obedient',
            src: '/dnd/bringlebang-crosby-m01.jpg',
            gender: 'male',
        },
        {
            name: 'Prudence Gwynn',
            class: 'Ranger',
            race: 'High Elf',
            attributes: 'Helpful and Thrifty',
            src: '/dnd/gwynn-f02.jpg',
            gender: 'female',
        },
        {
            name: 'Cody Gwynn',
            class: 'Ranger',
            race: 'High Elf',
            attributes: 'Helpful and Thrifty',
            src: '/dnd/gwynn-m02.jpg',
            gender: 'male',
        },
        {
            name: 'Sherah Landis',
            class: 'Cleric - Life',
            race: 'Hill Dwarf',
            attributes: 'Cheerful and Reverent',
            src: '/dnd/landis-f02.jpg',
            gender: 'female',
        },
        {
            name: 'Mordecai Landis',
            class: 'Cleric - Life',
            race: 'Hill Dwarf',
            attributes: 'Cheerful and Reverent',
            src: '/dnd/landis-m02.jpg',
            gender: 'male',
        },
        {
            name: 'Dakotah Swanson',
            class: 'Rogue - Scout',
            race: 'Halfling',
            attributes: 'Trustworthy and Friendly',
            src: '/dnd/swanson-f01.jpg',
            gender: 'female',
        },
        {
            name: 'Eli Swanson',
            class: 'Rogue - Scout',
            race: 'Halfling',
            attributes: 'Trustworthy and Friendly',
            src: '/dnd/swanson-m01.jpg',
            gender: 'male',
        },
        {
            name: 'Sigrid Thurston',
            class: 'Fighter - Champion',
            race: 'Human',
            attributes: 'Kind and Clean',
            src: '/dnd/thurston-f02.jpg',
            gender: 'female',
        },
        {
            name: 'Umberto Thurston',
            class: 'Fighter - Champion',
            race: 'Human',
            attributes: 'Kind and Clean',
            src: '/dnd/thurston-m02.jpg',
            gender: 'male',
        },
    ];

    function shuffle(array: PlayerInfo[]) {
        const copy = [...array];
        const randomImages = [];

        while (copy.length) {
            const index = Math.floor(Math.random() * copy.length);
            randomImages.push(copy[index]);
            copy.splice(index, 1);
        }

        return randomImages;
    }

    function score(array: PlayerInfo[]) {
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

    let bestScore = players.length * 2;
    let bestRanked = [...players];

    for (let i = 0; i < 20; i += 1) {
        const randomPlayers = shuffle(players);
        const randomScore = score(randomPlayers);

        if (randomScore < bestScore) {
            bestScore = randomScore;
            bestRanked = randomPlayers;
        }
    }

    const carousel = document.createElement('wc-carousel-lite');
    // Setting the transistionDuration property does not work
    carousel.setAttribute('transition-duration', '1000');
    // When setting transitionDuration via an attribute, the interval needs to
    // set the same way.
    carousel.setAttribute('interval', '6000');
    (carousel as any).infinite = true;
    (carousel as any).autoplay = true;
    carousel.innerHTML = bestRanked
        .map(player => {
            return `<div class="item center" style="width: 300px">
<img src="${player.src}" width="200" />
<div class="kalam" style="font-size: 0.8em">${player.name}</div>
<div style="font-size: 0.6em">${player.class}</div>
<div style="font-size: 0.6em">${player.race}</div>
<div style="font-size: 0.6em">${player.attributes}</div>
</div>`;
        })
        .join('');
    const carouselContainer = document.createElement('div');
    carouselContainer.style.paddingBottom = '0.5em';
    carouselContainer.appendChild(carousel);
    el.appendChild(carouselContainer);
};
export default onLoad;
