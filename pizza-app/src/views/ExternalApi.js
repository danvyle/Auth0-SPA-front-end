import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import config from "./auth_config.json";



// const ExternalApi = () => {
//   const {google} = require('googleapis');
//   const people = google.people('v1');
//   return(
// <>
// <script src="https://apis.google.com/js/api.js"></script>
//   <script>
  
//   function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey({config.clientId});
//     return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/people/v1/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   {/* // Make sure the client is loaded and sign-in is complete before calling this method. */}
//   function execute() {
//     return gapi.client.people.people.connections.list({
//       "resourceName": "people/me",
//       "personFields": "names"
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: {config.clientId}});
//   });
// </script>

// <button onclick="authenticate().then(loadClient)">authorize and load</button>
// <button onclick="execute()">Order a pizza</button>
// </>
//   );
// };

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { getTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getTokenSilently();

      const response = await fetch("/api/external", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>External API</h1>
      <button onClick={callApi}>Order a Pizza</button>
      {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
    </>
  );
};

export default ExternalApi;

