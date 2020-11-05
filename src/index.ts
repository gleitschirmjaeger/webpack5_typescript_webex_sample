import {init as initWebex} from 'webex';

window.setTimeout(() => {
  // Initialize the SDK and make it available to the window
  const webex = ((window as any).webex = initWebex({
    config: {
      credentials: {
        client_id: 'YOUR_CLIENT_ID',
        redirect_uri: 'https://localhost:8080/index.html',
        scope: 'spark:all spark:kms'
      }
    }
  }));

  webex.once(`ready`, function() {
    if (webex.canAuthorize) {
      // add your logic here. e.g.
      webex.messages.listen()
      .then(() => {
        console.log('listening to message events');
        webex.messages.on('created', (event:any) => console.log(`Got a message:created event:`, event));
      })
      .catch((e:any) => console.error(`Unable to register for message events: ${e}`))
    }
    else {
      webex.authorization.initiateLogin(
        {
          client_id: 'YOUR_CLIENT_ID',
          redirect_uri: 'https://localhost:8080/index.html',
          scope: 'spark-compliance%3Amemberships_read%20spark-admin%3Aresource_groups_read%20meeting%3Arecordings_read%20spark%3Aall%20meeting%3Apreferences_write%20spark-admin%3Apeople_write%20spark-admin%3Aorganizations_read%20spark-admin%3Aplaces_read%20meeting%3Aschedules_write%20spark-compliance%3Ateam_memberships_read%20spark-compliance%3Ateam_memberships_write%20spark-admin%3Adevices_read%20spark-admin%3Ahybrid_clusters_read%20spark-compliance%3Amessages_read%20spark-admin%3Adevices_write%20meeting%3Aschedules_read%20spark-compliance%3Amemberships_write%20identity%3Aplaceonetimepassword_create%20spark-admin%3Aroles_read%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20spark-admin%3Aresource_group_memberships_read%20spark-compliance%3Aevents_read%20spark-admin%3Aresource_group_memberships_write%20spark-compliance%3Arooms_read%20spark-admin%3Acall_qualities_read%20spark-compliance%3Amessages_write%20spark%3Akms%20spark-admin%3Ahybrid_connectors_read%20audit%3Aevents_read%20spark-compliance%3Ateams_read%20spark-admin%3Aplaces_write%20spark-admin%3Alicenses_read%20spark-admin%3Apeople_read'
        }
      )
    }
  });
}, 10000);
 
