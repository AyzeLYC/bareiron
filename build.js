const build_configuration = {

    "os": "ubuntu",
    "server_folder": "/home/$/bareiron-mc-server"
    
};

function run_command(arguments, timeout) {

    const {setTimeout} = require("node:timers/promises");
    
    let { spawn } = require("node:child_process");
    
    let shell_process = spawn(arguments, {detached: true, shell: true, windowsHide: true}),
        result = "";

    shell_process.stdout.on("data", function(data) {

        result += data;
        
    };
    setTimeout(timeout);
    shell_process.exit();

    return result;
    
};

if (build_configuration["os"].toLowerCase() === "debian" || build_configuration["os"].toLowerCase() === "ubuntu") {
    
    run_command(["sudo", "apt", "update", "-y", "&&", "sudo", "apt", "upgrade", "-y"], 15); // udpates all the server apps

    run_command(["sudo", "apt", "install", "openjdk-22-jre-headless", "-y"], 15); // install the latest release of Java
    run_command(["sudo", "apt", "install", "git", "-y"], 15); // install the latest release of git
    
    run_command(["mkdir", "/home/$/bareiron-mc-server/", "&&", "cd", "/home/$/bareiron-mc-server/"], 5); // creates the folder where all the files will be and go into it$
    
    run_command(["git", "clone", "https://github.com/p2r3/bareiron"], 30); // downloads all the files from the github repository
    
    run_command(["cd", "./bareiron"]);
    
    run_command(["mkdir", "./notchian/", "./notchian/generated/", "./notchian/generated/data/", "./notchian/generated/data/minecraft"], 5); // creates the necessary folders

    
    let server_jar_data = ""; // creates a new variable that will contain the .jar file content
        
    let server_jar_https_client = new XMLHttpRequest();
        https_client.open("GET", "https://piston-data.mojang.com/v1/objects/6bce4ef400e4efaa63a13d5e6f6b500be969ef81/server.jar", true);
        https_client.onload = function() {
            
            server_jar_data = https_client.response;
            
        };
    
    fs.writeFileSync(`${config["server_folder"]}/bareiron/notchian/server.jar`, server_jar_data); // creates a new file called server.jar and writes the datas received from Mojang websites into it

    
    run_command(["sudo", "chmod", "+x", `./extract_registries.sh`], 5);
    run_command(["sudo", "chmod", "+x", "./build.sh"], 5);
    
    run_command(["java", "-jar", "./notchian/server.jar"], 60);
    
    run_command(["sudo", `${config["server_folder"]}/extract_registries.sh`], 60);

    run_command(["sudo", "./build.sh"], 30);
    
};
