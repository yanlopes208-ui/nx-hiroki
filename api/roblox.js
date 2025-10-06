export default async function handler(req, res) {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Use ?username=NomeDoUsuario" });
    }

    // Pegar userId pelo username
    const userInfoRes = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
    });

    const userInfoJson = await userInfoRes.json();
    const user = userInfoJson.data[0];

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const userId = user.id;

    // Avatar/headshot
    const avatarRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`
    );
    const avatarJson = await avatarRes.json();
    const avatarUrl = avatarJson.data[0]?.imageUrl || null;

    // Profile
    const profileRes = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    const profileJson = await profileRes.json();

    // Checar ban (heurística)
    let isPermanent = false;
    try {
      const bansRes = await fetch(`https://accountinformation.roblox.com/v1/users/${userId}/bans`);
      const bansJson = bansRes.ok ? await bansRes.json() : [];
      if (Array.isArray(bansJson)) {
        for (const b of bansJson) {
          const active = b.isActive ?? b.active ?? false;
          const permanent = b.isPermanent ?? b.permanent ?? false;
          const endDate = b.endDate ?? b.expires ?? b.expiration ?? null;
          if (active && (permanent || !endDate)) isPermanent = true;
        }
      }
    } catch (e) {
      // ignora
    }

    // Formatar created: dd/mm/aaaa hh:mm:ss
    let createdFormatted = "";
    if (profileJson.created) {
      const d = new Date(profileJson.created);
      const pad = (n) => n.toString().padStart(2, "0");
      createdFormatted = `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    }

    const response = {
      id: userId,
      name: user.name,
      displayName: user.displayName,
      avatar: avatarUrl,
      description: profileJson.description || "",
      created: createdFormatted,
      isBanned: isPermanent, // agora igual a ban permanente
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno", details: err.message });
  }
}
