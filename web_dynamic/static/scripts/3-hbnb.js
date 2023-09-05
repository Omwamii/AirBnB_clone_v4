$(document).ready(function () {
  const amenities = [];

  $('.amenities input').on('change', function () {
    // Check if the checkbox is checked
    let amen_list = '';
    if ($(this).is(':checked')) {
      // Fetch the data-name attribute and store it in a variable
      const dataName = $(this).data('name');
      console.log(dataName);
      // check if amenity name is already in list
      if (amenities.indexOf(dataName) === -1) {
	      amenities.push(dataName);
      }
	    amen_list = amenities.join(', ');
    } else {
	    // if unchecked, delete name from amenities list
	    const uncheckedData = $(this).data('name');
	    console.log(uncheckedData);
	    const index = amenities.indexOf(uncheckedData);
	    if (index !== -1) {
		    amenities.splice(index, 1);
	    }
	    amen_list = amenities.join(', ');
    }
    // render the list to h4 element
    $('.amenities h4').text(amen_list);
  });

  function updateApiStatus (status) {
    const apiStatusDiv = $('#api_status');

    if (status === 'OK') {
      console.log('API status is ok');
      apiStatusDiv.addClass('available');
    } else {
      console.log('API is not live');
      apiStatusDiv.removeClass('available');
    }
  }

  // Function to fetch the API status
  function fetchApiStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status/')
      .done(function (data) {
        const status = data.status;
        updateApiStatus(status);
      })
      .fail(function (error) {
        console.error('Error fetching API status:', error);
      });
  }
  function createPlaceArticle (place) {
    const article = $('<article>');

    const titleBox = $('<div>').addClass('title_box');
    const title = $('<h2>').text(place.name);
    const price = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
    titleBox.append(title, price);

    const information = $('<div>').addClass('information');
    const maxGuests = $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
    const numberRooms = $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
    const numberBathrooms = $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
    information.append(maxGuests, numberRooms, numberBathrooms);

    const description = $('<div>').addClass('description').html(place.description);

    article.append(titleBox, information, description);

    return article;
  }

  // Function to fetch places
  function fetchPlaces () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      dataType: 'json',
      success: function (data) {
        const placesSection = $('section.places');
        placesSection.empty();

        if (data.length > 0) {
          data.forEach(function (place) {
            const article = createPlaceArticle(place);
            placesSection.append(article);
          });
        }
      },
      error: function (error) {
        console.error('Error fetching places:', error);
      }
    });
  }
  fetchPlaces();
  fetchApiStatus();
});
