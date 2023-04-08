const toggleButton = document.querySelector('header > button');
const modal = document.querySelector('div.modal');
const modalCloseButton = document.querySelector('div.modal > button.close');
const imageButtons = Array.from(document.querySelectorAll('.grid-item'));
const [voiceSelect, textarea, readButton] = modal.querySelector('div.modal > form').children;

const synth = window.speechSynthesis;
let selectedVoice;

const createVoiceSelectOption = (voice) => {
  const { name, lang } = voice;
  const option = document.createElement('option');
  option.textContent = `${name} ${lang}`;
  option.value = name;
  return option;
};

const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  synth.speak(utterance);
};

window.addEventListener('load', () => {
  synth.getVoices().forEach((voice) => {
    voiceSelect.append(createVoiceSelectOption(voice));
    if (voice.default) {
      selectedVoice = voice;
    }
  });
});

voiceSelect.addEventListener('input', (e) => {
  const voiceName = e.target.value;
  selectedVoice = synth.getVoices().find((voice) => voice.name === voiceName);
});

readButton.addEventListener('click', () => {
  const text = textarea.value;
  speakText(text);
});

imageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const text = button.querySelector('p').textContent;
    speakText(text);
  });
});

[toggleButton, modalCloseButton].forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.toggle('show');
  });
});
