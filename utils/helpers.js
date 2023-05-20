module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

    // Source:
  // https://stackoverflow.com/questions/10377700/limit-results-of-each-in-handlebars-js
  limit: function (arr, max, options) {

    // Validating to make sure an array exists first before doing anything. 
    if (!arr || arr.length == 0)
      return options.inverse(this);

      // If an array does exist, then we create an empty array to store our values
    var result = [];

    // Creating a for loop to iterate to what we define in the handlebars.js view
    for (var i = 0; i < max && i < arr.length; ++i)

      // each iteration - we are calling the options.fn function - which generates the template code for the element in that current index, and then pushes it to the results array
      result.push(options.fn(arr[i]));

      // using .join('') to concatenate all the HTML templates into a single string so that it can be inserted into the DOM
      // .join('') is just returning an array as a string so that we can put it into the HTML
    return result.join('');

  }
};

