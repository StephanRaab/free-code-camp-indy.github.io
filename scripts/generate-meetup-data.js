#!/usr/bin/env node
var _=require("lodash"),fs=require("fs"),sourceKeyFile="meetup_api_key.txt",targetFileName="free-code-camp-events.mock.json",targetPath="js/",targetGroupUrlname="Free-Code-Camp-Indy",targetStatus=["upcoming","past"],meetup_api_key=function(){var e=_.get(process,"env.MEETUP_API_KEY");return _.isUndefined(e)?fs.readFileSync(sourceKeyFile,"utf-8").replace(/\s/g,""):e}();function generateNewMeetupMockData(e){var r=require("meetup-api")({key:e});return new Promise(function(n,o){r.getEvents({group_urlname:targetGroupUrlname,status:targetStatus},function(e,r){if(e)o(new Error(e));else{var t={results:_.get(r,"results")};n(t)}})})}function writeNewData(e){return new Promise(function(r,t){fs.writeFile(targetPath+targetFileName,e,function(e){e?t(new Error(e)):r("Successfully written to file!")})})}function handleError(e){console.error(e),process.exit(1)}if(_.isUndefined(meetup_api_key)||_.isEmpty(meetup_api_key)){var error=new Error("MEETUP_API_KEY not found.  Please reference the README.md for instructions on how to set this up.");handleError(error)}else{var getMockJson=generateNewMeetupMockData(meetup_api_key);getMockJson.then(function(e){writeNewData(JSON.stringify(e,null,2)).then(function(){console.log("Successfully wrote new data to target file"),process.exit(0)},handleError)},handleError)}
