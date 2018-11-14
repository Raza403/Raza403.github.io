"use strict";

// Assigning variables to credit card divs
var visaelem = document.getElementById("cc-visa");
var masterelem = document.getElementById("cc-master");
var discoverelem = document.getElementById("cc-discover");
var amexelem = document.getElementById("cc-amex");
var dinerselem = document.getElementById("cc-diners");
var jcbelem = document.getElementById("cc-jcb");

new Cleave('.input-0', {
  creditCard: true,
  onCreditCardTypeChanged: function onCreditCardTypeChanged(type) {
    visaelem.style.opacity = "0.3";
    masterelem.style.opacity = "0.3";
    discoverelem.style.opacity = "0.3";
    amexelem.style.opacity = "0.3";
    dinerselem.style.opacity = "0.3";
    jcbelem.style.opacity = "0.3";
    if (type == "visa") {
      visaelem.style.opacity = "1";
    } else if (type == "master") {
      masterelem.style.opacity = "1";
    } else if (type == "discover") {
      discoverelem.style.opacity = "1";
    } else if (type == "amex") {
      amexelem.style.opacity = "1";
    } else if (type == "diners") {
      dinerselem.style.opacity = "1";
    } else if (type == "jcb") {
      jcbelem.style.opacity = "1";
    }
  }
});
// Below is luhn's algorithm for checking validity of credit card number
function checkLuhn(input) {
  var sum = 0;
  var numdigits = input.length;
  var parity = numdigits % 2;
  for (var i = 0; i < numdigits; i++) {
    var digit = parseInt(input.charAt(i));
    if (i % 2 == parity) digit *= 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  return sum % 10 == 0;
};

$('input#cc-number').keyup(function () {
  var val = this.value.replace(/[^0-9]/g, '');
  if (val.length > 12) {
   var luhnCheck = checkLuhn(val);
    if (!luhnCheck) {
      document.getElementById("cc-number").classList.add("invalid");
      document.getElementById("cc-number").classList.remove("valid");
      document.getElementById("cc-invalid").innerHTML = "This card number either incomplete or invalid";
    } else {
      document.getElementById("cc-number").classList.remove("invalid");
      document.getElementById("cc-number").classList.add("valid");
      document.getElementById("cc-invalid").innerHTML = "";
    }
  }
});

// Hides billing div initially when document is loaded
$(document).ready(function () {
  $('.billing-info').css('display', 'none');
});
// Autocomplete Init for company names
// William have to add companies here
$(document).ready(function () {
  $('input.autocomplete').autocomplete({
    data: {
      "Apple": null,
      "Microsoft": null,
      "Google": null,
      "goog": null
    },
    // For triggering google analytics events
    onAutocomplete: function onAutocomplete() {
      sendItem();
    },
    limit: 20 // The max amount of results that can be shown at once. Default: Infinity.
  });
});

// Dropdown Init
$(document).ready(function () {
  $('select').formSelect();
});

// Changing display from none to block if billing address is not same as shipping address.
var billingChecked = true;
$('.billing-address').click(function () {
  if (this.checked) {
    $('.billing-info').css('display', 'none');
  } else {
    $('.billing-info').css('display', 'block');
  }
});

// Code below is used to check and suggest any errors in user's email address.
var $email = $('#email');
var $hint = $("#hint");
$email.on('blur', function () {
  $hint.css('display', 'none'); // Hide the hint
  $(this).mailcheck({
    suggested: function suggested(element, suggestion) {
      if (!$hint.html()) {
        // First error - fill in/show entire hint element
        var suggestion = "Did you mean <span class='suggestion'>" + "<span class='address'>" + suggestion.address + "</span>" + "@<a href='#' class='domain' style='font-weight:bold;text-decoration:underline;'>" + suggestion.domain + "</a></span>?";

        $hint.html(suggestion).fadeIn(150);
      } else {
        // Subsequent errors
        $(".address").html(suggestion.address);
        $(".domain").html(suggestion.domain);
      }
    }
  });
});

// Code below will put suggested email domain to email field on click
$hint.on('click', '.domain', function () {
  // On click, fill in the field with the suggestion and remove the hint
  $email.val($(".suggestion").text());
  $hint.fadeOut(200, function () {
    $(this).empty();
  });
  return false;
});

// Code below will validate user input, in case invalid will make
// border bottom color red to indicate error
function startValidation() {
  var elements = Array.from($("#form").find(".validate"));
  elements.map(function (element) {
    if (!element.value) {
      element.classList.add("invalid");
      // Special code for HTML "select" element, as it needs class of parent to be changed
      if (element.classList.contains("select")) {
        element.parentElement.classList.add("invalid");
      }
    }
  });
  // We made anothe loop here on elements array because we want to break
  // our loop at the first event of empty field found which is not possible in .map method
  // Function below creats google analytics event in the case when submit failed due to required fields not filled
  for (var i = 0; i < elements.length; i++) {
    if (!elements[i].value) {
      gtag('event', 'checkout_progress', {
        'event_label': 'Submit failed due to required fields not filled',
        'event_category': 'ecommerce'
      });
      break;
    }
  }
}
// Code below is used for auto suggesting popular email domains, this works by adding datalist
var EmailDomainSuggester = {

  domains: ["yahoo.com", "gmail.com", "google.com", "hotmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.com", "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "verizon.net", "att.net", "gmz.com", "mail.com"],

  bindTo: $('#email'),

  init: function init() {
    this.addElements();
    this.bindEvents();
  },

  addElements: function addElements() {
    // Create empty datalist
    this.datalist = $("<datalist />", {
      id: 'email-options'
    }).insertAfter(this.bindTo);
    // Corelate to input
    this.bindTo.attr("list", "email-options");
  },

  bindEvents: function bindEvents() {
    this.bindTo.on("keyup", this.testValue);
  },

  testValue: function testValue(event) {
    var el = $(this),
        value = el.val();

    // email has @
    // remove != -1 to open earlier
    if (value.indexOf("@") != -1) {
      value = value.split("@")[0];
      EmailDomainSuggester.addDatalist(value);
    } else {
      // empty list
      EmailDomainSuggester.datalist.empty();
    }
  },

  addDatalist: function addDatalist(value) {
    var i,
        newOptionsString = "";
    var emailfn = "emailOptions()";
    for (i = 0; i < this.domains.length; i++) {
      newOptionsString += "<option onclick='" + emailfn + "' value='" + value + "@" + this.domains[i] + "'>";
    }
    // add new ones
    this.datalist.html(newOptionsString);
  }

};

EmailDomainSuggester.init();

// Function below is used to validate credit card number
function validate_creditcardnumber(inputNum) {
  var digit, digits, flag, sum, _i, _len;
  flag = true;
  sum = 0;
  digits = (inputNum + '').split('').reverse();
  for (_i = 0, _len = digits.length; _i < _len; _i++) {
    digit = digits[_i];
    digit = parseInt(digit, 10);
    if (flag = !flag) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

// Addition and deletion of promo code
var removePromo = document.getElementById("promoRemove");
var promo = document.getElementById("promo");
removePromo.style.display = "none";
// Addition of promocode
promo.addEventListener('click', function () {
  document.getElementById("promoInput").style.display = "block";
  removePromo.style.display = "block";
  promo.style.display = "none";
});
// Deletion of promocode
removePromo.addEventListener('click', function () {
  document.getElementById("promoInput").style.display = "none";
  document.getElementById("promoCode").value = "";
  removePromo.style.display = "none";
  promo.style.display = "block";
});

// Code below removes all charactors except integers from input
var digits = function digits(box) {
  var regex = /[^0-9]/g;
  var errorId = box.id + "-error";
  if (box.value.match(regex)) {
    // Code line below adds warning message when user types other than digits
    document.getElementById(errorId).style.display = "block";
    box.classList.add("invalid");
    box.value = box.value.replace(/[^0-9]/g, '');
  } else {
    // Lines below removes warning messages
    document.getElementById(errorId).style.display = "none";
    box.classList.remove("invalid");
  }
};

// Adding acls course
function addACLS() {
  var aclsRecert = document.querySelector(".aclsRecert");
  var aclsRecertPrice = document.querySelector(".aclsRecert-price");
  aclsRecert.innerHTML = "ACLS Certification Course";
  aclsRecert.classList.add("acls");
  aclsRecertPrice.innerHTML = "$275.00";
  aclsRecert.classList.remove("aclsRecert");
  document.querySelector(".acls-course-add").style.display = "none";
  // Call function to calculate total value again
  calculateTotal();
}

// Adding BLS Recert
function addBlsRecert() {
  $(".courses").append('<div id="bls-recert" class="col mb-1 s12"></div>');
  var markup = "\n    <span class=\"flow-text aclsRecert\">BLS Recertification Course</span>\n    <span class=\"right price aclsRecert-price flow-text\">$65.00</span>\n  ";
  document.querySelector("#bls-recert").innerHTML = markup;
  document.querySelector(".bls-recert-add").style.display = "none";
  // Call function to calculate total value again
  calculateTotal();
}

// Adding acls crash cart
function aclsCrashCart() {
  $(".courses").append('<div id="acls-crash-cart" class="col mb-1 s12"></div>');
  var markup = "\n    <span class=\"flow-text aclsRecert\">Laminated 8.5x11in ACLS crash cart cards - Products ( quantity = 1 )</span>\n    <span class=\"right price aclsRecert-price flow-text\">$40.00</span>\n  ";
  document.querySelector("#acls-crash-cart").innerHTML = markup;
  document.querySelector(".acls-crash-cart").style.display = "none";
  // Call function to calculate total value again
  calculateTotal();
}

// Calculating total price
function calculateTotal() {
  var temp = [];
  var getPrices = document.querySelectorAll(".price");
  var length = getPrices.length;
  for (var i = 0; i < length; i++) {
    temp.push(getPrices[i]);
}
  var purePrices = temp.map(function (x) {
    // Filtering $ sign from price array and converting to integer values
    // We are also usign math.floor to get whole number.
    return Math.floor(x.innerHTML.replace(/[^0-9 .]/g, ''));
  });
  // Here we are not only giving totol price but also adding back two decimals, we can later parseint to get integer value.
  document.querySelector(".total-price").innerHTML = "$" + purePrices.reduce(function (a, b) {
    return a + b;
  }, 0) + ".00";
}

// Below this all code is for creating google analytics events.

// Google analytics event which triggers when user select from autocomplete suggestions of company input
function sendItem() {
  gtag('event', 'select_content', {
    'event_category': 'engagement',
    'event_label': 'Autocomplete suggestion of "Company" is selected'
  });
}

// Google analytics event which is triggered when user select autocomplete suggestion for email address domain
function emailAnalytics() {
  var val = document.getElementById("email").value;
  var opts = document.getElementById('email-options').childNodes;
  for (var i = 0; i < opts.length; i++) {
    if (opts[i].value === val) {
      // An item was selected from the list!
      // yourCallbackHere()
      gtag('event', 'select_content', {
        'event_category': 'engagement',
        'event_label': 'Autocomplete suggestion of "Email" is selected'
      });
      break;
    }
  }
}

function analytics(x) {
  if (!x.classList.contains("event-true") && x.value.length !== 0) {
    gtag('event', 'checkout_progress', {
      'event_category': 'ecommerce',
      'event_label': x.id + " input is filled"
    });
    x.classList.add("event-true");
  } else {
    return false;
  }
}
