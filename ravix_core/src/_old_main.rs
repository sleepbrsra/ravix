mod runners;

use clap::{Parser, Subcommand};
use anyhow::Result;

#[derive(Parser)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    Run {
        path: String,
        #[arg(long)]
        prefix: Option<String>,
        #[arg(long, default_value = "wine")]
        runner: String,
    },
}

fn main() -> Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Run { path, prefix, runner } => {
            match runner.as_str() {
                "wine" => runners::wine::run(path, prefix)?,
                "proton" => runners::proton::run(path, prefix)?,
                _ => println!("Unknown runner"),
            }
        }
    }

    Ok(())
}