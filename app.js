const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log('things happened');
    res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('We have big pepperonis!!');
})

app.get('/sum', (req, res) => {
    let c = parseInt(req.query.a) + parseInt(req.query.b);
    console.log(c);
    console.log(req.query.a);
    console.log(req.query.b);
    c = c.toString(10);
    console.log(c);
    const responseText = `The sum of ${req.query.a} and ${req.query.b} is ${c}`;
    res.send(responseText);
})

app.get('/cipher', (req, res) => {
    let text = req.query.text;
    let shift = req.query.shift;
    shift = parseInt(shift);
    textSplat = text.split("");
    console.log(text, shift);

    let responseText = textSplat.map(letter => {
        if (letter != " ") {
            letter = letter.toUpperCase().charCodeAt(0);
            letter = letter + 3;
            
            if (letter > 90) {
                letter = letter - 26;
            }
            console.log(letter);
            letter = String.fromCharCode(letter);
        }
        
        return letter;
    });
    responseText = responseText.join("");
    res.send(responseText);
})

app.get('/lotto', (req, res) => {

})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
  });

  app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
  });

  app.get('/lotto', (req, res) => {
    const { numbers } = req.query; 
  
    // validation: 
    // 1. the numbers array must exist
    // 2. must be an array
    // 3. must be 6 numbers
    // 4. numbers must be between 1 and 20
  
    if(!numbers) {
      return res
        .status(200)
        .send("numbers is required");
    }
  
    if(!Array.isArray(numbers)) {
      return res
        .status(200)
        .send("numbers must be an array");
    }
  
    const guesses = numbers
          .map(n => parseInt(n))
          .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
    
    if(guesses.length != 6) {
      return res
        .status(400)
        .send("numbers must contain 6 integers between 1 and 20");
    }      
  
    // fully validated numbers
  
    // here are the 20 numbers to choose from
    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
  
    //randomly choose 6
    const winningNumbers = [];
    for(let i = 0; i < 6; i++) {
      const ran = Math.floor(Math.random() * stockNumbers.length);
      winningNumbers.push(stockNumbers[ran]);
      stockNumbers.splice(ran, 1);
    }
  
    //compare the guesses to the winning number
    let diff = winningNumbers.filter(n => !guesses.includes(n));
  
    // construct a response
    let responseText;
  
    switch(diff.length){
      case 0: 
        responseText = 'Wow! Unbelievable! You could have won the mega millions!';
        break;
      case 1:   
        responseText = 'Congratulations! You win $100!';
        break;
      case 2:
        responseText = 'Congratulations, you win a free ticket!';
        break;
      default:
        responseText = 'Sorry, you lose';  
    }
  
    res.send(responseText);
  });

  app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });

app.listen(8000, () => {
console.log('Express server is listening on port 8000!');
});