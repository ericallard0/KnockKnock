# KnockKnock
> (who's there?)

KnockKnock is a simple tool to view who's connected on your network.
You can define your home network's usually used IPs like your phone or your room-mate’s phone and see
whether it is connected to the network or not. In order to spy on him.

It is made with nodeJS to ping pre-defined IPs on a local network.
It uses unix's `ping` command and nodeJS to perform the ping.
On a ~~beautiful~~ HTML5 and JavaSript webpage on the requests are sent by the JavaScript with an AJAX request.

### How to use it
On the unix server (connected to the local network)

    $ node server.js

It uses port 8888 by default.

Visit 
+ http://localhost:8888

# TODO

* A config file to store the IPs to ping (linked to the corresponding names, MAC address etc.)
* A smart way to choose the port to listen to
* Ways to set the ping parameters like time-out
* Performance improvements (ping is very slow, especially if there is no answer)

* ~~One ajax requests per IP to ping~~
* ~~Ability for the client to choose which IP to ping by selecting them in a list~~
* Load the list IPs/names/email from the server
* CSS bug while loader is displayed

> Bigger improvements:

* (if it's possible in a limited amount of time) list all connected IPs on the network and match them with the given ones
