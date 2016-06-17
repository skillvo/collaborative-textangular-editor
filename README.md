# collaborative-textangular-editor
A collaborative editor built with Nodejs, Socket.io, Angular

### Set up

Run `npm install` to install dependencies. And run `npm start` for starting server.

Use `nodemon` for monitoring and auto restart server upon any modifications in server side files.

### How to integrate

In `main.js:10`

```javascript
var socket = io.connect("http://10.10.7.63:3000"); // this will be the url where your node server is running
```

### Server Side Event Listeners:
- addUser
- triggerChange
- disconnect

### Server Side Emmited Events:
- addExistingContent
- userAdded
- changedValue
- userLeft

### How To Use Server Side Events:
---

By default **addExistingContent** event is fired when you open an instance in browser. This contains all existing data including current editor data and all users.

```javascript
{
  data: "existing editor data",
  allUsers: [] // all users in an instance
}
```

---
1) Event **changedValue** - Is fired when editor value is changed. In callback you will get data containing following values:

```javascript
{ 
  "data": "html from editor"
}
```

```javascript
socket.on("changedValue", function(data) {
  // do stuff when value is changed by other user
});
```

2) Event **userAdded** - Is fired when new user joins the instance. In callback you will get data containing following values:

```javascript
{ 
  joined: "john doe", 
  allUsers: [] // array containing all users in current instance
}
```

```javascript
socket.on("userAdded", function(data) {
  // do stuff when a new user is added into the system
});
```

Similarly you can use `userLeft` event which is fired when some one disconnects from instance. And you will get following data in callback.

```javascript
{ 
  left: "john doe", // name of the user who left an instance 
  allUsers: [] // fresh array containing all users in current instance
}
```

We are still imporoving this but its a good to go solution for collaborative editing. Mail us if any queries or if you have a cool idea to enhance this.
