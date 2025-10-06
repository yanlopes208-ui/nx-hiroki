export default async function handler(req, res) {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Use ?username=NomeDoUsuario" });
    }

    let user = null;
    let isBanned = false;

    // 1️⃣ Endpoint moderno
    try {
      const userInfoRes = await fetch("https://users.roblox.com/v1/usernames/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
      });
      const userInfoJson = await userInfoRes.json();
      user = userInfoJson.data[0] || null;
    } catch {}

    // 2️⃣ Endpoint legacy
    if (!user) {
      try {
        const legacyRes = await fetch(`https://api.roblox.com/users/get-by-username?username=${encodeURIComponent(username)}`);
        const legacyJson = await legacyRes.json();
        if (!legacyJson.Id) {
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
      } catch {}
    }

    const userId = user.id;

    // 3️⃣ Avatar completo
    const avatarRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`
    );
    const avatarJson = await avatarRes.json();
    let avatarUrl = avatarJson.data[0]?.imageUrl || null;

    // 4️⃣ Profile
    const profileRes = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    const profileJson = await profileRes.json();

    // 5️⃣ Formatar created
    let createdFormatted = "";
    if (profileJson.created) {
      const d = new Date(profileJson.created);
      const pad = (n) => n.toString().padStart(2, "0");
      createdFormatted = `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    }

    // 6️⃣ Heurística aprimorada: detectar avatar de conta banida
const bannedAvatarPatterns = ["180DAY", "30DAY"];
if (avatarUrl && bannedAvatarPatterns.some(p => avatarUrl.includes(p))) {
  isBanned = true;
}

    res.status(200).json({
      id: userId,
      name: user.name,
      displayName: user.displayName,
      avatar: avatarUrl,
      description: profileJson.description || "",
      created: createdFormatted,
      isBanned
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno", details: err.message });
  }
}
