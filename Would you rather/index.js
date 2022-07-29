// --------------------------------------------- api functions -----------------------------------//

function update_clicks(left_clicks, right_clicks) {
  let xhttp = new XMLHttpRequest();
  let question_id = quiz[random_array[quiz_options_index]].id;
  random_array[quiz_options_index] = undefined;

  let updateQuestion = {
    questionID: {
      S: question_id,
    },
    LeftClicks: {
      N: left_clicks,
    },
    RightClicks: {
      N: right_clicks,
    },
  };

  const API_ENDPOINT_UPDATE_QUESTION_AND_CLICKS = `https://btupg6byhi.execute-api.us-east-1.amazonaws.com/v1`;
  xhttp.open("POST", API_ENDPOINT_UPDATE_QUESTION_AND_CLICKS, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(updateQuestion));
}

// get num of clicks for each question
function get_clicks(click) {
  let xhttp = new XMLHttpRequest();

  let num_of_question = quiz[random_array[quiz_options_index]].id;
  // random_array[quiz_options_index] = undefined;

  const API_ENDPOINT_NUM_OF_CLICKS = `https://t9s00s6rwh.execute-api.us-east-1.amazonaws.com/v1/-question_id-?questionID=${num_of_question}/`;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // get clicks from DB
      let data = xhttp.responseText;
      data = data.replaceAll("[", "");
      data = data.replaceAll(",", " ");
      data = data.replaceAll("]", "");
      data = data.replaceAll('"', "");
      data = data.split(" ");
      let leftClicks = data[0];
      let rightClicks = data[1];

      let left_click = 0;
      let right_click = 0;
      if (click == 1) {
        left_click = 1;
        right_click = 0;
      } else {
        left_click = 0;
        right_click = 1;
      }
      left_click += parseInt(leftClicks);
      right_click += parseInt(rightClicks);

      update_clicks(left_click, right_click);
      // sleep for 1/2 sec
      // async () => {
      //   await sleep(500);
      // };

      let numOfQuestion = quiz_options_index;
      numOfQuestion++;

      // show chert
      let xValues = ["Left clicks", "right clicks"];
      let yValues = [parseInt(left_click), parseInt(right_click)];
      var barColors = ["red", "blue"];
      let chartStr = `<canvas id="clicksChart"></canvas>`;
      $("#clicksChartInsert").html(chartStr);

      new Chart("clicksChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [
            {
              beginAtZero: true,
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          title: {
            display: true,
            text:
              "Left clicks VS right clicks, question: " +
              numOfQuestion +
              "/" +
              random_array.length,
          },
        },
      });
    }
  };
  xhttp.open("GET", API_ENDPOINT_NUM_OF_CLICKS), true;
  xhttp.send();
}
// --------------------------------------------- end api functions -----------------------------------//

// --------------------------------------------- quiz functions --------------------------------------//
quiz_options_index = 0;
let random_array;

// genrate a arry with randoms number betwwen 0 to "num_of_questions" (in this case 50)
function random_answers(num_of_questions) {
  let list_random = [];
  let flag = false;
  while (list_random.length != num_of_questions) {
    let random = Math.floor(Math.random() * num_of_questions) + 1;
    for (let i = 0; i < list_random.length; i++) {
      if (list_random[i] == random) flag = true;
    }
    if (flag == false) {
      list_random.push(random);
    } else {
      flag = false;
    }
  }
  return list_random;
}

function show_quiz() {
  let str = `<div class = "answers">

   <button class = "left_answers" id = "left" type="button" onclick="get_clicks(${1})">
  ${quiz[random_array[quiz_options_index]].left}</button>`;

  str += `<button class = "right_answers" id = "right" type="button" onclick="get_clicks(${2})">
  ${quiz[random_array[quiz_options_index]].right}</button> </div>`;
  $("#insert_questions").html(str);
}
// init all parameters on refrash or loading the page
function start_quiz() {
  quiz_options_index = 0;
  random_array = random_answers(50);
  show_quiz(random_array);
}
// uptade parameters on clicking next
$(document).ready(function () {
  $("#nextBtn").click(function () {
    if (quiz_options_index < 49) {
      quiz_options_index++;
    }
    show_quiz();
  });

  $("#prevBtn").click(function () {
    if (quiz_options_index > 0) {
      quiz_options_index--;
    }
    show_quiz();
  });
});

