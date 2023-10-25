/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

let sectionId;
let sectionName;
const mySection = document.querySelectorAll("section");
const navbarList = document.querySelector('#navbar__list');
const btn_Add_Section = document.querySelector(".add-section");
const backToTopButton = document.getElementById('back-to-top');
const btn_Del_Section = document.querySelector(".remove-section");
let pureId = [];






mySection.forEach((ele) => {
    sectionId = ele.id;
    sectionName = ele.dataset.nav;

    console.log("id", sectionId);
    console.log("name", sectionName);

    createMenu(sectionId, sectionName);

});


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

btn_Add_Section.addEventListener("click", ()=> {
    // Create a new section and add it to the HTML structure
    const newSection = document.createElement('section');
    let valueSection = 'section ' + (document.querySelectorAll('section').length + 1);
    let secId = 'section-' + (document.querySelectorAll('section').length + 1);

    newSection.id = secId;
    
    newSection.dataset.nav = valueSection;
    // Add content to the new section
    newSection.innerHTML = `
        <div class="landing__container">
            
            <h2>${valueSection}</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

            <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>`
    // Add the new section to your document
    document.querySelector("main").appendChild(newSection);
    createMenu(secId, valueSection);
    pureId.push(secId);
});

// Remove section auto

// collect id from all li a

mySection.forEach(ele => {
    pureId.push(ele.id)
})




btn_Del_Section.addEventListener('click', () => {
    // Check if there are sections to remove
    if (pureId.length > 0) {
        // Get the ID of the last section in the array
        const lastSectionId = pureId[pureId.length - 1];

        // Remove the section
        const section = document.getElementById(lastSectionId);
        if (section) {
            section.remove();
        }
         // Remove the corresponding list item from the menu
        const liItem = document.querySelector(`ul li a[href="#${lastSectionId}"]`);
        if (liItem) {
            liItem.parentElement.remove(); // Removes the <li> element containing the link
        }
        // Remove the last ID from the array
        pureId.pop();
    }
});


// from botton to top page
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional, for smooth scrolling
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) { // Show the button after scrolling down a bit
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// not fixed header when scroll down header. "hide on scroll down
let prevScrollPos = window.pageYOffset;
let timeout;

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('.page__header');

    // Clear the previous timeout, if it exists
    if (timeout) {
        clearTimeout(timeout);
    }

    if (prevScrollPos > currentScrollPos) {
        navbar.style.top = '0';
    } else {
        // Delay hiding the navigation bar for 300 milliseconds (adjust as needed)
        timeout = setTimeout(() => {
            navbar.style.top = '-200px'; // Hide the navigation bar after the delay
        }, 300);
    }

    prevScrollPos = currentScrollPos;
});

/**
 *  algorsim
 * when we down in window currect is big and when up pre is bigest
 *  when up -> still show fixed header
 *  when down -> hide the header by top ele
 * equl two
 */

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function createMenu(sectionId, sectionName) {
    // Add a link to the navigation menu
    const navItem = document.createElement('li');
    // navItem.classList = 'menu__link' 
    navItem.innerHTML = `<a href="#${sectionId}" class="menu__link">${sectionName}</a>`;
    navbarList.appendChild(navItem);

    // Scroll to anchor ID using scrollTO event
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                });
            }, 200); // Adjust the delay as needed
        }
    });
});
}

// Add class 'active' to section when near top of viewport
// Function to determine the active section
function setActiveSection() {
    let activeSection = null;

    document.querySelectorAll("section").forEach(section => {
        const menuLink = document.querySelector(`a[href="#${section.id}"]`);
        const rect = section.getBoundingClientRect();

        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            if (!activeSection) {
                activeSection = section;
                section.classList.add('your-active-class');
                menuLink.classList.add('active');
            } else {
                section.classList.remove('your-active-class');
                menuLink.classList.remove('active');
            }
        } else {
            section.classList.remove('your-active-class');
            menuLink.classList.remove('active');
        }
    });
}

// Remove 'active' class from all sections initially
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll("section").forEach(section => {
        section.classList.remove('your-active-class');
    });
});

// add section click by user



/**
 * End Main Functions
 * Begin Events
 * 
*/
// Add an event listener for scrolling
window.addEventListener('scroll', setActiveSection);