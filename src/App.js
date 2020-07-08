import React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList } from './users';
import memoryDataProvider from './memoryDataProvider'
import { APIContext } from "./APIContext";

const dataProvider = new memoryDataProvider({"users" : []});

const App = () => {

  var genparam = {url: "https://demo.grnry.io/com.snowplowanalytics.snowplow/tp2", basicauthusername: "", basicauthpassword: "", verb: "POST", mode: "non-cors", delaymin: "250", delaymax: "2500", bodytemplate: "{\n\"name\": \"${data.name}\",\n\"username\": \"${data.username}\",\n\"email\": \"${data.email}\"\n}", headers: "{\"Content-Type\": \"application/json\"}"}
  genparam.setUrl = (newurl) => {genparam.url = newurl;}
  genparam.setBasicAuthUsername = (basicauthusername) => {genparam.basicauthusername = basicauthusername;}
  genparam.setBasicAuthPassword = (basicauthpassword) => {genparam.basicauthpassword = basicauthpassword;}
  genparam.setVerb = (verb) => {genparam.verb = verb;}
  genparam.setMode = (mode) => {genparam.mode = mode;}
  genparam.setHeaders = (headers) => {genparam.headers = headers;} 
  genparam.setDelaymin = (delaymin) => {genparam.delaymin = delaymin;}
  genparam.setDelaymax = (delaymax) => {genparam.delaymax = delaymax;}
  genparam.setBodytemplate = (bodytemplate) => {genparam.bodytemplate = bodytemplate;}

  return (
    <APIContext.Provider value={genparam}>
      <Admin dataProvider={dataProvider}>
        <Resource name="users" list={UserList} />
      </Admin>
    </APIContext.Provider>
  );
}

export default App;