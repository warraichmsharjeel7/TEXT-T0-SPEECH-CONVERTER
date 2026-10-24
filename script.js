let speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("#voiceSelect");
const listenBtn = document.querySelector("#listenBtn");
const textarea = document.querySelector("textarea");

// Voices load karne ka function
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    if (voices.length === 0) return;

    voices.forEach((voice, i) => {
        const option = new Option(`${voice.name} (${voice.lang})`, i);
        voiceSelect.add(option);
    });

    // Default voice set karein
    speech.voice = voices[0];
}

// System voices change hone par reload karein
if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

// Initial load
populateVoices();

// Dropdown se voice change karein
voiceSelect.addEventListener("change", () => {
    if (voices[voiceSelect.value]) {
        speech.voice = voices[voiceSelect.value];
    }
});

// Play Button click event
listenBtn.addEventListener("click", () => {
    const textToSpeak = textarea.value.trim();

    if (textToSpeak === "") {
        alert("Meharbani karke pehle kuch text type karein! (Please write some text first)");
        return;
    }

    // Pehle se chalne wali speech ko rokein
    window.speechSynthesis.cancel();

    speech.text = textToSpeak;
    window.speechSynthesis.speak(speech);
});