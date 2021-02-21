# DODO the to do app

Not to be confused with the dodo (Raphus cucullatus) near Madagascar in the Indian Ocean.

# EDIT

This repo has been updated to use a controlled environment (docker).

## How to

- Install [Docker Desktop](https://www.docker.com/get-started). **NOTE** Docker Compose is included with Docker Desktop. If for whatever reason it is not installed, please follow instructions [here](https://docs.docker.com/compose/install/)
- Clone repo from ["chas-u04-todo"](https://github.com/chas-academy/u04-todo-app-axelra82) to a destination of your choice.
- cd into folder 👆 and run `docker-compose up -d` in shell

This might take a couple of minutes (on the first run). All images will be downloaded, after everything is in place docker will start the containers.

The app takes a little while to initiate (the `npm run start` command is run when the nodejs container is up).

Once everything is up and running you will be able to visit [http://localhost:3000](http://localhost:3000) for the app.

**NOTE** The _"installer"_ is only there for legacy/display. **Do not** change the server settings.´, simply press the green "Go" button.

PHPmyadmin can be found @ [http://localhost:8081](http://localhost:8081).

For other container specific ports please look at the docker-composer.yml file.

## ~~Requirements~~

- ~~PHP _(tested on version 7.3.9)_~~
- ~~MySQL _(tested on version 5.7.26)_~~
- ~~[Nodejs and NPM](https://nodejs.org/en/) (You will need this to run React)~~

## ~~How to~~

~~Make sure your web server is up and running (i.e. PHP works and you have local access to your database).~~

~~Clone repo from ["chas-u04-todo"](https://github.com/chas-academy/u04-todo-app-axelra82) to your servers local `public html` folder, e.g.~~

~~`cd /path/to/public_html`~~

~~**NOTE:** make sure the public html folder is empty before proceeding.~~

~~Use "." (dot) to define current folder with git clone (_"cloning into an existing directory is only allowed if the directory is empty"_).~~

~~`git clone https://github.com/chas-academy/u04-todo-app-axelra82 .`~~

~~**Install dependencies**~~

~~Run shell `npm i` (in project folder). This will install all dependencies.~~

~~**Start app**~~

~~Once dependencies are installed you can run shell `npm run start`~~

~~Alternatively, depending on your IDE (e.g. if you're using VSC), you can use **"play"** on **"start"** under **"NPM scripts"**.~~

~~This will start the app on [localhost](http://localhost:3000) using port 3000~~

~~The first time you run the app you will be asked to provide database credentials. When the installer is done the app is ready to use.~~

~~**Manual installation**~~

~~If for whatever reason the installer doesn't work, or you prefer to configure the app manually you will need to:~~

- ~~Setup database using SQL in [create.sql](/backend/API/Endpoint/Configure/create.sql)~~
- ~~Make sure database settings are correct in [configured.json](/public/configured.json) and change "configured" to `true` (boolean)~~

## Assignment - u04 TO-DO-APP

Requirement highlights:

- **Frontend:** Any (React used)
- **Backend:** CRUD API using PHP & MySQL
- **Extra:** Abillity to create user(s) that can create list(s) with task(s) in relational database

[**Complete instructions (in swedish)**](https://docs.google.com/document/d/1BECprFcgqsTL_8USLCe5ALIMLdwfFTNd_Sl12bJBYqw/edit)
