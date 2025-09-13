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
    run_command(["sudo", "apt", ""]);

};
