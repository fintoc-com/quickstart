# Fintoc Quickstart
Fintoc Quickstart is the repository that allows you to test Fintoc locally using the Fintoc Widget and the Fintoc SDKs.
The Fintoc Quickstart repository has a frontend application written in Vue.js, which integrates the Widget, as well as multiple backend applications that use the languages supported by the Fintoc SDKs.

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
* ### Frontend
```shell
$ cd frontend
$ npm install
$ npm start
```
* ### Node
```shell
$ cd node
$ npm install
$ npm start
```
* ### Ruby
```shell
$ cd ruby
$ bundle install
$ ruby 
```

## 3.3 Run + Docker
### Prerequisites
To run Fintoc Quickstart with Docker you need to have:
The requirements more in detail below:
* Choose [**Docker**](https://docs.docker.com/get-docker/) depending on your operating system.
* Have [**GNU make**](https://www.gnu.org/software/make/manual/make.html).

### Commands
* ### help
Show commands
```shell
$ make help
```
```shell
# Print
Usage: make COMMAND [OPTIONS]

Options:
 language=[language] - The language can be any of the supported languages such as: node, ruby or python.

Commands:
 start		Start the containers (and builds them if they don't exist).
 build		Build the Docker images.
 destroy	Destroy the containers.
 stop		Stop the containers.
 restart	Restart the containers.
 logs		Show container logs.
```

* ### start
Start the containers (and builds them if they don't exist).
```shell
$ make start language=[language]
```
```shell
# Print
Creating network "backend_network" with driver "bridge"
Creating network "frontend_network" with driver "bridge"
Creating fintoc_node     ... done
Creating fintoc_frontend ... done
```

* ### build
Build the Docker images.
```shell
$ make build
```

* ### destroy
Destroy the containers.
```shell
$ make destroy
```
```shell
# Print
Stopping fintoc_frontend ... done
Stopping fintoc_node     ... done
Removing fintoc_frontend ... done
Removing fintoc_node     ... done
Removing network backend_network
Removing network frontend_network
```

* ### stop
Stop the containers.
```shell
$ make stop
```
```shell
# Print
Stopping fintoc_node     ... done
Stopping fintoc_frontend ... done
```

* ### restart
Restart the containers.
```shell
$ make restart
```
```shell
# Print
Removing fintoc_node     ... done
Removing fintoc_frontend ... done
Removing network backend_network
Removing network frontend_network
Docker Compose is now in the Docker CLI, try `docker compose up`

Creating network "backend_network" with driver "bridge"
Creating network "frontend_network" with driver "bridge"
Creating fintoc_ruby     ... done
Creating fintoc_frontend ... done
```

            
* ### logs
Show containers logs.
```shell
$ make logs
```
```shell
Attaching to fintoc_frontend, fintoc_node
fintoc_node |
fintoc_node | > fintoc-quickstart@1.0.0 start /opt/app
fintoc_node | > node server.js
fintoc_node |
fintoc_node | Server started on port 5000
fintoc_frontend |
fintoc_frontend | > frontend@0.1.0 start /opt/app
fintoc_frontend | > craco start
fintoc_frontend |
fintoc_frontend | ℹ ｢wds｣: Project is running at http://172.25.0.3/
...
```
