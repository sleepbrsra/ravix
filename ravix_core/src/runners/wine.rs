use std::process::Command;

pub fn run_wine(path: &str) {
    println!("Wine launch request: {}", path);

    if path.is_empty() {
        println!("ERROR: empty path");
        return;
    }

    let child = Command::new("wine")
        .arg(path)
        .spawn();

    match child {
        Ok(c) => {
            println!("Wine started, pid: {}", c.id());
        }
        Err(e) => {
            println!("Wine failed: {}", e);
        }
    }
}