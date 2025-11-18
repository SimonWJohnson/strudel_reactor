# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Test commit to verify repos setup - Simon Johnson

### Controls

# DJ_Controls
First point UI/UX for the user, and a visual component only.
The DJ_Controls component houses all the controls components.  
It acts as a 'dumb' shell that control components can be loaded into or out of as needed.
No logic is housed in this component, it is simply a styled container.

# SetCPM
Allows the user to set the playback speed of the song.
This componet houses the display of the CPM component, as well as a small helper function to pass 
the CPM user input as a numeric value to be used in setting the tempo of the song.  
The underlying logic, including the regex for capturing the {$CPM}, is housed in the CPMLogic.jsx.

# Volume Slider
Allows users to adjust the master playback volume of the song in real-time.
Master playback volume is updated with no interuption to playback. 

# Reverb Slider
Allows users to adjust the reverb level of the instruments within the song in real-time.
The reverb effect is applied to all tagged instruments. 

# Instrument Mute
Allows users to mute and unmute selected instruments within the song in real-time (Bassline, Arpeggiator, Drums).
Muting of instruments is appied in real-time with no disruption to playback.

# Save and Load Settings
Allows users to save settings they have applied to a song as a json file, which can then be loaded into the
Digital Audio Workstation (DAW) for playback.

# Play Buttons - Play, Pause, Stop
Allows users to play the currently loaded song from the beginning.  
During playback, users can pause the song, and then hit either play or pause again to resume payback 
from the paused position without the song being started over again.
Pressing stop during playback ceases playback, and pressing play will cause playback to resume from the 
beginning of the loaded song.  

### Quirks and usage guidelines
The application is best viewed in Firefox, as this was the core dev browser for the project.
The only real quirk is the preprocess text area - an image was selected to sit beneath the text to enhance 
the DJ / synth aesthetic.  When viewed in Firefox, the image renders exactly as intended.  
In chrome however, the image renders with a slightly different scale.  
This is purely cosmetic, and does not affect functionality in any way I have encountered; the text area remains
fully functional and readable.

I have left this as-is due to time constraints, as I feel the image really enhances the overall aesthetic.
In future iterations however, I would refine this rendering issue to allow for cross-browser handling.
A possible solution to this could also be the inclusion of a background selection function / tool that could 
use different images, or choose no image etc.


### Song code
github:algorave-dave/samples 

### Link to Demonstration Video


### AI Tools and Usage
For the D3 grpah component, I used ChatGPT to better understand the structure and function of the graph, 
particularly in displaying the graph to the user.  The final D3 graph implementation is my own work, with
ChatGPT being used for conceptual clarification, debugging, and example code snippets.  
Below is a record of prompts and outputs:

"
## Record of Interactions Regarding the D3 Graph Component

Below is a chronological record of all relevant AI interactions that influenced the D3 graph component.  
All text has been converted to plain ASCII for compatibility with GitHub Markdown.

---

### Interaction 1 — Annotating Path Styling Code

**Your Prompt**

"could you provide me with some comments/notation so I can better understand this piece of code compa?"

(You then pasted the following code:)

```js
path = g.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "url(#neonGradient)")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("filter", "url(#glow)");
```

**AI Output (Excerpt)**

AI explained conceptually what each attribute does, e.g.:

- attr("fill", "none") ensures no fill  
- attr("stroke", "url(#neonGradient)") references an SVG gradient  
- attr("filter", "url(#glow)") applies the glow filter

**Influence on Final Code**

Used to understand:

- which attributes were needed  
- how stroke, gradients, and filters work  
- why the path behaves as it does

No AI code copied directly.

---

### Interaction 2 — Glow Filter Bug (Case Sensitivity)

**Your Prompt**

"WOW....I didn't realise 'SourceGraphic' was case sensitive...have a look at the difference it made compa"

You were debugging why the filter was not rendering.

**AI Output (Excerpt)**

```js
const feMerge = glow.append("feMerge");
feMerge.append("feMergeNode").attr("in", "coloredBlur");
feMerge.append("feMergeNode").attr("in", "SourceGraphic");
```

**Influence on Final Code**

- Corrected `sourcegraphic` -> `SourceGraphic`  
- Glow filter started working properly  
- This was the only direct bug fix provided by AI

---

### Interaction 3 — Understanding d3.extent()

**Your Prompt**

"I am trying to calculate maxTotalItems — is this correct?"

**AI Output**

```js
let totalItemsRange = d3.extent(dataSet, d => d.totalItems);
let maxTotalItems = totalItemsRange[1];
```

**Influence on Final Code**

You implemented:

```js
const totalItemsRange = d3.extent(dataSet, d => d.totalItems);
const maxTotalItems = totalItemsRange[1];
```

This affected scaling and axis calculations.

---

### Interaction 4 — Glow and Gradient Explanation

**Your Prompt**

"have a look at the difference it made compa... ok compa... I think that is a wrap for the D3 component"

Earlier, you asked how to structure gradients and filters.

**AI Output (Excerpt)**

Showed conceptual examples:

- how to create `<defs>`  
- how to structure `linearGradient`  
- how `feGaussianBlur` and `feMerge` work  

```js
const defs = svg.appen

"