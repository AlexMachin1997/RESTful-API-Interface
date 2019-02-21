const bcrypt = require('bcrypt');

/*
Small hasing function 
- Generates additional data to protect the password e.g. 2213o1iiuhiuh
- Hashes the password
- Combines the salt and user password and presents a hashed password
*/

async function hashing() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('12345', salt);
    console.log(`Salt generated  : ${salt}`); 
    console.log(`Hashed password : ${hash} `);
}

hashing();