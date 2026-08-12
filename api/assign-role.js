export default async function handler(req, res) {
    // Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
        const GUILD_ID = '1534955507394023567';

        // Roles progresivos según cantidad de productos
        const ROLE_TIERS = [
            { minProducts: 5, roleId: '1535298561514934393' },  // 💸 · Clientes +5
            { minProducts: 3, roleId: '1535296308036763648' },  // 💸 · Clientes +3
            { minProducts: 2, roleId: '1535296189992403045' },  // 💸 · Clientes +2
            { minProducts: 1, roleId: '1535296042575073371' },  // 💵 · Clientes
        ];

        const ALL_ROLE_IDS = ROLE_TIERS.map(t => t.roleId);

        if (!BOT_TOKEN) {
            return res.status(500).json({
                error: 'DISCORD_BOT_TOKEN no está configurado en Vercel'
            });
        }

        const { discordUserId, productCount } = req.body;

        if (!discordUserId) {
            return res.status(400).json({ error: 'Falta el ID de Discord del usuario' });
        }

        if (typeof productCount !== 'number' || productCount < 1) {
            return res.status(400).json({ error: 'Cantidad de productos inválida' });
        }

        // Determinar qué rol asignar según la cantidad de productos
        let targetRole = null;
        for (const tier of ROLE_TIERS) {
            if (productCount >= tier.minProducts) {
                targetRole = tier;
                break;
            }
        }

        if (!targetRole) {
            return res.status(200).json({ message: 'No hay rol para asignar', assigned: false });
        }

        const discordAPIBase = `https://discord.com/api/v10`;
        const headers = {
            'Authorization': `Bot ${BOT_TOKEN}`,
            'Content-Type': 'application/json'
        };

        // Obtener los roles actuales del miembro
        const memberRes = await fetch(
            `${discordAPIBase}/guilds/${GUILD_ID}/members/${discordUserId}`,
            { headers }
        );

        if (!memberRes.ok) {
            const errText = await memberRes.text();
            console.error('Error obteniendo miembro:', errText);
            return res.status(400).json({
                error: 'No se pudo obtener el miembro del servidor. ¿El usuario está en el servidor?',
                details: errText
            });
        }

        const memberData = await memberRes.json();
        const currentRoles = memberData.roles || [];

        // Remover todos los roles de cliente que ya no correspondan
        const rolesToRemove = ALL_ROLE_IDS.filter(
            roleId => roleId !== targetRole.roleId && currentRoles.includes(roleId)
        );

        for (const roleId of rolesToRemove) {
            const removeRes = await fetch(
                `${discordAPIBase}/guilds/${GUILD_ID}/members/${discordUserId}/roles/${roleId}`,
                { method: 'DELETE', headers }
            );
            if (!removeRes.ok) {
                console.error(`Error removiendo rol ${roleId}:`, await removeRes.text());
            }
        }

        // Asignar el rol correspondiente (si no lo tiene ya)
        if (!currentRoles.includes(targetRole.roleId)) {
            const addRes = await fetch(
                `${discordAPIBase}/guilds/${GUILD_ID}/members/${discordUserId}/roles/${targetRole.roleId}`,
                { method: 'PUT', headers }
            );

            if (!addRes.ok) {
                const errText = await addRes.text();
                console.error('Error asignando rol:', errText);
                return res.status(500).json({
                    error: 'Error al asignar el rol',
                    details: errText
                });
            }
        }

        return res.status(200).json({
            assigned: true,
            roleId: targetRole.roleId,
            productCount: productCount,
            removedRoles: rolesToRemove
        });

    } catch (error) {
        console.error('❌ Error en assign-role:', error);
        return res.status(500).json({
            error: error.message || 'Error interno del servidor'
        });
    }
}
