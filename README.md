# URL MONITOR

UrlMonitor is a url monitoring tool that makes HTTP requests at a URL and stores response times at regular intervals for further analysis.

## API Calls

### GET /
Returns collection of url objects currently being monitored.

### GET /:id
Returns the url object with id equal to parameter id. At any moment, the object contains 100 most recent response times as well as the 50th, 75th, 95th and 99th percentile values of these response times.

### POST /
Add a url for monitoring by passing form data with keys:
```

url:
method:
headers:
data:
  
```
Once a url is added, the monitoring service starts making regularly timed requests at 1 second intervals and stores response times.

### PUT /:id
Replaces the URL information at requested id with information from form data passed in the request. The form data has same format as a post request for a new url service. The monitoring service continues with the updated url information.

### DELETE /:id
Stops monitoring service for url with id equal to parameter id and removes all data pertaining to it. 
