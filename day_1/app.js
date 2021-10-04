
let searchType = ''
let searchWord = ''
let sizeOfTeam = 0

const getAbilities = (arr) => {
    const abilitiesArray = []
    for (let i = 0; i < arr.length; i++) {
        abilitiesArray.push(arr[i].ability.name)
    }
    return abilitiesArray;
}

const searchByName = (data) => {
    const result = {
        name: data.name,
        pic: data.sprites.front_default,
        type: data.types[0].type.name, //what if it has more than one type?
        abilities: getAbilities(data.abilities)
    }
    // console.log(result.abilities);
    // console.log(result);
    const $searchResultDiv = $('<div>').addClass('card').addClass('addToTeam')
    $searchResultDiv.append($('<h3>').text(result.name))
    $searchResultDiv.append($('<img>').attr('src', result.pic)) // add alt text here
    $searchResultDiv.append($('<h4>').text(`type: ${result.type}`))
    const $abilitiesUl = $('<ul>').text('abilities')
    $searchResultDiv.append($abilitiesUl)
    for (let a = 0; a < result.abilities.length; a++) {
        const $abilitiesLi = $('<li>').text(result.abilities[a])
        $abilitiesUl.append($abilitiesLi)
    }
    $('.search-results').append($searchResultDiv)
    // console.log(sizeOfTeam);
    $('.card').on('click', (e) => {
        const $choice = $(e.currentTarget)
        // const $teamMember = $('<div>').append($choice)
        $('.myTeam').append($choice)
        sizeOfTeam++
        $choice.toggleClass('addToTeam')
        $choice.toggleClass('removeFromTeam')
        console.log(sizeOfTeam);
        $('.removeFromTeam').on('click', (ev) => {
            $(ev.currentTarget).remove()
        })
    })

}


const searchByType = (data) => {
    const resultsByType = data.pokemon;
    for (let p = 0; p < resultsByType.length; p++) {
        $.ajax({
            url: resultsByType[p].pokemon.url
        }).then(
            (data) => {
                searchByName(data)
            },
            () => {
                console.log('bad request');
            }
        )
    }
}

const carouselForward = (event) => {

    $('.myTeam').children().eq(currentPokemonIndex).css('display', 'none');

    if (currentPokemonIndex < sizeOfTeam) {
        currentPokemonIndex++
    } else {
        currentPokemonIndex = 0
    }
    $('.myTeam').children().eq(currentPokemonIndex).css('display', 'flex')
}

const carouselBackward = (event) => {
    let currentPokemonIndex = 0;
    let sizeOfTeam = $('.myTeam').children().length - 1
    $('.myTeam').children().eq(currentPokemonIndex).css('display', 'none');

    if (currentPokemonIndex > 0) {
        currentPokemonIndex--
    } else {
        currentPokemonIndex = sizeOfTeam
    }
    $('.myTeam').children().eq(currentPokemonIndex).css('display', 'flex')
}

$(() => {

    $('input[type="submit"]').on('click', (event) => { // revisit w03d02 DOM INPUT to see if this form can be better
        event.preventDefault();
        $('.search-results').empty()
        searchType = $(event.currentTarget).val();
        // console.log(searchType);
        if ($('input[type="text"]').val()) {
            searchWord = $('input[type="text"]').val();
        } else {
            alert("Please enter a name or type to search.")
        }
        // console.log(searchType + searchWord);
        // $(event.target).trigger('reset')
        if (searchType === 'name') {
            $.ajax({
                url:`https://pokeapi.co/api/v2/pokemon/${searchWord}`
            }).then(
                (data) => {
                    searchByName(data)
                },
                () => {
                    console.log('bad request');
                }
            )
        } else if (searchType === 'type') {
            $.ajax({
                url:`https://pokeapi.co/api/v2/${searchType}/${searchWord}`
            }).then(
                (data) => {
                    searchByType(data);
                },
                () => {
                    console.log('bad request');
                }
            )
        }
    })

    // let currentPokemonIndex = 0;


    // $('.next').on('click', (event) => {
    //     carouselForward(event)
    // })
    //
    // $('.previous').on('click', (event) => {
    //     carouselBackward(event)
    // })


})
