class WebRequest {

    constructor(){
        this.url = '';
    }

    setUrl(u){
        this.url = u;
    }

    getUrl(){
        return this.url;
    }

    postData(remote){

        const dataPost = {
                "name":remote.name,
                "data":remote.data,
                "metaData":{
                    "Content-Type": "application/json"
                }
            }
        fetch(this.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPost)
          })
    }

    getData(){
        fetch(this.url)
        .then(response => response.json())
        .then(data => console.log(data));
    }
}