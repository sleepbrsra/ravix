use uuid::Uuid;
use shared::Game;

use super::storage::{load_games, save_games};

pub fn add_game(name: String, path: String, runner: String) -> Game {
    let mut games = load_games();

    let game = Game {
        id: Uuid::new_v4().to_string(),
        name,
        path,
        runner,
    };

    games.push(game.clone());
    save_games(&games);

    game
}

pub fn remove_game(id: &str) {
    let mut games = load_games();
    games.retain(|g| g.id != id);
    save_games(&games);
}

pub fn list_games() -> Vec<Game> {
    load_games()
}

pub fn get_game(id: &str) -> Option<Game> {
    load_games().into_iter().find(|g| g.id == id)
}


pub fn update_game(updated: Game) {
    let mut games = load_games();

    if let Some(g) = games.iter_mut().find(|g| g.id == updated.id) {
        g.name = updated.name;
        g.path = updated.path;
        g.runner = updated.runner;
    }

    save_games(&games);
}