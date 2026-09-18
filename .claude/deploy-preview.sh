#!/usr/bin/env bash
# Publica el sitio compilado en la vista previa fija https://preview-mizar.sixteam.pro
# Uso: bash .claude/deploy-preview.sh
set -euo pipefail
cd "$(dirname "$0")/.."
KEY=/c/Users/samue/.ssh/sixteam_vps_root_ed25519
echo "▶ Compilando..."
npm --prefix site run build >/dev/null
echo "▶ Subiendo al VPS..."
tar czf - -C site/dist . | ssh -i "$KEY" root@72.60.67.214 \
  'rm -rf /opt/mizar-preview/site/* && tar xzf - -C /opt/mizar-preview/site && du -sh /opt/mizar-preview/site'
echo "▶ Comprobando..."
curl -s -o /dev/null -m 30 -w "  parcelas-charta: %{http_code}\n" https://preview-mizar.sixteam.pro/parcelas-charta/
echo "✓ https://preview-mizar.sixteam.pro"
