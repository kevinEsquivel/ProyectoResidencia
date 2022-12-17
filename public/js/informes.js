//! AGregar la sesion publica para poder visualizarce,
//!IMPORTANTE SEGUIR LA MISMO ESTRUCTURA
 const SesionesPublicas=[
  {
    title  : 'DECIMA OCTAVA SESIÓN PÚBLICA', //!Nombre de el VIDEO
    start  : '2022-12-01',                   //!Fecha de subida a youtube
    url:'https://www.youtube.com/watch?v=s3o6L1qOWm8'//!URL del video
  },
  {
    title  : 'DECIMOSÉPTIMA SESIÓN PÚBLICA DE RESOLUCIÓN',
    start  : '2022-10-21',
    url:'https://www.youtube.com/watch?v=ACTavc6HUXk'
  },
  {
    title  : 'DECIMOSEXTA SESIÓN PÚBLICA DE RESOLUCIÓN',
    start  : '2022-10-06',
    url:'https://www.youtube.com/watch?v=2VYo7Bb6qpM'
  },
  {
    title  : 'DECIMOQUINTA SESIÓN PÚBLICA',
    start  : '2022-09-25',
    url:'https://www.youtube.com/watch?v=S8JwO3e2aSU'
  },
  {
    title  : 'DECIMOCUARTA SESIÓN PÚBLICA',
    start  : '2022-09-08',
    url:'https://www.youtube.com/watch?v=yz7-XLPGTDI'
  },
  {
    title  : 'DECIMOTERCERA SESIÓN PÚBLICA',
    start  : '2022-08-25',
    url:'https://www.youtube.com/watch?v=ZtrWJ1XyYhc'
  },
  {
    title  : 'DUODÉCIMA SESIÓN PÚBLICA',
    start  : '2022-08-12',
    url:'https://www.youtube.com/watch?v=-ojaFNfQ6IY'
  },
  {
    title  : 'UNDECIMA SESIÓN PÚBLICA DE RESOLUCIÓN',
    start  : '2022-06-30',
    url:'https://www.youtube.com/watch?v=XiUnmzMTN4Y'
  },
  {
    title  : 'DECIMA SESIÓN PÚBLICA',
    start  : '2022-06-16',
    url  : 'https://www.youtube.com/watch?v=eRfMRh3zHM4',
  },
  {
    title  : 'NOVENA SESIÓN PÚBLICA',
    start  : '2022-05-26',
    url  : 'https://www.youtube.com/watch?v=_bq-cKMtXd8',
  },
  {
    title  : 'OCTAVA SESIÓN PÚBLICA',
    start  : '2022-05-12',
    url  : 'https://www.youtube.com/watch?v=sgqZ61IJZxA',
  },
  {
    title  : 'SÉPTIMA SESIÓN PÚBLICA',
    start  : '2022-04-25',
    url  : 'https://www.youtube.com/watch?v=iiWODYLFZAA',
  },
  {
    title  : 'SEXTA SESIÓN PÚBLICA VIRTUAL',
    start  : '2022-03-24',
    url  : 'https://www.youtube.com/watch?v=rMp5uRmxNIM',
  },
  {
    title  : 'QUINTA SESIÓN PÚBLICA VIRTUAL',
    start  : '2022-03-15',
    url  : 'https://www.youtube.com/watch?v=xa79um4MBhk',
  },
  {
    title  : 'CUARTA SESIÓN PÚBLICA VIRTUAL',
    start  : '2022-03-02',
    url  : 'https://www.youtube.com/watch?v=DwafLz6Irwg',
  },
  {
    title  : 'TERCERA SESIÓN PÚBLICA VIRTUAL',
    start  : '2022-02-03',
    url  : 'https://www.youtube.com/watch?v=UBbJT5gtZPo',
  },
  {
    title  : 'SEGUNDA SESIÓN PÚBLICA VIRTUAL',
    start  : '2022-01-25',
    url  : 'https://www.youtube.com/watch?v=escEAhbYkGI',
  },
  {
    title  : 'PRIMERA SESIÓN PÚBLICA VIRTUAL',
    start  : '2022-01-20',
    url  : 'https://www.youtube.com/watch?v=rQEwztdvz-A',
  },
];


document.addEventListener('DOMContentLoaded',async function () {
    let calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        contentHeight: 600,
          events: SesionesPublicas,
          eventClick: function(info) {
            info.jsEvent.preventDefault(); // don't let the browser navigate
            if (info.event.url) {
                window.open(info.event.url);
              }
          }
    });
  await calendar.render();
  });


