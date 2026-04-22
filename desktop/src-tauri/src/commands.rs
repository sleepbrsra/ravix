use ravix_core::library::manager;
use ravix_core::library::launch;
use ravix_core::runners::wine::run_wine;
use ravix_core::runners::proton::run_proton;
use shared::Game;

#[tauri::command]
pub fn get_library() -> Vec<Game> {
    manager::list_games()
}

#[tauri::command]
pub fn add_game(name: String, path: String, runner: String) -> Game {
    manager::add_game(name, path, runner)
}

#[tauri::command]
pub fn remove_game(id: String) {
    manager::remove_game(&id);
}

#[tauri::command]
pub fn launch_game(id: String) {
    println!("Launch request: {}", id);

    match manager::get_game(&id) {
        Some(game) => {
            match game.runner.as_str() {
                "wine" => run_wine(&game.path),
                "proton" => run_proton(&game.path),
                other => {
                    println!("Unknown runner: {}", other);
                }
            }
        }
        None => {
            println!("Game not found: {}", id);
        }
    }
}

#[tauri::command]
pub fn update_game(game: Game) {
    manager::update_game(game);
}