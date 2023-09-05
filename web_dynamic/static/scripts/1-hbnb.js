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
});
