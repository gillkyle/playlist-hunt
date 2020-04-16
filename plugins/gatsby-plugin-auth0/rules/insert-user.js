/* INSERT USER RULE FOR AUTH0

TODO: add this to recipe

function (user, context, callback) {
  const userId = user.user_id;
  const nickname = user.nickname;
  const email = user.email;
  
  const admin_secret = "<replace-with-secret>";
  const url = "https://playlist-hunt.herokuapp.com/v1/graphql";
  request.post({
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      url: url,
      body:    `{\"query\":\"mutation($userId: String!, $nickname: String, $email: String!,) {\\n          insert_user(\\n            objects: [{ id: $userId, name: $nickname, email: $email }]\\n            on_conflict: {\\n              constraint: user_pkey\\n              update_columns: [last_seen, name, email]\\n            }\\n          ) {\\n            affected_rows\\n          }\\n        }\",\"variables\":{\"userId\":\"${userId}\",\"nickname\":\"${nickname}\",\"email\":\"${email}\"}}`
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}

*/
