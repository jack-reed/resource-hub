CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Installation
 * Requirements
 * Usage
 * Links


 INTRODUCTION
 -----------

 The DDCN Resource Hub is an application created to manage and schedule
 resources, implementing a chatbot to advise a user on what is
 available for them to book, and any other questions they may have.


EE0620 Digital and Technology Work Based Project
-------------------------------------------------


LOCAL USE
------------

INSTALLATION
------------

To use this app locally you must have NodeJs installed:

https://nodejs.org/en/download/

Once installed, in the project folder run 'npm install':

```bash
npm install
```


 REQUIREMENTS
  ------------

 NOTE: For the EE0620 Digital and Technology Work Based Project,
 the 'REQUIRED' variables are already provided in the keys.json file
 and this section can be ignored.

  -----------
If you wish to connect to a different chatbot and booking API other than the provided one,
 you will require to populate the  **keys.json** file with the relevant  keys to
  access the third party APIs:

**variables:** "botkey", "bookingUrl", "pandoraBotsApi"

Chatbot

* botkey: a bot key for PandoraBots API, this allows you to connect to a chatbot on their server
* pandoraBotsApi: an endpoint for the PandoraBots API

 Resource Manager

* bookingUrl: an endpoint for the instance of the Booking-Api you would like to connect to.

