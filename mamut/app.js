window.addEventListener("load", e => {
    registerSW(); 
});

async function registerSW() { 
    if ("serviceWorker" in navigator) { 
      try {
        await navigator.serviceWorker.register("./sw.js"); 
      } catch (e) {
        alert("ServiceWorker registration failed :( Sorry about that."); 
      }
    } else {
      console.log("Service workers are not supported in this browser."); 
    }
}
