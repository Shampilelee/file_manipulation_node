import { ask_Usr, close_Rl } from "./rl.mjs";
import { add_To_File, create_Or_Get_File, delete_File, read_A_File, save_File } from "./file_Manager.mjs";

let usr_Input = await ask_Usr('\nFile Manipulation Program, Choose A Command BY NUMBER \n1. CREATE [cmd file_Name], \n2. READ [cmd file_Name], \n3. APPEND [cmd file_Name new_Data], \n4. REMOVE [cmd file_Name index] \n5. EDIT [cmd file_Name index newData], \n6. DELETE [cmd file_Name] \n0. quit: \n');

while (usr_Input !== '0') {

    // Working With Multiply Input
    let cmd_Parts = usr_Input.trim().split(' ');
    let cmd = cmd_Parts[0];

    let file = await read_A_File(cmd_Parts[1]);

    if (cmd == 1) {
        if (cmd_Parts.length < 2) {
            console.log('Kindly Add A Name For The File. eg: [1 file_Name.json]');
        } else {
            await create_Or_Get_File(cmd_Parts[1]);
        }

    } else if (cmd == 2) {
        if (cmd_Parts.length < 2) {
            console.log('Kindly Add The Name Of The File You Want To READ or Find. eg: [2 file_Name.json]');
        } else {
            await read_A_File(cmd_Parts[1]);
        }
        
    } else if (cmd == 3) {
        if (cmd_Parts.length < 3) {
            console.log('Kindly Add The Filename Or NewData. eg: [3 file_Name.json newData]');
        } else {
            await add_To_File(cmd_Parts[1], cmd_Parts[2]);
        }
        
    } else if (cmd == 4){
        if (cmd_Parts.length < 3) {
            console.log('Kindly Add The Filename Or Index Of Data You Want To REMOVE FROM File. eg: [4 file_Name.json Index]');
        } else {
            file.splice(cmd_Parts[2], 1);
            await save_File(cmd_Parts[1], file);
            console.log('DATA REMOVED FROM File');
        }
        
    } else if (cmd == 5){
        if (cmd_Parts.length < 4) {
            console.log('kindly Add These In Your CMD: [cmd file_Name index newData]');
        } else {
            try {
                file[cmd_Parts[2]] = cmd_Parts[3];
                await save_File(cmd_Parts[1], file);
                console.log(`Data In '${cmd_Parts[1]}' Updated Successfuly`);
            } catch (error) {
                console.warn(`Error Updating Aata In '${fNam}' more detailes: ${error}`);
            }
        }

    } else if (cmd == 6){
        if (cmd_Parts.length < 2) {
            console.log('kindly add a filename eg: [cmd file_Name] ');
        } else {
            await delete_File(cmd_Parts[1]);
        }
    } 

    usr_Input = await ask_Usr('\nFile Manipulation Program, Choose A Command BY NUMBER \n1. CREATE [cmd file_Name], \n2. READ [cmd file_Name], \n3. APPEND [cmd file_Name new_Data], \n4. REMOVE [cmd file_Name index] \n5. EDIT [cmd file_Name index newData], \n6. DELETE [cmd file_Name] \n0. quit: \n');

}

close_Rl();

