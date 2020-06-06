/**
 * downCount: Simple Countdown clock with offset, enhanced for i18n (markup driven)
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 * Editor: Stefani Gerber <stefani.gerber@bluesky-it.ch>
 */

(function($) {

  $.fn.downCount = function(options, callback) {
    var settings = $.extend({
      date: null,
      offset: null,
      labels: {
        days: {
          singular: 'day',
          plural: 'days'
        },
        hours: {
          singular: 'hour',
          plural: 'hours'
        },
        minutes: {
          singular: 'minute',
          plural: 'minutes'
        },
        seconds: {
          singular: 'second',
          plural: 'seconds'
        }
      }
    }, options);

    // Throw error if date is not set
    if (!settings.date) {
      $.error('Date is not defined.');
    }

    // Throw error if date is set incorectly
    if (!Date.parse(settings.date)) {
      $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
    }

    // Save container
    var container = this;

    /**
     * Change client's local date to match offset timezone
     * @return {Object} Fixed Date object.
     */
    var currentDate = function() {
      // get client's current date
      var date = new Date();

      // turn date to utc
      var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

      // set new Date object
      var new_date = new Date(utc + (3600000 * settings.offset));

      return new_date;
    };

    var getLabel = function(key, count) {
      return settings.labels[key][(count === 1) ? 'singular' : 'plural'];
    };

    var formatValue = function(value) {
      // fix units so that it will show two digits
      return (String(value).length >= 2) ? value : '0' + value;
    };

    /**
     * Main downCount function that calculates everything
     */
    function countdown() {
      var target_date = new Date(settings.date), // set target date
        current_date = currentDate(); // get fixed current date

      // difference of dates
      var difference = target_date - current_date;

      // if difference is negative than it's pass the target date
      if (difference < 0) {
        // stop timer
        clearInterval(interval);

        if (callback && typeof callback === 'function') {
          callback();
        }

        return;
      }

      // basic math variables
      var _second = 1000,
        _minute = _second * 60,
        _hour = _minute * 60,
        _day = _hour * 24;

      // calculate dates
      var days = Math.floor(difference / _day),
        hours = Math.floor((difference % _day) / _hour),
        minutes = Math.floor((difference % _hour) / _minute),
        seconds = Math.floor((difference % _minute) / _second);

      // set to DOM
      container.find('.days')
        .text(formatValue(days));
      container.find('.hours')
        .text(formatValue(hours));
      container.find('.minutes')
        .text(formatValue(minutes));
      container.find('.seconds')
        .text(formatValue(seconds));

      container.find('.days_ref')
        .text(getLabel('days', days));
      container.find('.hours_ref')
        .text(getLabel('hours', hours));
      container.find('.minutes_ref')
        .text(getLabel('minutes', minutes));
      container.find('.seconds_ref')
        .text(getLabel('seconds', seconds));
    };

    // start
    var interval = setInterval(countdown, 1000);
  };

})(jQuery);
