#!/bin/bash

REPO_URL="https://github.com/sleepbrsra/ravix"   # <-- поменяешь
INSTALL_DIR="$HOME/.ravix"
TMP_DIR="$HOME/.ravix/tmp"
BUILD_DIR="$TMP_DIR/ravix"
BIN_NAME="ravix-ui"

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
    echo "[*] Using tmp dir: $TMP_DIR"
    mkdir -p "$TMP_DIR"

    if [ ! -d "$INSTALL_DIR/.git" ]; then
        echo "[*] Cloning repo..."
        git clone "$REPO_URL" "$INSTALL_DIR"
    else
        echo "[*] Repo exists → checking updates..."
        cd "$INSTALL_DIR" || exit

        LOCAL_HASH=$(git rev-parse HEAD)
        git fetch origin
        REMOTE_HASH=$(git rev-parse origin/main)

        if [ "$LOCAL_HASH" = "$REMOTE_HASH" ]; then
            echo "[✓] Already up to date"
        else
            echo "[*] Updating..."
            git pull
        fi
    fi

    echo "[*] Preparing build workspace..."
    rm -rf "$BUILD_DIR"
    mkdir -p "$TMP_DIR"
    cp -r "$INSTALL_DIR/desktop" "$BUILD_DIR"

    cd "$BUILD_DIR" || exit

    if [ ! -f package.json ]; then
        echo "[!] package.json not found"
        exit 1
    fi

    echo "[*] Installing npm deps..."
    npm install

    echo "[*] Building Tauri..."
    cd src-tauri || exit
    cargo build --release

    echo "[*] Installing binary..."
    sudo cp target/release/$BIN_NAME /usr/local/bin/

    echo "[✓] Done!"
}

remove() {
    echo "[*] Removing Ravix..."
    rm -rf "$INSTALL_DIR"
    rm -rf "$TMP_DIR"
    sudo rm -f /usr/local/bin/$BIN_NAME
    echo "[✓] Removed"
}

case "$opt" in
    1) install ;;
    2) remove ;;
    3) exit 0 ;;
    *) echo "Invalid option" ;;
esac