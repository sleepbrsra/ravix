#!/bin/bash

REPO_URL="https://github.com/sleepbrsra/ravix"

BASE="$HOME/.ravix"
REPO="$BASE/repo"
TMP="$BASE/tmp"
DESKTOP="$REPO/desktop"

clear

cat << "EOF"
██████╗  █████╗ ██╗   ██╗██╗██╗  ██╗
██╔══██╗██╔══██╗██║   ██║██║╚██╗██╔╝
██████╔╝███████║██║   ██║██║ ╚███╔╝
██╔══██╗██╔══██║╚██╗ ██╔╝██║ ██╔██╗
██║  ██║██║  ██║ ╚████╔╝ ██║██╔╝ ██╗
╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═╝

        R A V I X  I N S T A L L E R
EOF

echo ""
echo "[1] Install / Update Ravix"
echo "[2] Remove Ravix"
echo "[3] Exit"
echo ""

read -p "Select option: " opt

install() {
    echo "[*] Preparing folders..."
    mkdir -p "$BASE"
    mkdir -p "$TMP"

    if [ ! -d "$REPO/.git" ]; then
        echo "[*] Cloning repo..."
        rm -rf "$REPO"
        git clone "$REPO_URL" "$REPO"
    else
        echo "[*] Repo exists → updating..."
        cd "$REPO" || exit

        git fetch origin
        LOCAL=$(git rev-parse HEAD)
        REMOTE=$(git rev-parse origin/main)

        if [ "$LOCAL" = "$REMOTE" ]; then
            echo "[✓] Already up to date"
        else
            echo "[*] Pulling updates..."
            git pull
        fi
    fi

    echo "[*] Checking desktop folder..."
    if [ ! -d "$DESKTOP" ]; then
        echo "[ERROR] desktop folder not found in repo!"
        exit 1
    fi

    echo "[*] Installing frontend deps..."
    cd "$DESKTOP" || exit
    npm install

    echo "[*] Building Tauri..."
    cd src-tauri || exit
    cargo build --release

    echo "[*] Done build!"
}

remove() {
    echo "[*] Removing Ravix..."
    rm -rf "$BASE"
    echo "[✓] Removed"
}

case "$opt" in
    1) install ;;
    2) remove ;;
    3) exit 0 ;;
    *) echo "Invalid option" ;;
esac