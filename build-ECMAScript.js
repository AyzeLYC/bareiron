import {createRequire} from "node:modules";
const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;


const build_configuration = {

    "os": "ubuntu", // change this with the name of your operating system
    "server_file_url": "https://piston-data.mojang.com/v1/objects/6bce4ef400e4efaa63a13d5e6f6b500be969ef81/server.jar"
    
};

const fs = require("node:fs");

var commands_logs = [];

/**
* @param {string} command
**/
function run_command(command) {
    
    let { spawn } = require("node:child_process");
    
    let shell_process = spawn(command, {detached: true, shell: true, windowsHide: true}),
        result = "";

    shell_process.stdout.on("data", function(data) {

        result += data;
        
    });

    shell_process.kill();

    commands_logs.push(result);

    return;
    
};

function run_jar_and_build_server() {

    run_command(`mkdir ${__dirname}/notchian/ ${__dirname}/notchian/generated/ ${__dirname}/notchian/generated/data/ ${__dirname}/notchian/generated/data/minecraft`); // creates the folders neceary for the compilation to work properly
    
    run_command(`cd ${__dirname}/notchian/ && wget ${build_configuration["server_file_url"]}`);
    
    run_command(`sudo chmod +x ${__dirname}/extract_registries.sh`); // makes the extract_registries.sh file usable
    run_command(`sudo chmod +x ${__dirname}/build.sh`); // same as for extract_registries.sh
    run_command(`java -jar ${__dirname}/notchian/server.jar`); // launches the minecraft server so that all the folders and files get created ( a small verification system could be implemented later on )
    run_command(`sudo ${__dirname}/extract_registries.sh`); // runs the extract_registries.sh file
    run_command(`mv ${__dirname}/notchian/generated/data/minecraft/include/registries.h ${__dirname}/include/registries.h`);
    run_command(`mv ${__dirname}/notchian/generated/data/minecraft/src/registries.c ${__dirname}/src/registries.c`);
    run_command(`sudo ${__dirname}/build.sh`); // runs the build.sh file
    console.log(`Your bareiron executable file has been built successfully !\n\nCommands logs :\n${commands_logs}`);
    
};

var serverdotjar_data = ""; // creates a new variable that will contain the .jar file datas

if (String(build_configuration["os"]).toLowerCase() === "debian" || String(build_configuration["os"]).toLowerCase() === "ubuntu") {
    
    run_command("sudo apt update -y && sudo apt upgrade -y"); // udpates all the server apps
    run_command("sudo apt install clang default-jre -y"); // install the latest release of gcc and java
    
    run_jar_and_build_server(); // launch the build function

};

if (String(build_configuration["os"]).toLowerCase() === "centos" || String(build_configuration["os"]).toLowerCase() === "fedora" || String(build_configuration["os"]).toLowerCase() === "rhel") {

    run_command("sudo dnf update -y && sudo dnf upgrade -y");
    run_command("sudo dnf install clang default-jre -y");
    
    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "centos-old" || String(build_configuration["os"]).toLowerCase() === "fedora-old" || String(build_configuration["os"]).toLowerCase() === "rhel-old") {

    run_command("sudo yum update -y && sudo yum upgrade -y");
    run_command("sudo yum install clang default-jre -y");
    
    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "arch") {

    run_command("sudo pacman update -y && sudo pacman upgrade -y");
    run_command("sudo pacman -S clang jdk-openjdk -y");
    
    run_jar_and_build_server();
    
};
if (String(build_configuration["os"]).toLowerCase() === "msys2") {

    run_command("sudo pacman update -y && sudo pacman upgrade -y");
    run_command("sudo pacman -S clang -y");

    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "opensuse" || String(build_configuration["os"]).toLowerCase() === "suse-enterprise") {

    run_command("sudo zypper update -y && sudo zypper upgrade -y");
    run_command("sudo zypper install clang java-17-openjdk-devel -y");
    
    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "gentoo") {

    run_command("sudo emerge --update --deep world -y && sudo emerge --upgrade -y");
    run_command("sudo emerge clang ");

    run_jar_and_build();
    
};
