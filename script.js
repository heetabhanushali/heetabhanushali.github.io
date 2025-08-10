// ABOUT ME
var links = document.getElementsByClassName("links");
    var subcontents = document.getElementsByClassName("sub-contents");
    function opentab(tabname){
        for(link of links){
            link.classList.remove("active-link");
        }
        for(subcontent of subcontents){
            subcontent.classList.remove("show-this");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("show-this");
    }


// PROJECTS
document.addEventListener("DOMContentLoaded", function () {
    const projectList = document.querySelector(".project-list");
    const scrollLeftBtn = document.querySelector(".scroll-btn.left");
    const scrollRightBtn = document.querySelector(".scroll-btn.right");

    console.log("Script loaded");
    console.log("Project list:", projectList);
    console.log("Left button:", scrollLeftBtn);
    console.log("Right button:", scrollRightBtn);

    if (!projectList || !scrollLeftBtn || !scrollRightBtn) {
        console.error("Could not find required elements");
        return;
    }

    projectList.style.overflowX = 'auto';
            
    const cardWidth = 760; 

    function updateButtonVisibility() {
        const scrollLeft = projectList.scrollLeft;
        const maxScrollLeft = projectList.scrollWidth - projectList.clientWidth;
            
        if (scrollLeft <= 0) {
            scrollLeftBtn.style.display = 'none';
        } else {
            scrollLeftBtn.style.display = 'flex';
        }
            
        if (scrollLeft >= maxScrollLeft - 1) { 
            scrollRightBtn.style.display = 'none';
        } else {
            scrollRightBtn.style.display = 'flex';
        }
    }

    function scrollRight() {
        console.log("Scrolling right");
        projectList.scrollBy({ 
            left: cardWidth, 
            behavior: "smooth" 
        });
    }
 
    function scrollLeft() {
        console.log("Scrolling left");
        projectList.scrollBy({ 
            left: -cardWidth, 
            behavior: "smooth" 
        });
    }

            // Add event listeners with debugging
    scrollRightBtn.addEventListener("click", function(e) {
        console.log("Right button clicked");
        e.preventDefault();
        scrollRight();
    });

    scrollLeftBtn.addEventListener("click", function(e) {
        console.log("Left button clicked");
        e.preventDefault();
        scrollLeft();
    });

    projectList.addEventListener("scroll", updateButtonVisibility);
    updateButtonVisibility();

    console.log("Event listeners added successfully");
});



// CONTACT ME - Fixed version
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const result = document.getElementById('result');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            result.innerHTML = "Please wait..."
            result.style.display = "block";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.style.display = "block";
                    result.style.color = "#4CAF50";
                    result.innerHTML = "Form submitted successfully";
                } else {
                    result.style.display = "block";
                    result.style.color = "#f44336";
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.style.display = "block";
                result.style.color = "#f44336";
                result.innerHTML = "Something went wrong!";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
        });
    }
});