import * as readline from "readline";
import { stdin as usr_Input,  stdout as usr_Output } from "process";
import { add_To_File, create_Or_Get_File, delete_File, read_A_File, save_File } from "./file_Manager.mjs";

const rl = readline.createInterface({input: usr_Input, output: usr_Output});


const createOr_Find_File = async (ask_Usr) => {
    rl.question(`${ask_Usr} `, async (fNam) => {
        await create_Or_Get_File(fNam.toString().trim());
        contin();
    });
};

const readA_File = async () => {
    rl.question(`Enter File Name: `, async (fNam) => {
        await read_A_File(fNam.toString().trim());
        contin();
    });
};

const append_File = async () => {
    rl.question('Enter File Name eg[file.json]: ', async (fNam) => {
                
        rl.question(`Enter Content To Append The '${fNam}' File: `, async (conten) => {
            try {
                await add_To_File(fNam.toString().trim(), conten);
                contin();
            } catch (error) {
                console.warn(`error`);
            }
            
        });
        
    });
}

const del_File = async () => {
    rl.question('Enter File Name: ', async (fNam) => {
        await delete_File(fNam.toString().trim());
        contin();
    })
}

const del_Data_From_File = async () => {
    rl.question('Enter File Name: ', async (fNam) => {
        try {
            const data = await create_Or_Get_File(fNam);

            rl.question('Enter Index: ', async (index) => {

                if (index > -1 && index < data.length) {
                    try {
                        data.splice(index, 1);
                        await save_File(fNam, data);
                        console.log(`Data In '${fNam}' removed successfuly`);
                        contin();
                    } catch (error) {
                        console.warn(`Error removing data in ${fNam}`);
                        contin();
                    }
                } else {
                    console.warn(`'${index}' Is OUT OF RANGE`);
                    contin();
                }
                
            })
        } catch (error) {
            console.warn('Error Getting File Name');
            contin();
        }
    })
}

const edit_Data_In_File = async () => {
    rl.question('Enter File To Edit Name: ', async (fNam) => {
        try {
            const data = await create_Or_Get_File(fNam);
            
            rl.question('Enter Index To Edit: ', async (index) => {

                if (index > -1 && index < data.length) {
                    
                    rl.question('Enter NEW Content: ', async (newCont) => {
                        try {
                            data[index] = newCont;
                            await save_File(fNam, data);
                            console.log(`Data In '${fNam}' updated successfuly`);
                            contin();
                        } catch (error) {
                            console.warn(`Error Updating Aata In '${fNam}' more detailes: ${error}`);
                            contin();
                        }
                    })
                    
                } else {
                    console.warn(`'${index}' Is OUT OF RANGE`);
                    contin();
                }
                
            })
        } catch (error) {
            console.warn('Error Getting File Name');
            contin();
        }
    })
}


const welcome = () => {
    rl.question('What Would You Like To Do:\n1. Find A File\n2. Read A File\n3. Create A File\n4. Append To A File\n5. Delete A File\n6. Remove Data From File\n7. Edit Data In File\n', (usr_In) => {
        
        if (Number(usr_In) && usr_In == 1) {
            createOr_Find_File('Enter File Name');

        } else if (Number(usr_In) && usr_In == 2) {
            readA_File();

        } else if (Number(usr_In) && usr_In == 3) {
            createOr_Find_File('Enter New File Name: ');

        } else if (Number(usr_In) && usr_In == 4) {
            append_File();

        } else if (Number(usr_In) && usr_In == 5) {
            del_File();
            
        } else if (Number(usr_In) && usr_In == 6) {
            del_Data_From_File();
            
        } else if (Number(usr_In) && usr_In == 7) {
            edit_Data_In_File();
            
        } else {
            welcome();
        }
    })
};

welcome();

const contin = () => {
    rl.question('Would You Like To Start Again, yes:[1] no:[any other key]: ', (usr_In) => {
        usr_In == 1 ? welcome() : rl.close();
    })
}

