# Cesium-IP-Viewer
A simple full-stack application that displays the location of random IP addresses on a Cesium map. Currently has 30000+ IPs layed out on the map

## Pictures
![1](https://raw.githubusercontent.com/cnnr-adams/Cesium-IP-Viewer/master/Ces2.PNG)
![2](https://raw.githubusercontent.com/cnnr-adams/Cesium-IP-Viewer/master/Ces1.PNG)
![3](https://raw.githubusercontent.com/cnnr-adams/Cesium-IP-Viewer/master/Ces3.PNG)

## The Stack
### Front-end
Cesium displays all of the IP address locations, running on Angular for simplicity and powerful Cesium implementation in the future.
### Back-end
The backend is a node express endpoint which gets the locations of IP addresses from https://extreme-ip-lookup.com and saves/retrieves them to/from a database.
### Database
A simple MySQL database running in Windows

## Running
### Setup
- Install MySQL and make a table with ip, lat, and long columns
- Run npm install on the Angular front end and the Nodejs backend
- Set the environment variables HOST, USER, PASSWORD, and DATABASE to your database credentials
### Running
- To run the backend type 'node index.js'
- To run the frontendtype 'npm start'

## Future
I hope to continue growing the application while trying out different datasets, eventually running it on AWS, to try and understand the full stack of a web application, along with the full dev process from development to deployment in docker containers.
