========================
        RAVIX
========================

[ GIF PREVIEW HERE: assets/ravix-banner.gif ]

Ravix is a lightweight Linux game launcher built for control, simplicity and chaos-friendly customization.

------------------------
WHAT IS RAVIX
------------------------

Ravix is a custom game launcher for Linux focused on:

- full control over how games are launched
- Wine / Proton / PortProton support (no Steam dependency)
- minimal UI with maximum flexibility
- local-first design (no cloud, no accounts)

It is not another Steam.
It is what Steam doesn't let you do.

------------------------
WHY RAVIX EXISTS
------------------------

Most Linux gaming tools are:

- too tied to Steam ecosystem
- too complex for simple use cases
- not flexible for modded setups
- just wrappers over existing tools

Ravix exists because:

"I want to launch my games my way, not how a launcher tells me."

------------------------
WHO IS IT FOR
------------------------

Ravix is for:

- Linux users using Wine / Proton manually
- modded game players
- people who hate Steam lock-in
- developers needing custom launch pipelines
- users who want a hackable launcher

If you want "just click play" → use Steam.
If you want control → use Ravix.

------------------------
FEATURES
------------------------

DONE:
[+] Tauri desktop app
[+] Game library (JSON storage)
[+] Add / remove games
[+] Rust backend launch system
[+] Wine / Proton runners
[+] Basic UI navigation
[+] Logs system

IN PROGRESS:
[-] Game settings editor
[-] Better Proton integration
[-] Path validation
[-] UI cleanup
[-] Update system

PLANNED:
[-] Mod profiles per game
[-] Prefix manager (Wine envs)
[-] Auto detect installed games
[-] Plugin system
[-] CLI tool (ravix add/run/list)
[-] Desktop integration
[-] Auto updater

------------------------
ARCHITECTURE
------------------------

ravix/
 ├── desktop      (Tauri UI)
 ├── ravix_core   (Rust backend)
 │    ├── library
 │    ├── runners
 ├── shared       (types)
 ├── cli          (planned)

------------------------
HOW IT WORKS
------------------------

1. UI calls Rust via Tauri invoke
2. Rust loads ~/.ravix/library.json
3. Each game has:
   - name
   - path
   - runner (wine/proton/native)
4. Launcher executes correct runner

------------------------
EXAMPLE GAME ENTRY
------------------------

{
  "id": "uuid",
  "name": "Cyberpunk Modded",
  "path": "/games/cp2077",
  "runner": "proton"
}

------------------------
LIMITATIONS
------------------------

- Proton integration is basic
- PortProton not fully wired
- No auto exe detection
- No path validation
- Settings not finished

------------------------
PHILOSOPHY
------------------------

Ravix is not about being perfect.

It is about control.

"No restrictions. No lock-in. No assumptions."

------------------------
TECH STACK
------------------------

- Rust (core)
- Tauri (desktop app)
- JavaScript (UI)
- JSON (storage)

------------------------
INSTALL
------------------------

git clone https://github.com/yourname/ravix
cd ravix/installer
chmod +x setup.sh
./setup.sh

------------------------
LICENSE
------------------------

MIT

------------------------
NOTE
------------------------

Built with frustration, caffeine and Linux.