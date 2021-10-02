// const arr = ['yesterday', 'hey, jude', `octopus's garden`]
$(() => {
    $.ajax({
        url:`https://pokeapi.co/api/v2/${searchType}/${searchWord}`
    }).then(
        (data) => {

            // console.log(arr);
            // console.log(arr[1]);
            console.log(data);
            console.log(data.name);

        },
        () => {
            console.log('bad request');
        }
    )
})
