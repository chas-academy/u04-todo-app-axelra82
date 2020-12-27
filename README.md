# DODO the to do app

Not to be confused with the dodo (Raphus cucullatus) near Madagascar in the Indian Ocean.

## Requirements

- PHP
- MySQL
- [Nodejs and NPM](https://nodejs.org/en/) (You will need this to run React)

## How to

Clone repo from ["chas-u04-todo"](https://github.com/axelra82/chas-u04-todo) to your servers local `public html` folder, e.g.

```cd /path/to/public_html```

**NOTE:** make sure the public html folder is empty before proceeding.

Use "." (dot) to define current folder with git clone (_"cloning into an existing directory is only allowed if the directory is empty"_).

```git clone https://github.com/axelra82/chas-u04-todo.git .```

**Install dependencies**

Run shell ```npm i``` (in project folder). This will install all dependencies.

**Start app**

Once dependencies are installed you can run shell ```npm run start```

Alternatively, depending on your IDE (e.g. if you're using VSC), you can use **"play"** on **"start"** under **"NPM scripts"**.

This will start the app on [localhost](http://localhost:3000) using port 3000

The first time you run the app you will be asked to provide database credentials. When the installer is done the app is ready to use.

**Manual installation**

If for whatever reason the installer doesn't work, or you prefer to configure the app manually you will need to:

- Install database using SQL in [create.sql](/backend/API/Endpoint/Configure/create.sql)
- Make sure database settings are correct in [configured.json](/public/configured.json) and change "configured" to `true` (boolean)

## Assignment - u04 TO-DO-APP

Requirement highlights:

- **Frontend:** Any (React used)
- **Backend:** CRUD API using PHP & MySQL
- **Extra:** Abillity to create user(s) that can create list(s) with task(s) in relational database

[**Complete instructions (in swedish)**](https://docs.google.com/document/d/1BECprFcgqsTL_8USLCe5ALIMLdwfFTNd_Sl12bJBYqw/edit)
