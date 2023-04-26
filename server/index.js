const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors())
const port = 8081;
app.use(express.json());


app.post("/api/addition", (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const pattern = /^[0-9]+$/;
    if (!pattern.test(num1) || !pattern.test(num2)) {
      return res.status(400).json({
        message: "Invalid Input, Only positive values allow",
      });
    }

    let str1 = num1.toString().split("").reverse().join("");
    let str2 = num2.toString().split("").reverse().join("");
    // console.log(str1)
    // console.log(str2)

    let carryString = "_";
    let sumString = "";
    let carry = 0;
    let result = [];

    for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
      let digit1 = parseInt(str1[i]) || 0;
      let digit2 = parseInt(str2[i]) || 0;
      var sum = digit1 + digit2 + carry;

      if (sum > 9) {
        carry = 1;
        sum -= 10;
      } else {
        carry = 0;
      }

      let step = {
        carryString: (carry > 0 ? "1" : "0") + carryString,
        sumString: sum.toString() + sumString,
      };
      result.push(step);
      carryString = (carry > 0 ? "1" : "0") + carryString;
      sumString = sum.toString() + sumString;
    }
    if (carry == 1) {
      let step = {
        carryString: carryString,
        sumString: carry.toString() + sumString,
      };
      result.push(step);
    }
    res.status(200).json(result);
    // console.log(typeof(result))
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is up at port:${port}`);
});
