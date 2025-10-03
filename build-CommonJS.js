/* configuration */

const build_configuration = {

    "os": "Ubuntu", /* change this with the name of your operating system */
    "server_file_url": "https://piston-data.mojang.com/v1/objects/6bce4ef400e4efaa63a13d5e6f6b500be969ef81/server.jar" /* 1.21.8 server jar file url */
    
};

/* global dependancies */

const fs = require("node:fs"),
      https = require("node:https");


let commands_results = []; /* will hold the result of all the commands that have been ran */
/*
 * @param {string} command
*/
function run_command(command) {

    let child_process = require("node:child_process");

    let command_arguments = [],
        shell_process = child_process.spawn(command.split(" ")[0], command_arguments, {detached: true, shell: true, windowsHide: true}),
        command_result = ``;

    Object.values(command).forEach(function(value, index, array) {
        
        if (index !== 0) {
            
            command_arguments.push(value);
            
        };
        
    });

    shell_process.on("error", function(err) {

        command_result += `An error has happened while trying to run the command !\n${err}`;
        
    });
    
    shell_process.stdout.on("data", function(data) {

        command_result += `Command ${command} has been ran successfully !\nResult : ${data}`;
        
    });
    shell_process.stdout.on("error", function(err) {

        command_result += `An error has happened while running the command !\n${err.message}`;
          
    });

    shell_process.on("message", function(message, handle) {
        
        command_result += `Received a message from the command ${command} !\n${message.toString()}`;
        
    });
    
    shell_process.on("exit", function(code, signal) {
        
        if (code) {
            
            command_result += `Received code !\nCode : ${code.toString()}`;
            
        };
        if (signal) {
            
            command_result += `Received signal !\nSignal : ${signal.toString()}`;
            
        };
        
        shell_process.kill();
        
    });
    
    commands_results.push(command_result);
    
};

function run_jar_and_build_server() {

    run_command(`mkdir ${__dirname}/notchian/ ${__dirname}/notchian/generated/ ${__dirname}/notchian/generated/data/ ${__dirname}/notchian/generated/data/minecraft`); /* creates the folders necessary for the compilation to work properly */

    /*let request_url = new URL(build_configuration["server_file_url"]);
    fs.writeFileSync(`${__dirname}/notchian/server.jar`, https.request({method: "GET", host: request_url.host, port: 443, path: request_url.pathname, keepAlive: 600, rejectUnauthorized: true}, function(res) {

        let server_jar_file_content = "";
            
        res.setEncoding("utf8");
        res.on("data", function(data) {

            server_jar_file_content += data;
                
        });
        res.on("end", function() {

            return server_jar_file_content;
            console.log("Downloaded the server.jar file content successfully !");
                
        });
        res.on("error", function(err) {

            console.log(err);
                
        });
            
    }), "utf8");*/
    
    run_command(`sudo chmod +x ${__dirname}/extract_registries.sh`); /* makes the extract_registries.sh file usable */
    run_command(`sudo chmod +x ${__dirname}/build.sh`); // same as for extract_registries.sh
    run_command(`wget ${build_configuration["server_file_url"]} -O ${__dirname}/notchian/server.jar`);
    run_command(`java -jar ${__dirname}/notchian/server.jar`); /* launches the minecraft server so that all the folders and files get created ( a small verification system could be implemented later on ) */
    run_command(`sudo ${__dirname}/extract_registries.sh`); /* runs the extract_registries.sh file */
    run_command(`mv ${__dirname}/notchian/generated/data/minecraft/include/registries.h ${__dirname}/include/registries.h`);
    run_command(`mv ${__dirname}/notchian/generated/data/minecraft/src/registries.c ${__dirname}/src/registries.c`);
    run_command(`sudo ${__dirname}/build.sh`); /* runs the build.sh file */
    run_command(`mv ${__dirname}/bareiron ${__dirname}/BareIron-${build_configuration["os"]}`); /* renames the file */
    console.log(`Your bareiron executable file has been built successfully !\nExisting files and folders : ${fs.readdirSync(__dirname)}\n\n\nCommands logs :\n${commands_results}`);
    
};

var serverdotjar_data = ""; // creates a new variable that will contain the .jar file datas

if (String(build_configuration["os"]).toLowerCase() === "debian" || String(build_configuration["os"]).toLowerCase() === "ubuntu") {
    
    run_command("sudo apt update -y && sudo apt upgrade -y"); // udpates all the server apps
    run_command("sudo apt install clang default-jre wget -y"); // install the latest release of gcc and java
    
    run_jar_and_build_server(); // launch the build function

};

if (String(build_configuration["os"]).toLowerCase() === "centos" || String(build_configuration["os"]).toLowerCase() === "fedora" || String(build_configuration["os"]).toLowerCase() === "rhel") {

    run_command("sudo dnf update -y && sudo dnf upgrade -y");
    run_command("sudo dnf install clang default-jre wget -y");
    
    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "centos-old" || String(build_configuration["os"]).toLowerCase() === "fedora-old" || String(build_configuration["os"]).toLowerCase() === "rhel-old") {

    run_command("sudo yum update -y && sudo yum upgrade -y");
    run_command("sudo yum install clang default-jre wget -y");
    
    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "arch") {

    run_command("sudo pacman update -y && sudo pacman upgrade -y");
    run_command("sudo pacman -S clang jdk-openjdk wget -y");
    
    run_jar_and_build_server();
    
};
if (String(build_configuration["os"]).toLowerCase() === "msys2") {

    run_command("sudo pacman update -y && sudo pacman upgrade -y");
    run_command("sudo pacman -S clang wget -y");

    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "opensuse" || String(build_configuration["os"]).toLowerCase() === "suse-enterprise") {

    run_command("sudo zypper update -y && sudo zypper upgrade -y");
    run_command("sudo zypper install clang java-17-openjdk-devel wget -y");
    
    run_jar_and_build_server();
    
};

if (String(build_configuration["os"]).toLowerCase() === "gentoo") {

    run_command("sudo emerge --update --deep world -y && sudo emerge --upgrade -y");
    run_command("sudo emerge clang wget virtual/jdk -y");

    run_jar_and_build();
    
};
