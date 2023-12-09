const SongEvents = require('./songEvents.js');
const CreatorEvents = require('./creatorEvents.js');
require('dotenv').config();

async function main(){
    await SongEvents.SongEvents();
    await CreatorEvents.CreatorEvents();
    console.log("Sleeping")
    await setTimeout(async ()=>{await main()}, parseInt(process.env.interval));    
}

main();