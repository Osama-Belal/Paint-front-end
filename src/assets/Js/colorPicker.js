'use script';

function ss(){
  console.log("aaaaaaaaaaaddddddddddddddddddddddddddddddddddddddddaaaaaaasssssssss");
}

function colorPicker(){
  document.getElementById("color-input").addEventListener("focus", function (e) {
    /* { "id" : null, "container" : "the container for widget(required)", "value" : "rgba(1,1,1,1)(required)" } */
    let data = {
      "id": null,
      "container": document.getElementById("colorizer"),
      "value": document.getElementById("color-input").value
    }
    let colorizer = new Gn8Colorize(data);
    colorizer.init().then(
      success => {
        /* { "hex" : "#ff0000", "rgb" : "rgba(255,0,0,1)", "name" : "red", "theme" : "dark | light" } */
        document.getElementById("color-input").value = success.rgb;
        console.log(success);
      }, error => {
        console.log(error);
      }
    );
  });
}
