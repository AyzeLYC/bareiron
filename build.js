const build_configuration = {

    "os": "ubuntu", // change this with the name of your operating system
    "server_dot_jar_url": ""
    
};

const XMLHTTPR = require("xhr2"), // XML HyperText Transfer Protocol Request
      fs = require("node:fs");

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

    let serverdotjar_https_client = new XMLHTTPR();
        serverdotjar_https_client.open("GET", build_configuration["server_dot_jar_url"], true);
        serverdotjar_https_client.onload = function() {

            serverdotjar_data += serverdotjar_https_client.response;
            
        };

    fs.writeFileSync(`${build_configuration["folder"]}/notchian/server.jar`, serverdotjar_data, "utf8");
    
    run_command(`sudo chmod +x ${build_configuration["folder"]}/extract_registries.sh`); // makes the extract_registries.sh file usable
    run_command(`sudo chmod +x ${build_configuration["folder"]}/build.sh`); // same as for extract_registries.sh
    run_command(`java -jar ${build_configuration["folder"]}/notchian/server.jar`); // launches the minecraft server so that all the folders and files get created ( a small verification system could be implemented later on )
    run_command(`sudo ${build_configuration["folder"]}/extract_registries.sh`); // runs the extract_registries.sh file
    run_command(`sudo ${build_configuration["folder"]}/build.sh`); // runs the build.sh file
    console.log(`Your bareiron executable file has been built successfully !\n\nCommands logs :\n${commands_logs}`);
    
};

var serverdotjar_data = ""; // creates a new variable that will contain the .jar file datas

if (String(build_configuration["os"]).toLowerCase() === "debian" || String(build_configuration["os"]).toLowerCase() === "ubuntu") {
    
    run_command("sudo apt update -y && sudo apt upgrade -y"); // udpates all the server apps
    run_command("sudo apt install gcc default-jre -y"); // install the latest release of gcc and java
    run_command(`mkdir ${__dirname}/notchian/ ${__dirname}/notchian/generated/ ${__dirname}/notchian/generated/data/ ${__dirname}/notchian/generated/data/minecraft`); // creates the necessary compilation folders

    run_jar_and_build_server();

};

if (String(build_configuration["os"]).toLowerCase() === "centos" || String(build_configuration["os"]).toLowerCase() === "fedora" || String(build_configuration["os"]).toLowerCase() === "rhel") {

    run_command("sudo dnf update -y && sudo dnf upgrade -y");
    run_command("sudo dnf install gcc default-jre -y");
    run_command(`mkdir ${__dirname}/notchian/ ${__dirname}/notchian/generated/ ${__dirname}/notchian/generated/data/ ${__dirname}/notchian/generated/data/minecraft/`);

    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "centos-old" || String(build_configuration["os"]).toLowerCase() === "fedora-old" || String(build_configuration["os"]).toLowerCase() === "rhel-old") {

    run_command("sudo yum update -y && sudo yum upgrade -y");
    run_command("sudo yum install gcc default-jre -y");
    run_command(`mkdir ${__dirname}/notchian/ ${__dirname}/notchian/generated/ ${__dirname}/notchian/generated/data/ ${__dirname}/notchian/generated/data/minecraft/`);

    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "arch" || String(build_configuration["os"]).toLowerCase() === "msys2") {

    run_command("sudo pacman update -y && sudo pacman upgrade -y");
    run_command("sudo pacman -S gcc jdk-openjdk -y");
    run_command(`mkdir ${__dirname}/notchian/ ${__dirname}/notchian/generated/ ${__dirname}/notchian/generated/data/ ${__dirname}/notchian/generated/data/minecraft/`);

    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "opensuse" || String(build_configuration["os"]).toLowerCase() === "suse-enterprise") {

    run_command("sudo zypper update -y && sudo zypper upgrade -y");
    run_command("sudo zypper install gcc java-17-openjdk-devel -y");
    run_command(`mkdir ${__dirname}/notchian/ ${__dirname}/notchian/generated/ ${__dirname}/notchian/generated/data/ ${__dirname}/notchian/generated/data/minecraft/`);

    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "gentoo") {

    run_command("sudo emerge --update --deep world -y && sudo emerge --upgrade -y");
    run_command("sudo emerge gcc ");
    run_command(`mkdir ${__dirname}/notchian/ ${__dirname}/notchian/generated/ ${__dirname}/notchian/generated/data/ ${__dirname}/notchian/generated/data/minecraft/`);
    run_command("mv ${__dirname}/notchian/generated/data/minecraft/");
    
};
