DownCount
=========

jQuery countdown plugin that accounts for timezone.

#Usage

```JS
$('.countdown').downCount({
    date: '08/27/2013 12:00:00',
    offset: -5,
    labels: {
        days: {
          singular: 'Tag',
          plural: 'Tage'
        },
        hours: {
          singular: 'Stunde',
          plural: 'Stunden'
        },
        minutes: {
          singular: 'Minute',
          plural: 'Minuten'
        },
        seconds: {
          singular: 'Sekunde',
          plural: 'Sekunden'
        }
    }
}, function () {
    alert('WOOT WOOT, done!');
});
```

#Options
Option | Description
---|---
date | Target date, ex `08/27/2013 12:00:00`
offset | UTC Timezone offset

You can also append a callback function which is called when countdown finishes.
