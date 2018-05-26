# Overview

This is a demonstration of a dynamic form that renders a single input at a time.  Such forms focus a user's attention on a single task at hand and can be optimal for certain use cases.

This app was built with React, Javascript & Sass.

The application is a mock simulation of a Madlib game:
https://en.wikipedia.org/wiki/Madlib

## Major Changes

### React Refactoring: 95% of work

The pre-existing react code was basically a monolithic React component that housed all the UI and controlling functionality.  This makes the codebase brittle and difficult to upgrade.

On of the main noticeable changes is that I broke out the app into various components. Good sofware design tries to decouple dependencies.  While my codebase is considerably bigger, it should be more maintainable.  Each new component has a more tightly coupled functionality that is separated from the other components.  It's not a perfect re-factoring, but it's better than before.

I added an HOC component, InputFieldwrapper, that will make it easier in the future to add different type of inputs much more easily.  InputFieldWrapper encapsulates the basic functionality that all inputs will need to interact with the parent form.  Unfortunately, any newly created and added input types will require some modifications to the madlib form component.  This is really just a limitation with javascript as it doesn't support the passing of abstract classes or interfaces and other such polymorphic behavior.  Thus I have to switch on the type of element being rendered to determine, in advance, what type it is and to do some type-specific calls or customizations.

One of the issues with the pre-existing code was that its choice of data structures did not allow a madlib to contain duplicate types.  For example, you could not have two or more 'nouns' or 'verbs'.  That seems like a pretty bad drawback, so I changed the data structures to allow for duplicate madlib input fields.

There are many, many off of improvements as well -- too many to list.  Here are a few examples.  The pre-existing code utilized indices as keys for array rendered sub-components.  This actually is bad practice and can confuse the React reconciliation engine. I utilized the node uuid library to generate unique ids instead.

### Visual Styling: 5% of work

Incorporated Sass processing to utilize variables and property sharing across the various modules.  

For layout, used CSS flex for the resulting madlib form.  

### React High Level Component Design:
  
  MadlibForm
  
  |
  
  |----UnfilledMadlib
  
  |
  
  |----FilledMadlib
  
       |
       
       |----TextInputField, NumberInputField,TextEndingInputField
       
             |
            
             
             |----InputFieldWrapper
             
             
MadLibForm is the main app component.  based on the state of the application, it renders either an UnfilledMadlib Component or a FilledMadlib component.

The UnfilledMadlib component houses the form and all the user inputs.  The FilledMadlib component houses the results page.

InputFIeldWrapper is an HOC component that takes any of the wrapped components (e.g. TextInputField) and renders the wrapped component with a set of event handling props such as onChange or onSubmit, etc.

### Issues

The layout and overall visual appearance is limited to certain browsers and browser sizes.  To make this application production ready, responsive design touchs must be applied e.g. media query adoptations.  

I had trouble figuring out how to visually transition a block element with a set width to a smaller width considering I didn't know the width of the block's contents.  This is apparent when you click 'enter' on a form field value.

Even though I'm using SASS, I still find CSS to be a giant mess.  On the positive side, I'm never using the important attribute.  And I've limited the use of any nested selectors (which is bad for CSS performance.  I've also not utilized BEM class naming structures which would be beneficial for a larger project.  Ideally, I'd like to look into using more modern React approaches to styling, such as styled components.  TBD for ME.


### Installation Directions

0. install Node.js https://nodejs.org/en/download/
1. Fork this repo https://help.github.com/articles/fork-a-repo/
2. Clone forked repo to local folder
3. In same directory as `package.json`, run `npm install`
4. To start development server, run `npm start`

This was made with [create react app](https://github.com/facebook/create-react-app).
