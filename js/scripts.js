var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');
$('#search').click(searchCountries);
$('#country_name').keypress(function(e) {
    if(e.keyCode==13){
        searchCountries();
    }
});

function searchCountries() {
 	var countryName = $('#country_name').val();
	if(!countryName.length) {
		countryName = 'Poland';
	}

$.ajax({
  		url: url + countryName,
  		method: 'GET',
  		success: showCountriesList
  	});
}

function numberFormat(population) {
	if (population > 999999) {
		return (population/1000000).toFixed(2) + ' M';
	}
	if (population > 999) {
		return (population/1000).toFixed(2) + ' K';
	}
}

function showCountriesList(resp) {
  	countriesList.empty();
	resp.forEach(function(item){
	  $('<div class="country">').appendTo(countriesList)
		.append($('<p class="country_name">').text(item.name))
		.append($('<img>').attr('src', "http://www.geognos.com/api/en/countries/flag/" + item.alpha2Code + ".png"))
		.append($('<p class="country_property">').text('Capital: '))
		.append($('<p>').addClass('country_value').text(item.capital))
		.append($('<p class="country_property">').text('Population: '))
		.append($('<p>').addClass('country_value').text(numberFormat(item.population)))
		.append($('<p class="country_property">').text('Native name: '))
		.append($('<p>').addClass('country_value').text(item.nativeName))
		.append($('<p class="country_property">').text('Currencies: '))
		.append($('<p>').addClass('country_value').text(item.currencies));
	});
}