use std::process::Command;

pub fn run_proton(path: &str) {
    let prefix = "/home/dolphin/PortProton/prefixes/DEFAULT";

    let result = Command::new("wine")
        .arg(path)
        .env("WINEPREFIX", prefix)
        .spawn();

    match result {
        Ok(child) => println!("Wine PID: {}", child.id()),
        Err(e) => println!("Error: {}", e),
    }
}