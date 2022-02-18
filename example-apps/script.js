let api = ""
let apiKey = ""
let appointmentCodingSystem = ""
let appointmentCodingCode = ""
let appointmentTypeDisplay = ""
let bailoutURL = ""
let duration = ""
let locationId = ""
let patientId = ""
let patientKey = ""
let provider1Id = ""
let provider2Id = ""
let provider3Id = ""
let provider4Id = ""
let description = ""
let returnURL = ""
let rootId = ""
let brandColor = ""
let accentColor = ""

function getStuff() {
  api = document.getElementById("api")?.value || ""
  apiKey = document.getElementById("apiKey")?.value || ""
  appointmentCodingSystem =
    document.getElementById("appointmentCodingSystem")?.value || ""
  appointmentCodingCode =
    document.getElementById("appointmentCodingCode")?.value || ""
  appointmentTypeDisplay =
    document.getElementById("appointmentTypeDisplay")?.value || ""
  bailoutURL = document.getElementById("bailoutURL")?.value || ""
  duration = document.getElementById("duration")?.value || ""
  locationId = document.getElementById("locationId")?.value || ""
  patientId = document.getElementById("patientId")?.value || ""
  provider1Id = document.getElementById("provider1Id")?.value || ""
  provider2Id = document.getElementById("provider2Id")?.value || ""
  provider3Id = document.getElementById("provider3Id")?.value || ""
  provider4Id = document.getElementById("provider4Id")?.value || ""
  description = document.getElementById("description")?.value || ""
  returnURL = document.getElementById("returnURL")?.value || ""
  rootId = document.getElementById("rootId")?.value || ""
  brandColor = document.getElementById("brandColor")?.value || ""
  accentColor = document.getElementById("accentColor")?.value || ""
}

function authAndScheduler() {
  getStuff()

  if (!apiKey) {
    console.error("API Key Missing")
  } else {
    fetch(`${api}/Auth?key=${apiKey}&patient=${patientId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.patient_key) {
          window.location = `./scheduler.html?api=${api}&appointmentCodingSystem=${appointmentCodingSystem}&appointmentCodingCode=${appointmentCodingCode}&appointmentTypeDisplay=${appointmentTypeDisplay}&bailoutURL=${bailoutURL}&duration=${duration}&locationId=${locationId}&patientId=${patientId}&patientKey=${data.patient_key}&provider1Id=${provider1Id}&provider2Id=${provider2Id}&provider3Id=${provider3Id}&provider4Id=${provider4Id}&description=${description}&returnURL=${returnURL}&rootId=${rootId}&brandColor=${brandColor}&accentColor=${accentColor}`
        } else {
          console.error("Patient not found")
        }
      })
  }
}

function authAndAppointments() {
  getStuff()

  if (!apiKey) {
    console.error("API Key Missing")
  } else {
    fetch(`${api}/Auth?key=${apiKey}&patient=${patientId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.patient_key) {
          window.location = `./appointments.html?api=${api}&bailoutURL=${bailoutURL}&locationId=${locationId}&patientId=${patientId}&patientKey=${data.patient_key}&rootId=${rootId}&brandColor=${brandColor}&accentColor=${accentColor}`
        } else {
          console.error("Patient not found")
        }
      })
  }
}
