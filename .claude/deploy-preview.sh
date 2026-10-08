#!/usr/bin/env bash
# Publica el sitio compilado en la vista previa fija https://preview-mizar.sixteam.pro
# Uso: bash .claude/deploy-preview.sh
set -euo pipefail
cd "$(dirname "$0")/.."
# La clave no está en el repo: cópiala a ~/.ssh/ en cada equipo o indica otra ruta con MIZAR_VPS_KEY.
KEY="${MIZAR_VPS_KEY:-$HOME/.ssh/sixteam_vps_root_ed25519}"
if [ ! -f "$KEY" ]; then
  echo "✗ No encuentro la clave SSH del VPS en $KEY" >&2
  exit 1
fi
echo "▶ Compilando..."
npm --prefix site run build >/dev/null
echo "▶ Subiendo al VPS..."
# /vista-previa/ (plantilla de la vista previa del blog) solo funciona en Cloudflare: no se sube.
tar czf - --exclude=./vista-previa -C site/dist . | ssh -i "$KEY" root@72.60.67.214 \
  'rm -rf /opt/mizar-preview/site/* && tar xzf - -C /opt/mizar-preview/site && du -sh /opt/mizar-preview/site'
echo "▶ Comprobando..."
curl -s -o /dev/null -m 30 -w "  parcelas-charta: %{http_code}\n" https://preview-mizar.sixteam.pro/parcelas-charta/
echo "✓ https://preview-mizar.sixteam.pro"
