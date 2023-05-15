# Scheduler requests

### to send
```
api--> [serverUrl]/api/schedule/send

method: POST

body:
{
   "organizerEmail":"example@any.com",
   "attendeeEmail":"example@any.com",
   "title":"title",
   "start":"05/12/2023",
   "end":"05/12/2023, 05:50:52 PM",
   "description":"description",
   "location":"location"
}

required:"organizerEmail"&"attendeeEmail"&"title"&"start"&"end"

response: 'request sent successfully!' 
```

### to receive
```
api--> [serverUrl]/api/schedule/receive

method: POST

body:
{"email":"example@any.com"} --->required (user email)

response:
{
    "sent": [
        {
            "_id": "646037332d0524ea6a260ee5",
            "organizerEmail": "example@any.com",
            "attendeeEmail": "example@any.com",
            "title": "Title1",
            "start": "2023-05-11T22:00:00.000Z",
            "end": "2023-05-12T15:50:52.000Z",
            "approved": "notYet",
            "received": false,
        }
    ],
    "received": [
        {
            "_id": "646036712d0524ea6a260ecc",
            "organizerEmail": "example@any.com",
            "attendeeEmail": "example@any.com",
            "title": "Title1",
            "start": "2023-05-11T22:00:00.000Z",
            "end": "2023-05-12T15:50:52.000Z",
            "approved": "notYet",
            "received": true,
        }
    ]
}

possible values for "approved" are "yes","no","notYet"
scheduler will be moved to calender only when "approved":"yes"
```

### to approve
```
api--> [serverUrl]/api/schedule/approve

method: POST

body:
{"schedulerId":"645ebac0eb49c77f1364171d"} --->required

response: 'schedule was approved successfully!'
```

### to ignore
```
api--> [serverUrl]/api/schedule/ignore

method: POST

body:
{"schedulerId":"645ebac0eb49c77f1364171d"} --->required

response: 'scheduler was ignored successfully!'
```

### to remove
```
api--> [serverUrl]/api/schedule/remove

method: POST

body:
{"schedulerId":"645ebac0eb49c77f1364171d"}`` ------>required

response: 'scheduler was deleted successfully!'
```

---

# Calendar requests

### to get

```
api--> [serverUrl]/api/calendar/get

method: POST

body:
{"email":"example@any.com"} --->required

response:
[
    {
        "_id": "646036922d0524ea6a260ed4",
        "user": "example@any.com",
        "title": "Title1",
        "description": "",
        "start": "2023-05-11T22:00:00.000Z",
        "end": "2023-05-12T15:50:52.000Z",
        "organizerEmail": "example@any.com",
        "location": "",
        "attendees": [
            "example@any.com",
            "example@any.com"
        ]
    },
    {
        "_id": "6460448d1eb4bfaaa4a96bd7",
        "user": "example@any.com",
        "title": "Title2",
        "description": "",
        "start": "2023-05-11T22:00:00.000Z",
        "end": "2023-05-12T15:50:52.000Z",
        "organizerEmail": "example@any.com",
        "location": "",
        "attendees": [
            "example@any.com"
        ]
    }
]
```

### to remove
```
api--> [serverUrl]/api/calendar/remove

method: POST

body:
{"calendarId":"6460448d1eb4bfaaa4a96bd7"} --->required

response: 'calendar deleted successfully!'
```
---


### to send mail 
```
  here to use it : machine host/api/mail/send
  body 
  
{
    "from":"fady@gmail.com",
    "to":"ahmed@hamada.com",
    "subject":"zeus12",
    "body":"zeus",
    "userID":"6460d67675e81fff3b365459"
   

}

here theeres the manatory fileds and user id means the sender id 
type : post
```

### to recive mail 
```
  here to use it : machine host/api/mail/recive
  body 
  {
    "mail":"fady@gmail.com",
    "number":2
}
here number refer to the page so if number was 1 he will recive latest 10  if 2 will 
recive the second older 10 mails and so on 
type : post

```


### to set status 
```


apiurl: machine host/api/feedback/msgread/email_id

body{
    "isRead":"true",
     "isStarred":"true",
    "isImportant":"true"

}
type :patch
```
