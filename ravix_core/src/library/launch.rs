use crate::runners::wine::run_wine;
use crate::runners::proton::run_proton;
use super::manager::get_game;

pub fn launch_game(id: &str) {
    if let Some(game) = get_game(id) {
        match game.runner.as_str() {
            "wine" => run_wine(&game.path),
            "proton" => run_proton(&game.path),
            _ => println!("Unknown runner"),
        }
    }
}