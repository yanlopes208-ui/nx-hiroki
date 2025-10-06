export default async function handler(req, res) {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Use ?username=NomeDoUsuario" });
    }

    // Tentar endpoint moderno
    const userInfoRes = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
    });

    const userInfoJson = await userInfoRes.json();
    let user = userInfoJson.data[0] || null;
    let isBanned = false;

    // Se não encontrou no endpoint moderno, tentar endpoint legacy (ban permanente provável)
    if (!user) {
      const legacyRes = await fetch(`https://api.roblox.com/users/get-by-username?username=${encodeURIComponent(username)}`);
      const legacyJson = await legacyRes.json();
      if (!legacyJson.Id) {
        // Usuário não encontrado → ban permanente
        isBanned = true;
        return res.status(200).json({
          id: null,
          name: username,
          displayName: null,
          avatar: null,
          description: null,
          created: null,
          isBanned: true
        });
      } else {
        user = { id: legacyJson.Id, name: legacyJson.Username, displayName: legacyJson.Username };
      }
    }

    const userId = user.id;

    // Avatar completo (corpo inteiro)
    const avatarRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`
    );
    const avatarJson = await avatarRes.json();
    const avatarUrl = avatarJson.data[0]?.imageUrl || null;

    // Profile
    const profileRes = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    const profileJson = await profileRes.json();

    // Formatar created
    let createdFormatted = "";
    if (profileJson.created) {
      const d = new Date(profileJson.created);
      const pad = (n) => n.toString().padStart(2, "0");
      createdFormatted = `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    }

    res.status(200).json({
      id: userId,
      name: user.name,
      displayName: user.displayName,
      avatar: avatarUrl, // avatar completo
      description: profileJson.description || "",
      created: createdFormatted,
      isBanned // true se ban permanente
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno", details: err.message });
  }
}
