// const url = "data/data.json";
const url = "https://6af42fce55a1de7dcf03ae98.mockapi.io/smartStream/channels";

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