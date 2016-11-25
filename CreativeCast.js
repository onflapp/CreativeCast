AdobeCreativeSDK.init({
    /* 2) Add your Client ID (API Key) */
    clientID: 'c4e128d6bdc44b468863e4d5433c4f5c',
    onError: function(error) {
        /* 3) Handle any global or config errors */
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
