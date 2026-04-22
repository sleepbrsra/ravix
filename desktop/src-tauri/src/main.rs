mod commands;

use commands::*;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_library,
            add_game,
            remove_game,
            launch_game,
            update_game
        ])
        .run(tauri::generate_context!())
        .expect("error");
}