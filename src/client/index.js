import { submitTrip } from './js/app';
//import html from './views/index.html';
//import { handleSubmit } from './js/formHandler'
import './styles/results.scss';
import './styles/style.scss';

import luggage from './views/img/carry-on.png';
import tickets from './views/img/tickets.png';

var luggagePic = document.getElementById('luggage');
luggagePic.src = luggage;

var ticketsPic = document.getElementById('tickets');
ticketsPic.src = tickets;


export {
    submitTrip
    //handleSubmit
};
