import bridge from '@vkontakte/vk-bridge';

bridge.send("VKWebAppInit", {});

bridge.send(METHOD_NAME, METHOD_PARAMS);

bridge.send("VKWebAppShowNativeAds", {ad_format:"preloader"})
.then(data => console.log(data.result))
.catch(error => console.log(error));