const {default: axios} = require("axios");

async function fetchData(){
    const res = await axios.get("https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1");
    return res.data;
}

async function main(){
    const data = await fetchData();
    const products = [];
    var i = 0;
    for(var obj in data){
        products[i] = new Product(data[i].name, data[i].description, data[i].weight, data[i].price, data[i].domestic);
        i++;
    }
    let sumDomestic = 0;
    let sumImported = 0;
    let countDomestic = 0;
    let countImported = 0;
    let sortedProducts = products.sort((p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);
    console.log("Domestic")
    for(i=0;i<sortedProducts.length;i++){
        if(sortedProducts[i].domestic === true){
            sortedProducts[i].toString();
            sumDomestic+=sortedProducts[i].price;
            countDomestic++;
        }
    }
    console.log("Imported")
    for(i=0;i<sortedProducts.length;i++){
        if(sortedProducts[i].domestic !== true){
            sortedProducts[i].toString()
            sumImported+=sortedProducts[i].price;
            countImported++;
        }
    }
    console.log("Domestic cost: $"+sumDomestic);
    console.log("Imported cost: $"+sumImported);
    console.log("Domestic count: "+countDomestic);
    console.log("Imported count: "+countImported);
}
class Product{
    constructor(name, description, weight, price, domestic){
        this.name = name;
        this.description = description;
        this.weight = weight;
        this.price = price;
        this.domestic = domestic;
    }

    toString(){
        if(this.weight === undefined){
            console.log("\t"+this.name+"\n\tPrice: $"+this.price+"\n\t"+this.description.substring(0,10)+"\n\t"+"Weight: N/A")
        }else{
            console.log("\t"+this.name+"\n\tPrice: $"+this.price+"\n\t"+this.description.substring(0,10)+"\n\t"+"Weight: "+this.weight)
        }
    }
}
main()
