---
name: landing-parcelas-charta
description: "Landing /parcelas-charta (2026-09-15): decisiones, supuestos por confirmar y dónde están los originales"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7cabdd24-2aa7-4016-97a9-aa9c64bfd157
  modified: 2026-09-16T02:45:19.623Z
---

Landing de Parcelas campestres Charta creada el 2026-09-15 en la rama `entrega-cliente` (commit 25d3bed, sin push). Ruta `/parcelas-charta`, reutiliza el slug `parcelas-charta` de `proyectos.ts` (antes oculto). Estructura igual a Mirador: `LandingReact` + `.theme-charta` + `site/src/landing/charta/`.

**Supuestos que Ernesto/Juliana deben confirmar:**
- WhatsApp de la landing = 573112658552 (la línea de Santander usada en Mirador/Laureles/Terrazas), no la general.
- El pin de Maps del brief (maps.app.goo.gl/958kctt7fkMLMWqm6) resuelve a "Villas del Sol", 7.2793889,-72.9642778, Charta.
- Mapeo de videos del Drive: DJI_0952 = hero de fondo; 2.mov = clip vertical de amanecer; "Pantalla dividida Angélica" = recorrido con cliente (sección financiación).

**Originales** (no están en el repo, pesan 270 MB): `C:\Users\samue\Downloads\drive-download-20260916T022309Z-1-001\` (HEIC, MP4/MOV y el brief `Web grupo Mizar.docx`).

**Why:** el brief del cliente llegó como .docx con links de Drive; la conversión HEIC→JPG y la recodificación de video se hicieron con ffmpeg 8.1 (magick/python no están instalados en esta máquina; Playwright sí, pero sin navegadores descargados).

**How to apply:** si piden cambios en Charta, editar `site/src/landing/charta/*` y el bloque `.theme-charta` en `site/src/landing/index.css`; el deploy a producción solo se dispara al hacer push a `main`. Ver también [[mizar_client_brief_20260701]].

**Página /links (2026-09-16, commit 816b04b):** réplica del Linktree de @mizar.col (IG y TikTok @mizar.col, FB mizar.arq). El Linktree tiene dos WhatsApp distintos: 573102941376 en el ícono y 573112658552 en el botón; se unificó en 573112658552 porque el otro solo aparece en componentes viejos sin usar de Mirador. Pendiente que Ernesto confirme cuál es el vigente.

**Trampa de Tailwind:** `site/src/landing/index.css` usa `@import "tailwindcss" source(".")`, así que solo escanea `src/landing/`. Todo marcado que use el layout LandingReact debe vivir en `src/landing/<slug>/`; si se pone en `src/pages/` sus clases no se generan. El servidor dev además no recoge carpetas nuevas bajo `src/landing/` hasta reiniciarlo.

**ENLACE FIJO DE VISTA PREVIA (2026-09-17): https://preview-mizar.sixteam.pro** — sustituye a los túneles temporales (quedan obsoletos los párrafos de cloudflared de abajo).
- Sitio estático servido en el VPS 72.60.67.214: contenedor `mizar-preview` (nginx:alpine, `docker run`, red easypanel, `--memory 128m --cpus 0.25`, usa 5 MB), ficheros en `/opt/mizar-preview/site`, config nginx en `/opt/mizar-preview/nginx.conf`.
- Ruta de Traefik propia: `/etc/easypanel/traefik/config/mizar-preview.yaml` (patrón copiado de mizar-compras.yaml, certResolver letsencrypt). DNS: A `preview-mizar.sixteam.pro` → 72.60.67.214, TTL 300, creado con el MCP de Hostinger (sixteam.pro está en esa cuenta; el hosting de grupomizar.com.co NO).
- `X-Robots-Tag: noindex` y robots.txt Disallow para que no compita con grupomizar.com.co en Google.
- **Actualizar la vista previa:** `bash .claude/deploy-preview.sh` (compila y sube por SSH; no toca producción).

**Histórico — enlace público por túnel (obsoleto):** `astro preview` en 127.0.0.1:4322 con `--allowed-hosts .trycloudflare.com` + `cloudflared` quick tunnel, ambos lanzados con `Invoke-CimMethod Win32_Process Create` para que sobrevivan al cierre de la sesión (los procesos en segundo plano de la sesión mueren con ella; eso tumbó el primer enlace). Logs y config en `mizar-lp/.claude/tunnel/` (ignorado por git); la URL sale de `tunnel.log` y cambia en cada arranque.
- **Trampa 1:** `~/.cloudflared/config.yml` es de otro proyecto (túnel `pdf-backend`, catch-all 404) y se impone al quick tunnel → 404. Usar siempre `--config` apuntando a `.claude/tunnel/cloudflared-quick.yml`. No tocar el config.yml del usuario.
- **Trampa 2:** el router (192.168.0.1) cachea NXDOMAIN 30 min. No consultar la URL nueva con el DNS del sistema hasta que responda por DoH (`curl --doh-url https://1.1.1.1/dns-query`).
- Tras cambios en el código basta `npm run build` en `site/`: el preview sirve el `dist` nuevo sin reiniciar.
