let cardsArray = [
    {
        'name': 'KOHLI',
        'img': 'https://imgs.search.brave.com/ygVDCCeyVoveSgmtujtx6c8d0nUitOSrYDmDkq4xf-g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZ3FpbmRpYS5j/b20vcGhvdG9zLzY1/NjcxY2FlNzczODQ0/YTE5Yzg5YzNmZC8x/OjEvcGFzcy91bmRl/ZmluZWQ',
    },
    {
        'name': 'PANT',
        'img': 'https://imgs.search.brave.com/xWsoKa99ZONZoOwxV6rwe5z7Qh-bqAEyZLnUXWxAcu4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvaW5k/aWFuLWNyaWNrZXQt/cmlzaGFiaC1wYW50/LTVtdHJ0dWZpdWQ4/MXNpbmwuanBn',
    },
    {
        'name': 'ROHIT',
        'img': 'https://imgs.search.brave.com/RYf5mEXAdnDCXzTF00AOA0lEhxBzTBTkw6wZe0uWdu0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtd2VicC5raGVs/bm93LmNvbS9kNzI5/M2RlMmZhOTNiMjk1/MjhkYTIxNDI1M2Yx/ZDhkMC9uZXdzL3Vw/bG9hZHMvMjAyMy8x/MC9JbmRpYW4tY2Fw/dGFpbi1Sb2hpdC1T/aGFybWEtaW4tSUND/LUNyaWNrZXQtV29y/bGQtQ3VwLTIwMjMu/anBnLndlYnA',
    },
    {
        'name': 'BUMRAH',
        'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe55lO0MQ6SAXDXBygeCA-BPb0S9A_y-epDssxmZWVjplFq5rQ2kD_M65gqewvZo9L74&usqp=CAU',
    },
    {
        'name': 'SIRAJ',
        'img': 'https://assets.gqindia.com/photos/65264ff9fee7ce43edda07d9/master/w_1600%2Cc_limit/Muhammad-Siraj.jpg',
    },
    {
        'name': 'GILL',
        'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAaB-0Z8ntY3ERGac_PXQTiHqqA2vEACBIbg&usqp=CAU',
    }
];

const parentDiv = document.querySelector('#card-section');
let clickCount = 0;
let firstCard = "";
let secondCard = "";

// const card_matches = () => {
//     let card_selected = document.querySelectorAll('.card-selected');

//     card_selected.forEach((curElem) => {
//         curElem.classList.add('card-match');
//     });
// }

const card_matches = () => {
    let card_selected = document.querySelectorAll('.card-selected');

    if (card_selected.length === 2) {
        if (card_selected[0].dataset.name === card_selected[1].dataset.name) {
            setTimeout(() => {
                card_selected.forEach((curElem) => {
                    curElem.classList.add('card-match');
                    curElem.removeEventListener('click', clickHandler);
                });
            }, 1000); // Adjust the delay as needed
        } else {
            setTimeout(() => {
                card_selected.forEach((curElem) => {
                    curElem.classList.remove('card-selected');
                });
            }, 1000); // Adjust the delay as needed
        }
    }
}

const resetGame = () => {
    firstCard = "";
    secondCard = "";
    clickCount = 0;

    let card_selected = document.querySelectorAll('.card-selected');

    card_selected.forEach((curElem) => {
        curElem.classList.remove('card-selected');
    });
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const shuffledChild = shuffleArray([...cardsArray, ...cardsArray]);

for (let i = 0; i < shuffledChild.length; i++) {
    const childDiv = document.createElement('div');
    childDiv.classList.add('card');
    childDiv.dataset.name = shuffledChild[i].name;

    childDiv.addEventListener('click', () => {
        if (clickCount < 2 && !childDiv.classList.contains('card-selected')) {
            clickCount++;

            if (clickCount === 1) {
                firstCard = childDiv.dataset.name;
            } else {
                secondCard = childDiv.dataset.name;
            }

            childDiv.classList.add('card-selected');

            if (firstCard !== "" && secondCard !== "") {
                if (firstCard === secondCard) {
                    setTimeout(() => {
                        card_matches();
                        resetGame();
                    }, 1000);
                } else {
                    setTimeout(() => {
                        resetGame();
                    }, 1000);
                }
            }
        }
    });

    const front_div = document.createElement('div');
    front_div.classList.add('front-card');

    const back_div = document.createElement('div');
    back_div.classList.add('back-card');
    back_div.style.backgroundImage = `url(${shuffledChild[i].img})`;

    parentDiv.appendChild(childDiv);
    childDiv.appendChild(front_div);
    childDiv.appendChild(back_div);
}
