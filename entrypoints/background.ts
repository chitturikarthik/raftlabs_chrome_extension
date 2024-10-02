chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'LOGIN') {
    chrome.identity.launchWebAuthFlow(
      {
        url: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=RANDOM_STRING`,
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          sendResponse({ success: false });
        } else {
          // Parse authorization code from the redirect URL
          const code = new URL(redirectUrl).searchParams.get('code');
          
          // Exchange the code for an access token
          fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code,
              redirect_uri: 'YOUR_REDIRECT_URI',
              client_id: 'YOUR_CLIENT_ID',
              client_secret: 'YOUR_CLIENT_SECRET',
            }),
          })
            .then(response => response.json())
            .then(data => {
              if (data.access_token) {
                sendResponse({ success: true, token: data.access_token });
              } else {
                sendResponse({ success: false });
              }
            })
            .catch(() => sendResponse({ success: false }));
        }
      }
    );
    return true;
  }
});
