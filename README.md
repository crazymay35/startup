# Color Selector

[My Notes](notes.md)

Color Selector helps artists choose colors that will enhance their art and skills. It's a stepping stone for beginning artists to learn color theory in a simplified format.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

As an artist who struggles with color theory, choosing the right colors for an artpiece is incredibly daunting, especially with all the possible colors one can choose from. Simplifying the process by providing an array of colors based on a few clicks from the user will help artists pick interesting and excellent color pallettes for their art. 

### Design

![Design image](images.jpg)

### Key features

- color pallete generator (using a 3rd party color generator)
- color selector (user choose 2 colors, 5 slot gradient updates)
- saved color palletes (stores all previously saved ones)

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - structure and organize the pages (login, main, pallette, generator) *login page* has 2 boxes in the center for email and password to login. *main page* contains 2 square boxes whose colors are easily adjusted by the below color selectors. 5 slots depict the color scale. There is a button under the colors for saving the color pallette. The *generator page* has a bar of color (divided into 5 sections) with a save button as well. *pallette page* has bars of previously saved color scales saved by the user

- **CSS** - dark grey background probably, each slot is an inbetween gradient from the right color box and left color box

- **React** - current color selected updated as sliders move,the color sliders change color as a slider moves, and the box changes color too. good white space use, things evenly apart, the 5 slots change as one of the box colors change.  

- **Service** - http://colormind.io/ might be easier to use(?),, look at the background color #hexcode
>(<)div class="color" style="background-color: #1e262a" data-id="4" data-color="#1e262a" data-locked="false">(<)div class="swipe">(<)/div>(<)/div> for pallette generation,, saving/storing palletes connected to each user login profile,, 

- **DB/Login** - saves profiles and each profile's associated color palletes 

- **WebSocket** - updates color palletes live for all devices logged in,

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

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