// --------------------------------------------- end quiz functions -----------------------------------//
// --------------------------------------------- quiz questions ---------------------------------------//
const quiz = {
  1: {
    id: "1",
    left: "go into the past and meet your ancestors?",
    right: "go into the future and meet your great-great-grandchildren?",
  },
  2: {
    id: "2",
    left: "have more time?",
    right: "have more money?",
  },
  3: {
    id: "3",
    left: "have a rewind button?",
    right: "pause button on your life?",
  },
  4: {
    id: "4",
    left: "be able to talk with the animals?",
    right: "speak all foreign languages?",
  },
  5: {
    id: "5",
    left: "win the lottery?",
    right: "live twice as long?",
  },
  6: {
    id: "6",
    left: "feel worse if no one showed up to your wedding?",
    right: "no one showed up to your funeral?",
  },
  7: {
    id: "7",
    left: "be without internet for a week?",
    right: "without your phone for a week?",
  },
  8: {
    id: "8",
    left: "meet Ben Gurion?",
    right: "meet the current president?",
  },
  9: {
    id: "9",
    left: "lose your vision?",
    right: "lose your hearing?",
  },
  10: {
    id: "10",
    left: "work more hours per day, but fewer days?",
    right: "work fewer hours per day, but more days?",
  },
  11: {
    id: "11",
    left: "listen to music from the ’70s?",
    right: "listen to music from today?",
  },
  12: {
    id: "12",
    left: "become someone else?",
    right: "just stay you?",
  },
  13: {
    id: "13",
    left: "be Batman?",
    right: "be Spiderman?",
  },
  14: {
    id: "14",
    left: "be stuck on a broken ski lift?",
    right: " a broken elevator?",
  },
  15: {
    id: "15",
    left: "receive money?",
    right: "receive gifts?",
  },
  16: {
    id: "16",
    left: "go to a movie alone?",
    right: "go to dinner alone?",
  },
  17: {
    id: "17",
    left: "always say everything on your mind?",
    right: "never speak again?",
  },
  18: {
    id: "18",
    left: "make a phone call?",
    right: "send a text?",
  },
  19: {
    id: "19",
    left: "read an awesome book?",
    right: "watch a good movie?",
  },
  20: {
    id: "20",
    left: "be the most popular person at work?",
    right: "be the smartest person at work?",
  },
  21: {
    id: "21",
    left: "put a stop to war?",
    right: "end world hunger?",
  },
  22: {
    id: "22",
    left: "spend the night in a luxury hotel room?",
    right: "camping surrounded by beautiful scenery?",
  },
  23: {
    id: "23",
    left: "explore space?",
    right: "explore the ocean?",
  },
  24: {
    id: "24",
    left: "go deep-sea diving?",
    right: "go to bungee jumping?",
  },
  25: {
    id: "25",
    left: "be a kid your whole life?",
    right: "an adult your whole life?",
  },
  26: {
    id: "26",
    left: "go on a cruise with friends?",
    right: "go on a cruise with spouse?",
  },
  27: {
    id: "27",
    left: "lose your keys?",
    right: "or your cell phone?",
  },
  28: {
    id: "28",
    left: "eat a meal of cow tongue?",
    right: "eat a meal of octopus?",
  },
  29: {
    id: "29",
    left: "have x-ray vision?",
    right: "have magnified hearing?",
  },
  30: {
    id: "30",
    left: "work in a group?",
    right: "work alone?",
  },
  31: {
    id: "31",
    left: "be stuck on an island alone?",
    right: "stuck on an island with someone who talks incessantly?",
  },
  32: {
    id: "32",
    left: "be too hot?",
    right: "too cold?",
  },
  33: {
    id: "33",
    left: "When you’re old, would you rather die before",
    right: "or after your spouse?",
  },
  34: {
    id: "34",
    left: "have a cook?",
    right: "have a maid?",
  },
  35: {
    id: "35",
    left: "be the youngest?",
    right: "be the oldest?",
  },
  36: {
    id: "36",
    left: "get rich through hard work?",
    right: "get rich through winning the lottery?",
  },
  37: {
    id: "37",
    left: "have a 10-hour dinner with a headstrong politician from an opposing party?",
    right: "attend a 10-hour concert for a music group you detest?",
  },
  38: {
    id: "38",
    left: "be an Olympic gold medalist?",
    right: "Nobel Peace Prize winner?",
  },
  39: {
    id: "39",
    left: "have a desk job?",
    right: "have an outdoor job?",
  },
  40: {
    id: "40",
    left: "live at the top of a tall NYC apartment building?",
    right: "live at the top of a mountain?",
  },
  41: {
    id: "41",
    left: "have Rambo on your side?",
    right: "have the Terminator on your side?",
  },
  42: {
    id: "42",
    left: "be proposed to in private?",
    right: "be proposed in front of family and friends?",
  },
  43: {
    id: "43",
    left: "have to sew all your clothes?",
    right: "grow your own food?",
  },
  44: {
    id: "44",
    left: "hear the good news first?",
    right: "hear the bad news first?",
  },
  45: {
    id: "45",
    left: "be your own boss?",
    right: "work for someone else?",
  },
  46: {
    id: "46",
    left: "have nosy neighbors?",
    right: "have noisy neighbors?",
  },
  47: {
    id: "47",
    left: "be on a survival reality show?",
    right: "be on a dating game show?",
  },
  48: {
    id: "48",
    left: "be too busy?",
    right: "be bored?",
  },
  49: {
    id: "49",
    left: "watch the big game at home?",
    right: "watch the big game live at the stadium?",
  },
  50: {
    id: "50",
    left: "spend the day with your favorite athlete?",
    right: "spend the day with your favorite movie star?",
  },
};

// --------------------------------------------- end quiz questions -----------------------------------//

// --------------------------------------------- init db -----------------------------------//

// function init_all_db(index) {
//   let xhttp = new XMLHttpRequest();

//   let updateQuestion = {
//     questionID: {
//       S: index,
//     },
//     LeftClicks: {
//       N: "0",
//     },
//     RightClicks: {
//       N: "0",
//     },
//   };

//   const API_ENDPOINT_UPDATE_QUESTION_AND_CLICKS = `https://btupg6byhi.execute-api.us-east-1.amazonaws.com/v1`;
//   xhttp.open("POST", API_ENDPOINT_UPDATE_QUESTION_AND_CLICKS, true);
//   xhttp.setRequestHeader("Content-Type", "application/json");
//   xhttp.send(JSON.stringify(updateQuestion));
// }
// function start_init() {
//   for (let i = 1; i <= 50; i++) {
//     sleep = (milliseconds) =>
//       new Promise((resolve) => setTimeout(resolve, milliseconds));

//     //        V  Must add this async keyword
//     sayHi = async () => {
//       // V Must include await
//       await sleep(1000); // Sleep 1000 milliseconds (1 second)
//     };
//     init_all_db(i);
//   }
// }

// --------------------------------------------- end init db -----------------------------------//
