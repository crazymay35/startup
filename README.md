# Color Pal

[My Notes](notes.md) 
[cool site](https://roadmap.sh/)
[scratch pad](scratch.md)

Color Pal helps artists choose colors that will enhance their art and skills. It's a stepping stone for beginning artists to learn color theory in a simplified format.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

As an artist who struggles with color theory, choosing the right colors for an artpiece is incredibly daunting, especially with all the possible colors one can choose from. Simplifying the process by providing an array of colors based on a few clicks from the user will help artists pick interesting and excellent color pallettes for their art. Additionally, users can generate random color palletes to find new colors they might want to work with. Users are abls to save both the palletes they make and randomly generate for ease of access. 

### Design

![Design image](images.jpg)

### Key features

- color pallete generator (using a 3rd party color generator)
- color selector (user choose 2 colors, 5 slot gradient updates)
- saved color palletes (stores all previously saved ones)
- receive notifications when users share color palletes

### Technologies

- **HTML** - structure and organize the pages (login, main, pallette, generator, social) *login page* has 2 boxes in the center for email and password to login. *main page* contains 2 square boxes whose colors are easily adjusted by the below color selectors. 5 slots depict the color scale. There is a button under the colors for saving the color pallette. The *generator page* has a bar of color (divided into 5 sections) with a save button as well. *pallette page* has bars of previously saved color scales saved by the user,, topmost pallete is most recent. button (or swipe action) shares the pallete once (pushes it out as a notification pop up for users who follow them, so they can choose to add the pallete to their saved palletes), *social page* list of people the user follows (there is an add button for adding a user's username or email), a trashcan button for unfollowing the person

- **CSS** - dark grey background probably, each slot is an inbetween gradient from the right color box and left color box. the font will probably be robboto, open sans, Pacifico, or Lato or combination of a few. The generate button and save button will probably be blue or red (make sure it's nice), rounded buttons are more pleasing to the eye. buttons will probably get darker when a user presses them. White space nice for user interaction

- **React** - current color selected updated as sliders move,the color sliders change color as a slider moves, and the box changes color too. things evenly apart, the 5 slots change as one of the box colors change. when save button pressed, it adds the current color pallete to the user's color palletes. when generate button pressed, displays a random color pallete. logging in directs user to main page of selecting colors. left arrow button on main page goes to generator page, right arrow button on main page goes to saved color palletes

- **Service** - allows users to edit saved color palletes (removing them from database, editting ones they created but not randomly generated) login page allows access to user's account and consequently their saved color palletes. create account and logout also some things to do. for the generate random color pallete, it accesses http://colormind.io/ and uses the randomly generated colors on there to make the pallete. (example code to look for below from the site)
>(<)div class="color" style="background-color: #1e262a" data-id="4" data-color="#1e262a" data-locked="false">(<)div class="swipe">(<)/div>(<)/div> 

- **DB/Login** - stores profiles (account info) and each profile's associated color palletes they saved along with database stores the list of people the user ollows.

- **WebSocket** - share pallete sends a real-time notification to all their followers, notification reads "so and so shared a new pallete! add to your collection?"


## 🚀 AWS deliverable

- [x] **Server deployed and accessible with custom domain name** - [ColorPal](https://startup.colorpal.link/).
- [x] **just in case** - [ColorPal more basic](https://colorpal.link/)

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created the html pages I will be using for the project, namely index(login)  generator (generate pallete) create(create pallete) palletes(saved palletes) following(friends list)
- [x] **Proper HTML element usage** - HTML is formated nicely and cohesively
- [x] **Links** - the links work as intended
- [x] **Text** - there is discernable textual content that clarifies what each section is
- [x] **3rd party API placeholder** - the generator will be linked to colormind.io to get the randomly generated colors which will then display
- [x] **Images** - placeholder images are displayed to show the layout of how the color palletes will look and how the color squares will look as the user moves the dials. 
- [x] **Login placeholder** - login page is the index.html with login and create account.
- [x] **DB data placeholder** - database displays color palletes and list of friends
- [x] **WebSocket placeholder** - live notifications are displayed below the list of friends, notifications notify the user that a friend shared a color pallete and that they can save it. 
## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Visually appealing colors and layout. No overflowing elements.** - checked on phone and laptop, with resizing the window a lot to make sure it is nice and appealing and clear
- [x] **Use of a CSS framework** - used bootstrap buttons and styled them 
- [x] **All visual elements styled using CSS** - yes, the css is messy and confusing, but it makes sense to me and i apologize. I will come up with more understandable names
- [x] **Responsive to window resizing using flexbox and/or grid display** - resizes comfortably, no overflow, really happy with this part, it was a bit of a finagle. palletes page uses flex box i believe. 
- [x] **Use of a imported font** - used a google font, and yes it is imported. used it one following.html and index.html
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - a variety of element selectors, classes, and pseudo selectors (buttons and links)

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - npm run build compiles the code, o opens in the browser, q quits
- [x] **Components** - header footer and background of main is parts of the app.css and app.jsx, each page has their own css and jsx file, images are in the public file
- [x] **Router** - followed the assignment details (for simon and again for startup) and it navigates and operates properly. finally... XD

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
