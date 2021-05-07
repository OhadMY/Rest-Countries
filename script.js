// Get selected country information based on input value
$(`form`).on("submit", (e) => {
  e.preventDefault();
  // Clear current table info
  $(`.added`).remove();
  let inputValue = $(`#search`).val();
  // Send request to API and insert needed info for the selected country
  $.get(
    `https://restcountries.eu/rest/v2/name/${inputValue}?fields=name;topLevelDomain;capital;currencies;flag;borders
  `,
    (cities) => {
      for (const city of cities) {
        $(displayCountries(city)).insertAfter(".permanent");
      }
    }
  );
  $(`#search`).val("");
});

// Get all countries information after click
$(`#allCountries`).on("click", (e) => {
  // Clear current table info
  $(`.added`).remove();
  // Send request to API and insert needed info for all countries
  $.get(
    `https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag;borders`,
    (cities) => {
      for (const city of cities) {
        $(`table`).append(displayCountries(city));
      }
    }
  );
  $(`#search`).val("");
});

// Return all the information needed to be seen on screen when being called
function displayCountries(city) {
  return `
    <tr class="added">
    <td>${city.name}</td>
    <td>${city.capital ? city.capital : "No Info"}</td>
    <td><img src="${city.flag}"></td>
    <td>${displayAllCurrencies(city)}</td>
    <td>${city.topLevelDomain}</td>
    <td>${city.borders.length ? city.borders : "No Info"}</td>
  </tr>`;
}

// Check how many currencies exist for each country, checks the intactness of the data and returns a string of currencies
function displayAllCurrencies(city) {
  console.log(city.currencies);
  let currencies = "";
  for (const currency of city.currencies) {
    //   Checks if there is no info, if not prints nothing to screen
    if (
      (currency.code == "(none)" || currency.code == null) &&
      currency.name == null &&
      currency.symbol == null
    )
      console.log("No Info");
    //   Checks if code and name has no info, if not prints nothing to screen because only symbol is available
    else if (
      (currency.code == "(none)" || currency.code == null) &&
      currency.name == null
    )
      console.log("Only symbol available");
    //   Checks if symbol has no info, if not prints "No Symbol"
    else if (currency.symbol == null)
      currencies +=
        currency.code + "," + currency.name + ", No Symbol" + "<br>";
    // Checks if code has no info, if not prints only Symbol and Name
    else if (currency.code == "(none)" || currency.code == null)
      currencies += currency.name + "," + currency.symbol + "<br>";
    // Checks if name has no info, if not prints only Symbol and Code
    else if (currency.name == null)
      currencies += currency.code + "," + currency.symbol + "<br>";
    else
      currencies +=
        currency.code + "," + currency.name + "," + currency.symbol + "<br>";
  }
  return currencies;
}
