# CS 260 Notes

[My startup - Color Pal](https://github.com/crazymay35/startup)

## Helpful links
- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 44.209.182.3
followed the steps, ran into the issue where free aws wouldn't allow me to purchase a domain name, so I signed up for the paid version. A lot of the time it seemed like I was groping around blindly trying to find the correct way to go, but other than that, worked fine with minimal issues
nslookup byu.edu, curl -v ipAdress, curl -v https://www.byu.edu
https://colorpal.link 

## Caddy

No issues, simple and easy, need to get a bit more used to using ssh -i "Documents\BYU\2026 Winter Semester\cs260\..." ubuntu@ipAdressOrLinkWithout 

subdomain.*secondary.top,, root = secondary.top,, sld = *secondary,, tld = top,,, 
can have as many of subdomains as want,, 127.0.0.1 always your own,, cname = alias 

## HTML
successfully (after a bit of confusion as to where the deployFiles.sh was) able to copy manipulated simon files to the remote server. Accidentally put my pem in the simon files so I removed it from the files asap.

wrote in the simon index.html file and figured out how to link it properly to my website, so that simon.colorpal.link worked as it should. I want to go back and update a few specs about what my startup is doing, clarify a few things etc. 

For the html set up, it took a little trial and error but I think I've set up msot of the things that are important, at least lay out wise. I have a few concerns about how I will access and do the color generation, it seems like there are a lot of complicated and moving parts 

https://colormagic.app/random-color
http://colormind.io/

I think i finished everything as needed, hopefully at least. I need to go through and check all the boxes now. I set up the login aspect, notifications will appear at the bottom of the following page, there is a list of saved palletes the user can share or remove, there is a list of friends the user can receive shared palletes from, they can generate palletes (will need react and backend stuff for this) login (need database and other login stuff) create palletes (requires css to operate) all in all, I think and hope i have all the functionality I can do with html. There probably will be slight changes, especially as I start doing the css stuff. cheers!

## CSS

For each file (index, generator, create, following, palletes) I made a css layout. I didn't really know what I wanted for the background, I orginally wanted it to be a dark color, but needed an image file in the project. Having it be the background image looks the best. the login page used to have an animation color gradient, but I opted against this for the sake of uniformity across the app. The color was a bit to light for the lettering to come across well, so having a semi-transparent layer helps clarify the object grouping. 

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

finally set up vite and react, it was messy and confusing at some points, but got it set up! css conflicted with eachother across files, especially since I had duplicated class names in each css file. that was a bit unexpected, but it is resolved the way I want (although there is duplicated css, this will get resolved eventually)

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
