const API_URL = "https://script.google.com/macros/s/AKfycbyePIScE4o33A_i__X-lVp0F19pt8UOxjdo_gpHQxncxlxKk4hkoBE6xmVhVcSYGCp3/exec";

function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    message.innerHTML = "Checking...";
    message.style.color = "black";

    const callbackName = "loginCallback_" + Date.now();

    window[callbackName] = function(response) {

        if(response.success){

            localStorage.setItem("employee", JSON.stringify(response.employee));

            message.style.color = "green";
            message.innerHTML = "Login Success";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {

            message.style.color = "red";
            message.innerHTML = "Invalid Login";
        }

        delete window[callbackName];
        document.body.removeChild(script);
    };

    const script = document.createElement("script");

    script.src =
        API_URL +
        "?action=login" +
        "&email=" + encodeURIComponent(email) +
        "&password=" + encodeURIComponent(password) +
        "&callback=" + callbackName;

    script.onerror = function() {

        message.style.color = "red";
        message.innerHTML = "Server Error";
    };

    document.body.appendChild(script);
}