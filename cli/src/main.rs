use ravix_core::library::manager::*;
use ravix_core::library::launch::*;

fn main() {
    println!("=== RAVIX CLI TEST ===");

    let game = add_game(
        "Test Game".into(),
        "/home/dolphin/game.exe".into(),
        "wine".into(),
    );

    println!("Added: {:?}", game);

    println!("List: {:?}", list_games());

    launch_game(&game.id);

    remove_game(&game.id);

    println!("Done");
}