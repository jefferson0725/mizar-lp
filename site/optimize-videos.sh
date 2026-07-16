#!/usr/bin/env bash
# Optimiza los videos de Mi Lote: re-encodea a H.264 720p + genera posters
# Uso: bash optimize-videos.sh
# Los originales se guardan en /videos/originals/ por si necesitas revertir.

set -e

VIDEOS_DIR="public/videos"
POSTERS_DIR="public/videos/posters"
ORIGINALS_DIR="public/videos/originals"

mkdir -p "$POSTERS_DIR" "$ORIGINALS_DIR"

encode() {
  local name="$1"
  local input="$VIDEOS_DIR/${name}.mp4"
  local output="$VIDEOS_DIR/${name}-opt.mp4"
  local poster="$POSTERS_DIR/${name}.jpg"

  if [ ! -f "$input" ]; then
    echo "⚠️  No encontrado: $input — omitiendo"
    return
  fi

  echo "▶ Encodando $name..."
  ffmpeg -i "$input" \
    -vf "scale=720:-2" \
    -c:v libx264 -crf 28 -preset slow \
    -c:a aac -b:a 96k \
    -movflags +faststart \
    -y "$output"

  echo "  → Poster: $poster"
  ffmpeg -i "$input" -ss 00:00:01 -frames:v 1 -q:v 3 -y "$poster"

  # Mostrar reducción
  orig=$(du -sh "$input" | cut -f1)
  nuevo=$(du -sh "$output" | cut -f1)
  echo "  ✓ $orig → $nuevo"
}

# Videos de testimonios
for n in 1 2 3 4 5 6; do
  encode "testimonio-$n"
done

# Video de recorrido
encode "mi-lote-recorrido"

echo ""
echo "✅ Listo. Revisa los archivos *-opt.mp4 y si se ven bien, reemplaza los originales:"
echo ""
echo "   for f in $VIDEOS_DIR/*-opt.mp4; do"
echo "     orig=\"\${f/-opt/}\""
echo "     mv \"\$orig\" \"$ORIGINALS_DIR/\$(basename \$orig)\""
echo "     mv \"\$f\" \"\$orig\""
echo "   done"
