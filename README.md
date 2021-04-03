# My Dentist

This project is built for patient and appointment tracking. Patient can have more than one appointment. So you can track your patient's treatment. Also you can add which treatment was applied on each appointment. If you visit **Hasta Islemleri** page you can seee all of your patients and can track his/her treatment.

App refresh every 5 minutes and checks today's appointments. If there is a overdue appointment, this appointment turns yellow background. App keeps data in a single json file using json-server. So you can run this app in your localhost.

## Dependencies

<hr/>

This app is a single page app. I've used React-Router for routing, json-server for keeping data in a json file, axios for HTTP requests.

## Using App

<hr/>

First clone this repo and run `npm install` to install dependencies. Then run `npm run json:server` command. This command will start your json-server on port 8000. Now open another command line and run `npm start` command. So you can use the app now.

## Preview

<hr/>
Here is a preview of app. You can examine it in detail by cloning and running.I will update this repo as I improve app.

![my-dentist-preview](https://raw.githubusercontent.com/emreharman/my-dentist/master/src/img/my-dentist-preview.gif)
