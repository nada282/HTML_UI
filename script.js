document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  var amountInput = document.getElementById('amount');
  var fromSelect = document.getElementById('from');
  var toSelect = document.getElementById('to');
  var convertBtn = document.getElementById('convert');
  var resultLabel = document.getElementById('result');
  var rateLabel = document.getElementById('rate');

  // Event listener for Convert button click
  convertBtn.addEventListener('click', function() {
    var amount = parseFloat(amountInput.value);
    var fromCurrency = fromSelect.value;
    var toCurrency = toSelect.value;
    var fromSelectedData = fromSelect.options[fromSelect.selectedIndex].text;
    var toSelectedData = toSelect.options[toSelect.selectedIndex].text;

    // Check if all fields are filled and amount is valid
    if (amount >= 0 && fromCurrency && toCurrency) {
      // Perform API request to get conversion rate
      var apiUrl = 'https://v6.exchangerate-api.com/v6/8814c1712af4e89412c13977/pair/' + fromCurrency + '/' + toCurrency;

      fetch(apiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Check if API request was successful
          if (data.result === 'success') {
            var rate = data.conversion_rate;
            var convertedAmount = amount * rate;

            // Display result and rate
            resultLabel.textContent = convertedAmount.toFixed(2);
            rateLabel.textContent = rate.toFixed(2);

            // Display selected data
            console.log('From: ' + fromSelectedData);
            console.log('To: ' + toSelectedData);
          } else {
            resultLabel.textContent = 'Error: Unable to retrieve conversion rate';
            rateLabel.textContent = '';
          }
        })
        .catch(function(error) {
          console.log(error);
          resultLabel.textContent = 'Error: Unable to retrieve conversion rate';
          rateLabel.textContent = '';
        });
    } else {
      resultLabel.textContent = 'Please enter a valid amount and fill all fields';
      rateLabel.textContent = '';
    }
  });


  // Load currency options from predefined list
  var currencies = ['USD', 'JOD', 'ILS', 'AED', 'CNY', 'EGP', 'EUR', 'GBP', 'RUB', 'SAR'];

  // Populate From and To currency select options
  currencies.forEach(function(currency) {
    var option1 = document.createElement('option');
    option1.value = currency;
    option1.text = currency;
    fromSelect.appendChild(option1);

    var option2 = document.createElement('option');
    option2.value = currency;
    option2.text = currency;
    toSelect.appendChild(option2);
  });

  // Set default selected options
  fromSelect.selectedIndex = 0;
  toSelect.selectedIndex = 0;
});
