# Scheduler requests
### to send
>``api--> [serverUrl]/api/schedule/send``
>
>``method: POST``
>
>``body:``
``{
   "organizerEmail":"example@any.com",
   "attendeeEmail":"example@any.com",
   "title":"title",
   "start":"05/12/2023",
   "end":"05/12/2023, 05:50:52 PM",
   "description":"description",
   "location":"location"
}``
>
>``required:"organizerEmail"&"attendeeEmail"&"title"&"start"&"end"``
>
>``response: 'request sent successfully!'``
>````

### to receive
>``api--> [serverUrl]/api/schedule/receive``
>
>``method: POST``
>
>``body:``
``{
    "attendeeEmail":"example@any.com"
  } --->required (user email)``
>
>``response:``
``[
    {
        "_id": "645ebac0eb49c77f1364171d",
        "organizerEmail": "example@any.com",
        "attendeeEmail": "example@any.com",
        "title": "Title",
        "start": "2023-05-11T22:00:00.000Z",
        "end": "2023-05-12T15:50:52.000Z",
        "approved": "notYet",
        "received": true
    }
``]
>
>``possible values for "approved" are "yes","no","notYet"``
>``scheduler will be moved to calender only when "approved":"yes"``
>````

### to approve
>``api--> [serverUrl]/api/schedule/approve``
>
>``method: POST``
>
>``body:``
``{
    "schedulerId":"645ebac0eb49c77f1364171d"
  } --->required``
>
>``response: 'schedule was approved successfully!'``
>````

### to ignore
>``api--> [serverUrl]/api/schedule/ignore``
>
>``method: POST``
>
>``body:``
``{
    "schedulerId":"645ebac0eb49c77f1364171d"
  } --->required``
>
>``response: 'scheduler was ignored successfully!'``
>````

### to remove
>``api--> [serverUrl]/api/schedule/remove``
>
>``method: POST``
>
>``body:``
``{
    "schedulerId":"645ebac0eb49c77f1364171d"
  }`` ------>required
>
>``response: 'scheduler was deleted successfully!'``
>````

---