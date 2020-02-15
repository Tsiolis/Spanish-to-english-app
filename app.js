const main = document.querySelector('main');
const changeVoice = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


const boxes = [
    {
      image: './img/table.jpg',
      text: "Table for Two Please",
      spanish: "mesa para dos por favor"
    },
    {
      image: './img/town.jpg',
      text: "Where is the town centre?",
      spanish: "¿dónde está el centro de la ciudad"
    },
    {
      image: './img/thanks.jpg',
      text: "Thank you very much",
      spanish: "muchas gracias"
    },
    {
      image: './img/morning.jpg',
      text: "Good morning",
      spanish: "Buenos Dias"
    },
    {
      image: './img/clock.jpg',
      text: "Good Afternoon",
      spanish: "Buenas tardes"
    },
    {
      image: './img/evening.jpg',
      text: "Good Evening",
      spanish: "buenas noches"
    },
    {
      image: './img/wifi.jpg',
      text: "do you have wifi?",
      spanish: "¿tienes wifi"
    },
    {
      image: './img/question.jpg',
      text: "Can you repeat that",
      spanish: "¿Puedes repetir eso?"
    },
    {
      image: './img/alpha.jpg',
      text: "I don't speak english",
      spanish: "uNo hablo inglés"
    },
    {
      image: './img/under.jpg',
      text: "I don't understand",
      spanish: "No entiendo"
    },
    {
      image: './img/tickets.jpg',
      text: 'Two tickets please',
      spanish: "dos entradas por favor"
    },
    {
      image: './img/taxi.jpg',
      text: 'Where can I get a taxi',
      spanish: "¿dónde puedo conseguir un taxi"
    }
  ];

  boxes.forEach(createBox);

  //Create speech box
  function createBox(item){
    const box = document.createElement('div');

    const{image, text, spanish} = item;

    box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info">${spanish}</p>`;

    box.addEventListener('click', () =>{
      setTextMessage(text);
      speakText();


      //Active 
      box.classList.add('active');
      setTimeout(() => box.classList.remove('active'), 800)
    })

    main.appendChild(box)
  }


//Bring in speech
const message = new SpeechSynthesisUtterance;

  //Store Speech
  let voices = [];

  function getVoices(){
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
      const option = document.createElement('option');

      option.value = voice.name;
      option.innerText = `${voice.name} ${voice.lang}`

      changeVoice.appendChild(option);
    })
  }

  //Set text
  function setTextMessage(text){
    message.text = text;
  }

  //Speak text
  function speakText(){
    speechSynthesis.speak(message);
  }

//Set Voice
function setVoice(e){
message.voice = voices.find(voice => voice.name === e.target.value);
}

//Accent Changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

  //Toggle Text Box
  toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

  //Close Text Box
  closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

  //Change Accent
  changeVoice.addEventListener('change', setVoice);

  //User input read
  readBtn.addEventListener('click', () => {
    setTextMessage(textArea.value);
    speakText();
  })

  getVoices();