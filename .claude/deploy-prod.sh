#!/usr/bin/env bash
# Publica el sitio en PRODUCCIÓN (https://grupomizar.com.co) en el hosting Premium de Hostinger.
# Uso: bash .claude/deploy-prod.sh            → simula: compila, verifica y muestra qué haría (no cambia nada)
#      bash .claude/deploy-prod.sh --apply    → publica de verdad (antes guarda una copia de public_html)
#
# Clave SSH: ~/.ssh/mizar_hosting_deploy (o MIZAR_HOSTING_KEY). Debe estar registrada en
# hPanel → Avanzado → Acceso SSH. La clave NO está en el repo.
# Blog: exporta STRAPI_URL antes de correrlo; si no, el blog sale sin artículos.
# En Windows no hay rsync: sube con tar por SSH (solo añade/sobrescribe; no borra). El borrado de
# archivos viejos lo hace el workflow de GitHub (rsync --delete-after).
set -euo pipefail
cd "$(dirname "$0")/.."

APPLY=0; [ "${1:-}" = "--apply" ] && APPLY=1
KEY="${MIZAR_HOSTING_KEY:-$HOME/.ssh/mizar_hosting_deploy}"
HOST=82.25.83.112; PORT=65002; RUSER=u564846756
REMOTE_DIR=domains/grupomizar.com.co/public_html
SITE_URL=https://grupomizar.com.co
HOSTKEY='ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAKts5zq5UDqy8+83vRPuPmzR2fg3n2jB4/GD3WuOtIm'

[ -f "$KEY" ] || { echo "✗ No encuentro la clave SSH en $KEY (MIZAR_HOSTING_KEY)" >&2; exit 1; }
KH="$(mktemp)"; trap 'rm -f "$KH"' EXIT
echo "[$HOST]:$PORT $HOSTKEY" > "$KH"
SSH=(ssh -p "$PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile="$KH" "$RUSER@$HOST")

echo "▶ Compilando..."
[ -n "${STRAPI_URL:-}" ] || echo "  ⚠ STRAPI_URL vacío: el blog se publicará sin artículos"
npm --prefix site run build >/dev/null

echo "▶ Verificando el build..."
D=site/dist
for f in index.html .htaccess parcelas-charta/index.html links/index.html sitemap-index.xml 404.html; do
  [ -s "$D/$f" ] || { echo "✗ Falta $D/$f: no publico un build incompleto" >&2; exit 1; }
done
N=$(find "$D" -name '*.html' | wc -l)
[ "$N" -ge 15 ] || { echo "✗ Solo $N páginas HTML (esperaba ≥15)" >&2; exit 1; }
echo "  $N páginas, $(du -sh "$D" | cut -f1)"

echo "▶ Estado actual del servidor..."
"${SSH[@]}" "cd $REMOTE_DIR && ls -a | head -30 && du -sh ."

if [ "$APPLY" -ne 1 ]; then
  echo "▶ Simulación terminada. Para publicar: bash .claude/deploy-prod.sh --apply"
  exit 0
fi

STAMP=$(date +%Y%m%d-%H%M%S)
echo "▶ Copia de seguridad en ~/backups/public_html-$STAMP.tgz ..."
"${SSH[@]}" "mkdir -p ~/backups && tar czf ~/backups/public_html-$STAMP.tgz -C ~/domains/grupomizar.com.co public_html && ls -1t ~/backups/public_html-*.tgz | tail -n +4 | xargs -r rm -f && ls -lh ~/backups | tail -4"

echo "▶ Subiendo a producción..."
# /vista-previa/ (plantilla de la vista previa del blog) solo funciona en Cloudflare: no se sube.
tar czf - --exclude=./vista-previa -C "$D" . | "${SSH[@]}" "cd $REMOTE_DIR && tar xzf - --no-same-owner && du -sh ."

echo "▶ Comprobando..."
FAIL=0
for p in / /parcelas-charta/ /links/ /milote/links/ /nosotros/ /proyectos/ /sitemap-index.xml; do
  code=$(curl -s -o /dev/null -m 30 -w '%{http_code}' "$SITE_URL$p"); echo "  $p -> $code"
  [ "$code" = 200 ] || FAIL=1
done
[ "$FAIL" -eq 0 ] && echo "✓ Publicado: $SITE_URL" || { echo "✗ Alguna ruta no respondió 200 (copia en ~/backups/public_html-$STAMP.tgz)" >&2; exit 1; }

# Avisar a Bing/IndexNow de los cambios (no bloquea la publicación si falla).
bash "$(dirname "$0")/indexnow.sh" || echo "⚠ No se pudo avisar a IndexNow" >&2
