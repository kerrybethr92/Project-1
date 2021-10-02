
let searchType = ''
let searchWord = ''



$(() => {

    $('input[type="submit"]').on('click', (event) => {
        event.preventDefault();
        searchType = $(event.currentTarget).val()
        if ($('input[type="text"]').val()) {
            searchWord = $('input[type="text"]').val();
        } else {
            alert("Please enter a name or type to search.")
        }
        // console.log(searchType + searchWord);
    })

    // $.ajax({
    //     url:`https://pokeapi.co/api/v2/${searchType}/${searchWord}`
    // }).then(
    //     (data) => {
    //
    //         console.log(data);
    //         console.log(data.name);
    //
    //     },
    //     () => {
    //         console.log('bad request');
    //     }
    // )
})
