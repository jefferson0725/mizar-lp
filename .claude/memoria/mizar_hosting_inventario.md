---
name: mizar-hosting-inventario
description: "Dónde vive producción de grupomizar.com.co, cómo se despliega (manual y automático) y qué hay en hPanel y en la cuenta Hostinger de Sixteam; estado al 2026-09-21"
metadata: 
  node_type: memory
  type: project
  originSessionId: b3a0ceda-6926-40da-b00c-491324f0baa3
  modified: 2026-09-21T22:53:55.830Z
---

**Cuenta Hostinger de Sixteam** (MCP): solo 2 VPS KVM (KVM 4 y KVM 2) + dominios. Sin plan de hosting web. `grupomizar.com.co` NO está en sus dominios.

**Producción = Premium Web Hosting de la clienta** (cuenta mizar.bga@gmail.com, `server1958`, Boston; 20 GB, 2 GB RAM, 1 CPU, 400k inodos, 3 sitios). Se entra a su hPanel como **colaborador** ("los cambios se aplican a su cuenta"): `https://hpanel.hostinger.com/websites/grupomizar.com.co`. Desde ahí: DNS, cron, SSH y claves. Hosting LiteSpeed/Apache, por eso `site/public/.htaccess` funciona.

- **SSH**: `u564846756@82.25.83.112:65002`, raíz del sitio `~/domains/grupomizar.com.co/public_html/`. Claves registradas en hPanel → Acceso SSH: `mac` (2026-07-30, de otra persona) y `mizar-deploy` (2026-09-21, la nuestra: privada en `~/.ssh/mizar_hosting_deploy`, fuera del repo). La contraseña SSH NO se guarda ni se usa (Claude no puede autenticarse con contraseñas); fue pegada en un chat, conviene cambiarla.
- **Git de hPanel** (`/advanced/git`, GitHub/GitLab): despliega el repo tal cual, no compila Astro. No se conectó (daría OAuth en la cuenta de la clienta).
- **DNS**: `@` ALIAS y `www` CNAME → `*.cdn.hstgr.net`; `ftp` A → 82.25.83.112; **`cms` y `api` A → 72.60.67.214 (nuestro VPS)**, donde vive Strapi. El 2026-09-21 ambos daban **502**, por eso el blog se compila vacío.

**Estado (2026-09-21):** primer deploy a producción hecho a mano con `bash .claude/deploy-prod.sh --apply` (tar por SSH, aditivo; en Windows no hay rsync). Guarda antes una copia en `~/backups/public_html-*.tgz` del hosting (deja las 3 últimas). Producción ya sirve Charta, /links y /milote/links; el blog quedó vacío (había 1 post de prueba, `esta-es-una-prueba`, que sigue accesible pero sin enlazar).

**Automatización:** `.github/workflows/deploy.yml` (rsync `--delete-after`, dry-run por defecto en ejecución manual, verifica el build antes de borrar, host key fijada, un deploy a la vez, comprueba rutas al final). Necesita en el repo Samuelbf2001/wEBMIZAR los secrets `SSH_PRIVATE_KEY` (contenido de `mizar_hosting_deploy`) y `STRAPI_URL`, que pone el usuario a mano (Claude no pega claves en formularios). Un push a `main` que toque `site/**` = deploy a producción.

**Why:** Ernesto quiere montar y automatizar el deploy al hosting de Hostinger.

**How to apply:** trabajar en ramas y fusionar a `main` solo para publicar. Antes de subir con el blog activo, levantar Strapi. Reglas del VPS en el CLAUDE.md global. Ver [[landing_parcelas_charta]].
