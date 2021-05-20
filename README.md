
# Fintoc Quickstart
**Fintoc Quickstart** is the repository that allows you to test Fintoc tools locally!
The purpose of the repository is that you know how to integrate the Fintoc Widget and the SDKs that we offer for the different supported languages.
**Fintoc Quickstart** is composed mainly by what we call a frontend application, which is an application written in [React](https://reactjs.org/) and that integrates the Fintoc [Widget](https://docs.fintoc.com/docs/usando-el-widget#flujo-del-widget), and also by backend applications which represent the backend and that use the SDKs that Fintoc provides. 
Currently the languages supported by the Fintoc SDKs are: [**Node.js**](https://github.com/fintoc-com/fintoc-node), [**Ruby**](https://github.com/fintoc-com/fintoc-ruby) and [**Python**](https://github.com/fintoc-com/fintoc-python), but don't worry, we are working to support others!

<p align="center">
  <img src="_media/fintoc.png" />
</p>

# Table of content
* [Fintoc Quickstart](#fintoc-quickstart)
* [Table of content](#table-of-content)
* [1. Clone the repository](#1-clone-the-repository)
* [2. Get your keys and setup](#2-get-your-keys-and-setup)
* [3. Run Fintoc Quickstart](#3-run-fintoc-quickstart)
    * [3.1. Expose backend to internet (ngrok)](#31-expose-backend-to-internet-ngrok)
    * [3.2. Run](#32-run)
        * [Prerequisites](#prerequisites)
        * [Commands](#commands)
            * [Frontend](#frontend)
            * [Node](#node)
            * [Python](#python)
            * [Ruby](#ruby)
    * [3.3. Run + Docker](#33-run--docker)
        * [Prerequisites](#prerequisites-1)
        * [Commands](#commands-1)
            * [help](#help)
            * [start](#start)
            * [build](#build)
            * [destroy](#destroy)
            * [stop](#stop)
            * [restart](#restart)
            * [logs](#logs)

# 1. Clone the repository
Clone the repository using your prefered terminal using any of the following commands:

| Protocol   | Command                                                        |
|------------|----------------------------------------------------------------|
| HTTPS      | ```$ git clone https://github.com/fintoc-com/sample-app.git``` |
| SSH        | ```$ git clone git@github.com:fintoc-com/quickstart.git```     |
| GitHub CLI | ```$ gh repo clone fintoc-com/sample-app```                    |

And go to the **Fintoc Quickstart** directory:

```$ cd quickstart```
# 2. Get your keys and setup
To obtain the keys it will be necessary that you have a Fintoc account created, and that you have a bank account associated with it.
After that you can get the Public and Secret keys by accessing the API Keys page ([Dashboard](https://app.fintoc.com/api-keys) > API Keys). More information on the process can be found at: [docs.fintoc.com/docs/quickstart](https://docs.fintoc.com/docs/quickstart).

Your keys will look like this:

| Key             | Value                              |
|-----------------|------------------------------------|
| YOUR_PUBLIC_KEY | pk_live_XXXXXXXXXXXXXXXXXXXXXXXXXX |
| YOUR_SECRET_KEY | sk_live_XXXXXXXXXXXXXXXXXXXXXXXXXX |

> **Note:** If you use your **TEST KEYS**, then your keys will have the word ```_test_``` instead of ```_live_```.

Create an ```.env``` file (where the environment variables will be loaded) by copying our example ```.env.example``` file:

```shell
$ cp .env.example .env
```
And add the **Secret** and **Public** keys to the environment variables ```SECRET_KEY``` and ```REACT_APP_PUBLIC_KEY``` respectively, as shown below.

```.dotenv
SECRET_KEY=<YOUR_SECRET_KEY>
REACT_APP_PUBLIC_KEY=<YOUR_PUBLIC_KEY>
...
```

# 3. Run Fintoc Quickstart
**Fintoc Quickstart** allows you to run the services in two ways, directly or with [Docker](https://www.docker.com/).
We recommend running it with **Docker** because it is very fast and simple!
But if you want to run the applications directly, no problem, we provide you with the instructions to do so!

## 3.1. Expose backend to internet (ngrok)
Widget integration requires exposing a backend endpoint (Webhook) to the internet, so that Fintoc can send a *link_token* to the backend application and with this access the necessary information.
> **Note:** *link_token* is the token that allows access to the information belonging to the user who started the session.
> More information about the Widget can be found at: [docs.fintoc.com/docs/usando-el-widget#flujo-del-widget](https://docs.fintoc.com/docs/usando-el-widget#flujo-del-widget).

For this we will use [ngrok](https://ngrok.com/), which is a cross-platform program that enables developers to expose local servers behind NATs and firewalls to the public internet over secure tunnels with minimal effort.
In this way, using **ngrok** we can expose the backend (and the webhook) so that Fintoc can communicate with it.

To do this, download ngrok ([ngrok.com/download](https://ngrok.com/download)) for the operating system you use and execute the following command in a new session of the terminal:

```shell
$ ./ngrok http 5000
```
> **Note**: **Fintoc Quickstart** backend applications run (and expose) on port **5000**

This will show a message in which we are interested in the line that says ```Forwarding        https...```, as shown below:
```shell
...
Forwarding                    https://xxxxxxxxxxxxxx.ngrok.io -> http://localhost:5000
...
```
So we need to copy the public url (```https://xxxxxxxxxxxxxx.ngrok.io```), and paste it in the ```.env``` file to the ```REACT_APP_WEBHOOK_URL``` environment variable. 
At the end the ```.env``` file should look like this:
```.dotenv
SECRET_KEY=<YOUR_SECRET_KEY>
REACT_APP_PUBLIC_KEY=<YOUR_PUBLIC_KEY>
REACT_APP_WEBHOOK_URL=<NGROK_PUBLIC_WEBHOOK_URL>/api/link_token
```
> **Important:** It is important that the public url (```NGROK_PUBLIC_WEBHOOK_URL```) is suffixed with the path ```/api/link_token```, since that is the webhook endpoint that the backend applications of this project have.
## 3.2. Run
### Prerequisites
To run the applications directly it is necessary to have the language installed on your machine.
* **node (frontend & node):** 10 or higher
* **python:** 3.6.1 or higher
* **ruby:** 2.7 or higher

### Commands
* #### Frontend
```shell
$ cd frontend
$ npm install
$ npm start
```
* #### Node
```shell
$ cd node
$ npm install
$ npm start
```
* #### Python
```shell
$ cd python

# optional: create a virtual environment to keep your dependencies clean
$ virtualenv venv
$ source ./venv/bin/activate

$ pip install -r requirements.txt
$ FLASK_APP=app.py flask run
```

* #### Ruby
```shell
$ cd ruby
$ bundle install
$ ruby app.rb
```

## 3.3. Run + Docker
### Prerequisites
To run **Fintoc Quickstart** with **Docker** you need to have:
* [**Docker**](https://docs.docker.com/get-docker/) 
* [**GNU make**](https://www.gnu.org/software/make/manual/make.html)

### Commands
* #### help
Show commands and their options.
```shell
$ make help
```

* #### start
Start the containers (and builds them if they don't exist).
```shell
$ make start language=[language]
```
```[language]``` can be one of the following options: ```node```, ```python``` or ```ruby```.

* #### build
Build the Docker images.
```shell
$ make build
```

* #### destroy
Destroy the containers.
```shell
$ make destroy
```

* #### stop
Stop the containers.
```shell
$ make stop
```

* #### restart
Restart the containers.
```shell
$ make restart
```

* #### logs
Show containers logs.
```shell
$ make logs
```
