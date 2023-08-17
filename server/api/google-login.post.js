// import { OAuth2Client } from "google-auth-library";
// const config = useRuntimeConfig()
// const googleClientId = config.googleClientId
// const client = new OAuth2Client()

// export default defineEventHandler(async event => {
//     const body = await readBody(event)
//     const token = body.token
//     const user = verify(token).catch(console.error)
//     return user
// })



// async function verify(token) {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: googleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
//         // Or, if multiple clients access the backend:
//         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     });
//     const payload = ticket.getPayload()

//     return payload
//     // const userid = payload['sub'];
//     // If request specified a G Suite domain:
//     // const domain = payload['hd'];
// }
