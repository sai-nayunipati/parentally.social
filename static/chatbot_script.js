console.log("test");
window.onload = () => {
  let UserInput = document.getElementById("UserInput");
  let Button = document.getElementById("Button");

  let botResponse = "";
  Button.addEventListener("click", async (event) => {
    event.preventDefault();
    let UserInput = document.getElementById("UserInput");
    console.log(UserInput.value);

    try {
      const response = await fetch(
        "https://chatbot-backend-7wtr.onrender.com/AI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserInput: UserInput.value }),
        }
      );
      const data = await response.json();
      botResponse = await data.text;
      displayBotResponse(botResponse);
    } catch (error) {
      console.error(error);
    }
  });
};

const displayBotResponse = (botResponse) => {
  console.log(botResponse);
  let BotResponse = document.querySelector("#botResponse");
  BotResponse.innerHTML = botResponse;
  BotResponse.style.display = "block";
};
const close = () => {
  let close = document.querySelector(".close");
  close.addEventListener("click", () => {
    let chat = document.querySelector("#UserInput");
    chat.style.display = "none";
    let rectangle = document.querySelector(".rectangle");
    rectangle.style.display = "none";
    let botResponse = document.querySelector("#botResponse");
    botResponse.style.display = "none";
    let userInput = document.querySelector("#UserInput");
    userInput.style.display = "none";
  });
};

// Removing the comments every 10 seconds
