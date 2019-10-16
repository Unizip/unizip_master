# Codebase

## Folders

- client
  - Contains the react application
- docs
  - contains general documentation
- server
  - contains the Node.js / Express server application 


### Server

#### folders

- bin
  - contains configuration stuff
- controllers
  - these are the functions that are called when a route is called from the front end
- helpers
  - general helper functions  (for example to validate that the user has entered valid data)
- models
  - database stuff - defining what kind of data is going in the MongoDB database
- node_modules - this is a node thing. When you install a node package, it goes into node_modules
- routes
  - where the routes for the application go

#### files
.env = environment variables
app.js = the main entry point for the express application
package.json = the configuration file for the node project
you can run the scripts by writing 'npm $scriptname'

passport.js = deals with validating JSONwebtokens. 

