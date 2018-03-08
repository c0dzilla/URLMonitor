# URL MONITOR

UrlMonitor is a url monitoring tool that makes HTTP requests at a URL and stores response times at regular intervals(1 second), for further analysis.

## API Calls

1. [GET /](#get/)
2. [GET /:id](#get/id)
3. [POST /](#post/)
4. [PUT /:id](#put/id)
5. [DELETE /:id](#deleteid)
 
<a name="get/">
  ```GET / ```
  Returns collection of url objects currently being monitored.
</a>

<a name="get/id">
  ```GET /:id```
  Returns the url object with id equal to parameter id. At any moment, the object contains 100 most recent response times. The response also contains the 50th, 75th, 95th and 99th percentile values of these response times.
</a>

<a name="post">
  ```POST / ```
  Add a url for monitoring by passing form data with keys:
  ```
  url:
  method:
  headers:
  data:

  ```
Once a url is added, the monitoring service starts that makes regularly timed requests and stores response times.
</a>

<a name="put/id">
  ```PUT /:id```
  Replaces the URL information at requested id with information from form data passed in the request. The form data has same format as a post request for a new url service. The monitoring service continues with the updated url information.
</a>

<a name="deleteid">
  ```DELETE /:id```
  Stops monitoring service for url with parameter id and removes all data pertaining to it.
</a>

