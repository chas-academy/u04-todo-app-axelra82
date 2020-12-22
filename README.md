# DODO the to do app

Not to be confused with the dodo (Raphus cucullatus) near Madagascar in the Indian Ocean.

## Requirements

- PHP
- MySQL
- [Nodejs and NPM](https://nodejs.org/en/)

## How to

Clone repo from [REPO_URL] to your local `public_html` folder (make sure it's empty), e.g.

```cd /path/to/public_html/folder```

Use "." (dot) to define current folder with git clone (_"cloning into an existing directory is only allowed if the directory is empty"_).

```git clone [REPO_URL] .```

**Install dependencies**

```npm i```

**Start app**

```npm run start```

This will start the app on [localhost](http://localhost:3000) using port 3000

The first time you run the app you will be asked to provide database credentials. Once done the app is ready.

**Manual installation**

If for whatever reason the configuration setup doesn't work, or you prefer to configure the app manually you will need to:

- Install database using SQL in [create.sql](/backend/API/Endpoint/Configure/create.sql)
- Make sure database settings are correct in [.env](/.env)
- Set "configured" to `true` in [configured.json](/public/configured.json)

## Assignment - u04 TO-DO-APP

Requirement highlights:

- **Frontend:** Any
- **Backend:** CRUD API using PHP & MySQL
- **Extra:** Abillity to create user(s) that can create list(s) with task(s) in relational database

[**Complete instructions (in swedish)**](https://docs.google.com/document/d/1BECprFcgqsTL_8USLCe5ALIMLdwfFTNd_Sl12bJBYqw/edit)
