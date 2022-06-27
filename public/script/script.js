getCountry();
// Fetch API
async function fetchData() {
    let fetchValue = document.getElementById("kenteken").value;
    const url = "https://api.overheid.io/voertuiggegevens/" + fetchValue;
    let response = await fetch(url, {method:"GET", headers: {"ovio-api-key": "773164d38a56bd1212a472e6f01210a124120d654e5c4ae8c67a1b7dbefbcca5"}});
    let fetchLog = await response.json();

    if(fetchLog.error) {
        return false;
    }
    
    if(fetchLog.merk) {
        merkInput.value = fetchLog.merk;
    }

    if(fetchLog.eerste_kleur) {
        kleurInput.value = fetchLog.eerste_kleur;
    }

    if(fetchLog.handelsbenaming) {
        typeInput.value = fetchLog.handelsbenaming;
    }

    if(fetchLog.kentekenplaat) {
        kentekenInput.value = fetchLog.kentekenplaat;
    }

    console.log(fetchLog);
}

const kentekenInput = document.querySelector("input[name='kenteken']");
const merkInput = document.querySelector("input[name='merk']");
const kleurInput = document.querySelector("input[name='kleur']");
const typeInput = document.querySelector("input[name='type']");

kentekenInput.addEventListener("input", fetchData);

   

// GEOLOCATION NAAR LOCATIE
function success(pos) {
  var crd = pos.coords;

  console.log(`location : ${crd.latitude}, ${crd.longitude}`);
  let locatieForm = document.getElementById("locatie");
  locatieForm.setAttribute("value", `${crd.latitude}, ${crd.longitude}`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);



// LONG LATT NAAR LAND
function getCountry() {
    var coords = document.getElementById("longlatt").innerHTML;
    var coordsElement = document.getElementById("longlatt");
    var innerCountry = document.getElementById("country");
    var api_key = "c5cf2c0fbcda465fbcdb2e40af270147";
    var api_url = "https://api.opencagedata.com/geocode/v1/json";

    var request_url = api_url
        + "?"
        + "key=" + api_key
        + "&q=" + encodeURIComponent(coords)
        + "&pretty=1"
        + "&no_annotations=1";


    var request = new XMLHttpRequest();
    request.open("GET", request_url, true);

    request.onload = function() {
        var data = JSON.parse(request.responseText);
        if (request.status === 200){ 
            var country = "no country returned";
            if (data.results[0].components.country != null){
                country = data.results[0].components.country;
                innerCountry.innerHTML = "Locatie: " + data.results[0].components.country;
                coordsElement.style.display = "none";
            }
            console.log("country: " + country);
        } else {
            console.log("unable to geocode! Response code: " + request.status);
            console.log("error msg: " + data.status.message);
        }
    };

    request.onerror = function() {
        console.log("unable to connect to server");
    };
    request.send();
} 