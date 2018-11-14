const ipLookUp = function () {
    $.ajax('http://ip-api.com/json')
        .then(
            function success(response) {
                console.log('User\'s Location Data is ', response);
                console.log('User\'s Country', response.countryCode);
                let countryCode = response.countryCode;
                console.log(countryCode);
                let flagIcon = `<i class="za flag"></i>`
                $(flagIcon).prependTo('#countryCode');
            },

            function fail(data, status) {
                console.log('Request failed.  Returned status of',
                    status);
            }
        );
};

const test = function () {
    alert('test');
};