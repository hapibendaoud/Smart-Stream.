import { getData } from "./serves.js";

const category = [];
let currentFilter = "";
let allChannels = [];

const menu = document.getElementById("menu_icon");
const category_popup = document.getElementById("category_popup");
const close_popup = document.getElementById("close_popup");
const search = document.getElementById("search");
const channels_section = document.getElementById("channels_section");
const category_div = document.getElementById("category_div");
const all_channels = document.getElementById("all_channels");

menu.addEventListener("click", (e) => {
    category_popup.classList.remove('-translate-x-full');
    document.body.classList.add("overflow-hidden");
});

close_popup.addEventListener("click", (e) => {
    category_popup.classList.add('-translate-x-full');
    document.body.classList.remove("overflow-hidden");
});

search?.addEventListener('input', e => {
    currentFilter = e.target.value.toLowerCase();
    renderFilteredChannels(); 
});
all_channels?.addEventListener("click", (e)=>{
    channels_section.innerHTML = "";
    channels(allChannels);
    category_div.querySelectorAll("article").forEach(item => {
        item.classList.remove("active");
    });
    all_channels.classList.add("active");
    category_popup.classList.add('-translate-x-full');
    document.body.classList.remove("overflow-hidden");
})

async function initApp() {
    allChannels = await getData();
    
    channelCategory(allChannels);
    categoryChannels(category);

    channels(allChannels);
}
initApp();

function renderFilteredChannels() {
    const filtered = allChannels.filter(p => {
        const channelName = p.name || p.title || "";
        return channelName.toLowerCase().includes(currentFilter);
    });
    
    channels_section.innerHTML = "";
    channels(filtered); 
}

function channels(channel) {
    channel.forEach(element => {
        const article = document.createElement("article");
        article.dataset.id = element.id;
        article.className = "flex items-center justify-between p-2 border border-[#07209C] rounded-lg mb-2 hover:bg-[#030A44] cursor-pointer";
        article.innerHTML = `
            <div class="flex gap-5 items-center h-fit w-full ">
                <div class="bg-[#0B32F4] w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg italic text-white">${element.countryCode || element.country.slice(0, 2)}</div>
                <div class="">
                    <h2 class="font-bold text-white ">${element.name}</h2>
                    <p class="text-xs text-gray-400">${element.category || 'Description'}</p>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <div class="relative">
                    <div class="absolute w-2 h-2 bg-[#2749F5] rounded-2xl animate-ping"></div>
                    <div class="relative w-2 h-2 bg-[#2749F5] rounded-2xl "></div>
                </div>
                <p class="text-xs text-gray-400">10.1k</p>
            </div>`;
        
        channels_section.append(article);

        article.addEventListener("click", (e) => {
            const channel_active = e.currentTarget.dataset.id;
            
            const finded_channel = allChannels.find(item => item.id === channel_active);
            console.log("Selected Channel:", finded_channel);

            if (finded_channel && finded_channel.streamUrl) {
                const videoElement = document.getElementById("video");
                const name_channel = document.getElementById("name_channel");
                const desc_chaennel = document.getElementById("desc_chaennel");
                const category_name = document.getElementById("category_name");
                const playing_now = document.getElementById("playing_now");
                
                if (videoElement) {
                    videoElement.innerHTML = "";
                    
                    const source = document.createElement("source");
                    source.setAttribute("src", finded_channel.streamUrl);
                    source.setAttribute("type", "video/mp4");
                    
                    if (name_channel) name_channel.textContent = finded_channel.name;
                    if (desc_chaennel) desc_chaennel.textContent = finded_channel.channelNumber || '';
                    if (category_name) category_name.textContent = finded_channel.category || '';
                    if (playing_now) playing_now.textContent = finded_channel.epg?.currentProgram || 'Live Stream';

                    console.log(element.epg.currentProgram);
                    
                    videoElement.append(source);
                    videoElement.load();
                    videoElement.play().catch(err => console.log("Auto-play prevented:", err));
                }

            }
        });
    });
}

function categoryChannels(cate) {
    category_div.innerHTML = "";
    cate.forEach(element => {
        const article = document.createElement("article");
        article.dataset.id = element.id;
        article.className = "flex items-center gap-2 border border-[#0929C8] p-1 rounded-lg cursor-pointer mb-2 hover:bg-[#071B9C]";
        article.innerHTML = `
            <div class="bg-[#0B32F4] w-8 h-8 flex items-center justify-center text-lg rounded-lg italic text-white font-bold">${element.countryCode}</div>
            <h2 class="italic uppercase text-white">${element.country}</h2>
        `;
        
        category_div.append(article);
        
        article.addEventListener("click", (e) => {
            const countryId = Number(e.currentTarget.dataset.id);
            const countryobject = category.find(item => item.id === countryId);
            
            if (countryobject) {
                category_div.querySelectorAll("article").forEach(item => {
                    item.classList.remove("active");
                });
                all_channels.classList.remove("active");
                e.currentTarget.classList.add("active");

                const filteredByCountry = allChannels.filter(channel => 
                    countryobject.channlesId.includes(channel.id)
                );
                channels_section.innerHTML = "";
                channels(filteredByCountry);
                
                category_popup.classList.add('-translate-x-full');
                document.body.classList.remove("overflow-hidden");
            }
        });
    });
}

function channelCategory(fetchedChannels) {
    fetchedChannels.forEach(element => {
        const existingCategory = category.find(existingObj => existingObj.country === element.country);
        
        if (!existingCategory) {
            category.push({
                id: category.length > 0 ? Number(category[category.length - 1].id) + 1 : 1,
                country: element.country,
                channlesId: [element.id],
                countryCode: element.countryCode,
            });
        } else {
            existingCategory.channlesId.push(element.id);
        }
    });
    // console.log(category);
    
}