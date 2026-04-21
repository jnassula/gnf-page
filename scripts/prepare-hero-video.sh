#!/usr/bin/env bash
# ============================================================================
#  prepare-hero-video.sh
#  Pipeline ffmpeg para o vídeo de fundo do Hero da landing Grupo Nossa Farmácia.
#
#  Fonte: Mixkit (vídeo livre de direitos, Mixkit License).
#  Para trocar de vídeo: altera SOURCE_URL abaixo (URL directa para um .mp4
#  Mixkit/Pexels/Coverr/Pixabay). O processamento ffmpeg a jusante é o mesmo
#  independentemente da fonte. Para uma URL Pexels, mantém o User-Agent
#  browser + Referer abaixo (Pexels bloqueia requests sem eles).
#
#  Outputs em public/hero/:
#    hero-desktop.mp4    1920x1080  H.264  crf 23  -preset slow  -an  ~< 3 MB
#    hero-desktop.webm   1920x1080  VP9    bitrate 1800k  -an     ~< 3 MB
#    hero-mobile.mp4     960x540    H.264  crf 26  -preset slow  -an ~< 1.5 MB
#    hero-poster.jpg     1920x1080  JPEG q 80 (frame @ 2s)
#
#  Flags obrigatórias em todos os outputs:
#    -an                    (sem áudio — vídeo é decorativo)
#    -movflags +faststart   (streaming progressivo, para mp4)
#    -pix_fmt yuv420p       (compatibilidade universal)
#    -t 10                  (duração máxima 10s, para loop)
#
#  Idempotência: se o ficheiro de saída existe, salta. Apaga public/hero/
#  para regenerar do zero.
# ============================================================================

set -euo pipefail

# --- Configuration ----------------------------------------------------------
# "Pharmacy worker accepts payment at checkout" — farmacêutico de bata branca
# no balcão, caixa registadora e terminal. Mixkit free license.
# Catálogo com mais opções: https://mixkit.co/free-stock-video/pharmacy/
SOURCE_URL="${SOURCE_URL:-https://assets.mixkit.co/videos/5407/5407-720.mp4}"
# Subdirectório de saída sob public/ (ex: "hero", "hero2"). Permite gerar
# múltiplas variantes sem sobrepor versões existentes.
OUT_SUBDIR="${OUT_SUBDIR:-hero}"
# Nome único do raw (um por sub-directório) — evita colisão de cache entre
# vídeos diferentes.
RAW_NAME="${RAW_NAME:-$OUT_SUBDIR}"

WORKDIR="$(cd "$(dirname "$0")/.." && pwd)"
RAW_DIR="$WORKDIR/.cache/hero-raw"
OUT_DIR="$WORKDIR/public/$OUT_SUBDIR"
RAW_FILE="$RAW_DIR/${RAW_NAME}.mp4"

# Onde no vídeo recortar os 10 segundos (em segundos desde o início).
CLIP_START="${CLIP_START:-0}"
CLIP_DURATION="${CLIP_DURATION:-10}"

mkdir -p "$RAW_DIR" "$OUT_DIR"

# --- Fetch source -----------------------------------------------------------
if [[ ! -f "$RAW_FILE" ]]; then
  echo "▶ A descarregar vídeo fonte: $SOURCE_URL"
  if ! curl -fsSL --max-time 120 \
      -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15" \
      -H "Accept: video/webm,video/mp4,*/*;q=0.9" \
      -H "Referer: https://www.pexels.com/" \
      -o "$RAW_FILE" "$SOURCE_URL"; then
    echo "✗ Download falhou. Tenta:" >&2
    echo "  1. Confirmar que o URL funciona no browser" >&2
    echo "  2. Definir SOURCE_URL=<outro URL> antes de correr o script" >&2
    echo "  3. Colocar manualmente um .mp4 em $RAW_FILE e re-correr" >&2
    exit 1
  fi
  echo "✓ Download OK ($(du -h "$RAW_FILE" | awk '{print $1}'))"
else
  echo "✓ Reutilizando source cached ($(du -h "$RAW_FILE" | awk '{print $1}'))"
fi

# --- Pipeline ---------------------------------------------------------------

# Filtro de cor/grading leve: aumenta saturação da componente verde,
# escurece levemente para leitura de texto branco por cima.
FILTER_DESKTOP="scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.05:brightness=-0.04:saturation=1.15"
FILTER_MOBILE="scale=960:540:force_original_aspect_ratio=increase,crop=960:540,eq=contrast=1.05:brightness=-0.04:saturation=1.15"

# 1. Desktop MP4 (H.264)
if [[ ! -f "$OUT_DIR/hero-desktop.mp4" ]]; then
  echo "▶ A gerar hero-desktop.mp4"
  ffmpeg -y -hide_banner -loglevel error \
    -ss "$CLIP_START" -i "$RAW_FILE" -t "$CLIP_DURATION" \
    -vf "$FILTER_DESKTOP" \
    -c:v libx264 -crf 26 -preset slow -profile:v high -level 4.0 \
    -maxrate 2800k -bufsize 5600k \
    -pix_fmt yuv420p -movflags +faststart -an \
    "$OUT_DIR/hero-desktop.mp4"
  echo "   $(du -h "$OUT_DIR/hero-desktop.mp4" | awk '{print $1}')"
fi

# 2. Desktop WebM (VP9)
if [[ ! -f "$OUT_DIR/hero-desktop.webm" ]]; then
  echo "▶ A gerar hero-desktop.webm"
  ffmpeg -y -hide_banner -loglevel error \
    -ss "$CLIP_START" -i "$RAW_FILE" -t "$CLIP_DURATION" \
    -vf "$FILTER_DESKTOP" \
    -c:v libvpx-vp9 -b:v 1800k -minrate 900k -maxrate 2600k \
    -deadline good -cpu-used 1 \
    -pix_fmt yuv420p -an \
    "$OUT_DIR/hero-desktop.webm"
  echo "   $(du -h "$OUT_DIR/hero-desktop.webm" | awk '{print $1}')"
fi

# 3. Mobile MP4 (H.264, menor bitrate)
if [[ ! -f "$OUT_DIR/hero-mobile.mp4" ]]; then
  echo "▶ A gerar hero-mobile.mp4"
  ffmpeg -y -hide_banner -loglevel error \
    -ss "$CLIP_START" -i "$RAW_FILE" -t "$CLIP_DURATION" \
    -vf "$FILTER_MOBILE" \
    -c:v libx264 -crf 26 -preset slow -profile:v main -level 3.1 \
    -pix_fmt yuv420p -movflags +faststart -an \
    "$OUT_DIR/hero-mobile.mp4"
  echo "   $(du -h "$OUT_DIR/hero-mobile.mp4" | awk '{print $1}')"
fi

# 4. Poster (frame estático @ 2s)
if [[ ! -f "$OUT_DIR/hero-poster.jpg" ]]; then
  echo "▶ A gerar hero-poster.jpg"
  ffmpeg -y -hide_banner -loglevel error \
    -ss "$(awk "BEGIN{print $CLIP_START + 2}")" -i "$RAW_FILE" \
    -frames:v 1 -q:v 4 \
    -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.05:brightness=-0.04:saturation=1.15" \
    "$OUT_DIR/hero-poster.jpg"
  echo "   $(du -h "$OUT_DIR/hero-poster.jpg" | awk '{print $1}')"
fi

echo ""
echo "┌─ public/hero/ ─────────────────────────────────"
ls -la "$OUT_DIR" | awk 'NR>1 {printf "│ %-30s %s\n", $NF, $5}'
echo "└────────────────────────────────────────────────"
