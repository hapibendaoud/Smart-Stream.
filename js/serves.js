// const url = "data/data.json";
const url = "https://6af42fce55a1de7dcf03ae98.mockapi.io/smartStream/channels";
// const url = "https://api.npoint.io/b545f35bb04e2fe4348c";

export async function getData(){
    try{
        
        const response = await fetch(url);
        if(!response.ok){
            throw new error("Erorr: ", response.status);
        }
        const data = await response.json();
        if(!data){
            throw new error("Error Data type!!");
        }
        console.log("Service: ",data);
        
        return data;
    } catch(e){
        console.error(e);
    } finally {
        const loading_channels = document.getElementById("channels_loading");
        const loading_name = document.getElementById("loading_name");
        const loading_palying = document.getElementById("loading_palying");
        const loading_category = document.getElementById("loading_category");
        loading_channels.classList.add("hidden");
        loading_name.classList.add("hidden");
        loading_palying.classList.add("hidden");
        loading_category.classList.add("hidden");
    }
}