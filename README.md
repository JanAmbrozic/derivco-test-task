# Derivco Test Task

My application for the Derivco test task.

## Game concept 

As specified in the README of the test this game is a simple 3x3 slotmachine where symbols can stop at top and bottom or center winline. There is also a very simple paytable, a balance bar and an option to enable debug mode. Please excuse my "programmer art" which I made for this challenge :). Any thing that is not mine is credited under credits.

## Code concept

I started this task as I would start a real game. First I setup `webpack` and general folder structure and then I proceed to use a very simple entity-component system, which I developed a couple of years ago for another Game Dev Challenge. I am a big fan of that pattern and I usually try to model it in a similar way of bigger frameworks so it is clearer and easier for other developers to start working on it.

That challenge is available here: https://bitbucket.org/JanAm/casumo-game-dev-challenge/src/master/ and a preview (+ explanation) in this video: https://youtu.be/VnVTfPT_tP8?t=113.

Next area of focus were actual components, I've created few of them to really show the power of this simple system and how we can move all the game data and parameters to different files which I call `scene definition`. I also tried to achieve that the components are interchangeable as much as possible.

## Code Features 
 - simple entity component-system which allows us to do many cool things
 - structured and well documented code
 - few unit-tests to show how mocking canvas works and how we could test the logical parts of the game
 - wepback to create a bundle or a production build (in a real case this is where the babel transpilation would also happen)

## Game Features (as per spec)
 - slotmachine with 3 winlines and different possible stop positions
 - very basic paytable which highlights on wins and a simple winline presentation
 - basic balance bar where winnings are also reflected
 - game is responsive and it keeps 16:9 ratio, we can add aditional elements on the sides which we would see on wider screens
 - a few example sounds (background ambient, reel spin, reel stop)

 ## Debug
 You can enable debug by adding `?debug=true` to the URL. Keep in mind that the symbol rigging will always work from center symbol. So for example if we want to set top winline with a Cherry we have to set center symbol to `CHERRY` and winline to `top`.

 ## TODO
 - pack assets together (faster loading since there is less requests)
 - move all the hardcoded properties to the scene definition 
 - connect debug UI to scene definition so we can edit properties in real-time
 - improve slotmachine spin
 - connect the game to the backend, etc... :) 

## Installing

Installation is very simple and there is only one thing that can be problematic. That is the `mock-canvas` module which has to be partly manually installed on some systems (for example Windows). If you have any issues please just remove  line `"canvas": "1.6.13"` from package.json and everything should work fine except that you won't be able to run tests.

Steps to install:

```
npm i
```
## Running
```
npm run start:dev
```
## Generating documentation
```
npm run docs
```
## Running tests
```
npm run test
```

## Creating a production version
```
npm run build
```

## Built With

* [Webpack](https://webpack.js.org/) - Code and assets bundler
* [PixiJS](http://www.pixijs.com/) - The rendering engine used
* [HowlerJS](https://howlerjs.com/) - Audio library used
* [tween.js](https://github.com/tweenjs/tween.js/) - Very simple tween system
* [AVA](https://github.com/avajs/ava) - Test runner used

## Credits:
Audio: 
 - <https://freesound.org/people/CastleofSamples/sounds/145392/>
 - <https://opengameart.org/content/spinning-wheel-0>
 - <https://www.kenney.nl/>

Art:
 - <https://www.kenney.nl/>
 - <https://eugeniavertry.artstation.com/projects/qA3yKL>

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details