import { useEffect } from 'react';

const FacebookConnect = () => {
  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : 1091069985658691,
        cookie     : true,
        xfbml      : true,
        version    : 'v20.0'
      });
      FB.getLoginStatus(response => {
        console.log(response);
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);

  return <div id="fb-root"></div>;
};

export default FacebookConnect;
