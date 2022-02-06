
/*BY RICHARD CARLSSON FOR "LABB1", JAVASCRIPT PROJECT*/

/*Metrics checked via https://jshint.com/
There are 13 functions in this file.

Function with the largest signature take 2 arguments, while the median is 1.

Largest function has 14 statements in it, while the median is 2.

The most complex function has a cyclomatic complexity value of 6 while the median is 1.

*/

/*TABLE OF CONTENTS*/
/*

PART:
1:SLOW LOAD GIF, SHOWN WHEN NEWORK IS SET TO SLOW 3G
2:SHOWING MENU ONCKLICK AND CHANGE ICON
3:SET DEFAULT CHANNEL TO BEEN SEEN WHEN SITE IS LOADING
4:FETCHING CONTENT FROM SVT CHANNELS

*/

//HOW DO I ARRANGE SO THAT THIS WILL WORK UNDER A FOREACH LOOP FURTHER DOWN?
document.getElementById("showAll").onclick = function() {myFunction()};

//THIS FUNCTION I WANTED TO INCLUDE MY OUTPUT BELOW AT ROW 111 AND 176 (TO SHOW ALL INFO FROM DATA.START OR POST.START)
function myFunction() {
    //Output += `<li class="test";>${hours}:${min}</li>` + `<div>${post.name}<br>${post.description}</div><hr>`;
    //document.getElementById('program').innerHTML = Output;

  document.getElementById("showAll").innerHTML = "N/A";

  
}



//PART 1, SLOW LOAD GIF, SHOWN WHEN NEWORK IS SET TO SLOW 3G
window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
});
//PART 2, SHOWING MENU ONCKLICK AND CHANGE ICON
document.querySelector('.menu-icon').addEventListener('click', function () {
    const content = document.querySelector('.menu');
    content.classList.toggle('visible');


    //CHANGE ICON ONCLICK (I USE FAS FA-TIMES WHEN MENU OPEN)
    const menuIcon = document.querySelector('#icon');
    if (menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');

    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');

    }
});



//PART 3, SET DEFAULT CHANNEL TO BEEN SEEN WHEN SITE IS LOADING
document.getElementById('js-title').innerHTML = "SVT 1";
fetch("/data/SVT 1.json")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        //SORTING DATE BEFORE "PRINTING"
        data.sort(function (a, b) {
            return new Date(a.start) - new Date(b.start);
        });

        //APPEND PREPARING
        Output = +'';


        //CALLBACK FUNCTION, FOREACH START HERE
        data.forEach(function (post) {

            //GET DATE & TIME FROM JSON

            let myTime = new Date(post.start);
            let channelTime = myTime;
            let myDay = channelTime.getDay();
            let hoursInt = channelTime.getHours();
            let minInt = channelTime.getHours();

            //CONVERT JSON TIME TO STRING
            hours = channelTime.getHours().toString().replace(/^(\d)$/, '0$1');
            min = channelTime.getMinutes().toString().replace(/^(\d)$/, '0$1');

            //GET CURRENT TIME
            let d = new Date();
            let hInt = d.getHours();
            let mInt = d.getMinutes();


            //(myDay)=SINCE THE JSON FILES IS NOT SYNCED WITH CURRENT TIME AND DAY I HAD TO GIVE FIXED VALUES FOR THIS
            //THERE IS UP TO 2 SIMILAR DATES (DAYS) IN THE JSON FILES, IDENTIFIED AS VALUE 3(10TH) AND 4TH(11TH) 
            if (hoursInt && minInt > hInt - 1 && mInt && myDay === 3) {
                Output += `<li class="test";>${hours}:${min}</li>` + `<div>${post.name}<br><!--Denna ville jag visa vid click men hann inte-->${post.description}</div><hr>`;
            }

            if (myDay === 4) {

                Output += `<li class="test";>Imorgon  ${hours}:${min}</li>` + `<div>${post.name}<br><!--Denna ville jag visa vid click men hann inte-->${post.description}</div><hr>`;
            }
        }); //END FOREACH

        document.getElementById('program').innerHTML = Output;
    })

    //CATCH ANY ERRORS
    .catch(function (err) {
        console.log(err);
    });


//PART 4, FETCHING CONTENT FROM SVT CHANNELS
const setChannel = (channel) => {

    //H1 TITLE TO BE SHOWN ON EACH CLICK
    if (setChannel) {
        document.getElementById('js-title').innerHTML = channel;
    }

    //FETCHING CONTENT FROM JSON
    fetch("/data/" + channel + ".json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            //SORTING DATE BEFORE "PRINTING"
            data.sort(function (a, b) {
                return new Date(a.start) - new Date(b.start);
            });

            //APPEND PREPARING
            Output = +'';


            //CALLBACK FUNCTION, FOREACH START HERE
            data.forEach(function (post) {

                //GET DATE & TIME FROM JSON

                let myTime = new Date(post.start);
                let channelTime = myTime;
                let myDay = channelTime.getDay();
                let hoursInt = channelTime.getHours();
                let minInt = channelTime.getHours();

                //CONVERT JSON TIME TO STRING
                hours = channelTime.getHours().toString().replace(/^(\d)$/, '0$1');
                min = channelTime.getMinutes().toString().replace(/^(\d)$/, '0$1');

                //GET CURRENT TIME
                let d = new Date();
                let hInt = d.getHours();
                let mInt = d.getMinutes();


                //(myDay)=SINCE THE JSON FILES IS NOT SYNCED WITH CURRENT TIME AND DAY I HAD TO GIVE FIXED VALUES FOR THIS
                //THERE IS UP TO 2 SIMILAR DATES (DAYS) IN THE JSON FILES, IDENTIFIED AS VALUE 3(10TH) AND 4TH(11TH) 
                if (hoursInt && minInt > hInt - 1 && mInt && myDay === 3) {
                    Output += `<li class="test";>${hours}:${min}</li>` + `<div>${post.name}<br><!--Denna ville jag visa vid click men hann inte-->${post.description}</div><hr>`;
                }

                if (myDay === 4) {

                    Output += `<li class="test";>Imorgon  ${hours}:${min}</li>` + `<div>${post.name}<br><!--Denna ville jag visa vid click men hann inte-->${post.description}</div><hr>`;
                }
            }); //END FOREACH

            document.getElementById('program').innerHTML = Output;
        })

        //CATCH ANY ERRORS
        .catch(function (err) {
            console.log(err);
        });

}; //END SET CHANNEL



//END OF JS, LABB 1

