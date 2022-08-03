# Video-sharing-app

## Requirements

For development, you will only need Node.js and a node global package installed in your environment.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.7.0

    $ npm --version
    8.4.0

If you need to update `npm`, you can make it using `npm`! After running the following command `npm` will be updated.

    $ npm install npm -g
## Install

    $ git clone https://github.com/kovalenkoko/video-sharing-app.git
    $ cd video-sharing-app
    $ npm install
## Configure app
Create your own PostgreSQL database, it will be connected to the project through environment variables.

Create `.env` file and inject your credentials, so it looks like this:

    PORT=5000
    DB_NAME=<DB_NAME>
    DB_USER=<DB_USER>
    DB_PASSWORD=<DB_PASSWORD>
    DB_HOST=localhost
    DB_PORT=<DB_PORT>
    JWT_ACCESS_SECRET=<ANY_SECRET_STRING>
    JWT_REFRESH_SECRET=<ANY_SECRET_STRING>


## Running the project in dev mode

    $ npm run dev
