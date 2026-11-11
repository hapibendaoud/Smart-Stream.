const url = "data/data.json";

export async function getData(){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw error("Erorr: ", response.status);
        }
        const data = await response.json();
        if(!data){
            throw error("Error Data type!!");
        }
        console.log("Service: ",data);
        
        return data;
    } catch(e){
        console.error(e);
    }
}