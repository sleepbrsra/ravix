use std::{fs, path::PathBuf};
use shared::Game;

pub fn get_library_path() -> PathBuf {
    let home = std::env::var("HOME").unwrap_or(".".into());
    PathBuf::from(home).join(".ravix/library.json")
}

pub fn load_games() -> Vec<Game> {
    let path = get_library_path();

    if !path.exists() {
        return vec![];
    }

    let data = fs::read_to_string(path).unwrap_or("[]".into());
    serde_json::from_str(&data).unwrap_or(vec![])
}

pub fn save_games(games: &Vec<Game>) {
    let path = get_library_path();

    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).ok();
    }

    let data = serde_json::to_string_pretty(games).unwrap();
    fs::write(path, data).unwrap();
}