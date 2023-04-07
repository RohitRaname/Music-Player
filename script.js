"use strict";

// TODO LISt
// play
// pause
// next
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
const musicContainer = document.querySelector("body");

const musicList = document.querySelector(".music__list");
const musicSearchContainer = document.querySelector(".music__search");
const musicSearchInput = document.querySelector(".music__search-input");

const audio = document.querySelector("audio");

const imgEl = document.querySelector(".music__img");
const imgEl = document.querySelector(".music");

mp3
const nameEL mp3 document.querySelector(".music__name");
const authorEl = document.querySelector(".music__author");

let musicItems;

// const curTimeEl = document.querySelector(".music__time-start");
// const durationEl = document.querySelector(".music__time-end");

// const btns = document.querySelector(".music__icons");
// const prevBtn = document.querySelector(".music__icon-box--prev");
// const pauseBtn = document.querySelector(".music__icon-box--pause");
// const nextBtn = document.querySelector(".music__icon-box--next");

// const audioProgressContainer = document.querySelector(
//   ".progressBar__container--audio"
// );
// const audioProgressBar = document.querySelector(".progressBar--audio");
// const volumeProgressBar = document.querySelector(".progressBar--volume");
// const speedVolumeProgressBar = document.querySelector(".progressBar--speed");

// const optionEls = [...document.querySelectorAll(".option")];

// let musicCollection = [
//   {
//     name: "the cooler guard",
//     author: "Mine the way",
//     img: "1.jpg",
//     music: "1.mp3",
    
//   },
//   {
//     name: "the wonder galaxy",
//     author: "Zero to Zero->Infinity",
//     img: "2.jpg",
//     music: "2.mp3",
    
//   },
//   {
//     name: "Way of my life",
//     author: "The serial me",
//     img: "3.jpg",
//     music: "3.mp3",
    
//   },
//   {
//     name: "we are puching back",
//     author: "loki",
//     img: "4.jpg",
//     music: "4.mp3",
    
//   },
//   {
//     name: "Under the house",
//     author: "Rohit me",
//     img: "5.jpg",
//     music: "5.mp3",
    
//   },
//   {
//     name: "Consistency is the key",
//     author: "Ithink so",
//     img: "6.jpg",
//     music: "6.mp3",
    
//   },
//   {
//     name: "Soniis puppy",
//     author: "creator",
//     img: "7.jpg",
//     music: "7.mp3",
    
//   },
//   {
//     name: " puppy",
//     author: "tyler",
//     img: "8.jpg",
//     music: "8.mp3",
    
//   },
//   {
//     name: "do everydat",
//     author: "me the great",
//     img: "9.jpg",
//     music: "9.mp3",
    
//   },
//   {
//     name: "this is what we are ",
//     author: "waiting",
//     img: "10.jpg",
//     music: "10.mp3",
    
//   },
//   {
//     name: "monet",
//     author: "isGreat",
//     img: "11.jpg",
//     music: "11.mp3",
    
//   },
//   {
//     name: "hand recovery",
//     author: "must happen",
//     img: "12.jpg",
//     music: "12.mp3",
    
//   },
//   {
//     name: "yes i am",
//     author: "the beast",
//     img: "13.jpg",
//     music: "13.mp3",
    
//   },
//   {
//     name: "who i am",
//     author: "the one",
//     img: "14.jpg",
//     music: "14.mp3",
    
//   },
//   {
//     name: "anime",
//     author: "is great yep",
//     img: "15.jpg",
//     music: "15.mp3",
    
//   },
// ];

// const savedMusicCollection = musicCollection;

// let totalMusic = musicCollection.length;

// // TODO type pause in changemusic means current

// // these global variable are so helpful

// let songIndex = 0;

// let isPlaying = false;

// // -- HELPER FUNCTION


// function playSong() {
//   isPlaying = true;
// }


// update all the value greater than 100 to 100 


db.students.updateMany(
    {
    "grades.grade":{$gte:85}
    },
    {
        $set: {"grades.$[el].mean":100}
    }
    ,{
        arrayFilters:[{
            "el.grade":{$gte:85}
        }]
    }
    )