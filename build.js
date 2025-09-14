const build_configuration = {

    "os": "ubuntu",
    "server_folder": "/home/$/bareiron-mc-server"
    
};

/**
* @param {string[]} arguments
**/
function run_command(arguments) {
    
    let { spawn } = require("node:child_process");
    
    let shell_process = spawn(arguments, {detached: true, shell: true, windowsHide: true}),
        result = "";

    shell_process.stdout.on("data", function(data) {

        result += data;
        
    });
    shell_process.exit();

    return result;
    
};

if (String(build_configuration["os"]).toLowerCase() === "debian" || String(build_configuration["os"]).toLowerCase() === "ubuntu") {
    
    run_command(["sudo", "apt", "update", "-y", "&&", "sudo", "apt", "upgrade", "-y"]); // udpates all the server apps

    run_command(["sudo", "apt", "install", "gcc", "-y"]);
    run_command(["sudo", "apt", "install", "default-jre", "-y"]); // install the latest release of Java
    run_command(["sudo", "apt", "install", "git", "-y"]); // install the latest release of git
    
    run_command(["mkdir", "/home/$/bareiron-mc-server/", "&&", "cd", "/home/$/bareiron-mc-server/"]); // creates the folder where all the files will be and go into it$
    
    run_command(["git", "clone", "https://github.com/p2r3/bareiron"]); // downloads all the files from the github repository
    
    run_command(["cd", "./bareiron"]);
    
    run_command(["mkdir", "./notchian/", "./notchian/generated/", "./notchian/generated/data/", "./notchian/generated/data/minecraft"]); // creates the necessary folders

    
    let server_jar_data = ""; // creates a new variable that will contain the .jar file content
        
    let server_jar_https_client = new XMLHttpRequest();
        https_client.open("GET", "https://piston-data.mojang.com/v1/objects/6bce4ef400e4efaa63a13d5e6f6b500be969ef81/server.jar", true);
        https_client.onload = function() {
            
            server_jar_data = https_client.response;
            
        };
    
    fs.writeFileSync(`${config["server_folder"]}/bareiron/notchian/server.jar`, server_jar_data); // creates a new file called server.jar and writes the datas received from Mojang websites into it

    
    run_command(["sudo", "chmod", "+x", `./extract_registries.sh`]);
    run_command(["sudo", "chmod", "+x", "./build.sh"]);
    
    run_command(["java", "-jar", "./notchian/server.jar"]);
    
    run_command(["sudo", `${config["server_folder"]}/extract_registries.sh`]);

    run_command(["sudo", "./build.sh"]);

    console.log("Your bareiron executable file has been built successfully !");
    
};
