/*
  INTIALIZATION  
*/
/* Handle logout button visibility on DOM load */
document.addEventListener('DOMContentLoaded', function(){handleCsdkLogin(false)}, false);

/* Initialize the AdobeCreativeSDK object */
AdobeCreativeSDK.init({
    /* Add your Client ID (API Key) */
    clientID: CONFIG.CSDK_CLIENT_ID,
    /* Add the Asset API */
    API: ["Asset"],
    onError: function(error) {
        console.log(error);
        /* Handle any global or config errors */
        if (error.type === AdobeCreativeSDK.ErrorTypes.AUTHENTICATION) { 
            /* 
            	Note: this error will occur when you try 
                to launch a component without checking if 
            	the user has authorized your app. 
            	
            	From here, you can trigger 
                AdobeCreativeSDK.loginWithRedirect().
            */
            console.log('You must be logged in to use the Creative SDK');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.GLOBAL_CONFIGURATION) { 
            console.log('Please check your configuration');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.SERVER_ERROR) { 
            console.log('Oops, something went wrong');
        }
    }
});


/*
  HELPER FUNCTIONS  
*/
function handleCsdkLogin(triggerLogin, callback) {

    var triggerLogin = triggerLogin || false;

    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        if (csdkAuth.isAuthorized) {
            console.log('Logged in!');

            if (callback) {
                callback();
            }
        } else if (triggerLogin) {
            // Trigger a login
            console.log("handleCsdkLogin()")
            AdobeCreativeSDK.login(function(){handleCsdkLogin(true, callback)});
        }
    });
}

function getCCFolderAssets() {

    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        if (csdkAuth.isAuthorized) {

            var params = {
                path: "/" // defaults to root if not set
            }

            AdobeCreativeSDK.API.Files.getAssets(params, function(result) {
                
                if (result.error) {
                    console.log(result.error);
                    return;
                }

                // If folder is empty
                if (result.data.length === 0) {
                    console.log('is empty');
                    return;
                }

            });
        }
        else if (!csdkAuth.isAuthorized) {
            // User is not logged in, trigger a login
            console.log("getCCFolderAssets false")
            handleCsdkLogin(true, getCCFolderAssets);
        }
    });
}