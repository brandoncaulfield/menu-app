## Things I did

-   Converted client application to TypeScript
-   Used the API as I don't know much about graphql (yet!)
-   set the user state as global context but the menu state as local component state
-   Added api endpoint builerplate for the resturuant to add meals to the menu but couldn't finish

## TO DO

-   Add api to add menu items
-   After saving menu choices for a diner and clicking save, data would be sent to an api endpoint and not stored in state because as as Dan Abramov said, form state is inherently ephemeral.
-   Many more tests, but I normally build each test as I finish a piece of funtionality.
-   Rules
    -   For the cheesecake stock I would normally fetch the stock data (which ideally would be available via the api) using react-query in a similar way to how I've done it in the OrderForm component. However as well as checkign the stock via the query I would also have an accompanying mutation (also using react-query) that would update the stock if any other diner had already chosen the last piece of cake. This approach uis why I love react-query because it's a great way to get a close (near real-time) connection to the api.
    -   For Pierre I would loop through the diners choices keys (meal names/ id's) and compare them to pierres choices of what NOT to order together. I would compare the keys of both objects and if both they both exist in Pierre's choice object I would return false.
-   Fix the ui test as I haven't configured babel properly to get the tests written in JavaScript to work with the Typescript files.
