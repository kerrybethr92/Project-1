$(() => {
    let sizeOfTeam = -1;
    let currentIndex = 0;

    const makeACard = (data) => {
        const cardProperties = {
            name: data.name,
            pic: data.sprites.front_default,
            type: data.types[0].type.name,
            abilities: getAbilities(data.abilities)
        }
        // console.log(cardProperties.abilities);
        const $card = $('<div>').addClass('card')
        $card.append($('<h3>').text(cardProperties.name))
        $card.append($('<h4>').text(cardProperties.type))
        $card.append($('<img>').attr('src', cardProperties.pic))
        const $abilitiesUL = $('<ul>').text('ABILITIES')
        $card.append($abilitiesUL)
        for (let a = 0; a < cardProperties.abilities.length; a++) {
            $abilitiesUL.append($('<li>').text(cardProperties.abilities[a]))
        }
        const $newButton = $('<button>').text('Add to My Team').addClass('addToTeam')
        $card.append($newButton)
        $('.search-results').append($card)


        $newButton.on('click', (event) => {
            sizeOfTeam++
            console.log(sizeOfTeam);
            const $newTeamMember = $('<div>')
            $newTeamMember.append($(event.target).parent())
            $('.myTeam').append($newTeamMember)
            // $('.myTeam').append($(event.target).parent())

            $(event.target).remove();
        })
    }

    const makeList = (data) => {
        const results = []
        for (let i = 0; i < data.pokemon.length; i++) {
            results.push(data.pokemon[i].pokemon.name);
        }
        return results;
    }

    const getAbilities = (arr) => {
        const abilitiesArr = []
        for (let a = 0; a < arr.length; a++) {
            abilitiesArr.push(arr[a].ability.name)
        }
        return abilitiesArr;
    }

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
        } else if (searchType === 'type') {
            $.ajax({
                url: `https://pokeapi.co/api/v2/${searchType}/${searchTerm}`
            }).then((data) => {
                const resultsList = makeList(data)

            for (let p = 0; p < resultsList.length; p++) {
                let pokemonName = resultsList[p];
                $.ajax({
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
                }).then((data) => {
                    makeACard(data);
                })
                }
            })
        }

    })
    // let sizeOfTeam = $('myTeam').children().length - 1;
    // console.log(sizeOfTeam);
    $('#next').on('click', () => {
        $('.myTeam').children().eq(currentIndex).css('display', 'none')
        if (currentIndex < sizeOfTeam) {
            currentIndex++
        } else {
            currentIndex = 0
        }
        $('.myTeam').children().eq(currentIndex).css('display', 'flex')
    })

    $('#previous').on('click', () => {
        $('.myTeam').children().eq(currentIndex).css('display', 'none')
        if (currentIndex > 0) {
            currentIndex--
        } else {
            currentIndex = sizeOfTeam
        }
        $('.myTeam').children().eq(currentIndex).css('display', 'flex')
    })
})


// convert data to 'card' to be appended to search results

// add button or event listener to each card, when clicked it moves to 'myTeam'
// make sure it adds only 1 div, and not a div for every result from search.
