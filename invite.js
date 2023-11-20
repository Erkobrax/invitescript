const axios = require('axios');
const token = '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'; // Ваш GitHub Personal Access Token
const org = 'Suvorov-Kamyshnikov'; // Название вашей организации на GitHub
const repoOwner = 'Erkobrax'; // Имя пользователя, владельца репозитория
const repoName = 'invitescript'; // Название репозитория
const filePath = 'usernames.json'; // Путь к JSON файлу в репозитории

axios.get('https://api.github.com/repos/Erkobrax/invitescript/contents/username.json',{
    headers:{
        'Authorization': 'token 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',
        'Accept': 'application/vnd.github.v3.raw'
}
})
.then(response =>{
    const users = JSON.parse(response.data);
    inviteUsers(users); // добавить инвайт
});

function inviteUsers(users) {
    users.forEach(user => {
        if (user.github){
            axios.post('https://api.github.com/orgs/Suvorov-Kamyshnikov/invitations', {
                invitee_id: user.github
            }, {
                headers: {'Authorization': 'token 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'}
                })
                .then(()=> console.log(`Приглашение отправлено пользователю ${user.github}`))
        }
    });
}