import { submitTrip } from './js/app';
//import html from './views/index.html';
//import { handleSubmit } from './js/formHandler'
import './styles/results.scss';
import './styles/style.scss';

//import './views/img/carry-on.png';
//import './views/img/tickets.png';
import luggage from './views/img/carry-on.png';
import tickets from './views/img/tickets.png';

var luggagePic = document.getElementById('luggage');
luggagePic.src = luggage;

var ticketsPic = document.getElementById('tickets');
ticketsPic.src = tickets;

console.log(checkForUrl);

export {
    submitTrip,
    //handleSubmit
}
