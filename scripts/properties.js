'use strict';

(function () {
  var properties = [];
  var rawData = [];
  function Property (rawDataObj) {
    this.address = rawDataObj.address;
    this.price = rawDataObj.price;
    this.beds = rawDataObj.beds;
    this.baths = rawDataObj.baths;
    this.sqft = rawDataObj.sqft;
    this.built = rawDataObj.built;
    this.img = rawDataObj.thumb;
    this.url = rawDataObj.url;
  }

  Property.prototype.toHtml = function() {
    var $newProperty = $('article.template').clone();
    $newProperty.removeClass('template');
    $newProperty.addClass('sortable');

    if (this.sqft === '9999999') {
      this.sqft = '?'
    } else if (this.price === '999999999999') {
      this.price = 'Unknown'
    } else if (this.beds === '999'){
      this.beds = '?'
    }

    $newProperty.find('img:first').attr('src', this.img)
    $newProperty.find('.built').html(this.built ? 'Built in ' + this.built : '');
    $newProperty.find('a:first').html(this.address);
    $newProperty.find('a:first').attr('href', this.url);
    $newProperty.find('.price').html('$' + this.price);
    $newProperty.find('.bedsBathsSqft').html(this.beds + ' beds • ' + this.baths + ' baths • ' + this.sqft + ' sq ft');

    return $newProperty;
  };

  window.__SUPERMAN_DATA__.items.map(function (supermanData) {
    supermanData.price = supermanData.price || '999999999999';
    supermanData.beds = supermanData.beds || '999';
    supermanData.sqft = supermanData.sqft || '9999999';
    rawData.push(supermanData);
  });

  var batmanKeys = Object.keys(window.__BATMAN_DATA__)
  for (var i = 0; i < batmanKeys.length; i++) {
    var batmanShort = window.__BATMAN_DATA__[batmanKeys[i]];
    var batmanProperty = {};
    batmanProperty.address = batmanKeys[i];
    batmanProperty.price = batmanShort.cost.replace(',', '') || '999999999999';
    batmanProperty.beds = batmanShort.beds || '999';
    batmanProperty.baths = batmanShort.baths || '999';
    batmanProperty.sqft = batmanShort.sq_ft;
    batmanProperty.built = '';
    batmanProperty.thumb = batmanShort.img;
    batmanProperty.url = batmanShort.url;
    rawData.push(batmanProperty)
  };

  // ascending order
  rawData.sort(function (a, b) {
    return a.price - b.price;
  });

  rawData.forEach(function (propertyObject) {
    properties.push(new Property(propertyObject));
  });

  properties.forEach(function (property) {
    $('#properties').append(property.toHtml());
  });

  $('.sortPrice').on('click', function () {
    rawData.sort(function (a, b) {
      return a.price - b.price;
    });

    $('.sortable').remove();
    $('.sortPrice').addClass('active');
    $('.sortBeds').removeClass('active');
    $('.sortSqFt').removeClass('active');

    properties = []

    rawData.forEach(function (propertyObject) {
      properties.push(new Property(propertyObject));
    });

    properties.forEach(function (property) {
      $('#properties').append(property.toHtml());
    });
  })

  $('.sortBeds').on('click', function () {
    rawData.sort(function (a, b) {
      return a.beds - b.beds;
    });

    $('.sortable').remove();
    $('.sortPrice').removeClass('active');
    $('.sortBeds').addClass('active');
    $('.sortSqFt').removeClass('active');
    properties = []

    rawData.forEach(function (propertyObject) {
      properties.push(new Property(propertyObject));
    });

    properties.forEach(function (property) {
      $('#properties').append(property.toHtml());
    });
  })

  $('.sortSqFt').on('click', function () {
    rawData.sort(function (a, b) {
      return a.sqft - b.sqft;
    });

    $('.sortable').remove();
    $('.sortPrice').removeClass('active');
    $('.sortBeds').removeClass('active');
    $('.sortSqFt').addClass('active');

    properties = []

    rawData.forEach(function (propertyObject) {
      properties.push(new Property(propertyObject));
    });

    properties.forEach(function (property) {
      $('#properties').append(property.toHtml());
    });
  })

  console.log(properties)
  console.log(rawData)
})();
