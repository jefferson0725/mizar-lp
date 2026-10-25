#!/usr/bin/env bash
# Decide qué URLs avisar a IndexNow en un deploy (imprime una URL por línea; vacío = no avisar).
# Uso: bash .claude/indexnow-urls.sh <sitemap-publicado.xml> <sitemap-nuevo.xml> <cambios>
#   <cambios> = ALL  (se desconoce qué cambió: todas las URLs del sitemap nuevo)
#             = NONE (no hay lista de archivos, p. ej. deploy manual o de Strapi: solo diferencias de sitemap)
#             = ruta a un archivo con `git diff --name-only` (una ruta por línea)
# Se avisan: (a) URLs nuevas, (b) URLs cuyo lastmod cambió, (c) las que corresponden a archivos cambiados:
#   site/src/content/blog/<slug>.md -> /blog/<slug>/ y /blog/ ; cualquier otro cambio en site/ -> todas.
set -euo pipefail
cd "$(dirname "$0")/.."
SITE="https://grupomizar.com.co"
LIVE="$1"; NEW="$2"; CHANGES="${3:-NONE}"

# "URL lastmod" por línea (lastmod vacío si no hay)
pairs() {
  [ -s "$1" ] || return 0
  sed 's#</url>#</url>\n#g' "$1" | sed -n 's#.*<loc>\([^<]*\)</loc>\(<lastmod>\([^<]*\)</lastmod>\)\{0,1\}.*#\1 \3#p'
}
pairs "$NEW" > "${TMPDIR:-/tmp}/in-new.$$"; pairs "$LIVE" > "${TMPDIR:-/tmp}/in-live.$$"
trap 'rm -f "${TMPDIR:-/tmp}/in-new.$$" "${TMPDIR:-/tmp}/in-live.$$"' EXIT
N="${TMPDIR:-/tmp}/in-new.$$"; L="${TMPDIR:-/tmp}/in-live.$$"
[ -s "$N" ] || { echo "indexnow-urls: el sitemap nuevo está vacío" >&2; exit 1; }

all() { cut -d' ' -f1 "$N"; }
{
  # (a)+(b): líneas del sitemap nuevo que no están idénticas en el publicado
  grep -Fxv -f "$L" "$N" | cut -d' ' -f1 || true

  # (c) archivos cambiados
  case "$CHANGES" in
    ALL) all ;;
    NONE) ;;
    *)
      full=0
      while IFS= read -r f; do
        case "$f" in
          site/src/content/blog/README.md) ;;
          site/src/content/blog/*.md)
            slug=$(sed -n 's/^slug:[[:space:]]*["'\'']\{0,1\}\([^"'\''[:space:]#]*\).*/\1/p' "$f" 2>/dev/null | head -1 | tr -d '\r' || true)
            [ -n "$slug" ] || slug=$(basename "$f" .md)
            echo "$SITE/blog/$slug/"; echo "$SITE/blog/" ;;
          site/*) full=1 ;;
        esac
      done < "$CHANGES"
      [ "$full" = 1 ] && all ;;
  esac
} | sort -u | grep -Fx -f <(all) || true
