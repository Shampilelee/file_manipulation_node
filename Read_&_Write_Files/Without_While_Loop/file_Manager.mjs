import { access, constants, readFile, writeFile, unlink } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


export async function create_Or_Get_File(file_Name) { 

    let contents = null;

    if (String(file_Name).toString().trim().length > 0) {

        const get_File_Clean_URL = fileURLToPath(import.meta.url);
        const get_dir_Name = dirname(get_File_Clean_URL);
        const newFile = join(get_dir_Name, file_Name);
        
        try {
            
            // Checking If: 
                // The File EXIST( constants.F_OK ), 
                //    We Can READ( constants.R_OK ) From It, 
                //    WRITE( constants.W_OK ) To It, 
                //    Or EXECUTE( constants.X_OK ) It.
            
            // 'access()' DOES NOT RETURN A BOOLEAN VALUE, IT RETURNS AN ERROR IF SOMETHING GOES WRONG,
            
            await access(newFile, constants.F_OK);
            console.log(`The File Already EXIST, With This Name: '${file_Name}'\n`);
            
        } catch (error) {
            console.warn("The File DOSE NOT Exist, more details: " + error);
            //console.warn("The File DOSE NOT Exist, more details: ");
            console.log(`\nCREATING '${file_Name}' NOW`);

            // IF 'newFile' DOES NOT EXIST, CREATE IT WITH THE 'writeFile()' FUNCTION.
            // INITAILSE THE DATA IN IT AS A JSON
            try {
                await writeFile(newFile, JSON.stringify([]));
                console.log(`NEW File: '${file_Name}' CREATED\n`);
            } catch (error) {
                console.warn(`ERROR CREATING NEW FILE '${file_Name} more details: ${error}`);
            }
            
        }

        // READ FROM 'newFile'
        // SET THE encoding to 'utf8' readFile(jsonFile, {encoding: 'utf8'});
        contents = await readFile(newFile, {encoding: 'utf8'}); // The default encoding is 'null' 


    } else {
        console.log('Invalid Input, Try Again');
    }

    return JSON.parse(contents);
      
}

// APPEND TO FILE
export async function add_To_File(file_Name, contents) {
    try {
        const main_File = await create_Or_Get_File(file_Name);
        main_File.push(contents);
        await save_File(file_Name, main_File);
        console.log(`Content Added To '${file_Name}' Successful`);
    
    } catch (error) {
        console.warn(`ERROR APPENDING CONTENT TO FILE, More Details: ${error}`);
    }
}

// OVERWRITE FILE
export async function save_File(file_Name, contents) {
    // THE 'JSON.stringify()' Function CONVERTS THE 'contents' TO A JSON STRUCTURE.
    // This OVER WRITE the File.
    await writeFile(file_Name, JSON.stringify(contents));
}

export async function delete_File(file_Name) {
    if (String(file_Name).trim(file_Name).length < 1) {
        console.log('Invalid Input Try Again');
    } else {
        try {
            await access(file_Name); // Let Check if File Exist
            await unlink(file_Name); // Delete File
            console.log(`'${file_Name}' DELETED Successfully\n`);
            
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.warn(`'${file_Name}' DOSE NOT EXIST`);
            } else {
                console.warn(`ERROR Deleting '${file_Name}', more details: ${error}\n` );
            }
        }
    }
    
}

export async function read_A_File(file_Name) {
    if (String(file_Name).trim(file_Name).length < 1) {
        console.log('Invalid Input Try Again');
    } else {
        try {
            const get_File_Clean_URL = fileURLToPath(import.meta.url);
            const get_dir_Name = dirname(get_File_Clean_URL);
            const newFile = join(get_dir_Name, file_Name);

            const contents = await readFile(newFile, {encoding: 'utf8'});
            console.log(JSON.parse(contents));
            
            return JSON.parse(contents);
            
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.warn(`'${file_Name}' DOSE NOT EXIST`);
            } else {
                console.warn(`ERROR READING FILE More Details: ${error}`);
            }
        }
    }
    
}

export async function edit_File_Content(file_Name, index) {
    if (String(file_Name).trim(file_Name).length < 1) {
        console.log('Invalid Input Try Again');
    } else {
        try {
            const get_File_Clean_URL = fileURLToPath(import.meta.url);
            const get_dir_Name = dirname(get_File_Clean_URL);
            const newFile = join(get_dir_Name, file_Name);

            const contents = await readFile(newFile, {encoding: 'utf8'});
            console.log(JSON.parse(contents));
            
            return JSON.parse(contents);
            
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.warn(`'${file_Name}' DOSE NOT EXIST`);
            } else {
                console.warn(`ERROR READING FILE More Details: ${error}`);
            }
        }
    }
    
}

