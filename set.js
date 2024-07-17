const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU9ub3cxTXRQRS9kWTVtd0lOTGtad2lTeWk2R29wVHJ3Ymt5bTJtdWYxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmhTU2JoQjV3N2VJS1V3cFlpVUpkV3VqR3VmSGpmSTlrYXRKVEhLbzZROD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlT3B0MkM0c2JnZXY4WFJCWjI0akFKQUtMdU1kdkI5TGxYRjh6SDZqNUVvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQW1FQy9rVkhlUmc5TitYNkU0bSttZ1RSTGFLNHR0bTE5M1Z6dkRIQkRjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9JZXU2eHJCV1J0bm1HaUVGb3p3WUorSWJTc1VocXI3eCtWeitiQ2RhbWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitQU2xRVzZOcmg2R1NrOWRZNjR6eHgxbW9CZzFPb0xIZ3pkd2c3dzI3aFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEFiZUJBVmZRQ2xuZXVZMndrelVTdkVuanNuUTJWcXRsTUZTa2w3T0NXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXl4T3Z2ZEhFS0FiWnl2cWdsTEw3Syt2aWFrNmdtVnEwUzFxOVBEMHRSTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikd4bmxUdWpWK3V2TXN1cG5Hc3pkUEtEUzU1aUdsWnJodkNpU3VGcFVTSENoRjJBeUlYczl1dmVGemV4S1VFRlNWMElnZXZiblVwWjFZQitWdm9XOUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6IjdPYlJPZkU0Q1ZHY3ZrdEN6SlNKKzZGQzhubVdxc2dTK2JPNmtZVittL289IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IklqRW1NT0FZVHJ5bDZPc1g1UVg3SVEiLCJwaG9uZUlkIjoiNTAyYmRhNWYtMDUzNi00OGU3LWJjNzQtMjAzZTM0MWQwMDgyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndQK3Q1TDVJcWJpZk8vSnROaTE4ekp6cjJMcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXdXVqWHRYQ09VL1N1Z2xaT0tUMDRvQ1VBMUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMjJIS05KRlYiLCJtZSI6eyJpZCI6IjIzNDkxMzI4OTEzODk6NDZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1AvMCtkOEJFUDZLMzdRR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImNUSnhUNG8vQ09xTE5YWFdES2ZLSkFzQzJMWCtvdm9heEFhMVoyRzRDWGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImltbGhUL0V2bWt1WGpMT2tBVlJQYURqVDBQNVQvMlhqeXRubVBDRDhuUzkvU3ZlanQ1ZmxQbHdlYkw1N2Q0WmhORVpGUHhxVk5VZW05Z2xuQnhrcUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvUE54a0YvYzJaZ3BQVGFybHZSVlRYR21Uc1k1NGJPbUdlR3Zob3FTWTloUkxnb3QwQ3YzUjdpR2xrZzFPUTJpbEx6QVZCTjRGQlVtM0pMMFZIVGpCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxMzI4OTEzODk6NDZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWEV5Y1UrS1B3anFpelYxMWd5bnlpUUxBdGkxL3FMNkdzUUd0V2RodUFsNSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTIyMjU0MH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ADEDAYO™",
    NUMERO_OWNER : process.env.OWNER_NUM || "2349132891389",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
