const build_configuration = {

    "os": "ubuntu"
    
};

function run_command(arguments) {
    
    let { spawn } = require("node:child_process");
    
    let shell_process = spawn(arguments, {detached: true, shell: true, windowsHide: true}),
        result = "";

    shell_process.stdout.on("data", function(data) {

        result += data;
        
    };
    shell_process.exit();

    return result;
    
};

if (build_configuration["os"].toLowerCase() === "debian" || build_configuration["os"].toLowerCase() === "ubuntu") {
    
    run_command(["sudo", "apt", "update", "-y", "&&", "sudo", "apt", "upgrade", "-y"]); // udpates all the server apps
    run_command(["sudo", "apt", "install", "default-jre", "-y"]); // install the latest release of Java
    run_command(["sudo", "apt", "install", "git"]); // install the latest release of git
    run_command(["mkdir", "/home/$/bareiron-mc-server/", "&&", "cd", "/home/$/bareiron-mc-server/"]); // creates the folder where all the files will be and go into it$
    run_command(["git", "clone", "https://github.com/p2r3/bareiron"]); // downloads all the files of the github
    
    https_request_response_data = "";
        
    https_client = new XMLHttpRequest();
    https_client.open("GET", "https://piston-data.mojang.com/v1/objects/6bce4ef400e4efaa63a13d5e6f6b500be969ef81/server.jar", true);
    https_client.onload = function() {
            
        https_request_response_data = https_client.response;
            
    };
        
    fs.writeFileSync("/home/$/bareiron-mc-server/server.jar", https_request_response_data, "utf-8"); // creates a new file called server.jar and writes the datas received from Mojang websites into it

    delete https_client.reponse;
    delete https_client.responseText;
    delete https_client.responseXML;
    
    https_client.open("GET", "https://github.com/p2r3/bareiron/blob/8d75d0a75fb0b54347c1215ab06ffd929300e11b/extract_registries.sh", true); // creates a brand new HTTPS request to get the extract_registries.sh file content
    https_client.onload = function() {

        https_request_response_data = https_client.response;
            
    };

    fs.writeFileSync("/home/$/bareiron-mc-server/extract_registries.sh", https_request_response_data, "utf-8");
    
    delete https_client;
    delete https_request_response_data;
    
    run_command();
    
};
