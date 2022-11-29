// async function getClientIPAddress() {
//   const res = await fetch('https://geolocation-db.com/json/');
//   const data = await res.json();

//   return data.IPv4;
// }

// class SessionManagerWorker {
//   static async login(data) {
//     console.log(data);

//     let IPv4: string = await getClientIPAddress();

//     const encryptedPassword = AES.encrypt(
//       data.username, // Message
//       data.password // Key
//     ).toString();

//     console.log(encryptedPassword);

//     const payload = {
//       IPv4,
//       username: data.username,
//       password: encryptedPassword,
//     };

//     console.log(payload);

//     fetch('https://gp-broomfield-neo-server.codedsound.repl.co/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     // const bytes = AES.decrypt(cipher, payload.password);
//   }
// }
