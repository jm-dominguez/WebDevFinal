# WebDevFinal
Final Exam for web development class in Universidad de Los Andes
This project uses the nextBusAPI to show the schedules of all the buses that belong in one route.
The app was build using D3, React, Meteor and Mongo.
## Getting Started

To get this project just clone it from github. You can achieve this by using the following command.
```
$ git clone https://github.com/jm-dominguez/WebDevFinal.git
```
### Prerequisites

To run this project you'll need to have Meteor installed in your machine. You can download Meteor by following the steps from:
https://www.meteor.com/install


### Installing

To use the project you'll need to download all the dependencies that are related to it. Follow this steps:

1. Enter the project
```
$ cd WebDevFinal
```

2. Then type

```
meteor npm install
```

This step is where dependencies are downloaded. Remember, this make take a while.

3. To execute the project, in the same folder run:
```
meteor
```
4. When the build process finishes you should get something like
```
your app is running at http://localhost:3000
```

5. Know you can use the App.


## Deployment

This app was deployed using heroku, the current url is: https://webdevfinalexam.herokuapp.com/
To achieve this, you can follow the steps from this tutorial: https://medium.com/@leonardykris/how-to-run-a-meteor-js-application-on-heroku-in-10-steps-7aceb12de234

## Built With

* [Meteor](https://www.meteor.com/) - The full-stack web framework used
* [MongoDB](https://www.mongodb.com/) - The database used

##The Bug
The bug I found was that in the code provided by the professor, the width attribute was not defined, so the app returned an error. To correct this, I created a global variable in the React component that was entrusted with the visualization.

There was a second bug in the code. When defining the D3 scale, the professor was selecting the minimun date using buses[1]. But, the bus that starts operating the earliest time is really the bus in the 0 position. So, to correct the bug I just changed the position of the bus from 1 to 0;

## Authors

* **Juan Manuel Dominguez** - *Initial work* - [Juan Dominguez](https://jm-dominguez.github.io/)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

* The visualization code for D3 was made by [John Alexis Guerra](http://johnguerra.co/), it can be found here: https://beta.observablehq.com/@john-guerra/sf-muni-schedule

