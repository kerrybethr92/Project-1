const makeACard = (data) => {
    const cardProperties = {
        name: data.name,
        pic: data.sprites.front_default,
        type: data.types[0].type.name,
        abilities: getAbilities(data.abilities)
    }
    const $card = $('<div>').addClass('card')
    $card.append($('<h3>').text(cardProperties.name))
    $card.append($('<h4>').text(cardProperties.type))
    $card.append($('<img>').attr('src', cardProperties.pic))
    const $abilitiesUL = $('<ul>').text('ABILITIES')
    $card.append($abilitiesUL)
    for (let a = 0; a < cardProperties.abilities; a++) {
        $abilitiesUL.append($('<li>').text(cardProperties.abilities[a]))
    }
    $('.search-results').append($card)
}

const getAbilities = (arr) => {
    const abilitiesArr = []
    for (let a = 0; a < arr.length; a++) {
        abilitiesArr.push(arr[a].ability.name)
    }
    return abilitiesArr;
}

$(() => {
    // store search criteria in variables
    $('input[type="submit"]').on('click', (event) => {
        event.preventDefault();
        const searchTerm = $('input[type="text"]').val();
        const searchType = $(event.currentTarget).val();
        // console.log(`${searchTerm} ${searchType}`);

        // ajax to get data from api
        if (searchType === 'pokemon') {
            $.ajax({
                url: `https://pokeapi.co/api/v2/${searchType}/${searchTerm}`
            }).then((data) => {
                makeACard(data);
            })
        }
    })

    $('.card').on('click', (event) => {
        $('.myTeam').append(event.target)
    })
})


    // convert data to 'card' to be appended to search results

    // add button or event listener to each card, when clicked it moves to 'myTeam'
    // make sure it adds only 1 div, and not a div for every result from search.
