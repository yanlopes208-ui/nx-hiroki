
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Roblox mini-API'));

async function getUserByUsername(username) {
  // tentativa 1: endpoint simples
  try {
    const r = await axios.get('https://api.roblox.com/users/get-by-username', {
      params: { username }
    });
    if (r.data && r.data.Id) return { id: r.data.Id, username: r.data.Username };
  } catch(e) { /* ignora e tenta o próximo */ }

  // tentativa 2: newer endpoint (batch)
  try {
    const r = await axios.post('https://users.roblox.com/v1/usernames/users', { usernames: [username] });
    const user = r.data && r.data.data && r.data.data[0];
    if (user) return { id: user.id, username: user.name || username };
  } catch(e) { /* ignora */ }

  return null;
}

async function getUserDetails(userId) {
  const r = await axios.get(`https://users.roblox.com/v1/users/${userId}`);
  return r.data; // contém displayName, created, description etc
}

function getAvatarUrl(userId, size='420x420') {
  return `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=${size}&format=Png`;
}

// rota por username
app.get('/api/user/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const u = await getUserByUsername(username);
    if (!u) return res.status(404).json({ error: 'Usuário não encontrado' });

    const details = await getUserDetails(u.id);
    // buscar thumbnail (a API responde com JSON com data array com a url)
    const thumbResp = await axios.get(getAvatarUrl(u.id));
    const thumbData = (thumbResp.data && thumbResp.data.data && thumbResp.data.data[0]) || null;
    const avatarUrl = thumbData ? thumbData.imageUrl : null;

    res.json({
      id: u.id,
      username: u.username,
      displayName: details.displayName,
      created: details.created,
      avatar: avatarUrl,
      raw: details
    });
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
