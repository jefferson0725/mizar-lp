#!/usr/bin/env bash
# Avisa a Bing (y a los demás buscadores de IndexNow) que las páginas del sitemap cambiaron.
# Bing alimenta la búsqueda de ChatGPT y Copilot. La clave es pública por diseño: vive en
# site/public/<clave>.txt y se publica con el sitio.
# Uso: bash .claude/indexnow.sh            (todas las URLs del sitemap en vivo)
#      bash .claude/indexnow.sh URL1 URL2  (solo esas)
set -euo pipefail
cd "$(dirname "$0")/.."
SITE="https://grupomizar.com.co"
KEYFILE=$(ls site/public | grep -E '^[0-9a-f]{32}\.txt$' | head -1)
[ -n "$KEYFILE" ] || { echo "✗ No hay archivo de clave IndexNow en site/public/" >&2; exit 1; }
KEY="${KEYFILE%.txt}"

if [ $# -gt 0 ]; then URLS=("$@"); else
  mapfile -t URLS < <(curl -s "$SITE/sitemap-0.xml" | grep -o '<loc>[^<]*' | sed 's/<loc>//')
fi
[ ${#URLS[@]} -gt 0 ] || { echo "✗ Sin URLs para avisar" >&2; exit 1; }

# La clave debe estar publicada antes de avisar.
[ "$(curl -s "$SITE/$KEYFILE")" = "$KEY" ] || { echo "✗ $SITE/$KEYFILE no devuelve la clave (¿ya se publicó?)" >&2; exit 1; }

LIST=$(printf '"%s",' "${URLS[@]}"); LIST="[${LIST%,}]"
BODY="{\"host\":\"grupomizar.com.co\",\"key\":\"$KEY\",\"keyLocation\":\"$SITE/$KEYFILE\",\"urlList\":$LIST}"
CODE=$(curl -s -o /dev/null -w '%{http_code}' -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" -d "$BODY")
echo "IndexNow: ${#URLS[@]} URL(s) → HTTP $CODE (200/202 = recibido)"
