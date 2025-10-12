//import firebase db
import { db } from './firebaseConfig.js';
import { ref, push, set, get, query, orderByChild, equalTo, onValue } from 
        "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

function _(x) {
  return document.getElementById(x);
}

//declaring db references
const commentRef = ref(db, "comments");
const ratingRef = ref(db, "ratings");

//get rating items
const stars = document.querySelectorAll('.star');
const avgRating = document.getElementById('avgRating');
const totalRating = document.getElementById('totalRating');

//retrieve comments from db
const loadComments = () => {
  onValue(commentRef, (snapshot) => {
    const commentsArray = snapshot.val();

    if(!commentsArray) return;

    console.log(commentsArray);
  })
}
loadComments();

//retrieve ratings from db
const loadRatings = () => {
  onValue(ratingRef, (snapshot) => {
    const ratingsArray = snapshot.val();

    if(!ratingsArray) return;

    let sortedRatings = Object.values(ratingsArray);

    console.log(sortedRatings);
  })
}
loadRatings();

//function to hold and retun rating
const starRating = () => {
  //promise to be resolved in another function
  return new Promise((resolve) => {
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        
        stars.forEach(s => { s.classList.remove('selected') });
        for(let i=0; i < value; i++){
          stars[i].classList.add('selected');
        }
        resolve(value);
      })
    })
  });
}

//saving rating to db 
const saveRating = async () => {
  const ratingVal = await starRating();

  const newRating = push(ratingRef);
  await set(newRating, {
    rating: ratingVal,
    createdAt: Date.now()
  })
}
saveRating();

//get form fields
const msgBtn = _('msgBtn');
const nameField = _('nameField');
const emailField = _('emailField');
const msgField = _('msgField');
const responseField = _('response');

//sending to database
const addComment = async (name, email, message, dateTime) => {
  const newComment = push(commentRef);
  await set(newComment, {
    name: name,
    email: email,
    message: message,
    dateTime: dateTime
  });
  responseField.textContent = "Comment added. Thank you!";
}

//clicking the send button
msgBtn.addEventListener('click', ()=> {
  //get submitted data
  const nameVal = nameField.value;
  const emailVal = emailField.value;
  const msgVal = msgField.value;

  addComment(nameVal, emailVal, msgVal, Date.now());
  responseField.textContent = 'Comment sent successfully'

  nameField.value = " ";
  emailField.value = " ";
  msgField.value = " ";
});

//typing effect

const devTypes = ["Frontend", "Backend", "FullStack", "Freelancer", "Tutor for"];
const wordLoc = document.getElementById('devType');
// const devHide = document.getElementById('devHide');

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let speed = 120;

const typingAction = () => {
  const currentWord = devTypes[typeIndex];
  
  if (isDeleting) {
    wordLoc.textContent = currentWord.substring(0, charIndex--);
  } else {
    wordLoc.textContent = currentWord.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentWord.length) {
    if (currentWord === "Developer") {
      wordLoc.innerHTML = `${currentWord}`;
    }

    // devWord.style.display = currentWord === "Tutor for" ? "none" : "inline";
    setTimeout(() => isDeleting = true, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % devTypes.length;
  }

  setTimeout(typingAction, isDeleting ? speed / 2 : speed);
}

typingAction();

//navbar display

const menu = document.querySelector('.menu');
const aside = document.querySelector('.aside');

menu.addEventListener('click', () => {
	aside.classList.toggle('active');
  menu.classList.toggle('active');
});

//copyright date

let dt = new Date();
let year = dt.getFullYear();

const displayYear = document.querySelector('#copyYear');
displayYear.innerHTML = year;

//back to top

const toTop = document.querySelector('.to_top');

window.addEventListener('scroll', () => {
  if(window.scrollY > 200) {
    toTop.style.display = 'block';
  }
  else {
    toTop.style.display = 'none';
  }
});

toTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
});