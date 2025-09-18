const build_configuration = {

    "os": "ubuntu",
    "server_folder": __dirname
    
};

const XMLHttpRequest = require("xhr2"),
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

if ((String(build_configuration["os"]).toLowerCase() === "debian" || String(build_configuration["os"]).toLowerCase() === "ubuntu") && build_configuration["server_folder"] != __dirname) {
    
    run_command("sudo apt update -y && sudo apt upgrade -y"); // udpates all the server apps
    run_command("sudo apt install gcc default-jre git -y"); // install the latest release of gcc, java and git
    run_command(`cd ${build_configuration["server_folder"]}/bareiron`); // go into the newly created bareiron folder
    run_command(`mkdir ${build_configuration["server_folder"]}/notchian/ ${build_configuration["server_folder"]}/notchian/generated/ ${build_configuration["server_folder"]}/notchian/generated/data/ ${build_configuration["server_folder"]}/notchian/generated/data/minecraft`); // creates the necessary compilation folders
    
    let server_jar_data = ""; // creates a new variable that will contain the .jar file content
        
    let server_jar_https_client = new XMLHttpRequest();
        server_jar_https_client.open("GET", "https://piston-data.mojang.com/v1/objects/6bce4ef400e4efaa63a13d5e6f6b500be969ef81/server.jar", true);
        server_jar_https_client.onload = function() {
            
            server_jar_data += server_jar_https_client.response;
            
        };
    
    fs.writeFileSync(`${build_configuration["server_folder"]}/bareiron/notchian/server.jar`, server_jar_data, "utf8"); // creates a new file called server.jar and writes the datas received from Mojang websites into it
    
    run_command(`sudo chmod +x ${build_configuration["server_folder"]}/extract_registries.sh`); // makes the extract_registries.sh file usable
    run_command(`sudo chmod +x ${build_configuration["server_folder"]}/build.sh`); // same as for extract_registries.sh
    run_command(`java -jar ${build_configuration["server_folder"]}/notchian/server.jar`); // launches the minecraft server so that all the folders and files get created ( a small verification system could be implemented later on )
    run_command(`sudo ${build_configuration["server_folder"]}/extract_registries.sh`); // runs the extract_registries.sh file
    run_command(`sudo ${build_configuration["server_folder"]}/build.sh`); // runs the build.sh file
    console.log(`Your bareiron executable file has been built successfully !\n\nCommands logs :\n${commands_logs}`);

};

if ((String(build_configuration["os"]).toLowerCase() === "debian" || String(build_configuration["os"]).toLowerCase() === "ubuntu") && build_configuration["server_folder"] === __dirname) {

    run_command(`sudo chmod +x ${__dirname}/extract_registries.sh`);
    run_command(`sudo chmod +x ${__dirname}/build.sh`);
    run_command(`java -jar ${__dirname}/notchian/server.jar`);
    run_command(`sudo ${__dirname}/extract_registries.sh`);
    run_command(`sudo ${__dirname}/build.sh`);
    console.log(`Your bareiron executable file has been built successfully !\n\nCommands logs :\n${commands_logs}`);
    
};
