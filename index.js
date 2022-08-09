window.onload = function load(){
    
    const search = document.getElementById('search')
    const result = document.getElementById('result')
    const list = document.querySelector('.list')
    const erroSms = document.querySelector('.noFund')
    var saveJson = []
    var beforeStatus = 0
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2fcbcef256msh36033424a3862dbp16d56cjsn5cf5698e3f3b',
            'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
        }
    };
    
    async function getSearch(){
        const response = await fetch(`https://jikan1.p.rapidapi.com/search/anime?q=${search.value}`, options)
        const json = await response.json()
        const Alength = json.results
        const statusError = json.status
        if(statusError === 404){
            const errorDiv = document.querySelector(".noFund")
            errorDiv.style.display = "initial";
            setTimeout(()=>{
                errorDiv.style.display = "none";
            },1000)

        }else{
            if(Alength === undefined){
                removeSearch(0)
            }else{
                for(i = 0; i<Alength.length;i++){
                    const title = Alength[i].title
                    const urlImage = Alength[i].image_url
                    addResult(title , urlImage,i)
                }
                beforeStatus = Alength.length
                saveJson = await json.result
            }
        }
        return Alength
    }

    async function awaitJson(){
        saveJson = await getSearch()
        //console.log(saveJson)
    }

    function addResult(fTitle , fImage,id){
        const nid = "btn"+id
        const newDiv = document.createElement("div")
        const newTitle = document.createElement("p")
            newTitle.innerHTML = fTitle
            newDiv.appendChild(newTitle)
        const newImage = document.createElement("img")
            newImage.setAttribute('src',fImage)
            newDiv.appendChild(newImage)
        const addToList = document.createElement("button")
            addToList.setAttribute('id',nid)
            addToList.classList.add('searchToAdd')
            const imgAddToList = document.createElement("img")
                imgAddToList.setAttribute('src','./imgenes/1491254405-plusaddmoredetail_82972.png')
                addToList.appendChild(imgAddToList)
            newDiv.appendChild(addToList)
        newDiv.classList.add('resultElements')

        result.appendChild(newDiv)

        document.getElementById(nid).onclick = function(){
            if(document.getElementById('list'+ id) == null){
                addList(saveJson[id].synopsis,saveJson[id].title,id)
            }
        }
        
    }

    function addList(Idescription,title,id){

        function templateBtn(node){
            node.innerHTML = `
            <button id="${'Sm'+id}" ><img src="./imgenes/arrowDown.png" alt="" class="btnDimensions showMore"></button>
            <button id="${'D'+id}"><img src="./imgenes/delete_remove_bin_icon-icons.com_72400.png" alt="" class="btnDimensions delet"></button>
            `
        }

        id = 'list'+ id

        const newDivList = document.createElement('div')
        newDivList.classList.add('listElements')
        newDivList.setAttribute('id',id)
            const listVisible = document.createElement('div')
            listVisible.classList.add('listVisible')
                const plist = document.createElement('p')
                    plist.innerHTML = title
                listVisible.appendChild(plist)
                const removeAndMore = document.createElement('div')
                    removeAndMore.classList.add('removeAndMore')
                    templateBtn(removeAndMore)
                listVisible.appendChild(removeAndMore)
            newDivList.appendChild(listVisible)

            const description = document.createElement('div')
                description.classList.add('description')
                description.setAttribute('id','DES'+id)
                description.innerHTML = Idescription
            newDivList.appendChild(description)
        
        list.appendChild(newDivList)

        document.getElementById('Sm'+ id).onclick= ()=>{
            if(description.style.display === 'flex'){
                description.style.display = 'none'
            }else{
                description.style.display = 'flex'
            }
        }

        document.getElementById('D'+id).onclick= () =>{
            const ri = document.getElementById(id)
            list.removeChild(ri)
        }
    }

    

    function removeSearch(Alength){
        if(erroSms.style.display === 'flex'){
            erroSms.style.display = 'none'
        }
        for(i = 0 ; i < Alength;i++){
            const toRemove = document.querySelector('.resultElements')
            if(toRemove != null){
                result.removeChild(toRemove)
            }
        }
    }

    function errorF(){
        const newDiv = document.createElement("h1")
        newDiv.innerHTML = "NO se encontro"

        result.appendChild(newDiv)
    }

    function callFunctions(){
        //getSearch()
        removeSearch(beforeStatus)
        awaitJson()
        /*try{   
        }catch(error){
            erroSms.style.display = 'flex'
        }*/
    }

    

    document.getElementById('btnsearch').onclick = function(){    
        callFunctions()
    }
    
    
    document.addEventListener('keydown',function(aux){
        if(aux.key === "Enter"){
            callFunctions()
        }
    }
    )




}


