//typing effect

const devTypes = ["Frontend", "Backend", "FullStack", "Freelancer", "Tutor for"];
const wordLoc = document.getElementById('devType');
const devHide = document.getElementById('devHide');

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