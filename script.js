document.addEventListener("DOMContentLoaded", function () {
    const idInput = document.getElementById("idInput");
    const checkButton = document.getElementById("checkButton");
    const result = document.getElementById("result");
    const profileScore = document.getElementById("profileScore");
    const comment = document.getElementById("strength");
    const greeting = document.getElementById("greeting");
    const certificate = document.getElementById("certificate");
    const audio = new Audio('warning.mp3');


    checkButton.addEventListener("click", function () {
        const inputId = idInput.value;

        // Fetch data from data.json (you can use any method like fetch or XMLHttpRequest)
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                const profile = data.profiles.find(profile => profile.id === inputId);
                if (profile) {
                    profileScore.textContent = profile.score;
                    comment.textContent = profile.strength;
                    result.classList.remove("hidden");

                    if (profile.score > 700) {
                        // Display greeting and generate certificate
                        greeting.textContent = `Hello, ${profile.name}!`;
                        certificate.textContent = `Congratulations for having ${profile.strength} profile strength`;
                        greeting.classList.remove("hidden");
                        certificate.classList.remove("hidden");
                    } else if (profile.score >= 500){
                        // Display greeting and generate certificate
                        greeting.textContent = `Hello, ${profile.name}!`;
                        certificate.textContent = `You have ${profile.strength} profile strength. Try to improve`;
                        greeting.classList.remove("hidden");
                        certificate.classList.remove("hidden");

                    } else if (profile.score < 500){
                        // Display greeting and generate certificate
                        greeting.textContent = `Hello, ${profile.name}!`;
                        certificate.textContent = `Your profile strength is ${profile.strength} . Try to improve ASAP`;
                        greeting.classList.remove("hidden");
                        certificate.classList.remove("hidden");

                    }  else {
                        greeting.classList.add("hidden");
                        certificate.classList.add("hidden");
                    }

                    // Apply color based on the comment
                    if (profile.strength === "Good") {
                        document.body.className = "Good";
                    } else if (profile.strength === "Average") {
                        document.body.className = "Average";
                    } else {
                        document.body.className = "Bad";
                        // Play the warning sound
                        audio.play();
                        // Make the page blink
                        blinkPage();
                    }
                } else {
                    alert("ID not found");
                }
                function blinkPage() {
                    document.body.style.animation = "blink 1s 4";
                    setTimeout(() => {
                        document.body.style.animation = "";
                    }, 5000);
                }
            });
    });
});
