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

The layout and overally visual appearance is limited to certain browsers and browser sizes.  To make this application production read, responsive design touchs must be applied e.g. media query adoptations.  

I had trouble figuring out how to visually transition a block element with a set width to a smaller width considering I didn't know the width of the block's contents.  This is apparent when you click 'enter' on a form field value.
       

## Thank you for accepting Flocabulary's Front End Engineer challenge!

At Flocabulary, we strive to provide rich educational materials that are also elegant, intuitive
web interfaces. In this challenge you'll help create a hypothetical
feature that's very similar to mad libs ( https://en.wikipedia.org/wiki/Mad_Libs ).
It won't be highly educational, but with your help, it'll at least have a good UI.

Here's a live hosted demo of this functionality: https://flocabulary.github.io/madlibs-ui-challenge/

It's functional, but it clearly needs some styling and finessing. A Flocabulary designer has provided a set of mocks for how the feature should look and feel. Those mocks can be seen here:
https://drive.google.com/drive/folders/1Sq946n18SD2QJTdwRXPp8Tfq_Uvrr2Zh?usp=sharing

## Your Tasks

1. Visually make the feature match the mocks. Where elements change size or color, care should be taken to smoothly transition by usage of CSS features like `transition`, `animation`. The mocks may leave some details out, and here's where you have a chance to show your ingenuity.

2. You'll see that there are a couple fields (`number` and `word ending in -ly`) which could use a little more validation. For the `number` field, ensure that a number is provided. For the field `word ending in -ly`, ensure that the provided value does indeed end with the letters `ly`.

### follow these directions:
0. install Node.js https://nodejs.org/en/download/
1. Fork this repo https://help.github.com/articles/fork-a-repo/
2. Clone forked repo to local folder
3. In same directory as `package.json`, run `npm install`
4. To start development server, run `npm start`
5. To submit your challenge push your updates to your forked repo

This was made with [create react app](https://github.com/facebook/create-react-app).
