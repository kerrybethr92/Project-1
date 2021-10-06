pokemon team readme

After confirming the API I chose had the information I needed, I made a page with a form for the user to enter the information they want to search for and divs to display the search results and the selected pokemon.

When the user clicks either name or type, the program retrieves data from the API by substituting the value entered by the user and the value of the submit.

If the submit "type" is selected, the program goes to the API page with a list of all pokemon of that type, then cycles through all of those, retrieving the individual page for each pokemon.

This information is then processed and the relevant pieces of data are stored in a div (class="card"), which are added to the div "search-results".

When the user clicks the button on the "card" div, the card is moved over to the carousel div "myTeam" where the user can navigate left and right through the items they've selected.
