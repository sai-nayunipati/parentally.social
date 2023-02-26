const express = require("express");
const app = express();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});

// This is the middleware. It is used to allow cross origin requests. Need this when setting up
app.use(express.json());

const openai = new OpenAIApi(configuration);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5500"); // Change the origin to your front-end URL
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// POST Request
app.post("/AI", async (req, res) => {
  const userInput = req.body.UserInput;
  console.log(userInput);

  try {
    const text = await AI_Alg(userInput);

    console.log(text);
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// AI Algorithm
async function AI_Alg(userInput) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: userInput,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  return response.data.choices[0].text;
}

app.listen(5000);
