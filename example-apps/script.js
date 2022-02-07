let api = ""
let apiKey = ""
let appointmentTypeCode = ""
let bailoutURL = ""
let duration = ""
let locationId = ""
let patientId = ""
let patientKey = ""
let provider1Name = ""
let provider1Id = ""
let provider2Name = ""
let provider2Id = ""
let provider3Name = ""
let provider3Id = ""
let provider4Name = ""
let provider4Id = ""
let reason = ""
let returnURL = ""
let rootId = ""

function getStuff() {
  api = document.getElementById("api")?.value || ""
  apiKey = document.getElementById("apiKey")?.value || ""
  appointmentTypeCode =
    document.getElementById("appointmentTypeCode")?.value || ""
  bailoutURL = document.getElementById("bailoutURL")?.value || ""
  duration = document.getElementById("duration")?.value || ""
  locationId = document.getElementById("locationId")?.value || ""
  patientId = document.getElementById("patientId")?.value || ""
  provider1Name = document.getElementById("provider1Name")?.value || ""
  provider1Id = document.getElementById("provider1Id")?.value || ""
  provider2Name = document.getElementById("provider2Name")?.value || ""
  provider2Id = document.getElementById("provider2Id")?.value || ""
  provider3Name = document.getElementById("provider3Name")?.value || ""
  provider3Id = document.getElementById("provider3Id")?.value || ""
  provider4Name = document.getElementById("provider4Name")?.value || ""
  provider4Id = document.getElementById("provider4Id")?.value || ""
  reason = document.getElementById("reason")?.value || ""
  returnURL = document.getElementById("returnURL")?.value || ""
  rootId = document.getElementById("rootId")?.value || ""
}

function authAndScheduler() {
  getStuff()

  if (!apiKey) {
    console.error("API Key Missing")
  } else {
    const auth = new XMLHttpRequest()
    auth.open("GET", `${api}/Auth?key=${apiKey}&patient=${patientId}`)
    auth.onreadystatechange = function () {
      if (auth.readyState === 4) {
        patientKey = JSON.parse(auth.response).patient_key
        window.location = `./scheduler.html?api=${api}&appointmentTypeCode=${appointmentTypeCode}&bailoutURL=${bailoutURL}&duration=${duration}&locationId=${locationId}&patientId=${patientId}&patientKey=${patientKey}&provider1Name=${provider1Name}&provider1Id=${provider1Id}&provider2Name=${provider2Name}&provider2Id=${provider2Id}&provider3Name=${provider3Name}&provider3Id=${provider3Id}&provider4Name=${provider4Name}&provider4Id=${provider4Id}&reason=${reason}&returnURL=${returnURL}&rootId=${rootId}`
      }
    }
    auth.send()
  }
}
