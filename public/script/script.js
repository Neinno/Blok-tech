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

// fetchData();
   

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