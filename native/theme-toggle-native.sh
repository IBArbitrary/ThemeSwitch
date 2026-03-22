#!/bin/bash
set -euo pipefail

STATE_FILE="$HOME/Data/.theme-state"

send_message() {
    local json="$1"
    local len=${#json}
    local b0=$(printf '%02x' $((len & 0xff)))
    local b1=$(printf '%02x' $(((len >> 8) & 0xff)))
    local b2=$(printf '%02x' $(((len >> 16) & 0xff)))
    local b3=$(printf '%02x' $(((len >> 24) & 0xff)))
    printf "\\x${b0}\\x${b1}\\x${b2}\\x${b3}%s" "$json"
}

cleanup() {
    exit 0
}
trap cleanup TERM EXIT

if [[ -f "$STATE_FILE" ]]; then
    theme=$(tr -d '\n\r' < "$STATE_FILE")
    if [[ "$theme" == "L" || "$theme" == "D" ]]; then
        send_message "{\"theme\":\"$theme\"}"
    fi
fi

while inotifywait -q -e modify -e close_write "$STATE_FILE" >/dev/null 2>&1; do
    theme=$(tr -d '\n\r' < "$STATE_FILE")
    if [[ "$theme" == "L" || "$theme" == "D" ]]; then
        send_message "{\"theme\":\"$theme\"}"
    fi
done
