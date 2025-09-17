import { dirname, join } from "path";
import { fileURLToPath } from "url";

const get_File_Clean_URL = fileURLToPath(import.meta.url);
const get_Dir_Name = dirname(get_File_Clean_URL);
const creat_New_URL = join(get_Dir_Name, "new_URL");

console.log(creat_New_URL);

