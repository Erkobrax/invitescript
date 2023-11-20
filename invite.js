const axios = require('axios');
const {Octokit} = require("@octokit/core");
const octokit = new Octokit({ auth: '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' });
const org = 'Suvorov-Kamyshnikov'; // Название вашей организации на GitHub
const repoOwner = 'Erkobrax'; // Имя пользователя, владельца репозитория
const repoName = 'invitescript'; // Название репозитория
const filePath = 'usernames.json'; // Путь к JSON файлу в репозитории

octokit.request(`GET /repos/${org}/${repoName}/contents/${filePath}`)
.then(response =>{
    const users = JSON.parse(JSON.stringify(response.data));
    inviteUsers(users);
});
function inviteUsers(users) {
    users.forEach(user => {
        if (user.github) {
            axios.get(`https://api.github.com/users/${user.github}`)
                .then(response => {
                    const profileuser = JSON.parse(JSON.stringify(response.data))
                    const user_id = profileuser.id // Может высылать инвайты только по почте или id, по никнему не может
                    octokit.request(`POST /orgs/${org}/invitations`, {
                        invitee_id: user_id,
                        role: 'direct_member',
                    })
                        .then(() => console.log(`Приглашение отправлено пользователю ${user.github}`))
                        .catch(error => {
                            console.error('Ошибка при отправке приглашения:', error);
                        });
                });
        }
    });
}