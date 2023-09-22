# NOTES API

## About :thinking:

### What is this? 

The Notes API is a REST(ish) API with the main objective to create a backend that contains the following functionalities:

- Account creation;
- Login;
- CRUD\* of notes.

_CRUD (create, read, update e delete)_

### Why did you build this?

At the moment (2023) I'm studying at [Growdev](https://www.growdev.com.br/) in their fullstack web developer course and I'm currently in the introduction to Back-end module (Back-end I / In this module we learn about programming logic, javascript, API
Rest, NodeJS, Express, libs and how to upload a back-end application to production). And, as the last challenge of this module, we were asked to create this notes API!

### Technical stuff?

The entire project is hosted on [Render](https://render.com/) and I use [Node](https://nodejs.org/en) to server the API.


## Documentation

### Introduction

This documentation will help you get familiar with the resources of the Notes API and show you how to make different queries, so that you can get the most out of it.

### REST

**Base end-points:** https://notes-api-v64z.onrender.com/users and https://notes-api-v64z.onrender.com/notes

All responses will return data in <kbd>json</kbd>.

#### End-point: 

- **/users**

The requests with end-point <kbd>/users</kbd> only uses <kbd>POST</kbd>. With it, you have access to two more end points <kbd>/signup</kbd> and <kbd>/login</kbd>.

**/signup**

To create an user account, in the request's body you must send and JSON containing the following:

<kbd>{ name: "User's name", "email": "User's email", "password": "User's password" }</kbd>

**Returns:**

<kbd>{
    message: "User registered successfully! Login now to use your notes!",
    newUser = {
        id,
        name,
        email,
        password: encryptedPassword,
        isLogged: false
    }
}</kbd>


**/login**

To login a user **(after creating it's account)** you must send and JSON containing the following:

<kbd>{ "email": "User's created email", "password": "User's created password" }</kbd>

**Returns:**

<kbd>{
    message: "User logged successfully! You can now use your notes!",
    newUser = {
        id,
        name,
        email,
        password: encryptedPassword,
        isLogged: true
    }
}</kbd>

- **/notes**

The requests with end-point <kbd>/notes</kbd> can use <kbd>GET</kbd>, <kbd>POST</kbd>, <kbd>PUT</kbd> and <kbd>DELETE</kbd>.
When using it you have access to the following end-points:

**/create**

The requests with end-point <kbd>/create</kbd> uses <kbd>POST</kbd>. To create a note you must send and JSON containing the following:

<kbd>{ "title": "Note title", "description": "Note description", "userId": "User id" }</kbd>

**Returns:**

<kbd>{
    message: "Note created successfully!",
    newNote = {
        id = "noteId",
        title,
        description,
        userId
    }
}</kbd>

**/:userId**

The requests with end-point the <kbd>/:userId</kbd> as a parameter uses <kbd>GET</kbd> and returns notes of the user.

***Pagination***

The API will automatically paginate the responses.

You can access different pages and change the number of notes per page with the <kbd>page</kbd> and <kbd>per_page</kbd> parameter. If you don't specify the page or the per_page, the first page will be shown with 5 notes.
For example, in order to access page 2 and show 7 notes per page, add <kbd>?page=2&per_page=7</kbd> to the end of the URL.

**Returns:**

<kbd>{ info: { totalOfNotes }, data: notesWithinPage }</kbd>

**/:noteId**

The requests with end-point the <kbd>/:noteId</kbd> as a parameter can use <kbd>PUT</kbd> and <kbd>DELETE</kbd> and respectively allows to update and delete the note that contais the id of the parameter. 

**To update a note you must send and JSON containing the following:** 

<kbd>{
  "title": "Updated title",
  "description": "Updated description"
}</kbd> 

**Returns:**

<kbd>{ message: "Note updated successfully!" }</kbd>

**To delete a note you just have to send the request !!!** 