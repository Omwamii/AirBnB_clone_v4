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

  // Function to fetch the API status and update the div
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

  // When the document is ready, fetch the API status
  fetchApiStatus();
});
