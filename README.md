# Fintoc Quickstart
Fintoc Quickstart is the repository that allows you to test Fintoc locally using the Fintoc Widget and the Fintoc SDKs.
The Fintoc Quickstart repository has a frontend application written in Vue.js, which integrates the Widget, as well as multiple backend applications that use the languages supported by the Fintoc SDKs.

# Table of contents


# 1. Clone the repository
Clone the repository using your prefered terminal:
<table>
<tr>
<th>Protocol</th>
<th>Command</th>
</tr>
<tr>
<td>HTTPS</td>
<td>
<pre lang="shell">
$ git clone https://github.com/fintoc-com/quickstart.git
</pre>
</td>
</tr>
<tr>
<td>SSH</td>
<td>
<pre lang="shell">
$ git clone git@github.com:fintoc-com/quickstart.git
</pre>
</td>
</tr>
<tr>
<td>GitHub CLI</td>
<td>
<pre lang="shell">
$ gh repo clone fintoc-com/quickstart
</pre>
</td>
</tr>
</table>

And enter it with:

```$ cd quickstart```
# 2. Setup and get your keys
Follow the guide at [docs.fintoc.com/docs/quickstart](https://docs.fintoc.com/docs/quickstart) (in Spanish for now) and get your **Public Key** and **SECRET Key**.
Your keys will look like this:
<table>
<tr>
<td>YOUR_PUBLIC_KEY</td>
<td>pk_live_XXXXXXXXXXXXXXXXXXXXXXXXXX</td>
</tr>
<tr>
<td>YOUR_SECRET_KEY</td>
<td>sk_live_XXXXXXXXXXXXXXXXXXXXXXXXXX</td>
</tr>
</table>

> **Note:** If you use your **TEST KEYS**, then your keys will have the word ```_test_``` instead of ```_live_```.

Create an ```.env``` file by copying our environment variables file ```.env.example```.

```shell
$ cp .env.example .env
```

And add the keys to the following environment variables inside ```.env```, like this.
```.dotenv
SECRET_KEY={{YOUR_SECRET_KEY}}
REACT_APP_PUBLIC_KEY={{YOUR_PUBLIC_KEY}}
...
```

# 3. Run Fintoc Quickstart
Fintoc Quickstart allows you to run the services in two ways, directly or with [Docker](https://www.docker.com/). We recommend running it with **Docker**, because it is so simple! In the same way, we provide you with the instructions for you to execute it directly.
## 3.1 Expose backend to internet (ngrok)
Widget integration requires exposing a backend endpoint (Webhook) to the internet, so that Fintoc can send a link_token to the backend application and with this access the necessary information.
> **Note:** link_token is the token that allows access to the information belonging to the user who started the session. More information about the Widget can be found at [docs.fintoc.com/docs/usando-el-widget#flujo-del-widget](https://docs.fintoc.com/docs/usando-el-widget#flujo-del-widget).

For this we will use [ngrok](https://ngrok.com/), which is a cross-platform program that enables developers to expose local servers behind NATs and firewalls to the public internet over secure tunnels with miniaml effort.
In this way, using **ngrok** we can expose the backend (and the webhook) so that Fintoc can communicate with it.

To do this, download ngrok ([ngrok.com/download](https://ngrok.com/download)) for the operating system you use and execute the following command in a new session of the terminal:

```shell
$ ./ngrok http 5000
```
> **Note**: All backend services expose port 5000.

This will show a message in which we are interested in the line that says ```Forwarding        https...```, like this:
```shell
...
Forwarding                    https://xxxxxxxxxxxxxx.ngrok.io -> http://localhost:5000
...
```
So we need to copy the public url (```https://xxxxxxxxxxxxxx.ngrok.io```), and paste it in the ```.env``` file to the ```REACT_APP_WEBHOOK_URL``` environment variable. 
The ```.env``` should look like this.
```.dotenv
SECRET_KEY={{YOUR_SECRET_KEY}}
REACT_APP_PUBLIC_KEY={{YOUR_PUBLIC_KEY}}
REACT_APP_WEBHOOK_URL={{PUBLIC_WEBHOOK_URL}}/api/link_token
```
> **Important:** It is important that in the public url it is added as a suffix ```/api/link_token```, since that is the endpoint used by the backend applications of the project so that Fintoc notifies them with the link_token.
## 3.2 Run
### Prerequisites
To run the applications directly it is necessary to have the language installed on your machine.
* node (frontend and node applications): 10 or higher
* ruby: 2.7 or higher

### Commands
#### Frontend
```shell
$ cd frontend
$ npm install
$ npm start
```
#### Node
```shell
$ cd node
$ npm install
$ npm start
```
#### Ruby
```shell
$ cd ruby
$ bundle install
$ ruby 
```


## 3.3 Run + Docker
###Prerequisites

Work in progress...

